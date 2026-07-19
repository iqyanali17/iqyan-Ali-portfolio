export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  projectUrl: string | null;
  githubUrl: string | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number | null;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  website: string | null;
  certificate: string | null;
  certificates: string | null;
  highlight?: boolean;
}


export const projects: Project[] = [
  {
    id: 1,
    title: "Movie Ticket Booking Platform",
    description: "Full-stack movie ticket booking and theater management platform featuring interactive seat layout selection, real-time seat status synchronization, and conflict-free reservation checkout. Built with robust role-based access control (Admin/User) powered by Clerk Authentication, and integrated with Razorpay for secure payment gateway processing. Includes an extensive admin panel for film listings, showtime scheduling, booking tracking, and revenue analytics dashboard, backed by MongoDB and real-time event-driven background handlers using Inngest serverless queues for automatic sync of user profiles and automated release of unpaid seats.",
    technologies: JSON.stringify([
      "React 19",
      "Tailwind CSS",
      "Vite",
      "React Router DOM",
      "Clerk",
      "Axios",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Inngest",
      "Razorpay",
      "Svix",
      "TMDB API"
    ]),
    imageUrl: "/images/OneSow-UI.png",
    projectUrl: "https://one-show.vercel.app/",
    githubUrl: "https://github.com/iqyanali17",
  },
  {
    id: 2,
    title: "MediTalk — AI Healthcare Platform",
    description: "Full-stack AI-powered medical assistant and healthcare platform featuring context-aware conversational AI with sentiment analysis, real-time patient-doctor messaging, and interactive symptom assessment. Built with robust role-based access control (Admin/Doctor/Patient) powered by Supabase Authentication, and backed by a PostgreSQL database with strict Row Level Security (RLS). Includes a personal health dashboard with medication tracking schedules, AI-powered medical image analysis, a meditation mindfulness timer, and a comprehensive admin console for managing user roles, support tickets, and system-wide medical analytics. Leverages Deno edge functions to orchestrate Google Gemini 2.5 Flash, OpenAI Whisper, and Google Cloud Translation APIs.",
    technologies: JSON.stringify([
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "React Router DOM",
      "Supabase",
      "PostgreSQL",
      "Deno",
      "Google Gemini API",
      "OpenAI Whisper API",
      "Google Cloud Translation API",
      "Recharts",
      "Radix UI",
      "React Hook Form",
      "Zod",
      "Lucide React",
      "Sonner",
      "PWA"
    ]),
    imageUrl: "/images/Meditalk-UI.png",
    projectUrl: "https://meditalk-healthcare-assistant.netlify.app/",
    githubUrl: "https://github.com/iqyanali17",
  },
  {
    id: 3,
    title: "AI Assessment Creator",
    description: "Full-stack AI-powered assessment generation platform enabling educators to dynamically generate structured exam papers from input criteria or uploaded documents. Features an intuitive dashboard for configuring subjects, class grades, due dates, question count distributions, and marking schemes, backed by a MongoDB database. Leverages a robust asynchronous backend queue processor using BullMQ and Redis (ioredis) to handle Google Gemini API calls with auto-retry mechanisms and model fallbacks. Utilizes Socket.IO for real-time generation status synchronization, Zustand for light state management, and integrates a headless Puppeteer PDF compilation service that converts dynamically generated paper layouts into high-fidelity, printable PDF exam papers.",
    technologies: JSON.stringify([
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Socket.IO",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Mongoose",
      "Redis",
      "BullMQ",
      "Google Gemini API",
      "Puppeteer",
      "Zod"
    ]),
    imageUrl: "/images/ai-assessment-creator.png",
    projectUrl: "https://ai-assessment-creator-q64s.vercel.app/",
    githubUrl: "https://github.com/iqyanali17/AI_assessment_creator",
  },
  {
    id: 4,
    title: "AI Image Compressor",
    description: "Full-stack AI-powered image optimization platform with drag-and-drop uploader, AI content classification using Hugging Face models, smart compression recommendations, and real-time analytics dashboard. Features format conversion (JPG/PNG/WebP), before-and-after comparison slider, anonymous JWT authentication, compression history tracking, and WCAG accessibility compliance.",
    technologies: JSON.stringify(["React 19", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "React Router DOM", "Axios", "Flask", "Python", "Pillow", "Hugging Face API", "PyJWT", "MySQL", "CORS"]),
    imageUrl: "/images/image-compressor-ui.png",
    projectUrl: "https://image-compressor-rho-three.vercel.app/",
    githubUrl: "https://github.com/iqyanali17/image-compressor.git",
  },
];

export const skills: Skill[] = [
  { id: 1, name: "JavaScript", category: "Programming", proficiency: 92 },
  { id: 18, name: "TypeScript", category: "Programming", proficiency: 88 },
  { id: 2, name: "Python", category: "Programming", proficiency: 85 },
  { id: 3, name: "SQL", category: "Programming", proficiency: 80 },
  { id: 4, name: "React", category: "Frontend", proficiency: 90 },
  { id: 5, name: "HTML/CSS", category: "Frontend", proficiency: 95 },
  { id: 6, name: "Tailwind CSS", category: "Frontend", proficiency: 95 },
  { id: 7, name: "Material UI", category: "Frontend", proficiency: 88 },
  { id: 8, name: "Bootstrap", category: "Frontend", proficiency: 88 },
  { id: 9, name: "Node.js", category: "Backend", proficiency: 85 },
  { id: 10, name: "Express.js", category: "Backend", proficiency: 85 },
  { id: 11, name: "Flask", category: "Backend", proficiency: 80 },
  { id: 12, name: "MongoDB", category: "Databases", proficiency: 80 },
  { id: 13, name: "MySQL", category: "Databases", proficiency: 78 },
  { id: 14, name: "Supabase", category: "Databases", proficiency: 82 },
  { id: 15, name: "Git/GitHub", category: "Tools", proficiency: 90 },
  { id: 16, name: "Postman", category: "Tools", proficiency: 85 },
  { id: 17, name: "Swagger API", category: "Tools", proficiency: 80 },
];

export const experience: Experience[] = [
  {
    id: 1,
    role: "Software Developer Intern",
    company: "iLoma technology Pvt. Ltd.",
    duration: "Jan 2026 - Jun 2026",
    description: "Developed high-performance production-grade web applications using the MERN stack and Python (Flask). Architected and deployed a secure, full-scale Visitor Management System. Designed and optimized scalable RESTful APIs, implementing robust JWT authentication, Role-Based Access Control (RBAC), and efficient database queries.",
    website: "https://www.ilomatechnology.com/",
    certificate: "/images/Internship - Khwaja Iqyan Ali Completion.pdf",
    certificates: null,
  },
  {
    id: 2,
    role: "Web Developer Intern",
    company: "The Developers Arena",
    duration: "2025",
    description: "Completed certified Web Developer Internship with real-world deployment & workflow experience. Specialized in full-stack development with MERN stack.",
    website: null,
    certificate: "/images/Khwaja_Iqyan_Ali_Internship_Certificate_page-0001.jpg",
    certificates: null,
  },
  {
    id: 3,
    role: "B.Tech Computer Science",
    company: "GH Raisoni University Amravati",
    duration: "2022 - 2026",
    description: "Pursuing Bachelor of Technology in Computer Science. CGPA: 7.7. Specializing in MERN stack, REST APIs, and responsive UI design.",
    website: "https://ghrua.edu.in/",
    certificate: null,
    certificates: null,
  },
  {
    id: 4,
    role: "Higher Secondary Education",
    company: "Shah Babu Junior College, Patur",
    duration: "2020 - 2022",
    description: "Completed Higher Secondary education with a focus on Science. Percentage: 85.60%.",
    website: "https://shahbabu.com/",
    certificate: null,
    certificates: null,
  },
  {
    id: 5,
    role: "Certifications",
    company: "Multiple Providers",
    duration: "2022 - 2026",
    description: "Introduction to SQL (Simplilearn), Green Skills & AI (Edunet & AICTE), Software Developer Internship (iLoma technology). Two-time Carrom Championship Winner. Active participant in coding events & quizzes.",
    website: null,
    certificate: null,
    certificates: JSON.stringify([
      "/images/Internship - Khwaja Iqyan Ali Completion.pdf",
      "/images/Khwaja_Iqyan_Ali_Internship_Certificate_page-0001.jpg",
      "/images/SQL_Certificate.jpg",
      "/images/Green_Skills_AI_Certificate.jpg",
      "/images/Carrom_Championship_Certificate.jpg"
    ]),
  },
];


