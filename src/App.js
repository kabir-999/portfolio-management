import React, { useState, useEffect, useRef, Component } from "react";
import "./App.css";
import "./styles/dark-theme.css";
import heroImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.29 PM.jpeg";
import aboutImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.02 PM.jpeg";
// import linkedInPic from "./assets/linkedIIN pic.jpeg"; // Removed this import
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Particles from "./components/Particles/Particles"; // Import Particles component
// import posImg from "./assets/pos.jpg";  // Commented out unused import
import { FaCode, FaLaptopCode, FaBrain, FaTools, FaCogs, FaUserFriends, FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt, FaSun, FaMoon } from "react-icons/fa";  // Added FaSun and FaMoon

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{color: 'white', padding: '20px', textAlign: 'center'}}>
          <h2>Something went wrong</h2>
          <p>Please refresh the page or try again later.</p>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const profile = {
  name: "Kabir Mathur",
  tagline: "Aspiring Data Scientist & AI Developer",
  contact: {
    phone: "+91 992026289",
    location: "Mumbai, India",
    email: "mathurkabir336@gmail.com",
    linkedin: "https://www.linkedin.com/in/kabir-mathur-655429292/",
    github: "https://github.com/kabir-999",
  },
  about: `Hi! I'm Kabir, a passionate Computer Science student specializing in Data Science, Machine Learning, Web Scraping and Backend Development. I love building impactful projects and learning new technologies.`,
  education: {
    college: "Dwarkadas J. Sanghvi College of Engineering (DJSCE)",
    gpa: "8.5/10",
    degree: "B.Tech in Computer Science and Engineering (Data Science)",
    years: "2023-2027",
  },
  achievements: [
    {
      title: "AWS Machine Learning Certification",
      date: "Oct 2024",
      desc: [
        "Developed expertise in ML, NLP, computer vision, and generative AI through comprehensive AWS certification program"
      ],
    },
    {
      title: "Smart India Hackathon (SIH) Grand Finalist",
      date: "Dec 2024",
      desc: [
        "Selected as national finalist for innovative solution in India's premier hackathon (SIH 2025)"
      ],
    },
    {
      title: "AWS Academy: Cloud Foundations",
      date: "Mar 2025",
      desc: [
        "Mastered cloud architecture principles, deployment strategies, and core AWS services through certification program"
      ],
    },
  ],
  projects: [
    {
      title: "AI Law Summarizer",
      link: "https://github.com/kabir-999/ai_law_summarizer",
      desc: [
        "Collected legal documents and built a summarization model for law titles using NLP.",
        "Developed a UI to input case titles and display AI-generated summaries.",
        "Stack: BeautifulSoup, Pandas, HuggingFace Transformers, FuzzyWuzzy, HTML/CSS, Flask",
      ],
      img: null,
    },
    {
      title: "AI-driven Crop Disease Detection (SIH Project)",
      link: "https://github.com/Aagnya-Mistry/SIH_Shetkari",
      desc: [
        "Integrated an ML model into the 'Shetkari' app for real-time disease prediction.",
        "Used Firebase and Cloudinary to handle backend services and secure image uploads.",
        "Stack: OpenCV, Flutter, Firebase, Cloudinary",
      ],
      img: null,
    },
    {
      title: "Artifact Identifier",
      link: "https://github.com/kabir-999/authenticity-check",
      desc: [
        "Developed a model to identify and authenticate historical artifacts using image data.",
        "Extracted metadata like origin, damage, and recreated the original with AR tools.",
        "Stack: TensorFlow, Numpy, Pandas, Flask, Blender, HTML/CSS",
      ],
      img: null,
    },
    {
      title: "Fraud Detection in Small Businesses",
      link: "https://innovathon-beaches.vercel.app/",
      desc: [
        "Built a complete fraud analysis tool to assist SMEs with invoice and transaction verification.",
        "Integrated spam detection and admin tools for managing records and fraud alerts.",
        "Stack: React, Node.js, Flask, OpenCV, Selenium, Render, Scikit-learn, Vercel",
      ],
      img: null,
    },
    {
      title: "Blockchain Voting System",
      link: null,
      desc: [
        "Designed a decentralized voting platform ensuring transparency and tamper-proof records using blockchain.",
        "Enforced one-vote-per-user policy via smart contracts and wallet-based voter verification.",
        "Stack: Solidity, Ethereum, Web3.js, React, MetaMask, Ganache",
      ],
      img: null,
    },
    {
      title: "Real Estate Price predictor",
      link: "https://github.com/kabir-999/real-estate-price-predictor",
      desc: [
        "Developed a web application that predicts real estate property prices based on user inputs such as location, square footage, and number of bedrooms.",
        "Integrated a machine learning model with a responsive UI to provide accurate, real-time price estimations for users.",
        "Stack: Scikit-learn, Beautiful Soup, HTML/CSS, Flask, Pandas, Numpy, Render",
      ],
      img: null,
    },
  ],
  skills: [
    "C++", "DSA in C", "Java", "Python", "Solidity",
    "HTML, CSS, Flask, Django, web3.js",
    "Pandas, Numpy, MatplotLib,Seaborn, Scikit-learn , TensorFlow, PyTorch, Model Development, Computer Vision, NLP, Deep Learning",
    "SQL, Git/GitHub, Firebase, Cloudinary, ThingsBoard, API Integration, Metamask, Ganache",
    "EDA, Data Preprocessing, Render Deployment, BeautifulSoup, Blockchain",
  ],
  positions: [
    {
      title: "Events Co-committee Member, Society 4 Data Science (S4DS)",
      date: "Aug 2024",
      desc: [
        "Created and assessed two original problem statements — one for the ML hackathon DataHack 3.0 and another for Xtract 3.0, enhancing problem diversity and real-world relevance for 100+ participants"
      ],
    },
    {
      title: "Co-Captain, Data Science Department",
      date: "Feb 2025",
      desc: [
        "Led 200+ students to 1st place in a 6-department interdepartmental tournament"
      ],
    },
  ],
};

// Helper to parse dates for sorting
const parseDate = (dateString) => {
  const parts = dateString.split(' ');
  if (parts.length === 2) {
    const [monthStr, yearStr] = parts;
    const month = new Date(Date.parse(monthStr + " 1, 2000")).getMonth();
    const year = parseInt(yearStr);
    return new Date(year, month);
  } else if (parts.length === 4 && parts[1] === '-') { // Handle "Month Year - Month Year" format
    const [startMonthStr, startYearStr] = [parts[0], parts[2]];
    const startMonth = new Date(Date.parse(startMonthStr + " 1, 2000")).getMonth();
    const startYear = parseInt(startYearStr);
    return new Date(startYear, startMonth);
  }
  return new Date(); // Fallback for unparseable dates
};

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar glass">
      <a href="#hero">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#journey">My Journey</a>
      <a href="#contact">Contact</a>
      <a href="https://drive.google.com/file/d/1GRPmOQFTL5ZKW5M5z9e_z0FCE3rFJPAa/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Resume</a>
      <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
        {theme === 'light' ? <FaMoon size="1.2em" /> : <FaSun size="1.2em" />}
      </button>
    </nav>
  );
}

function Hero() {
  const particleColors = ["#00ffff", "#ff00ff", "#00ff00"]; // Cyan, Magenta, Green neon
  return (
    <section 
      className="hero" 
      id="hero" 
      style={{ 
        position: 'relative', // Needed for absolute positioning of Particles
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        paddingTop: '80px', 
        paddingBottom: '40px',
        overflow: 'hidden' // Ensure particles don't cause scrollbars on the section
      }}
    >
      <Particles 
        particleCount={800}  // Significantly increased count for more intensity
        particleSpread={15} // Keeping spread the same, adjust if needed
        speed={0.25} // Increased speed
        particleColors={particleColors}
        alphaParticles={false} // Keeping as solid particles
        particleBaseSize={150}  // Increased base size for larger particles
        cameraDistance={15} // Keeping camera distance the same
      />
      <div style={{ zIndex: 1, position: 'relative' }}> {/* Wrapper to ensure ProfileCard is above particles */}
        <ProfileCard 
          avatarUrl="/assets/linkedIIN_pic.jpeg" // Using direct public path
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px', zIndex: 1, position: 'relative' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{profile.name}</h1>
        <p style={{ color: 'white', fontSize: '1.25rem' }}>{profile.tagline}</p>
      </div>
    </section>
  );
}

function About({ openImageModal }) {
  return (
    <section className="about glass" id="about">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <img 
          src={aboutImg} 
          alt="About Kabir" 
          className="about-img" 
        />
      </div>
      <div>
        
        <p>{profile.about}</p>
        <div className="education">
          <div>{profile.education.college}</div>
          <div>{profile.education.degree}</div>
          <div>GPA: {profile.education.gpa}</div>
          <div>{profile.education.years}</div>
        </div>
      </div>
    </section>
  );
}

function Flashcard({ project }) {
  // Details: all but last desc, Stack: last desc
  const details = project.desc.slice(0, -1);
  let tech = project.desc[project.desc.length - 1];
  let techLine = tech.startsWith('Stack:') ? tech.replace('Stack:', '').trim() : tech;
  return (
    <div className="flashcard glass">
      <div className="project-card-container">
        {project.img && (
          <img src={project.img} alt={project.title} className="flashcard-img" />
        )}
        <div className="flashcard-content">
          <h3>{project.title}</h3>
          <ul>
            {details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          <div className="tech-stack">
            <strong>Tech Stack:</strong> {techLine}
          </div>
          <div className="project-links">
            {project.link && (
              project.link.includes('github.com') ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <FaGithub /> GitHub
                </a>
              ) : (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <FaLaptopCode /> Demo
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ children }) {
  return <h2 className="section-header">{children}</h2>;
}

function ProjectWidgets() {
  const widgets = [
    { value: "8.5", label: "CGPA" },
    { value: "5+", label: "Hackathons Attended" },
    { value: "2+", label: "Years Experience" },
  ];
  return (
    <div className="project-widgets-row end-widgets">
      {widgets.map((w, i) => (
        <div className="project-widget glass" key={i}>
          <div className="widget-value">{w.value}</div>
          <div className="widget-label">{w.label}</div>
        </div>
      ))}
    </div>
  );
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <SectionHeader>Projects</SectionHeader>
      <div className="flashcard-list">
        {profile.projects.map((p, i) => (
          <Flashcard project={p} key={i} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const skillCards = [
    {
      icon: <FaCode size={32} color="#7fbcff" />, title: "Languages", items: [
        "C++", "DSA in C", "Java", "Python", "Solidity"
      ]
    },
    {
      icon: <FaLaptopCode size={32} color="#7fbcff" />, title: "Web Development", items: [
        "HTML", "CSS","React","Node.js","JavaScript", "Flask", "Django", "web3.js"
      ]
    },
    {
      icon: <FaBrain size={32} color="#7fbcff" />, title: "Machine Learning & AI", items: [
        "Pandas", "Numpy", "MatplotLib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "Model Development", "Computer Vision", "NLP", "Deep Learning"
      ]
    },
    {
      icon: <FaTools size={32} color="#7fbcff" />, title: "Tools & Platforms", items: [
        "SQL", "Git/GitHub", "Firebase", "Cloudinary", "ThingsBoard", "API Integration","MONGODB", "Metamask", "Ganache","Vercel"
      ]
    },
    {
      icon: <FaCogs size={32} color="#7fbcff" />, title: "Other Skills", items: [
        "EDA", "Data Preprocessing", "Render Deployment", "BeautifulSoup","Selenium", "Blockchain"
      ]
    },
    {
      icon: <FaUserFriends size={32} color="#7fbcff" />, title: "Soft Skills", items: [
        "Logical Thinking", "Teamwork", "Communication", "Leadership", "Time Management"
      ]
    },
  ];

  return (
    <section className="fancy-skills section" id="skills">
      <SectionHeader>Skills</SectionHeader>
      <div className="skill-card-list">
        {skillCards.map((card, i) => (
          <div className="skill-card glass" key={i}>
            <div className="skill-icon">
              {card.icon}
            </div>
            <div className="skill-title">{card.title}</div>
            <ul>
              {card.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function MyJourney() {
  const combinedJourney = [
    ...profile.achievements.map(item => ({ ...item, type: 'achievement' })),
    ...profile.positions.map(item => ({ ...item, type: 'position' })),
  ].sort((a, b) => parseDate(a.date) - parseDate(b.date));

  const timelineRef = useRef(null);
  
  useEffect(() => {
    // Safely query DOM elements with null checks
    const timelineLine = document.querySelector('.timeline-line');
    const timelineSection = document.getElementById('journey');
    const timelineItems = document.querySelectorAll('.timeline-item');
    // const timelineCircles = document.querySelectorAll('.timeline-circle'); // Commented out unused variable
    
    // Exit early if any required element is missing
    if (!timelineLine || !timelineSection || !timelineItems.length) return;
    
    // Calculate the total height of the timeline
    const totalHeight = timelineSection.offsetHeight;
    
    // Function to update the timeline line height based on scroll position
    const updateTimelineLine = () => {
      const rect = timelineSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const windowHeight = window.innerHeight;
      
      // If the section is not visible at all, don't draw the line
      if (sectionBottom <= 0 || sectionTop >= windowHeight) {
        timelineLine.style.height = '0px';
        return;
      }
      
      // Calculate how much of the section is visible
      // const visibleTop = Math.max(0, -sectionTop); // Commented out unused variable
      // const visibleHeight = Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop); // Commented out unused variable
      // const visibleRatio = (Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop)) / totalHeight; // Commented out unused variable
      
      // Calculate the scroll progress through the section
      const scrollProgress = Math.min(1, Math.max(0, (windowHeight - sectionTop) / (windowHeight + totalHeight)));
      
      // Set the height of the timeline line based on scroll progress
      const lineHeight = scrollProgress * totalHeight;
      timelineLine.style.height = `${lineHeight}px`;
      
      // Update each timeline item and its elements based on line position
      timelineItems.forEach((item, index) => {
        if (!item) return; // Skip if item is null
        
        try {
          const itemTop = item.getBoundingClientRect().top - rect.top;
          const circle = item.querySelector('.timeline-circle');
          
          if (itemTop <= lineHeight + 100) { // Adding offset to activate slightly before line reaches
            item.classList.add('active');
            if (circle) circle.classList.add('active');
          } else {
            item.classList.remove('active');
            if (circle) circle.classList.remove('active');
          }
        } catch (err) {
          console.error('Error updating timeline item:', err);
        }
      });
    };
    
    // Add scroll event listener with error handling
    const safeUpdateTimeline = (...args) => {
      try {
        updateTimelineLine(...args);
      } catch (err) {
        console.error('Error in timeline update:', err);
      }
    };
    
    window.addEventListener('scroll', safeUpdateTimeline);
    
    // Initial update with error handling
    try {
      updateTimelineLine();
    } catch (err) {
      console.error('Error in initial timeline update:', err);
    }
    
    // Cleanup with error handling
    return () => {
      try {
        window.removeEventListener('scroll', safeUpdateTimeline);
      } catch (err) {
        console.error('Error removing event listener:', err);
      }
    };
  }, []);
  
  return (
    <section className="timeline-section" id="journey" ref={timelineRef}>
      <SectionHeader>My Journey</SectionHeader>
      <div className="timeline-container">
        <div className="timeline-line" />
        {combinedJourney.map((item, i) => (
          <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={i}>
            <div className="timeline-content glass">
              <div className="timeline-title">{item.title}</div>
              {item.desc && item.desc.length > 0 && (
                <div className="timeline-desc">
                  {item.desc.map((point, idx) => (
                    <div key={idx} className="timeline-desc-item">{point}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="timeline-circle">
              <div className="timeline-dot" />
            </div>
            <div className="timeline-date">{item.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      // Use relative path for Vercel serverless function
      const apiUrl = 'https://kabir-portfolio-management.vercel.app/api';
      console.log('Submitting to:', `${apiUrl}/contact`);
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        const errorData = await res.json();
        setStatus(`Failed to send message: ${errorData.error || 'Please try again.'}`);
      }
    } catch (err) {
      setStatus('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section className="section contact-form-section">
      <h2 className="section-header">Send a Message</h2>
      <div className="contact-form-desc">I'll get back to you as soon as possible.</div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Your Phone No" value={form.phone} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={4} />
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
        {status && <div className="contact-form-status">{status}</div>}
      </form>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section glass" id="contact">
      <h2>Get In Touch</h2>
      <div className="contact-box" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <img src="/assets/linkedIIN_pic.jpeg" alt="LinkedIn Profile" style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #7fbcff', objectFit: 'cover', boxShadow: '0 2px 8px #7fbcff55' }} />
        <div>
          <div className="contact-title">Contact Information</div>
          <div className="contact-desc">Feel free to reach out through any of these channels.</div>
          <div className="contact-list">
            <div className="contact-item"><FaEnvelope className="contact-icon" /> <span><a href="mailto:mathurkabir336@gmail.com">mathurkabir336@gmail.com</a></span></div>
            <div className="contact-item"><FaGithub className="contact-icon" /> <span><a href="https://github.com/kabir-999" target="_blank" rel="noopener noreferrer">github.com/kabir-999</a></span></div>
            <div className="contact-item"><FaLinkedin className="contact-icon" /> <span><a href="https://www.linkedin.com/in/kabir-mathur-655429292/" target="_blank" rel="noopener noreferrer">linkedin.com/in/KabirMathur</a></span></div>
            <div className="contact-item"><FaPhone className="contact-icon" /> <span>+91 992026289</span></div>
            <div className="contact-item"><FaMapMarkerAlt className="contact-icon" /> <span>Mumbai, India</span></div>
           </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      © 2025 Kabir Mathur. All rights reserved.
    </footer>
  );
}

// Simple fallback component to display errors (currently unused)
// Commented out to fix ESLint error
/*
const ErrorDisplay = ({ error }) => (
  <div style={{
    color: 'white',
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#1a1a2e',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <h2 style={{ color: '#ff6b6b', marginBottom: '20px' }}>⚠️ Oops! Something went wrong.</h2>
    <div style={{
      backgroundColor: '#0f3460',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '800px',
      textAlign: 'left',
      margin: '20px 0',
      fontFamily: 'monospace',
      overflowX: 'auto'
    }}>
      <p><strong>Error:</strong> {error.message}</p>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {error.stack || 'No stack trace available'}
      </pre>
    </div>
    <button
      onClick={() => window.location.reload()}
      style={{
        padding: '10px 20px',
        backgroundColor: '#7fbcff',
        color: '#181a20',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '20px',
        transition: 'background-color 0.3s, transform 0.2s'
      }}
    >
      Reload Page
    </button>
  </div>
);
*/

function ImageModal({ src, alt, onClose }) {
  if (!src) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="image-modal-img" />
        <button className="image-modal-close-btn" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark'; // Default to dark if nothing is saved
  });

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [imageModalSrc, setImageModalSrc] = useState(null);
  const [imageModalAlt, setImageModalAlt] = useState("");
  console.log('States initialized successfully');

  const openImageModal = (imageSrc, imageAlt) => {
    setImageModalSrc(imageSrc);
    setImageModalAlt(imageAlt);
  };

  const closeImageModal = () => {
    setImageModalSrc(null);
    setImageModalAlt("");
  };

  useEffect(() => {
    // Safe event handler with error handling
    const handleEscape = (event) => {
      try {
        if (event && event.key === 'Escape') {
          closeImageModal();
        }
      } catch (err) {
        console.error('Error in escape key handler:', err);
      }
    };

    // Safely add/remove event listeners
    try {
      if (imageModalSrc) {
        document.addEventListener('keydown', handleEscape);
      } else {
        document.removeEventListener('keydown', handleEscape);
      }
    } catch (err) {
      console.error('Error managing keydown event listener:', err);
    }

    // Safe cleanup function
    return () => {
      try {
        document.removeEventListener('keydown', handleEscape);
      } catch (err) {
        console.error('Error removing keydown event listener:', err);
      }
    };
  }, [imageModalSrc]);

  return (
    <div className="app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero openImageModal={openImageModal} />
      <div className="gradient-bg main-content">
        <About openImageModal={openImageModal} />
        <Projects />
        <Skills />
        <MyJourney />
        <ProjectWidgets />
        <div className="contact-row">
          <ContactSection />
          <ContactForm />
        </div>
      </div>
      <Footer />
      <ImageModal src={imageModalSrc} alt={imageModalAlt} onClose={closeImageModal} />
    </div>
  );
}

const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;