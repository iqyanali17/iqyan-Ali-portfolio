import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { 
  Github, 
  ExternalLink, 
  X, 
  Code2, 
  Star, 
  Layers, 
  UserCheck, 
  Bot, 
  Eye, 
  HeartPulse, 
  Database, 
  Armchair, 
  CreditCard, 
  LayoutDashboard, 
  RefreshCw, 
  Brain, 
  Zap, 
  FileText, 
  Sparkles, 
  Sliders, 
  FileImage, 
  Clock, 
  Accessibility 
} from "lucide-react";
import type { Project } from "@/lib/data";
import { motion } from "framer-motion";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const PROJECT_FEATURES: Record<number, Feature[]> = {
  1: [
    { title: "Seat Selection", description: "Interactive seat layout with real-time reservation.", icon: "Armchair" },
    { title: "Payment Sync", description: "Secure Razorpay payment gateway integration.", icon: "CreditCard" },
    { title: "Admin Panel", description: "Film scheduling, showtimes, and booking analytics.", icon: "LayoutDashboard" },
    { title: "Background Queues", description: "Automatic sync and seat release using Inngest.", icon: "RefreshCw" },
    { title: "Role-Based Access", description: "Secure admin and customer roles via Clerk.", icon: "UserCheck" },
  ],
  2: [
    { title: "Role-Based Access", description: "Secure access for Admin, Doctor & Patient roles.", icon: "UserCheck" },
    { title: "AI Assistant", description: "Context-aware chatbot with multilingual support.", icon: "Bot" },
    { title: "Medical Image Analysis", description: "AI-powered image understanding.", icon: "Eye" },
    { title: "Personal Health Dashboard", description: "Medication tracking, schedules & mindfulness timer.", icon: "HeartPulse" },
    { title: "Secure & Scalable", description: "PostgreSQL with RLS & Deno edge functions.", icon: "Database" },
  ],
  3: [
    { title: "AI Assessment", description: "Dynamic exam generation from uploaded documents.", icon: "Brain" },
    { title: "BullMQ & Redis", description: "Asynchronous background queue processor with retries.", icon: "Zap" },
    { title: "Real-Time Sync", description: "Generation progress updates using Socket.IO.", icon: "RefreshCw" },
    { title: "PDF Compilation", description: "Headless Puppeteer service for printable PDFs.", icon: "FileText" },
    { title: "Educator Dashboard", description: "Configure subjects, question lists, and marks.", icon: "LayoutDashboard" },
  ],
  4: [
    { title: "Content Classifier", description: "Smart compression recommendations via Hugging Face.", icon: "Sparkles" },
    { title: "Comparison Slider", description: "Interactive before-and-after image previews.", icon: "Sliders" },
    { title: "Multi-Format Support", description: "WebP, PNG, and JPG format conversion.", icon: "FileImage" },
    { title: "Compression History", description: "Local history tracking with anonymous JWT.", icon: "Clock" },
    { title: "WCAG Accessibility", description: "High-contrast, keyboard-navigable responsive UI.", icon: "Accessibility" },
  ],
};

const getFeatureIcon = (iconName: string, accentHex: string) => {
  const iconProps = { className: "w-4 h-4", style: { color: accentHex } };
  switch (iconName) {
    case "UserCheck": return <UserCheck {...iconProps} />;
    case "Bot": return <Bot {...iconProps} />;
    case "Eye": return <Eye {...iconProps} />;
    case "HeartPulse": return <HeartPulse {...iconProps} />;
    case "Database": return <Database {...iconProps} />;
    case "Armchair": return <Armchair {...iconProps} />;
    case "CreditCard": return <CreditCard {...iconProps} />;
    case "LayoutDashboard": return <LayoutDashboard {...iconProps} />;
    case "RefreshCw": return <RefreshCw {...iconProps} />;
    case "Brain": return <Brain {...iconProps} />;
    case "Zap": return <Zap {...iconProps} />;
    case "FileText": return <FileText {...iconProps} />;
    case "Sparkles": return <Sparkles {...iconProps} />;
    case "Sliders": return <Sliders {...iconProps} />;
    case "FileImage": return <FileImage {...iconProps} />;
    case "Clock": return <Clock {...iconProps} />;
    case "Accessibility": return <Accessibility {...iconProps} />;
    default: return <Sparkles {...iconProps} />;
  }
};

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("react")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  if (t.includes("typescript") || t === "ts") {
    return (
      <svg className="w-3.5 h-3.5 rounded-sm shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#3178C6"/>
        <path d="M68 68V35H60V68H68ZM52 42H38V68H45V49H52V42Z" fill="white"/>
      </svg>
    );
  }
  if (t.includes("tailwind")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6.018C12 6.018 9.5 9 6 9S0 6.018 0 6.018S2.5 3 6 3s6 3.018 6 3.018z" fill="#06B6D4"/>
        <path d="M24 12.018c0 0-2.5 2.982-6 2.982s-6-2.982-6-2.982s2.5-3 6-3s6 3 6 3z" fill="#06B6D4"/>
        <path d="M12 18.018c0 0-2.5 2.982-6 2.982s-6-2.982-6-2.982s2.5-3 6-3s6 3 6 3z" fill="#38BDF8"/>
      </svg>
    );
  }
  if (t.includes("vite")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2.5L29.5 26.5H2.5L16 2.5Z" fill="url(#viteGrad)"/>
        <path d="M16 2.5L19 12L24.5 13L15 29.5L13 19.5L8.5 19L16 2.5Z" fill="#FFC517"/>
        <defs>
          <linearGradient id="viteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41D1FF"/>
            <stop offset="100%" stopColor="#BD34FE"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (t.includes("supabase")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.362 9.354H13.62L17.702 1.25c.196-.39-.18-.804-.548-.6L4.767 12.052a.456.456 0 00-.063.753h7.742l-4.082 8.1c-.196.39.18.804.548.6l12.387-11.4a.456.456 0 00.063-.753z" fill="#3ECF8E"/>
      </svg>
    );
  }
  if (t.includes("postgresql") || t.includes("postgres")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.7 8C33.1 8 20.3 17 15.6 30.7c-3.1 9-1.9 19 3.3 27 5 7.6 13.5 12.3 22.8 12.8H47V60h-5.2c-5.7-.3-11-3.2-14.1-8-3.1-4.8-3.8-10.7-1.8-16.1 2.8-8.2 10.4-13.6 19.1-13.6h9.7V8H47.7z" fill="#336791"/>
        <path d="M70.3 39.7c-5 0-9.7 2.4-12.6 6.5l-4.7 6.8h17.3c1.7 0 3-1.3 3-3V43c0-1.7-1.3-3.3-3-3.3z" fill="#336791"/>
      </svg>
    );
  }
  if (t.includes("deno")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#000" />
        <path d="M12 4a8 8 0 00-6.3 12.9l1-.5a6 6 0 0110.6-4.4l1 .5A8 8 0 0012 4z" fill="#fff" />
      </svg>
    );
  }
  if (t.includes("gemini") || t.includes("google")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm10-7a1 1 0 01-1 1h-2a1 1 0 010-2h2a1 1 0 011 1zM5 12a1 1 0 01-1 1H2a1 1 0 010-2h2a1 1 0 011 1zm14.071-7.071a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM7.757 16.243a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm11.314 0a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zM6.343 4.929a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L6.343 6.343a1 1 0 010-1.414z" fill="#4285F4"/>
        <circle cx="12" cy="12" r="4" fill="#EA4335" />
      </svg>
    );
  }
  if (t.includes("openai") || t.includes("whisper")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.73 11.75a4.25 4.25 0 00-3.66-3.65 4.25 4.25 0 00-5.83-3.36 4.25 4.25 0 00-7.85 2 4.25 4.25 0 00-2 7.84 4.25 4.25 0 003.65 3.66 4.25 4.25 0 005.84 3.36 4.25 4.25 0 007.84-2 4.25 4.25 0 002-7.85zm-9.73 9.42a2.75 2.75 0 01-1.92-.79 2.74 2.74 0 01-.79-1.93v-3.79l2.71 1.56v5z" fill="#10A37F"/>
      </svg>
    );
  }
  if (t.includes("next")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="black"/>
        <path d="M17.5 17.5L9.25 7.5H7.5V16.5H9.25V10.25L16.25 18.5C16.75 18.25 17.15 17.9 17.5 17.5Z" fill="white"/>
      </svg>
    );
  }
  if (t.includes("node")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm1 14.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z" fill="#339933"/>
      </svg>
    );
  }
  if (t.includes("mongodb") || t.includes("mongoose")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.5 6.5 7.5 10.5 7.5 13.5c0 3 2 5.5 4.5 5.5s4.5-2.5 4.5-5.5c0-3-1-7-4.5-11.5z" fill="#47A248"/>
      </svg>
    );
  }
  if (t.includes("redis")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="#DC382D"/>
      </svg>
    );
  }
  if (t.includes("python")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c-2.8 0-5 2.2-5 5h5v2h-7C3.2 9 1 11.2 1 14s2.2 5 5 5h3v-2H6c-1.7 0-3-1.3-3-3s1.3-3 3-3h6c2.8 0 5-2.2 5-5s-2.2-5-5-5z" fill="#3776AB"/>
        <path d="M12 22c2.8 0 5-2.2 5-5h-5v-2h7c1.8 0 4-2.2 4-5s-2.2-5-5-5h-3v2h3c1.7 0 3 1.3 3 3s-1.3 3-3 3h-6c-2.8 0-5 2.2-5 5s2.2 5 5 5z" fill="#FFE873"/>
      </svg>
    );
  }
  if (t.includes("clerk")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 4c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" fill="#6C47FF"/>
      </svg>
    );
  }
  if (t.includes("framer motion")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v8L12 20 0 8z" fill="#000"/>
        <path d="M0 8h12l6 6H6z" fill="#FF00C7"/>
        <path d="M12 14h12v10H12z" fill="#00F0FF"/>
      </svg>
    );
  }
  return <Code2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#6366F1] transition-colors shrink-0" />;
};

const renderGradientTitle = (title: string, accentGradient: string) => {
  let parts: string[] = [];
  if (title.includes("—")) {
    parts = title.split("—");
  } else if (title.includes("-")) {
    parts = title.split("-");
  }

  if (parts.length >= 2) {
    return (
      <>
        {parts[0].trim()}{" "}
        <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent block md:inline`}>
          {parts.slice(1).join("—").trim()}
        </span>
      </>
    );
  }

  const words = title.split(" ");
  if (words.length > 1) {
    const firstPart = words.slice(0, Math.min(2, Math.floor(words.length / 2))).join(" ");
    const secondPart = words.slice(Math.min(2, Math.floor(words.length / 2))).join(" ");
    return (
      <>
        {firstPart}{" "}
        <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
          {secondPart}
        </span>
      </>
    );
  }

  return <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>{title}</span>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

interface ProjectTheme {
  bgClass: string;
  bgHex: string;
  accentHex: string;
  accentGradient: string;
  isDark: boolean;
  imagePosition: string;
}

const PROJECT_THEMES: Record<number, ProjectTheme> = {
  1: {
    bgClass: "bg-[#09090B]",
    bgHex: "#09090B",
    accentHex: "#A78BFA",
    accentGradient: "from-[#A78BFA] via-[#C084FC] to-[#818CF8]",
    isDark: true,
    imagePosition: "object-center"
  },
  2: {
    bgClass: "bg-[#F3F8FC]",
    bgHex: "#F3F8FC",
    accentHex: "#06B6D4",
    accentGradient: "from-[#6366F1] via-[#8B5CF6] to-[#06B6D4]",
    isDark: false,
    imagePosition: "object-right-top"
  },
  3: {
    bgClass: "bg-[#F2F8FD]",
    bgHex: "#F2F8FD",
    accentHex: "#0ea5e9",
    accentGradient: "from-[#0ea5e9] via-[#38bdf8] to-[#6366F1]",
    isDark: false,
    imagePosition: "object-left-top"
  },
  4: {
    bgClass: "bg-[#F8FAFC]",
    bgHex: "#F8FAFC",
    accentHex: "#6366F1",
    accentGradient: "from-[#6366F1] via-[#4F46E5] to-[#8B5CF6]",
    isDark: false,
    imagePosition: "object-center"
  }
};

export function ProjectDetailModal({ project, isOpen, onOpenChange }: ProjectDetailModalProps) {
  console.log("ProjectDetailModal render - isOpen:", isOpen, "project:", project?.title);

  const [activeProject, setActiveProject] = useState<Project | null>(project);

  useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
  }, [project]);

  if (!activeProject) return null;

  const technologiesArray = JSON.parse(activeProject.technologies);
  const bgImage = 
    activeProject.id === 1 
      ? "/images/image.png" 
      : activeProject.id === 2 
        ? "/images/meditalk-modal-bg.png" 
        : activeProject.imageUrl;
  const theme = PROJECT_THEMES[activeProject.id] || {
    bgClass: "bg-[#F8FAFC]",
    bgHex: "#F8FAFC",
    accentHex: "#6366F1",
    accentGradient: "from-[#6366F1] via-[#8B5CF6] to-[#06B6D4]",
    isDark: false,
    imagePosition: "object-center"
  };

  const handleMouseEnter = () => {
    const text = activeProject.projectUrl ? "Visit Live Site 🌐" : "Open Codebase 💻";
    const event = new CustomEvent("set-cursor-text", { detail: text });
    window.dispatchEvent(event);
  };

  const handleMouseLeave = () => {
    const event = new CustomEvent("set-cursor-text", { detail: null });
    window.dispatchEvent(event);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("[role='button']") ||
      target.closest("span.sr-only")
    ) {
      return;
    }
    const url = activeProject.projectUrl || activeProject.githubUrl;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const features = PROJECT_FEATURES[activeProject.id] || [
    { title: "Custom Design", description: "Polished user experience with beautiful styling cues.", icon: "Sparkles" },
    { title: "Highly Responsive", description: "Fluid and dynamic layouts for devices of all sizes.", icon: "Accessibility" },
    { title: "Optimized Codebase", description: "Fast, clean, and production-grade implementation.", icon: "Zap" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleModalClick}
        className={`max-w-[1240px] w-[96vw] h-[92vh] md:h-[88vh] max-h-[720px] overflow-y-auto flex flex-col p-0 border rounded-[24px] shadow-2xl select-none z-50 overflow-x-hidden [&>button]:hidden group cursor-pointer duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2 ${theme.bgClass} ${theme.isDark ? "border-white/10" : "border-slate-100/80"}`}
      >
        
        {/* Full-width Hero Background Screenshot */}
        {bgImage && (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[24px]">
            <img
              src={bgImage}
              alt={activeProject.title}
              className={`absolute right-0 top-0 w-full h-full object-cover opacity-100 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] ${
                activeProject.id === 1 || activeProject.id === 2 
                  ? "inset-0 md:w-full object-center md:object-right" 
                  : `md:w-[58%] ${theme.imagePosition}`
              }`}
            />
            {/* Blending Gradients - Dynamically generated to match background theme color exactly */}
            {activeProject.id !== 1 && activeProject.id !== 2 && (
              <>
                {/* Mobile: Top-to-bottom fade */}
                <div 
                  className="absolute inset-0 md:hidden" 
                  style={{ backgroundImage: `linear-gradient(to bottom, transparent 0%, ${theme.bgHex} 60%, ${theme.bgHex} 100%)` }}
                />
                
                {/* Desktop: Horizontal fade from theme background (left) to transparent (right) */}
                <div 
                  className="absolute inset-0 hidden md:block" 
                  style={{ backgroundImage: `linear-gradient(to right, ${theme.bgHex} 0%, ${theme.bgHex} 38%, transparent 50%)` }}
                />
                
                {/* Desktop: Vertical fade from transparent (top) to theme background (bottom) to blend with feature cards */}
                <div 
                  className="absolute inset-0 hidden md:block" 
                  style={{ backgroundImage: `linear-gradient(to top, ${theme.bgHex} 0%, ${theme.bgHex} 18%, transparent 28%)` }}
                />
              </>
            )}
          </div>
        )}

        {/* Click to Visit Project Indicator */}
        {(activeProject.projectUrl || activeProject.githubUrl) && (
          <div className="absolute top-6 left-6 z-50 hidden md:block">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md text-[10px] font-bold uppercase tracking-widest shadow-sm ${
              theme.isDark 
                ? "bg-zinc-900/70 border-zinc-800 text-zinc-400" 
                : "bg-white/70 border-slate-200/40 text-slate-500"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Click anywhere to open 🚀
            </div>
          </div>
        )}

        {/* Floating Close Button Wrapper */}
        <div className="absolute top-6 right-6 z-50">
          <DialogClose className={`p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all hover:scale-105 active:scale-95 duration-200 cursor-pointer flex items-center justify-center ${
            theme.isDark 
              ? "bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700" 
              : "bg-white/80 border border-slate-200/60 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300"
          }`}>
            <X className="h-4.5 w-4.5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        {/* Scrollable/Viewport Content Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-between p-5 sm:p-6 md:p-7 min-h-0">
          
          {/* Main info container (staggered reveal) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3.5 lg:gap-4 w-full md:w-[62%] lg:w-[56%] text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex">
              <span 
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-wider rounded-full border uppercase px-3.5 py-1.5"
                style={{ 
                  color: theme.accentHex, 
                  borderColor: `${theme.accentHex}25`, 
                  backgroundColor: `${theme.accentHex}08` 
                }}
              >
                <Star 
                  className="w-3.5 h-3.5" 
                  style={{ fill: theme.accentHex, color: theme.accentHex }}
                /> Featured Project
              </span>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants}>
              <h2 className={`text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight leading-[1.1] text-left ${theme.isDark ? "text-white" : "text-slate-900"}`}>
                {renderGradientTitle(activeProject.title, theme.accentGradient)}
              </h2>
            </motion.div>

            {/* Overview & Buttons */}
            <motion.div variants={itemVariants} className="space-y-3 text-left">
              <h4 
                className="text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-2"
                style={{ color: theme.accentHex }}
              >
                <Code2 className="h-3.5 w-3.5" /> Project Overview
              </h4>
              <DialogDescription className={`cursor-default text-xs lg:text-[12.5px] leading-relaxed font-normal block max-w-2xl ${theme.isDark ? "text-zinc-300" : "text-slate-600"}`}>
                {activeProject.description}
              </DialogDescription>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {activeProject.projectUrl && (
                  <a
                    href={activeProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 h-8 text-[10.5px] font-semibold text-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer hover:opacity-95 bg-gradient-to-r ${theme.accentGradient}`}
                  >
                    Live Demo <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 h-8 text-[10.5px] font-semibold border shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer ${
                      theme.isDark 
                        ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white" 
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    GitHub Code <Github className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="space-y-2.5 text-left">
              <h4 className={`text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-2 ${theme.isDark ? "text-zinc-500" : "text-slate-400"}`}>
                <Layers className="h-3.5 w-3.5" /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5 max-w-2xl">
                {technologiesArray.map((tech: string) => (
                  <div
                    key={tech}
                    className={`px-2.5 py-0.5 text-[10.5px] font-medium rounded-full border shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5 cursor-default select-none group ${
                      theme.isDark 
                        ? "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 hover:border-zinc-700" 
                        : "bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50/50 hover:border-slate-300"
                    }`}
                  >
                    {getTechIcon(tech)}
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Bottom Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
            className="mt-3"
          >
            <div className={`flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x rounded-[18px] overflow-hidden p-1.5 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.02)] ${
              theme.isDark 
                ? "bg-zinc-900/40 border border-zinc-800/40 divide-zinc-800/50" 
                : "bg-white/40 border border-slate-200/40 divide-slate-100/50"
            }`}>
              {features.map((feat, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 px-3 py-2.5 lg:py-2 flex-1 transition-all duration-200 rounded-[12px] ${
                    theme.isDark 
                      ? "hover:bg-zinc-800/40" 
                      : "hover:bg-white/60"
                  }`}
                >
                  <div 
                    className="flex-shrink-0 w-7.5 h-7.5 rounded-lg flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                    style={{ backgroundColor: `${theme.accentHex}10`, border: `1px solid ${theme.accentHex}18` }}
                  >
                    {getFeatureIcon(feat.icon, theme.accentHex)}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h5 className={`font-bold text-[11.5px] tracking-tight leading-tight ${theme.isDark ? "text-white" : "text-slate-900"}`}>{feat.title}</h5>
                    <p className={`text-[10px] font-normal leading-tight mt-0.5 line-clamp-2 ${theme.isDark ? "text-zinc-400" : "text-slate-500"}`}>{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </DialogContent>
    </Dialog>
  );
}
