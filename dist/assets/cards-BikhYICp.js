import{CSS3DObject as A}from"./CSS3DRenderer-m8hO0bwP.js";import"./three.module-DEr07-xz.js";import"./three.core-q-WGY-P2.js";const I="/assets/WhatsApp%20Image%202025-05-31%20at%201.40.02%20PM-DwPFPBk5.jpeg",L="/assets/WhatsApp%20Image%202025-05-31%20at%201.40.29%20PM-Ko7insI-.jpeg",D="/assets/pos-DuG8qhyZ.jpg",h={projects:[{title:"AI-driven Crop Disease Detection (SIH Project)",link:"https://github.com/Aagnya-Mistry/SIH_Shetkari",desc:["Developed crop disease detection and recommendation models using image classification, environmental data, OpenCV, and WeatherAPI, achieving 94% accuracy.","Integrated the ML pipeline into the “Shetkari” app using Flutter, with real-time API communication and backend services powered by Firebase and Cloudinary.","Stack: OpenCV, Flutter, Firebase, Cloudinary"],img:null},{title:"Artifact Identifier",link:"https://github.com/kabir-999/authenticity-check",desc:["Built an end-to-end AI pipeline to classify historical artifacts, validate authenticity using CNNs, and extract metadata such as era, origin, material, and condition from images.","Developed a damage detection and AR reconstruction system using OpenCV, Blender, and AR.js for crack detection, 3D restoration, and in-browser augmented reality visualization.","Stack: TensorFlow, Numpy, Pandas, Flask, Blender, HTML/CSS"],img:null},{title:"Real Time AQI Analysis",link:"https://github.com/kabir-999/Real-Time-AQI",desc:["Built a real-time AQI monitoring pipeline using Apache Kafka and Apache Spark for multi-source sensor ingestion and regional air quality analysis.","Automated ETL workflows with Apache Airflow, containerised services using Docker, and designed a PostgreSQL warehouse for spatial-temporal analytics, dashboards, and public health alerts.","Stack: Python, Apache Kafka, Spark, PostgreSQL, Docker, Airflow"],img:null},{title:"SafeGuard AI (March 2026)",link:"https://github.com/kabir-999/SafeOps",desc:["Built a real-time PPE compliance platform using YOLOv11 trained on 30,000+ images, achieving 81% precision and 0.724 mAP across industrial CCTV feeds with a privacy-first architecture.","Engineered an emergency alert workflow using n8n, Supabase Realtime, and Flutter, while developing an interactive Three.js factory simulation for zone-wise PPE violation tracking.","Stack: YOLOv11, n8n, Flutter, Supabase, Three.js, Firebase"],img:null},{title:"AI For Analysing Satellite Imagery To Monitor Deforestation",link:"https://github.com/kabir-999/ipd",desc:["Developed an AI-based deforestation monitoring system using satellite imagery to detect forest cover changes.","Implemented NDVI-based analysis and ML models to identify and track deforestation patterns over time.","Stack: Python, Google Earth Engine, TensorFlow/PyTorch, OpenCV, Satellite Data (Sentinel/Landsat)"],img:null},{title:"FocusFlow - AI Productivity & Burnout Management",link:"https://github.com/Aagnya-Mistry/FocusFlow",desc:["Built a full-stack mobile and web app with Groq LLM-powered task structuring using text, voice, and OCR input.","Added burnout risk monitoring by analyzing workload, delays, and sleep patterns.","Stack: Flutter, FastAPI, Firebase, Firestore, Groq LLM, Dart"],img:null}],skills:["C++","DSA in C","Java","Python","Solidity","HTML, CSS, Flask, Django, web3.js","Pandas, Numpy, MatplotLib,Seaborn, Scikit-learn , TensorFlow, PyTorch, Model Development, Computer Vision, NLP, Deep Learning","SQL, Git/GitHub, Firebase, Cloudinary, ThingsBoard, API Integration, Metamask, Ganache","EDA, Data Preprocessing, Render Deployment, BeautifulSoup, Blockchain"]},g=[{src:I,alt:"Kabir portrait"},{src:L,alt:"Kabir at a hackathon"},{src:D,alt:"Kabir with trophies"}];function B(a,S){const p=[];function w(e){const i=e.querySelector(".glass-panel")||e;e.addEventListener("mousemove",s=>{const t=e.getBoundingClientRect(),n=s.clientX-t.left,o=s.clientY-t.top,r=t.width/2,c=t.height/2,u=-(o-c)/c*8,m=(n-r)/r*8;i.style.transform=`perspective(1000px) rotateX(${u}deg) rotateY(${m}deg) scale3d(1.02, 1.02, 1.02)`}),e.addEventListener("mouseleave",()=>{i.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"})}function d(e,i,s){const t=new A(e);return t.position.copy(i),t.rotation.copy(s),t.scale.set(.012,.012,.012),S.add(t),p.push(t),w(e),t}const f=document.getElementById("hero");if(f&&d(f,new a.Vector3(-.5,1.8,.5),new a.Euler(0,Math.PI/24,0)),g&&g.length>0){const e=document.createElement("div");e.className="photo-carousel glass-panel css3d-element",e.innerHTML=g.map((t,n)=>`
      <div class="carousel-slide ${n===0?"active":""}">
        <img src="${t.src}" alt="${t.alt}" />
      </div>
    `).join("");const i=document.getElementById("portfolio-content");i&&i.appendChild(e),d(e,new a.Vector3(4.8,1.8,-.8),new a.Euler(0,-Math.PI/10,0));let s=0;setInterval(()=>{const t=e.querySelectorAll(".carousel-slide");t.length>0&&(t[s].classList.remove("active"),s=(s+1)%t.length,t[s].classList.add("active"))},4e3)}const v=document.querySelector(".project-cards-container");if(v&&h.projects){const e=new a.Vector3(25,-5,-30),i=7.5,s=h.projects.slice(0,6),t=s.length;s.forEach((n,o)=>{const r=document.createElement("div");r.className="project-card glass-panel css3d-element",r.innerHTML=`
        <div class="badge">Project #${o+1}</div>
        <h3>${n.title}</h3>
        <div class="project-desc">
          ${n.desc.map(l=>`<p>${l}</p>`).join("")}
        </div>
        <div class="tech-stack">
          ${n.desc[n.desc.length-1].toLowerCase().includes("stack:")?n.desc[n.desc.length-1].replace(/Stack:\s*/i,"").split(",").map(l=>`<span class="tech-tag">${l.trim()}</span>`).join(""):n.title.includes("Crop")?["OpenCV","Flutter","Firebase"].map(l=>`<span class="tech-tag">${l}</span>`).join(""):["Python","ML","AI"].map(l=>`<span class="tech-tag">${l}</span>`).join("")}
        </div>
        <div class="project-links">
          <a href="${n.link}" target="_blank" rel="noopener noreferrer" class="project-link">
            <span>GitHub Repository</span> →
          </a>
        </div>
      `,v.appendChild(r);const c=-Math.PI/4.5+o/(t-1)*(Math.PI/2.25),u=Math.sin(c)*i,m=Math.cos(c)*i-1,C=1.6+(o%2===0?.8:0),P=new a.Vector3(u,C,m).add(e),M=new a.Euler(0,c-Math.PI/18,0);d(r,P,M)})}const y=document.querySelector(".skills-container");if(y&&h.skills){const e=[{title:"Programming & Languages",items:["C++","DSA in C","Java","Python","Solidity"]},{title:"AI, ML & Deep Learning",items:["TensorFlow","PyTorch","Computer Vision","NLP","Deep Learning","NumPy","Pandas"]},{title:"Web, Databases & DevOps",items:["HTML, CSS","Flask, Django","SQL","Git/GitHub","Firebase","Docker","Airflow","web3.js","Blockchain"]}],i=new a.Vector3(-25,5,-60),s=[{offset:new a.Vector3(-4.5,2.2,1.5),rot:new a.Euler(0,Math.PI/10,0)},{offset:new a.Vector3(0,3.2,-1.5),rot:new a.Euler(0,0,0)},{offset:new a.Vector3(4.5,2.2,1.5),rot:new a.Euler(0,-Math.PI/10,0)}];e.forEach((t,n)=>{const o=document.createElement("div");o.className="skills-card glass-panel css3d-element",o.innerHTML=`
        <h3>${t.title}</h3>
        <div class="skills-list">
          ${t.items.map(c=>`
            <div class="skill-item">
              <div class="skill-info">
                <span>${c}</span>
                <span>${Math.floor(75+Math.random()*20)}%</span>
              </div>
              <div class="skill-bar-container">
                <div class="skill-bar-fill" style="width: ${80+Math.random()*15}%"></div>
              </div>
            </div>
          `).join("")}
        </div>
      `,y.appendChild(o);const r=i.clone().add(s[n].offset);d(o,r,s[n].rot)})}const b=document.querySelector(".experience-container");if(b){const e=new a.Vector3(30,-2,-95);[{title:"AI/ML Intern",sub:"Meera AI Tech (Sep 2025 - Present)",details:["Building smart glasses (YOLO, FaceNet, Qwen-2.5)","Developing agentic AI mobile app builders"],offset:new a.Vector3(-4,2,4)},{title:"B.Tech Student",sub:"DJSCE Mumbai (2023 - 2027)",details:["Computer Science & Data Science Major","Current Cumulative GPA: 8.51/10"],offset:new a.Vector3(-2,2.2,2)},{title:"AWS Academy & Certs",sub:"AWS Machine Learning (Oct 2024)",details:["Mastered ML pipelines, SageMaker, CV & NLP models","AWS Cloud Foundations Certification"],offset:new a.Vector3(-3,2.5,-2)},{title:"SIH Grand Finalist",sub:"Smart India Hackathon (Dec 2024)",details:["National finalist for innovative agriculture solutions","Created disease-detecting 'Shetkari' app"],offset:new a.Vector3(1,2.5,-4)},{title:"Events Co-Committee",sub:"Society 4 Data Science (S4DS)",details:["Created problems for hackathons DataHack 3.0 & Xtract 3.0","Co-Captain leading DS dept to 1st place"],offset:new a.Vector3(4,2.2,-1)}].forEach((s,t)=>{const n=document.createElement("div");n.className="experience-card glass-panel css3d-element",n.innerHTML=`
        <div class="exp-header">
          <div class="exp-role-company">
            <h3>${s.title}</h3>
            <h4>${s.sub}</h4>
          </div>
          <div class="exp-date">Step ${t+1}</div>
        </div>
        <ul class="exp-details">
          ${s.details.map(c=>`<li>${c}</li>`).join("")}
        </ul>
      `,b.appendChild(n);const o=e.clone().add(s.offset),r=new a.Euler(0,-Math.PI/10+t*.05,0);d(n,o,r)})}const k=document.querySelector(".contact-container");if(k){const e=document.createElement("div");e.className="contact-card glass-panel css3d-element",e.innerHTML=`
      <h3>Get in Touch</h3>
      <form class="contact-form" onsubmit="event.preventDefault(); alert('Message sent successfully (Simulation)!');">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" required placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" required placeholder="name@company.com" />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" rows="4" required placeholder="Write your message here..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
      </form>
    `,k.appendChild(e),d(e,new a.Vector3(0,10.5,-128),new a.Euler(0,0,0))}return{cards:p,update:e=>{p.forEach((i,s)=>{i.position.y+=Math.sin(e*.5+s)*.002})}}}export{B as initCards};
