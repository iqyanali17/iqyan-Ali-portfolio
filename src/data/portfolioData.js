// src/data/portfolioData.js

export const personalInfo = {
  name: "KHWAJA IQYAN ALI",
  shortName: "Iqyan Ali",
  title: "Full-Stack Web Developer & Software Engineer",
  heroGreeting: "Hi, I'm Khwaja Iqyan Ali",
  heroSubtitle: "Full-Stack Developer",
  heroSubtitleSuffix: "& Software Engineer",
  heroDescription: "Crafting futuristic digital experiences, high-performance web applications & AI systems.",
  aboutIntro: "A Full-Stack Developer crafting futuristic digital experiences with the MERN stack, Python, scalable REST APIs, and intelligent AI platforms.",
  aboutBio: [
    "Hi, I'm <strong>Khwaja <span class=\"text-main-two-600\">I</span>qyan <span class=\"text-main-two-600\">A</span>li</strong>, a Full-Stack Developer and Software Engineer pursuing B.Tech in Computer Science at GH Raisoni University.",
    "My engineering approach combines clean design, scalable architecture, and high performance to build robust products with React, Next.js, Node.js, Express, and Python (Flask).",
    "I have completed software developer internships at iLoma technology and The Developers Arena, architecting production-grade Visitor Management Systems, AI platforms, and secure RESTful APIs."
  ],
  stats: [
    { value: 10, suffix: "+", label: "Completed Projects", dark: false },
    { value: 2, suffix: "+", label: "Software Internships", dark: true },
    { value: "Top 3%", suffix: "", label: "Academic Honors (B.Tech CSE)", dark: false }
  ],
  heroFocusList: [
    "React 19, Next.js & TypeScript",
    "Node.js, Express & Python Flask",
    "AI Systems & Google Gemini APIs",
    "MongoDB, PostgreSQL & Supabase",
    "Scalable REST APIs, Redis & BullMQ"
  ],
  aboutCards: [
    {
      title: "MERN & Full-Stack",
      description: "React, Next.js, Node.js, Express, TypeScript, Tailwind CSS",
      delay: "200"
    },
    {
      title: "Python & AI Systems",
      description: "Flask, Gemini API, Whisper, Supabase, MongoDB, PostgreSQL",
      delay: "300"
    }
  ],
  contact: {
    email: "khwajaiqyanali@gmail.com",
    phone: "+91 93594 96162",
    locations: ["Nagpur", "Pune", "Hyderabad"],
    resumeUrl: "/Khwaja_Iqyan_Ali_Resume.pdf"
  }
};

export const marqueeItems = [
  { text: "FULL-STACK DEVELOPER", stroke: false },
  { text: "MERN STACK & NEXT.JS", stroke: true },
  { text: "PYTHON & FLASK", stroke: false },
  { text: "AI HEALTHCARE & APPS", stroke: true },
  { text: "SCALABLE REST APIS", stroke: false },
  { text: "TYPESCRIPT & POSTGRESQL", stroke: true }
];

export const coreExpertise = [
  {
    number: "01",
    title: "Frontend Engineering",
    image: "/assets/images/thumbs/service-three-thumb1.webp",
    alt: "Frontend Engineering",
    tags: [
      "React 19",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Material UI"
    ],
    delay: "200",
    direction: "fade-right",
    isRightAligned: false
  },
  {
    number: "02",
    title: "Backend & System APIs",
    image: "/assets/images/thumbs/service-three-thumb2.webp",
    alt: "Backend & System APIs",
    tags: [
      "Node.js",
      "Express.js",
      "Python",
      "Flask",
      "RESTful APIs",
      "JWT Auth & RBAC"
    ],
    delay: "300",
    direction: "fade-left",
    isRightAligned: true
  },
  {
    number: "03",
    title: "Databases & Cloud Architecture",
    image: "/assets/images/thumbs/service-three-thumb3.webp",
    alt: "Databases & Cloud Architecture",
    tags: [
      "MongoDB",
      "PostgreSQL",
      "Supabase",
      "MySQL",
      "Redis & BullMQ"
    ],
    delay: "400",
    direction: "fade-right",
    isRightAligned: false
  },
  {
    number: "04",
    title: "AI Integrations & Developer Tools",
    image: "/assets/images/thumbs/service-three-thumb4.webp",
    alt: "AI Integrations & Developer Tools",
    tags: [
      "Google Gemini API",
      "OpenAI Whisper",
      "Git & GitHub",
      "Postman",
      "Swagger API",
      "Inngest Queues"
    ],
    delay: "500",
    direction: "fade-left",
    isRightAligned: true
  }
];

export const projects = [
  {
    id: 1,
    title: "1. Movie Ticket Booking Platform",
    description: "Full-stack movie ticket booking & theater management platform featuring interactive seat selection, real-time sync, Razorpay checkout, Clerk auth, and automated background handlers via Inngest queues.",
    tags: ["React 19", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Razorpay", "Inngest", "Clerk"],
    liveUrl: "https://one-show.vercel.app/",
    githubUrl: "https://github.com/iqyanali17",
    image: "/images/OneSow-UI.webp"
  },
  {
    id: 2,
    title: "2. MediTalk — AI Healthcare Platform",
    description: "Full-stack AI-powered medical assistant and healthcare platform featuring context-aware conversational AI with sentiment analysis, medication tracking schedules, and Supabase PostgreSQL with RLS.",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Google Gemini API", "Whisper API"],
    liveUrl: "https://meditalk-healthcare-assistant.netlify.app/",
    githubUrl: "https://github.com/iqyanali17",
    image: "/images/Meditalk-UI.webp"
  },
  {
    id: 3,
    title: "3. AI Assessment Creator",
    description: "Full-stack AI assessment generation platform enabling educators to dynamically generate structured exams with BullMQ & Redis queues, Socket.IO sync, and headless Puppeteer PDF compilation.",
    tags: ["Next.js 16", "React 19", "TypeScript", "BullMQ", "Redis", "Google Gemini API", "Puppeteer PDF"],
    liveUrl: "https://ai-assessment-creator-q64s.vercel.app/",
    githubUrl: "https://github.com/iqyanali17/AI_assessment_creator",
    image: "/images/ai-assessment-creator.webp"
  },
  {
    id: 4,
    title: "4. AI Image Compressor",
    description: "Full-stack image optimization platform with AI content classification using Hugging Face models, smart compression recommendations, interactive comparison slider, and format conversion.",
    tags: ["React 19", "TypeScript", "Tailwind CSS", "Flask", "Python", "Hugging Face API", "Pillow"],
    liveUrl: "https://image-compressor-rho-three.vercel.app/",
    githubUrl: "https://github.com/iqyanali17/image-compressor.git",
    image: "/images/image-compressor-ui.webp"
  }
];

export const whatIBuild = [
  {
    id: "01",
    category: "Full-Stack Web",
    title: "Enterprise Web Applications & Systems",
    tag: "High Impact",
    bgImage: "/images/OneSow-UI.webp"
  },
  {
    id: "02",
    category: "AI Solutions",
    title: "AI-Powered Medical & Diagnostic Assistants",
    tag: "Intelligent",
    bgImage: "/images/Meditalk-UI.webp"
  },
  {
    id: "03",
    category: "EdTech & Exam",
    title: "Automated Assessment & Paper Creators",
    tag: "Automated",
    bgImage: "/images/ai-assessment-creator.webp"
  },
  {
    id: "04",
    category: "Media & Cloud",
    title: "Smart Media Processing & Image Optimization",
    tag: "Fast & Optimized",
    bgImage: "/images/image-compressor-ui.webp"
  },
  {
    id: "05",
    category: "Backend APIs",
    title: "Scalable REST APIs & Asynchronous Queues",
    tag: "Enterprise Grade",
    bgImage: "/images/image.webp"
  }
];

export const experienceData = [
  {
    id: 1,
    type: "work",
    badge: "Current Internship",
    role: "Full Stack Developer Intern",
    company: "VdoOps Technologies Pvt. Ltd.",
    duration: "Aug 9, 2026 - Present (3 Months)",
    location: "Delhi, India (Remote)",
    description: "Currently working as a Full Stack Developer Intern on modern web platforms. Engineering responsive user interfaces, full-stack workflows, and scalable backend services using MERN Stack, Next.js, and Python (Flask) with RESTful API integrations.",
    skills: ["MERN Stack", "Next.js", "React.js", "Python (Flask)", "Node.js", "REST APIs"],
    website: null,
    certificate: null
  },
  {
    id: 2,
    type: "work",
    badge: "Internship",
    role: "Software Developer Intern",
    company: "iLoma technology Pvt. Ltd.",
    duration: "Jan 2026 - Jun 2026",
    location: "Pune, India (Hybrid)",
    description: "Developed high-performance production-grade web applications using the MERN stack and Python (Flask). Architected and deployed a secure, full-scale Visitor Management System with JWT authentication, Role-Based Access Control (RBAC), and optimized queries.",
    skills: ["React.js", "Node.js", "Express.js", "Python (Flask)", "JWT Auth", "REST APIs", "PostgreSQL"],
    website: "https://www.ilomatechnology.com/",
    certificate: "/images/Internship - Khwaja Iqyan Ali Completion.pdf"
  },
  {
    id: 3,
    type: "education",
    badge: "Bachelor of Technology",
    role: "B.Tech in Computer Science",
    company: "GH Raisoni University Amravati",
    duration: "2022 - 2026",
    location: "CGPA: 7.7 / 10",
    description: "Pursuing Bachelor of Technology in Computer Science. Core focus on Data Structures, Algorithms, Full-Stack Web Architecture, Database Management Systems, and RESTful API engineering.",
    skills: ["Computer Science", "MERN Stack", "Data Structures", "Python", "SQL", "DBMS"],
    website: "https://ghrua.edu.in/",
    certificate: null
  },
  {
    id: 4,
    type: "education",
    badge: "Junior College",
    role: "Higher Secondary Education (HSC Science)",
    company: "Shah Babu Junior College, Patur",
    duration: "2020 - 2022",
    location: "Score: 85.60%",
    description: "Completed Higher Secondary Certificate education with distinction in Science curriculum (Physics, Chemistry, Mathematics). Active participant in science events and coding quizzes.",
    skills: ["Science", "Mathematics", "Academic Honors"],
    website: "https://shahbabu.com/",
    certificate: null
  }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/iqyanali17",
    icon: "ph ph-github-logo"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/khwaja-iqyan-ali-17-a-/",
    icon: "ph ph-linkedin-logo"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_iq_.y._xn_?igsh=OXJ6MHF5ZHh2cWM1",
    icon: "ph ph-instagram-logo"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/919359496162",
    icon: "ph ph-whatsapp-logo"
  },
  {
    name: "Resume",
    url: "/Khwaja_Iqyan_Ali_Resume.pdf",
    icon: "ph ph-file-text"
  }
];

export const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "What I Build", href: "#what-i-build" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

