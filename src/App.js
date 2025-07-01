import React, { useState, useEffect, useRef, Component } from "react";
import "./App.css";
import "./styles/dark-theme.css";
import aboutImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.02 PM.jpeg";
// import linkedInPic from "./assets/linkedIIN pic.jpeg"; // Removed this import
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Particles from "./components/Particles/Particles"; // Import Particles component
// import posImg from "./assets/pos.jpg";  // Commented out unused import
import { FaCode, FaLaptopCode, FaBrain, FaTools, FaCogs, FaUserFriends, FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt, FaSun, FaMoon } from "react-icons/fa";  // Added FaSun and FaMoon
import ShinyText from "./components/ShinyText/ShinyText";
import SplashScreen from "./components/SplashScreen";

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
  about: `Hi, I'm Kabir — I treat code like the beautiful game: fast, smart, and always strategic. From ML plays to backend build-ups, I'm here to dominate the data pitch`,
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
    </nav>
  );
}

function Hero() {
  const particleColors = ["#00ffff", "#ff00ff", "#00ff00"];
  // Standard image size for all containers
  const imgWidth = 260;
  const imgHeight = 300;
  const imgStyle = {
    width: imgWidth,
    height: imgHeight,
    objectFit: 'cover',
    borderRadius: 18,
    border: '3px solid #7fbcff',
    boxShadow: '0 4px 32px 0 #7fbcff33',
    background: '#23262f',
    display: 'block',
  };
  const imgContainerStyle = {
    background: '#23262f',
    borderRadius: 24,
    boxShadow: '0 8px 40px 0 #7fbcff55',
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  // Container style for all three
  const rowContainerStyle = {
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 1000,
    width: '100%',
    background: 'rgba(35,38,47,0.85)',
    borderRadius: 18,
    boxShadow: '0 4px 24px 0 #7fbcff33',
    padding: '32px 24px',
    margin: '0 auto',
  };
  return (
    <section 
      className="hero" 
      id="hero" 
      style={{ 
        position: 'relative',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '60px',
        paddingBottom: '40px',
        overflow: 'hidden',
      }}
    >
      <Particles 
        particleCount={800}
        particleSpread={15}
        speed={0.25}
        particleColors={particleColors}
        alphaParticles={false}
        particleBaseSize={150}
        cameraDistance={15}
      />
      {/* First Container: About */}
      <div style={{ ...rowContainerStyle, marginBottom: 40 }}>
        {/* Left: About text */}
        <div style={{ flex: 2, textAlign: 'left', padding: '40px 40px 40px 0', minWidth: 0 }}>
          <p style={{ fontSize: '1.18rem', color: 'var(--primary-text)' }}>{profile.about}</p>
          <div className="education" style={{ marginTop: 18 }}>
            <div>{profile.education.college}</div>
            <div>{profile.education.degree}</div>
            <div>GPA: {profile.education.gpa}</div>
            <div>{profile.education.years}</div>
          </div>
        </div>
        {/* Right: About image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={imgContainerStyle}>
            <img 
              src={aboutImg} 
              alt="About Kabir" 
              className="about-img" 
              style={imgStyle}
            />
          </div>
        </div>
      </div>
      {/* Second Container: Hackathon/LeetCode/Projects */}
      <div style={{ ...rowContainerStyle, marginBottom: 40 }}>
        {/* Left: New image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 32 }}>
          <div style={imgContainerStyle}>
            <img 
              src={require('./assets/WhatsApp Image 2025-05-31 at 1.40.29 PM.jpeg')} 
              alt="Kabir Hackathon" 
              style={imgStyle}
            />
          </div>
        </div>
        {/* Right: Content */}
        <div style={{ flex: 2, color: 'var(--primary-text)', fontSize: '1.18rem', fontWeight: 500, lineHeight: 1.6, textAlign: 'left' }}>
          Hackathons are my World cup, LeetCode is my daily training ground, and building projects? That's my matchday magic. I don't just code — I play to create, compete, and leave a mark on the scoreboard.
        </div>
      </div>
      {/* Third Container: One Piece/Calculus/Full-stack */}
      <div style={rowContainerStyle}>
        {/* Left: Content */}
        <div style={{ flex: 2, color: 'var(--primary-text)', fontSize: '1.18rem', fontWeight: 500, lineHeight: 1.6, textAlign: 'left', paddingRight: 40 }}>
          When I'm not coding like a Galáctico in a hackathon final, I'm rewatching Luffy chase the One Piece or solving calculus for fun (yeah, weird flex). Whether it's building full-stack projects or last-minute LeetCode goals, I bring the same energy Madrid brings to Champions League nights — calculated, creative, and clutch.
        </div>
        {/* Right: New image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={imgContainerStyle}>
            <img 
              src={require('./assets/pos.jpg')} 
              alt="Kabir One Piece" 
              style={imgStyle}
            />
          </div>
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
                  <FaGithub /> <ShinyText text="GitHub" speed={3} />
                </a>
              ) : (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <FaLaptopCode /> <ShinyText text="Demo" speed={3} />
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

function GlowingDivider() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '48px 0' }}>
      <div className="glowing-divider" />
    </div>
  );
}

function Projects() {
  return (
    <div id="projects">
      <SectionHeader>Projects</SectionHeader>
      <div className="flashcard-list">
        {profile.projects.map((p, i) => (
          <Flashcard project={p} key={i} />
        ))}
      </div>
    </div>
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
    <div id="skills">
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
    </div>
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
    <div id="journey" ref={timelineRef}>
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
    </div>
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
    <>
      <SectionHeader>Send a Message</SectionHeader>
      <div className="contact-form-desc">I'll get back to you as soon as possible.</div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Your Phone No" value={form.phone} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={4} />
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
        {status && <div className="contact-form-status">{status}</div>}
      </form>
    </>
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

  // Splash screen state
  const [showSplash, setShowSplash] = useState(true);

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

  // Hide splash after it finishes
  const handleSplashFinish = () => setShowSplash(false);

  return (
    <div className="app">
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      {!showSplash && <>
        {/* Fixed top-right theme toggle switch */}
        <div style={{ position: 'fixed', top: 18, right: 24, zIndex: 2000 }}>
          <label className="switch">
            <input
              id="input"
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              aria-label="Toggle theme"
            />
            <div className="slider round">
              <div className="sun-moon">
                <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
              </div>
              <div className="stars">
                <svg id="star-1" className="star" viewBox="0 0 20 20">
                  <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                </svg>
                <svg id="star-2" className="star" viewBox="0 0 20 20">
                  <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                </svg>
                <svg id="star-3" className="star" viewBox="0 0 20 20">
                  <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                </svg>
                <svg id="star-4" className="star" viewBox="0 0 20 20">
                  <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                </svg>
              </div>
            </div>
          </label>
        </div>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Hero openImageModal={openImageModal} />
        {/* Add space before Projects section */}
        <div style={{ height: 48 }} />
        <GlowingDivider />
        <Projects />
        <GlowingDivider />
        <Skills />
        <GlowingDivider />
        <MyJourney />
        <GlowingDivider />
        <ProjectWidgets />
        <GlowingDivider />
        <div className="contact-row">
          <ContactSection />
          <div className="contact-form-section glass">
            <ContactForm />
          </div>
        </div>
        <Footer />
        <ImageModal src={imageModalSrc} alt={imageModalAlt} onClose={closeImageModal} />
      </>}
    </div>
  );
}

const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;