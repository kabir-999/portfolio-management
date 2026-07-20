import React, { useState, useEffect, useRef, Component } from "react";
import "./App.css";
import "./styles/dark-theme.css";
import "./styles/cosmic-theme.css";
import aboutImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.02 PM.jpeg";
import hackathonImg from "./assets/WhatsApp Image 2025-05-31 at 1.40.29 PM.jpeg";
import poseImg from "./assets/pos.jpg";
import { FaLaptopCode, FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import ShinyText from "./components/ShinyText/ShinyText";
import SplashScreen from "./components/SplashScreen";
import Carousel from "./components/Carousel";
import Tilt from "react-parallax-tilt";
import SolarSystem from "./components/three/SolarSystem";
import SpaceBackdrop from "./components/SpaceBackdrop";
import ChromaGrid, { ChromaCard } from "./components/ChromaGrid";

function TiltCard({ children }) {
  return (
    <Tilt
      className="tilt-wrap"
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      scale={1.02}
      transitionSpeed={1400}
      perspective={1100}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor="#7ce7ff"
      glarePosition="all"
      glareBorderRadius="20px"
      tiltEnable={typeof window === "undefined" || window.innerWidth > 900}
    >
      {children}
    </Tilt>
  );
}

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
  about:
    "I'm Kabir — a data scientist and AI/ML developer from Mumbai who loves turning ambitious ideas into working products. From smart glasses that help the visually impaired see the world, to no-code engines that generate entire mobile apps, I build AI systems that ship. When I'm not training models, you'll find me at hackathons, leading my department's tech teams, or exploring the newest corners of agentic AI.",
  highlights: [
    "SIH Grand Finalist",
    "2x AI/ML Intern",
  ],
  contact: {
    phone: "+91 992026289",
    location: "Mumbai, India",
    email: "mathurkabir336@gmail.com",
    linkedin: "https://www.linkedin.com/in/kabir-mathur-655429292/",
    github: "https://github.com/kabir-999",
  },
  internships: [
    {
      company: "Meera AI Tech",
      role: "AI/ML Intern",
      period: "Sept 2025 – March 2026",
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
    {
      company: "K2S2 Digistrat Solutions",
      role: "AI/ML Intern",
      period: "Jun 2025 – Sep 2025",
      projects: [
        {
          title: "Face Recognition & Anti-Spoofing",
          points: [
            "Trained a Vision Transformer on 60,000+ images to classify genuine faces and spoofing attacks, achieving 88% detection accuracy.",
            "Developed a real-time camera-based face recognition and anti-spoofing application for live authentication.",
          ],
        },
      ],
    },
  ],
  education: [
    {
      institution: "SVKM's Dwarkadas J. Sanghvi College of Engineering (DJSCE), Mumbai",
      period: "2023-2027",
      details: [
        "B.Tech in Computer Science and Engineering (Data Science)",
        "GPA: 8.648/10",
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
    {
      title: "Amazon ML Summer School",
      date: "July 2026",
      desc: [
        "Selected for Amazon's ML Summer School program, an intensive curriculum on applied machine learning taught by Amazon scientists"
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
    "Python, Java, SQL",
    "Machine Learning, Deep Learning (TensorFlow, PyTorch), NLP (spaCy, Hugging Face Transformers), Computer Vision, Explainable AI (SHAP, Fairlearn), Generative AI: LangChain, Google AI SDK, RAG, Agentic AI Systems",
    "HTML, CSS, JavaScript, Node.js, Spring Boot, Flask, FastAPI, REST API Development, MongoDB",
    "Kafka, Airflow, Docker, Spark, Postgres",
    "Git/GitHub, Firebase, Cloudinary, Metamask, Ganache, Vercel, Pinecone",
    "Django, BeautifulSoup, Blockchain",
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
      title: "AI/ML Intern, K2S2 Digistrat Solutions",
      date: "Jun 2025",
      desc: [
        "Trained a Vision Transformer on 60,000+ images for face anti-spoofing with 88% detection accuracy, and built a real-time camera-based face recognition app for live authentication."
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

function HomeSection({ onNavigate }) {
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
                textShadow: '0 10px 40px rgba(79, 209, 255, 0.22)',
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
          <p className="home-intro">{profile.about}</p>
          <div className="home-highlights">
            {profile.highlights.map((item) => (
              <span className="home-highlight-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="home-education-info" style={{
            margin: '0 0 32px 0',
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)',
              fontWeight: 600,
              color: '#7ce7ff',
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
              color: '#7ce7ff',
              fontWeight: 600,
              marginTop: '2px'
            }}>
              GPA: 8.648/10
            </div>
          </div>
          <div className="home-cta-row">
            <button
              type="button"
              className="get-in-touch-btn dark"
              onClick={() => onNavigate && onNavigate("contact")}
            >
              Get in Touch
            </button>
            <a
              className="home-resume-btn"
              href="https://drive.google.com/drive/folders/14cEDirSzuccBb3aqeREsi755o3f9GY3H"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume ↗
            </a>
          </div>
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
  const card = { gradient: "#2e2e2e", hoverGradient: "#284b63", border: "#284b63" };
  const entries = profile.internships.flatMap((intern) =>
    intern.projects.map((project) => ({
      ...project,
      company: intern.company,
      role: intern.role,
      period: intern.period,
    }))
  );

  return (
    <section id="internship" className="content-section internship-section">
      <SectionHeader>Internship</SectionHeader>
      <ChromaGrid columns={2} radius={350} style={{ '--grid-max-width': '1140px' }}>
        {entries.map((project) => (
          <TiltCard key={project.title}>
            <ChromaCard
              className="flashcard internship-project-card"
              borderColor={card.border}
              gradient={card.gradient}
              gradientHover={card.hoverGradient}
            >
              <div className="flashcard-content internship-project-content">
                <div className="internship-meta">
                  {project.company} | {project.role} - {project.period}
                </div>
                <h3>{project.title}</h3>
                <ul>
                  {project.points.map((point, idx) => (
                    <li key={`${project.title}-${idx}`}>{point}</li>
                  ))}
                </ul>
              </div>
            </ChromaCard>
          </TiltCard>
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
    <TiltCard>
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
    </TiltCard>
  );
}

function SectionHeader({ children }) {
  return <h2 className="section-header">{children}</h2>;
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
      <ChromaGrid columns={3} radius={350} style={{ '--grid-max-width': '1140px' }}>
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
      title: "Languages", items: [
        "Python", "Java", "SQL"
      ]
    },
    {
      title: "AI&ML", items: [
        "Machine Learning (Supervised ML, Model Evaluation)",
        "Deep Learning (TensorFlow, PyTorch)",
        "Natural Language Processing (spaCy, Hugging Face Transformers)",
        "Computer Vision (Image Classification)",
        "Explainable AI (SHAP, Fairlearn)",
        "Generative AI: LangChain, Google AI SDK, RAG, Agentic AI Systems",
      ]
    },
    {
      title: "Web & Backend Engineering", items: [
        "HTML, CSS, JavaScript",
        "Node.js, Spring Boot",
        "Flask, FastAPI",
        "REST API Development",
        "MongoDB",
      ]
    },
    {
      title: "Data Engineering", items: [
        "Kafka", "Airflow", "Docker", "Spark", "Postgres"
      ]
    },
    {
      title: "Other Skills", items: [
        "Django", "BeautifulSoup", "Blockchain"
      ]
    },
    {
      title: "Tools & Platforms", items: [
        "Git/GitHub", "Firebase", "Cloudinary", "Metamask", "Ganache", "Vercel", "Pinecone"
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
      <ChromaGrid columns={3} radius={280} style={{ '--grid-max-width': '1140px' }}>
        {skillCards.map((card, i) => (
          <TiltCard key={i}>
            <ChromaCard
              className="skill-card"
              gradient={cards[i % cards.length].gradient}
              gradientHover={cards[i % cards.length].hoverGradient}
              borderColor={cards[i % cards.length].border}
              style={{}}
            >
              <div className="skill-title">{card.title}</div>
              <ul>
                {card.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </ChromaCard>
          </TiltCard>
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

    // Reveal each item once it enters the viewport (works for both
    // window scrolling and the planet-page panel scroller), and grow
    // the line down to the last revealed item. Items stay revealed.
    const updateTimelineLine = () => {
      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let lineHeight = 0;

      timelineItems.forEach((item) => {
        if (!item) return;
        try {
          const itemRect = item.getBoundingClientRect();
          const revealed =
            item.classList.contains('active') || itemRect.top < windowHeight * 0.88;
          if (revealed) {
            item.classList.add('active');
            const circle = item.querySelector('.timeline-circle');
            if (circle) circle.classList.add('active');
            lineHeight = Math.max(lineHeight, itemRect.top - rect.top + 60);
          }
        } catch (err) {
          console.error('Error updating timeline item:', err);
        }
      });

      timelineLine.style.height = `${Math.min(lineHeight, totalHeight)}px`;
    };

    const safeUpdateTimeline = (...args) => {
      try {
        updateTimelineLine(...args);
      } catch (err) {
        console.error('Error in timeline update:', err);
      }
    };

    // rAF-throttle so the line's growth reads as one continuous glide
    // instead of stepping in sync with every raw scroll event
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        safeUpdateTimeline();
        ticking = false;
      });
    };

    const panelBody = document.querySelector('.overlay-panel-body');
    window.addEventListener('scroll', onScroll, { passive: true });
    if (panelBody) panelBody.addEventListener('scroll', onScroll, { passive: true });
    try {
      updateTimelineLine();
    } catch (err) {
      console.error('Error in initial timeline update:', err);
    }
    return () => {
      try {
        window.removeEventListener('scroll', onScroll);
        if (panelBody) panelBody.removeEventListener('scroll', onScroll);
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
          <img src="/assets/linkedIIN_pic.jpeg" alt="LinkedIn Profile" className="contact-avatar" style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #4fd1ff', objectFit: 'cover', boxShadow: '0 2px 12px rgba(79,209,255,0.35)' }} />
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

function ContactPanel() {
  return (
    <ChromaGrid columns={2} radius={350} className="contact-row">
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
  );
}

const SECTION_ACCENTS = {
  home: '#ffc98a',
  internship: '#38bdf8',
  projects: '#8b7bff',
  skills: '#2dd4bf',
  journey: '#7aa2ff',
  contact: '#d78bfa',
};

/* fake mission telemetry shown at the top of each planet page */
const PLANET_META = {
  home: { code: 'SOL-00 · HOME STAR', orbit: 'SYSTEM CORE' },
  internship: { code: 'PLNT-01 · INTERNSHIP', orbit: 'ORBIT 8.2 AU' },
  projects: { code: 'PLNT-02 · PROJECTS', orbit: 'ORBIT 12.6 AU' },
  skills: { code: 'PLNT-03 · SKILLS', orbit: 'ORBIT 16.8 AU' },
  journey: { code: 'PLNT-04 · JOURNEY', orbit: 'ORBIT 20.6 AU' },
  contact: { code: 'PLNT-05 · CONTACT', orbit: 'ORBIT 24.2 AU' },
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSplashFinish = () => setShowSplash(false);

  return (
    <ErrorBoundary>
      <div className="app portfolio-app solar-app">
        <SolarSystem active={showSplash ? null : active} onSelect={setActive} />
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
        {!showSplash && (
          <div className="solar-ui-enter">
            <div className={`solar-hud ${active ? 'solar-hud-dim' : ''}`}>
              <div className="solar-hud-name">KABIR MATHUR</div>
              <div className="solar-hud-tag">Data Scientist · AI/ML Developer</div>
              <a
                className="solar-hud-resume"
                href="https://drive.google.com/drive/folders/14cEDirSzuccBb3aqeREsi755o3f9GY3H"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume ↗
              </a>
            </div>
            {!active && (
              <div className="solar-hint">Drag to orbit · Click a planet to explore</div>
            )}
            <div className="solar-copyright">© 2025 Kabir Mathur</div>
            {active && (
              <>
                <div
                  className={`overlay-panel overlay-panel-${active}`}
                  role="dialog"
                  aria-modal="true"
                  style={{ '--accent': SECTION_ACCENTS[active] || '#4fd1ff' }}
                >
                  <SpaceBackdrop accent={SECTION_ACCENTS[active] || '#4fd1ff'} />
                  <div className="overlay-page-arc" />
                  <div className="overlay-telemetry">
                    <span className="overlay-telemetry-code">{(PLANET_META[active] || {}).code}</span>
                    <span className="overlay-telemetry-dot" />
                    <span className="overlay-telemetry-orbit">{(PLANET_META[active] || {}).orbit}</span>
                  </div>
                  <button
                    className="overlay-back"
                    onClick={() => setActive(null)}
                  >
                    ← Back to orbit
                  </button>
                  <button
                    className="overlay-close"
                    onClick={() => setActive(null)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <div className="overlay-panel-body">
                    {active === 'home' && <HomeSection onNavigate={setActive} />}
                    {active === 'internship' && <InternshipSection />}
                    {active === 'projects' && <Projects />}
                    {active === 'skills' && <Skills />}
                    {active === 'journey' && <MyJourney />}
                    {active === 'contact' && <ContactPanel />}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
