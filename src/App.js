import React, { useState, useEffect, useRef, Component } from "react";
import "./App.css";
import "./styles/dark-theme.css";
import aboutImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.02 PM.jpeg";
import hackathonImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.29 PM.jpeg";
import poseImg from "./assets/pos.jpg";
import { FaCode, FaLaptopCode, FaBrain, FaTools, FaCogs, FaUserFriends, FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { VscHome, VscAccount, VscArchive, VscTools, VscMail, VscFile } from "react-icons/vsc";
import ShinyText from "./components/ShinyText/ShinyText";
import SplashScreen from "./components/SplashScreen";
import Carousel from "./components/Carousel";
import Dock from "./components/Dock";
import Plasma from "./components/Plasma";
import GhostCursor from "./components/GhostCursor";
import ChromaGrid, { ChromaCard } from "./components/ChromaGrid";

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
        <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
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
  internship: {
    company: "Meera AI Tech",
    role: "AI/ML Intern",
    status: "Ongoing",
    projects: [
      {
        title: "Spectrasense",
        points: [
          "Built AI-powered smart glasses using YOLO and Qwen-2.5 for real-time object detection and scene analysis.",
          "Integrated FaceNet and PaddleOCR for face recognition, registration, and text reading, enhancing accessibility for visually impaired users.",
        ],
      },
      {
        title: "NoCode App Developer Engine",
        points: [
          "Built a no-code AI platform for end-to-end mobile app development, enabling users to generate full Android and iOS applications from prompts with an in-browser emulator for real-time preview and testing.",
          "Designed an agentic AI architecture for automated app generation and deployment, producing production-ready APK builds and optionally delivering full source code for advanced users.",
        ],
      },
    ],
  },
  education: [
    {
      institution: "SVKM's Dwarkadas J. Sanghvi College of Engineering (DJSCE), Mumbai",
      period: "2023-2027",
      details: [
        "B.Tech in Computer Science and Engineering (Data Science)",
        "GPA: 8.51/10",
      ],
    },
    {
      institution: "Poddar Brio International, Badlapur",
      period: "2023-2027",
      details: [
        "Class XII Percentage: 76%",
      ],
    },
  ],
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
    {
      title: "Coders Arena 2025 – The Battle of Algorithms",
      date: "1st July, 2025",
      desc: [
        "Cracked 4 out of 5 problems in the final showdown — made it to the ultimate round"
      ],
    },
  ],
  projects: [
    {
      title: "AI-driven Crop Disease Detection (SIH Project)",
      link: "https://github.com/Aagnya-Mistry/SIH_Shetkari",
      desc: [
        "Developed crop disease detection and recommendation models using image classification, environmental data, OpenCV, and WeatherAPI, achieving 94% accuracy.",
        "Integrated the ML pipeline into the “Shetkari” app using Flutter, with real-time API communication and backend services powered by Firebase and Cloudinary.",
        "Stack: OpenCV, Flutter, Firebase, Cloudinary",
      ],
      img: null,
    },
    {
      title: "Artifact Identifier",
      link: "https://github.com/kabir-999/authenticity-check",
      desc: [
        "Built an end-to-end AI pipeline to classify historical artifacts, validate authenticity using CNNs, and extract metadata such as era, origin, material, and condition from images.",
        "Developed a damage detection and AR reconstruction system using OpenCV, Blender, and AR.js for crack detection, 3D restoration, and in-browser augmented reality visualization.",
        "Stack: TensorFlow, Numpy, Pandas, Flask, Blender, HTML/CSS",
      ],
      img: null,
    },
    {
      title: "Real Time AQI Analysis",
      link: "https://github.com/kabir-999/Real-Time-AQI",
      desc: [
        "Built a real-time AQI monitoring pipeline using Apache Kafka and Apache Spark for multi-source sensor ingestion and regional air quality analysis.",
        "Automated ETL workflows with Apache Airflow, containerised services using Docker, and designed a PostgreSQL warehouse for spatial-temporal analytics, dashboards, and public health alerts.",
        "Stack: Python, Apache Kafka, Spark, PostgreSQL, Docker, Airflow",
      ],
      img: null,
    },
    {
      title: "SafeGuard AI (March 2026)",
      link: "https://github.com/kabir-999/SafeOps",
      desc: [
        "Built a real-time PPE compliance platform using YOLOv11 trained on 30,000+ images, achieving 81% precision and 0.724 mAP across industrial CCTV feeds with a privacy-first architecture.",
        "Engineered an emergency alert workflow using n8n, Supabase Realtime, and Flutter, while developing an interactive Three.js factory simulation for zone-wise PPE violation tracking.",
        "Stack: YOLOv11, n8n, Flutter, Supabase, Three.js, Firebase",
      ],
      img: null,
    },
    {
      title: "AI For Analysing Satellite Imagery To Monitor Deforestation",
      link: "https://github.com/kabir-999/ipd",
      desc: [
        "Developed an AI-based deforestation monitoring system using satellite imagery to detect forest cover changes.",
        "Implemented NDVI-based analysis and ML models to identify and track deforestation patterns over time.",
        "Stack: Python, Google Earth Engine, TensorFlow/PyTorch, OpenCV, Satellite Data (Sentinel/Landsat)",
      ],
      img: null,
    },
    {
      title: "FocusFlow - AI Productivity & Burnout Management",
      link: "https://github.com/Aagnya-Mistry/FocusFlow",
      desc: [
        "Built a full-stack mobile and web app with Groq LLM-powered task structuring using text, voice, and OCR input.",
        "Added burnout risk monitoring by analyzing workload, delays, and sleep patterns.",
        "Stack: Flutter, FastAPI, Firebase, Firestore, Groq LLM, Dart",
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
    {
      title: "AI/ML Intern, Meera AI Tech",
      date: "Sep 2025",
      desc: [
        "Worked on high-impact AI domains including Computer Vision and Agentic AI through production-focused internship projects."
      ],
    },
  ],
};

const heroCarouselImages = [
  { src: aboutImg, alt: "Kabir portrait" },
  { src: hackathonImg, alt: "Kabir at a hackathon" },
  { src: poseImg, alt: "Kabir with trophies" },
];

// Helper to parse dates for sorting
const parseDate = (dateString) => {
  const normalized = dateString
    .replace(/(\d+)(st|nd|rd|th)/gi, "$1")
    .replace(/,/g, "")
    .trim();

  const directParse = new Date(normalized);
  if (!Number.isNaN(directParse.getTime())) {
    return directParse;
  }

  const parts = normalized.split(" ");
  if (parts.length === 2) {
    const [monthStr, yearStr] = parts;
    const month = new Date(Date.parse(`${monthStr} 1, 2000`)).getMonth();
    const year = parseInt(yearStr, 10);
    return new Date(year, month);
  }

  if (parts.length === 4 && parts[1] === "-") {
    const [startMonthStr, startYearStr] = [parts[0], parts[2]];
    const startMonth = new Date(Date.parse(`${startMonthStr} 1, 2000`)).getMonth();
    const startYear = parseInt(startYearStr, 10);
    return new Date(startYear, startMonth);
  }

  return new Date(0);
};

const scrollToSection = (target) => {
  if (target === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const section = document.getElementById(target);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

function HomeSection() {
  return (
    <section id="home" className="home-section home-section-dark" style={{
      width: '100%',
      minHeight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      background: 'transparent',
    }}>

      <div className="home-content" style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 'auto',
        background: 'transparent',
        boxShadow: 'none',
      }}>
        <div className="home-copy-column">
          <div className="home-title-wrap" style={{ width: '100%', maxWidth: 1400, marginBottom: 18, background: 'transparent', boxShadow: 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div
              className="home-title"
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 5.2vw, 5.2rem)',
                whiteSpace: 'normal',
                fontWeight: 900,
                margin: 0,
                userSelect: 'none',
                textShadow: '0 10px 40px rgba(60, 110, 113, 0.22)',
              }}
            >
              KABIR MATHUR
            </div>
          </div>
          <div className="home-subtitle" style={{
            fontSize: 'clamp(1rem, 2vw, 1.6rem)',
            fontWeight: 700,
            color: '#d9d9d9',
            letterSpacing: '0.14em',
            margin: '0 0 28px 0',
            textAlign: 'left',
            textTransform: 'uppercase',
            textShadow: '0 2px 16px rgba(0, 0, 0, 0.55), 0 0 12px rgba(60, 110, 113, 0.35)',
            background: 'transparent',
          }}>
            <span className="home-subtitle-group">Data Scientist</span>
            <span className="home-subtitle-divider">&nbsp;|&nbsp;</span>
            <span className="home-subtitle-group">AI/ML Developer</span>
          </div>
          <div className="home-education-info" style={{
            margin: '0 0 32px 0',
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)',
              fontWeight: 600,
              color: '#3c6e71',
              letterSpacing: '0.08em',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              Education
            </div>
            <div className="home-education-inst" style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: '1.4',
              marginBottom: '4px'
            }}>
              SVKM's Dwarkadas J. Sanghvi College of Engineering (DJSCE), Mumbai
            </div>
            <div className="home-education-details" style={{
              fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
              color: '#d9d9d9',
              lineHeight: '1.5'
            }}>
              B.Tech in Computer Science and Engineering (Data Science) &bull; 2023-2027
            </div>
            <div className="home-education-gpa" style={{
              fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
              color: '#3c6e71',
              fontWeight: 600,
              marginTop: '2px'
            }}>
              GPA: 8.51/10
            </div>
          </div>
          <a href="#contact" className="get-in-touch-btn dark">
            Get in Touch
          </a>
        </div>
        <div className="home-carousel-column">
          <div className="home-carousel-shell">
            <Carousel
              images={heroCarouselImages}
              baseWidth={220}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InternshipSection() {
  const cards = [
    {
      gradient: "#2e2e2e",
      hoverGradient: "#284b63",
      border: "#284b63",
      titleColor: "#d9d9d9"
    },
    {
      gradient: "#2e2e2e",
      hoverGradient: "#284b63",
      border: "#284b63",
      titleColor: "#d9d9d9"
    }
  ];

  return (
    <section id="internship" className="content-section internship-section">
      <SectionHeader>Internship</SectionHeader>
      <ChromaGrid columns={2} radius={350} style={{ '--grid-max-width': '1140px' }}>
        {profile.internship.projects.map((project, index) => (
          <ChromaCard
            className="flashcard internship-project-card"
            key={project.title}
            borderColor={cards[index % cards.length].border}
            gradient={cards[index % cards.length].gradient}
            gradientHover={cards[index % cards.length].hoverGradient}
          >
            <div className="flashcard-content internship-project-content">
              <div className="internship-meta">
                {profile.internship.company} | {profile.internship.role} - {profile.internship.status}
              </div>
              <h3>{project.title}</h3>
              <ul>
                {project.points.map((point, idx) => (
                  <li key={`${project.title}-${idx}`}>{point}</li>
                ))}
              </ul>
            </div>
          </ChromaCard>
        ))}
      </ChromaGrid>
    </section>
  );
}


function Flashcard({ project, gradient, gradientHover, borderColor, titleColor }) {
  // Details: all but last desc, Stack: last desc
  const details = project.desc.slice(0, -1);
  let tech = project.desc[project.desc.length - 1];
  let techLine = tech.startsWith('Stack:') ? tech.replace('Stack:', '').trim() : tech;
  return (
    <ChromaCard
      className="flashcard"
      gradient={gradient}
      gradientHover={gradientHover}
      borderColor={borderColor}
      style={{}}
    >
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
    </ChromaCard>
  );
}

function SectionHeader({ children }) {
  return <h2 className="section-header">{children}</h2>;
}

function GlowingDivider() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
      <div className="glowing-divider" />
    </div>
  );
}

function Projects() {
  const projectCards = [
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" }
  ];

  return (
    <section id="projects" className="content-section projects-section">
      <SectionHeader>Projects</SectionHeader>
      <ChromaGrid columns={2} radius={350} style={{ '--grid-max-width': '1140px' }}>
        {profile.projects.map((p, i) => (
          <Flashcard
            project={p}
            key={i}
            gradient={projectCards[i % projectCards.length].gradient}
            gradientHover={projectCards[i % projectCards.length].hoverGradient}
            borderColor={projectCards[i % projectCards.length].border}
            titleColor={projectCards[i % projectCards.length].titleColor}
          />
        ))}
      </ChromaGrid>
    </section>
  );
}

function Skills() {
  const skillCards = [
    {
      icon: <FaCode size={32} color="#3c6e71" />, title: "Languages", items: [
        "C++", "DSA in C", "Java", "Python", "Solidity"
      ]
    },
    {
      icon: <FaLaptopCode size={32} color="#3c6e71" />, title: "Web Development", items: [
        "HTML", "CSS", "React", "Node.js", "JavaScript", "Flask", "Django", "web3.js"
      ]
    },
    {
      icon: <FaBrain size={32} color="#3c6e71" />, title: "Machine Learning & AI", items: [
        "Pandas", "Numpy", "MatplotLib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "Model Development", "Computer Vision", "NLP", "Deep Learning"
      ]
    },
    {
      icon: <FaTools size={32} color="#3c6e71" />, title: "Tools & Platforms", items: [
        "SQL", "Git/GitHub", "Firebase", "Cloudinary", "ThingsBoard", "API Integration", "MONGODB", "Metamask", "Ganache", "Vercel"
      ]
    },
    {
      icon: <FaCogs size={32} color="#3c6e71" />, title: "Other Skills", items: [
        "EDA", "Data Preprocessing", "Render Deployment", "BeautifulSoup", "Selenium", "Blockchain"
      ]
    },
    {
      icon: <FaUserFriends size={32} color="#3c6e71" />, title: "Soft Skills", items: [
        "Logical Thinking", "Teamwork", "Communication", "Leadership", "Time Management"
      ]
    },
  ];

  const cards = [
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" },
    { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63", titleColor: "#d9d9d9" }
  ];

  return (
    <section id="skills" className="content-section skills-section">
      <SectionHeader>Skills</SectionHeader>
      <ChromaGrid columns={3} radius={260} style={{ '--grid-max-width': '1140px' }}>
        {skillCards.map((card, i) => (
          <ChromaCard
            className="skill-card"
            key={i}
            gradient={cards[i % cards.length].gradient}
            gradientHover={cards[i % cards.length].hoverGradient}
            borderColor={cards[i % cards.length].border}
            style={{}}
          >
            <div className="skill-icon">
              {card.icon}
            </div>
            <div className="skill-title">{card.title}</div>
            <ul>
              {card.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </ChromaCard>
        ))}
      </ChromaGrid>
    </section>
  );
}

function MyJourney() {
  const combinedJourney = [
    ...profile.achievements.map(item => ({ ...item, type: 'achievement' })),
    ...profile.positions.map(item => ({ ...item, type: 'position' })),
  ].sort((a, b) => parseDate(a.date) - parseDate(b.date));

  const cards = [
    {
      gradient: "#2e2e2e",
      hoverGradient: "#284b63",
      border: "#284b63",
      titleColor: "#d9d9d9"
    },
    {
      gradient: "#2e2e2e",
      hoverGradient: "#284b63",
      border: "#284b63",
      titleColor: "#d9d9d9"
    }
  ];

  const timelineRef = useRef(null);

  useEffect(() => {
    const timelineLine = document.querySelector('.timeline-line');
    const timelineSection = document.getElementById('journey');
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineLine || !timelineSection || !timelineItems.length) return;

    const totalHeight = timelineSection.offsetHeight;
    const everFullyRevealedRef = { current: false };

    const updateTimelineLine = () => {
      const rect = timelineSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // If the section is not visible at all, don't draw the line and reset the flag
      if (sectionBottom <= 0 || sectionTop >= windowHeight) {
        timelineLine.style.height = '0px';
        everFullyRevealedRef.current = false;
        return;
      }

      // If the timeline was ever fully revealed, keep it at full height and do nothing else
      if (everFullyRevealedRef.current) {
        timelineLine.style.height = `${totalHeight}px`;
        // All timeline items should be active
        timelineItems.forEach((item) => {
          if (!item) return;
          try {
            item.classList.add('active');
            const circle = item.querySelector('.timeline-circle');
            if (circle) circle.classList.add('active');
          } catch (err) {
            console.error('Error updating timeline item:', err);
          }
        });
        return;
      }

      // Calculate the scroll progress through the section
      const scrollProgress = Math.min(1, Math.max(0, (windowHeight - sectionTop) / (windowHeight + totalHeight)));
      const lineHeight = scrollProgress * totalHeight;

      // If fully scrolled, set the flag and freeze the timeline
      if (scrollProgress >= 1) {
        timelineLine.style.height = `${totalHeight}px`;
        everFullyRevealedRef.current = true;
        // All timeline items should be active
        timelineItems.forEach((item) => {
          if (!item) return;
          try {
            item.classList.add('active');
            const circle = item.querySelector('.timeline-circle');
            if (circle) circle.classList.add('active');
          } catch (err) {
            console.error('Error updating timeline item:', err);
          }
        });
        return;
      }

      // Normal animation before fully revealed
      timelineLine.style.height = `${lineHeight}px`;
      timelineItems.forEach((item, index) => {
        if (!item) return;
        try {
          const itemTop = item.getBoundingClientRect().top - rect.top;
          const circle = item.querySelector('.timeline-circle');
          if (itemTop <= parseFloat(timelineLine.style.height) + 100) {
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

    const safeUpdateTimeline = (...args) => {
      try {
        updateTimelineLine(...args);
      } catch (err) {
        console.error('Error in timeline update:', err);
      }
    };

    window.addEventListener('scroll', safeUpdateTimeline);
    try {
      updateTimelineLine();
    } catch (err) {
      console.error('Error in initial timeline update:', err);
    }
    return () => {
      try {
        window.removeEventListener('scroll', safeUpdateTimeline);
      } catch (err) {
        console.error('Error removing event listener:', err);
      }
    };
  }, []);

  return (
    <section id="journey" className="content-section journey-section" ref={timelineRef}>
      <SectionHeader>My Journey</SectionHeader>
      <ChromaGrid columns={1} className="timeline-container" style={{ display: 'block' }}>
        <div className="timeline-line" />
        {combinedJourney.map((item, i) => (
          <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={i}>
            <ChromaCard
              className="timeline-content"
              borderColor={cards[i % cards.length].border}
              gradient={cards[i % cards.length].gradient}
              gradientHover={cards[i % cards.length].hoverGradient}
              style={{ cursor: 'default' }}
            >
              <div className="timeline-title">{item.title}</div>
              {item.desc && item.desc.length > 0 && (
                <div className="timeline-desc">
                  {item.desc.map((point, idx) => (
                    <div key={idx} className="timeline-desc-item">{point}</div>
                  ))}
                </div>
              )}
            </ChromaCard>
            <div className="timeline-circle">
              <div className="timeline-dot" />
            </div>
            <div className="timeline-date">{item.date}</div>
          </div>
        ))}
      </ChromaGrid>
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
      const isLocalhost = window.location.hostname === 'localhost';
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || (isLocalhost ? 'http://localhost:5001' : '');
      const endpoint = `${apiBaseUrl}/api/contact`;
      console.log('Submitting to:', endpoint);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus(data.warning || 'Message sent successfully!');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus(`Failed to send message: ${data.error || data.details || 'Please try again.'}`);
      }
    } catch (err) {
      setStatus('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <SectionHeader>Send a Message</SectionHeader>
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

function ContactSection({ gradient, gradientHover, borderColor }) {
  return (
    <ChromaCard
      className="contact-section"
      borderColor={borderColor}
      gradient={gradient}
      gradientHover={gradientHover}
      style={{ cursor: 'default' }}
    >
      <div id="contact" style={{ width: '100%' }}>
        <h2>Get In Touch</h2>
        <div className="contact-box" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src="/assets/linkedIIN_pic.jpeg" alt="LinkedIn Profile" className="contact-avatar" style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #3c6e71', objectFit: 'cover', boxShadow: '0 2px 8px rgba(60,110,113,0.3)' }} />
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
      </div>
    </ChromaCard>
  );
}

function Footer() {
  return (
    <footer className="footer site-footer">
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
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }, []);

  const [imageModalSrc, setImageModalSrc] = useState(null);
  const [imageModalAlt, setImageModalAlt] = useState("");
  const dockItems = [
    { icon: <VscHome size={22} />, label: "Home", onClick: () => scrollToSection("home") },
    { icon: <VscAccount size={22} />, label: "Internship", onClick: () => scrollToSection("internship") },
    { icon: <VscArchive size={22} />, label: "Projects", onClick: () => scrollToSection("projects") },
    { icon: <VscTools size={22} />, label: "Skills", onClick: () => scrollToSection("skills") },
    { icon: <VscMail size={22} />, label: "Contact", onClick: () => scrollToSection("contact") },
    {
      icon: <VscFile size={22} />,
      label: "Resume",
      onClick: () =>
        window.open(
          "https://drive.google.com/drive/folders/14cEDirSzuccBb3aqeREsi755o3f9GY3H",
          "_blank",
          "noopener,noreferrer"
        ),
    },
  ];

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

  const handleSplashFinish = () => setShowSplash(false);

  return (
    <ErrorBoundary>
      <div className="app portfolio-app">
        {/* Site-wide fixed background */}
        <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <Plasma 
            color="#3c6e71"
            speed={1}
            direction="forward"
            scale={1}
            opacity={1}
            mouseInteractive={false}
          />
        </div>
        {/* Site-wide ghost cursor overlay */}
        <GhostCursor
          color="#3c6e71"
          brightness={0.5}
          edgeIntensity={0}
          trailLength={24}
          inertia={0.6}
          grainIntensity={0.02}
          bloomStrength={0.05}
          bloomRadius={0.5}
          bloomThreshold={0.4}
          fadeDelayMs={1200}
          fadeDurationMs={2000}
          radius={0.5}
        />
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
        {!showSplash && (
          <>
            <HomeSection />
            <GlowingDivider />
            <InternshipSection />
            {/* Add space before Projects section */}
            <div style={{ height: 48 }} />
            <GlowingDivider />
            <Projects />
            <GlowingDivider />
            <Skills />
            <GlowingDivider />
            <MyJourney />
            <GlowingDivider />
            <ChromaGrid columns={2} radius={350} style={{ '--grid-max-width': '1140px' }} className="contact-row">
              <ContactSection
                borderColor="#284b63"
                gradient="#2e2e2e"
                gradientHover="#284b63"
              />
              <ChromaCard
                className="contact-form-section"
                borderColor="#284b63"
                gradient="#2e2e2e"
                gradientHover="#284b63"
                style={{ cursor: 'default' }}
              >
                <ContactForm />
              </ChromaCard>
            </ChromaGrid>
            <Footer />
            <Dock
              items={dockItems}
              panelHeight={76}
              baseItemSize={56}
              magnification={72}
            />
            <ImageModal src={imageModalSrc} alt={imageModalAlt} onClose={closeImageModal} />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;
