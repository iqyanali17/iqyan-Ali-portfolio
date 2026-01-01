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
}

export interface MinorProject {
  id: number;
  title: string;
  description: string;
  role: string;
  technologies: string;
  imageUrl: string | null;
  githubUrl: string;
  liveUrl: string | null;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Movie Ticket Booking Platform",
    description: "Role-based auth (Admin/User) with Clerk authentication. Admin panel for movies, scheduling, seat & booking control. Interactive UI with conflict-free booking flow.",
    technologies: JSON.stringify(["Node.js", "Express.js", "MongoDB", "React", "Tailwind CSS", "Clerk"]),
    imageUrl: "/images/OneSow-UI.png",
    projectUrl: "https://one-show.vercel.app/",
    githubUrl: "https://github.com/iqyanali17",
  },
  {
    id: 2,
    title: "MediTalk — AI Healthcare Chatbot",
    description: "AI-powered healthcare chatbot supporting text, voice & image inputs. Multilingual support with secure authentication. Built with React & Tailwind UI backed by Supabase.",
    technologies: JSON.stringify(["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"]),
    imageUrl: "/images/Meditalk-UI.png",
    projectUrl: "https://meditalk-healthcare-assistant.netlify.app/",
    githubUrl: "https://github.com/iqyanali17",
  },
];

export const skills: Skill[] = [
  { id: 1, name: "JavaScript", category: "Programming", proficiency: 92 },
  { id: 2, name: "SQL", category: "Programming", proficiency: 80 },
  { id: 3, name: "React", category: "Frontend", proficiency: 90 },
  { id: 4, name: "HTML/CSS", category: "Frontend", proficiency: 95 },
  { id: 5, name: "Tailwind CSS", category: "Frontend", proficiency: 95 },
  { id: 6, name: "Bootstrap", category: "Frontend", proficiency: 88 },
  { id: 7, name: "Node.js", category: "Backend", proficiency: 85 },
  { id: 8, name: "Express.js", category: "Backend", proficiency: 85 },
  { id: 9, name: "MongoDB", category: "Databases", proficiency: 80 },
  { id: 10, name: "MySQL", category: "Databases", proficiency: 78 },
  { id: 11, name: "Git/GitHub", category: "Tools", proficiency: 90 },
  { id: 12, name: "Postman", category: "Tools", proficiency: 85 },
];

export const experience: Experience[] = [
  {
    id: 1,
    role: "Web Developer Intern",
    company: "The Developers Arena",
    duration: "2025",
    description: "Completed certified Web Developer Internship with real-world deployment & workflow experience. Specialized in full-stack development with MERN stack.",
    website: null,
    certificate: "/images/Khwaja_Iqyan_Ali_Internship_Certificate_page-0001.jpg",
    certificates: null,
  },
  {
    id: 2,
    role: "B.Tech Computer Science",
    company: "GH Raisoni University Amravati",
    duration: "2022 - 2026",
    description: "Pursuing Bachelor of Technology in Computer Science. CGPA: 7.5. Specializing in MERN stack, REST APIs, and responsive UI design.",
    website: "https://ghrua.edu.in/",
    certificate: null,
    certificates: null,
  },
  {
    id: 3,
    role: "Certifications",
    company: "Multiple Providers",
    duration: "2022 - 2026",
    description: "Introduction to SQL (Simplilearn), Green Skills & AI (Edunet & AICTE). Two-time Carrom Championship Winner. Active participant in coding events & quizzes.",
    website: null,
    certificate: null,
    certificates: JSON.stringify([
      "/images/Khwaja_Iqyan_Ali_Internship_Certificate_page-0001.jpg",
      "/images/SQL_Certificate.jpg",
      "/images/Green_Skills_AI_Certificate.jpg",
      "/images/Carrom_Championship_Certificate.jpg"
    ]),
  },
];

export const minorProjects: MinorProject[] = [
  {
    id: 1,
    title: "PostFlow",
    description: "A simple social platform where users can create and share posts with a clean UI. Focused on CRUD operations and modular component design.",
    role: "Frontend logic and state handling • Component design",
    technologies: JSON.stringify(["Node.js", "Express", "MongoDB", "EJS", "Mongoose"]),
    imageUrl: "/images/PostFlow-UI.png",
    githubUrl: "https://github.com/iqyanali17/Postflow_App.git",
    liveUrl: null,
  },
  {
    id: 2,
    title: "Simon Game",
    description: "Interactive brain-training game based on sequence repetition logic with sound feedback and click animations.",
    role: "Event handling & game-logic concepts • Increasing difficulty patterns",
    technologies: JSON.stringify(["HTML", "CSS", "JavaScript"]),
    imageUrl: "/images/Simon_game.png",
    githubUrl: "https://github.com/iqyanali17/SimonGAme.git",
    liveUrl: null,
  },
  {
    id: 3,
    title: "Weather App",
    description: "Real-time weather dashboard that fetches weather data with city search functionality. Displays temperature, humidity, and conditions.",
    role: "API calls & async JavaScript handling • Real-time data management",
    technologies: JSON.stringify(["React 19.1.1", "Vite 7.1.6", "Material-UI 7.3.6", "OpenWeatherMap API", "CSS3"]),
    imageUrl: "/images/weather_App.png",
    githubUrl: "https://github.com/iqyanali17/weather_app.git",
    liveUrl: null,
  },
  {
    id: 4,
    title: "Packers & Movers Service Website",
    description: "Professional website layout for service-based business with sections for services, contact, about, and inquiry CTA.",
    role: "Clean UI structure & responsive layout design • Business-focused interface",
    technologies: JSON.stringify(["Next.js 16.1.0", "React 19.2.3", "Material-UI 7.3.6", "Tailwind CSS 3.4.1", "Lucide React", "PostCSS"]),
    imageUrl: "/images/Packers & Movers-UI.png",
    githubUrl: "https://github.com/iqyanali17/MH27-Pakcers-Movers.git",
    liveUrl: "https://mh-27-pakcers-movers.vercel.app/",
  },
  {
    id: 5,
    title: "Mini Chat App",
    description: "Simple chat interface with message layout and interactive components. Focused on conversation styling and UI structuring.",
    role: "UI design thinking & frontend structuring • Component layout design",
    technologies: JSON.stringify(["Node.js", "Express.js", "MongoDB", "Mongoose 8.20.0", "EJS 3.1.10", "Vanilla JavaScript"]),
    imageUrl: "/images/MinChat-UI.png",
    githubUrl: "https://github.com/iqyanali17/Mini_chat-_pp.git",
    liveUrl: null,
  },
];
