import React, { useState, useEffect } from "react";
import "./App.css";
import heroImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.29 PM.jpeg";
import aboutImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.02 PM.jpeg";
import linkedInPic from "./assets/linkedIIN pic.jpeg";
import posImg from "./assets/pos.jpg";
import { FaCode, FaLaptopCode, FaBrain, FaTools, FaCogs, FaUserFriends, FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const profile = {
  name: "Kabir Mathur",
  tagline: "Aspiring Data Scientist & AI Developer",
  contact: {
    phone: "+91 992026289",
    location: "Mumbai, India",
    email: "mathurkabir336@gmail.com",
    linkedin: "https://linkedin.com/in/KabirMathur",
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
    "Smart India Hackathon (SIH) Grand Finalist (Dec 2024)",
    "Winner – Interdepartmental Tournament, Data Science Branch (Mar 2025)",
    "AWS Machine Learning Certification (Nov 2024)",
    "AWS Academy: Cloud Foundations (Apr 2025)",
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
  ],
  skills: [
    "C++, DSA in C, Java, Python, Solidity",
    "HTML, CSS, Flask, Django, web3.js",
    "Pandas, Numpy, MatplotLib,Seaborn, Scikit-learn , TensorFlow, PyTorch, Model Development, Computer Vision, NLP, Deep Learning",
    "SQL, Git/GitHub, Firebase, Cloudinary, ThingsBoard, API Integration, Metamask, Ganache",
    "EDA, Data Preprocessing, Render Deployment, BeautifulSoup, Blockchain",
  ],
  positions: [
    {
      title: "Events Co-committee Member, Society 4 Data Science (S4DS)",
      desc: [
        "Created and assessed two original problem statements for ML hackathons, enhancing problem diversity for 100+ participants.",
        "Spearheaded internship outreach, connecting with 7+ industry professionals, resulting in 3+ internship opportunities.",
      ],
    },
    {
      title: "Co-Captain, Data Science Department",
      desc: [
        "Led a team of 200+ students to 1st place among 6 departments in the annual interdepartmental championship.",
        "Oversaw logistics and execution, ensuring 100% attendance and on-time performance across all activities.",
      ],
    },
  ],
};

function Navbar() {
  return (
    <nav className="navbar glass">
      <a href="#hero">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content glass">
        <img src={heroImg} alt="Kabir Mathur" className="hero-img" />
        <div>
          <h1>{profile.name}</h1>
          <h2>{profile.tagline}</h2>
          <p>{profile.contact.location} | <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></p>
          <div className="hero-links">
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about glass" id="about">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <img src={aboutImg} alt="About Kabir" className="about-img" />
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
      {project.img && (
        <img src={project.img} alt={project.title} className="flashcard-img" />
      )}
      <div className="flashcard-content flashcard-carousel">
        <h3>{project.title}</h3>
        <ul>
          {details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
        <div className="stack-line-row"><span className="stack-title">Stack:</span> <span className="stack-line-comma">{techLine}</span></div>
        {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">GitHub/Website</a>}
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
        "HTML", "CSS", "Flask", "Django", "web3.js"
      ]
    },
    {
      icon: <FaBrain size={32} color="#7fbcff" />, title: "Machine Learning", items: [
        "Pandas", "Numpy","MatplotLib","Seaborn", "Scikit-learn" , "TensorFlow", "PyTorch","Model Development", "Computer Vision", "NLP", "Deep Learning"
      ]
    },
    {
      icon: <FaTools size={32} color="#7fbcff" />, title: "Tools and Platforms", items: [
        "SQL", "Git/GitHub", "Firebase", "Cloudinary", "ThingsBoard", "API Integration", "Metamask", "Ganache","Vercel","MongoDB"
      ]
    },
    {
      icon: <FaCogs size={32} color="#7fbcff" />, title: "Others", items: [
        "EDA", "Render Deployment", "BeautifulSoup", "Selenium","Blockchain","Hypothesis Testing","Statistics"
      ]
    },
    {
      icon: <FaUserFriends size={32} color="#7fbcff" />, title: "Soft Skills", items: [
        "Logical Thinking", "Problem Solving", "Communication", "Leadership", "Teamwork"
      ]
    },
  ];
  return (
    <section className="section skills fancy-skills" id="skills">
      <SectionHeader>My Skills</SectionHeader>
      <div className="skill-card-list">
        {skillCards.map((card, idx) => (
          <div className="skill-card glass" key={idx}>
            <div className="skill-icon">{card.icon}</div>
            <div className="skill-title">{card.title}</div>
            <ul>
              {card.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false);
  const achievements = profile.achievements;
  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => {
      setFade(false);
      setTimeout(() => setIdx((prev) => (prev + 1) % achievements.length), 200);
    }, 5000);
    return () => clearTimeout(timer);
  }, [idx, achievements.length]);
  const goLeft = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
      setIdx((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
    }, 200);
  };
  const goRight = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
      setIdx((prev) => (prev + 1) % achievements.length);
    }, 200);
  };
  return (
    <section className="achievements">
      <SectionHeader>Achievements & Certifications</SectionHeader>
      <div className="carousel-row achievements-carousel">
        <button className="carousel-arrow" onClick={goLeft} aria-label="Previous">&#8592;</button>
        <div className={`carousel-bullet achievements-bullet simple-fade${fade ? ' fade' : ''}`}>{achievements[idx]}</div>
        <button className="carousel-arrow" onClick={goRight} aria-label="Next">&#8594;</button>
      </div>
    </section>
  );
}

function Timeline() {
  const timeline = [
    {
      title: "Events Co-committee Member, Society 4 Data Science (S4DS)",
      date: "Aug 2024 - Mar 2025",
      desc: [
        "Created and assessed two original problem statements for ML hackathons, enhancing problem diversity for 100+ participants.",
        "Spearheaded internship outreach, connecting with 7+ industry professionals, resulting in 3+ internship opportunities."
      ]
    },
    {
      title: "Co-Captain, Data Science Department",
      date: "Jan 2025 - Apr 2025",
      desc: [
        "Led a team of 200+ students to 1st place among 6 departments in the annual interdepartmental championship.",
        "Oversaw logistics and execution, ensuring 100% attendance and on-time performance across all activities."
      ]
    }
  ];
  return (
    <section className="timeline-section">
      <SectionHeader>Positions of Responsibility</SectionHeader>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
        <div style={{ flex: 2 }}>
          <div className="timeline">
            <div className="timeline-line" />
            {timeline.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-date">{item.date}</div>
                  <ul>
                    {item.desc.map((d, j) => <li key={j}>{d}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <img src={posImg} alt="Position of Responsibility IDPT" style={{ width: 350, height: 400, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px #7fbcff33' }} />
        </div>
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
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
        <img src={linkedInPic} alt="LinkedIn Profile" style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #7fbcff', objectFit: 'cover', boxShadow: '0 2px 8px #7fbcff55' }} />
        <div>
          <div className="contact-title">Contact Information</div>
          <div className="contact-desc">Feel free to reach out through any of these channels.</div>
          <div className="contact-list">
            <div className="contact-item"><FaEnvelope className="contact-icon" /> <span><a href="mailto:mathurkabir336@gmail.com">mathurkabir336@gmail.com</a></span></div>
            <div className="contact-item"><FaGithub className="contact-icon" /> <span><a href="https://github.com/kabir-999" target="_blank" rel="noopener noreferrer">github.com/kabir-999</a></span></div>
            <div className="contact-item"><FaLinkedin className="contact-icon" /> <span><a href="https://linkedin.com/in/KabirMathur" target="_blank" rel="noopener noreferrer">linkedin.com/in/KabirMathur</a></span></div>
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

// Simple fallback component to display errors
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
        backgroundColor: '#4e54c8',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px'
      }}
    >
      Refresh Page
    </button>
  </div>
);

function App() {
  return (
    <div className="app gradient-bg">
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <Projects />
      <Skills />
      <Timeline />
      <ProjectWidgets />
      <section className="section contact-row" id="contact">
        <ContactSection />
        <ContactForm />
      </section>
      <Footer />
    </div>
  );
}

export default App;
