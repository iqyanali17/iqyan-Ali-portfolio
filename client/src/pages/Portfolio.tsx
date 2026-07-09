import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";
import { SiReact, SiNodedotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGit, SiPython, SiFlask, SiSupabase, SiMui, SiTypescript } from "react-icons/si";
import { ArrowRight, Download, Send, Loader2, Code2, Database, Layout, Server, Wrench, Github, Linkedin, Instagram, Mail, MapPin, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { MinorProjectCard } from "@/components/MinorProjectCard";
import { SkillBar } from "@/components/SkillBar";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Footer } from "@/components/Footer";
import { useProjects, useSkills, useExperience, useContact, useMinorProjects } from "@/hooks/use-portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import Magnetic from "@/components/ui/Magnetic";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import RotatingBadge from "@/components/ui/RotatingBadge";
import Preloader from "@/components/ui/Preloader";

// Define schema locally for frontend-only mode
const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

const TechIcons = [
  { icon: SiReact, name: "React" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiMui, name: "Material UI" },
  { icon: SiExpress, name: "Express" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiPython, name: "Python" },
  { icon: SiFlask, name: "Flask" },
  { icon: SiSupabase, name: "Supabase" },
  { icon: SiGit, name: "Git" },
];

export default function Portfolio() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experience, isLoading: experienceLoading } = useExperience();
  const { data: minorProjects, isLoading: minorProjectsLoading } = useMinorProjects();
  const contactMutation = useContact();
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [time, setTime] = useState("");
  const [marqueeLight, setMarqueeLight] = useState(false);
  const [cyclingWordIdx, setCyclingWordIdx] = useState(0);
  const cyclingWords = [
    { from: "Prompts", to: "Clean Code" },
    { from: "Coffee", to: "Scalable APIs" },
    { from: "Problems", to: "Smart Solutions" },
    { from: "Bugs", to: "Digital Reality" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCyclingWordIdx((prev) => (prev + 1) % cyclingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Carousel Responsive Logic
  const [visibleItems, setVisibleItems] = useState(3);
  const [majorIndex, setMajorIndex] = useState(0);
  const [minorIndex, setMinorIndex] = useState(0);
  const majorCarouselRef = useRef<HTMLDivElement>(null);
  const minorCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxMajorIndex = Math.max(0, (projects?.length || 0) - visibleItems);
  const maxMinorIndex = Math.max(0, (minorProjects?.length || 0) - visibleItems);

  const scrollCarouselTo = (container: HTMLDivElement | null, index: number) => {
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement;
    if (!firstChild) return;
    const cardWidth = firstChild.clientWidth;
    const gap = 24; // gap-6 is 24px
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth"
    });
  };

  const nextMajor = () => {
    const nextIdx = majorIndex >= maxMajorIndex ? 0 : majorIndex + 1;
    setMajorIndex(nextIdx);
    scrollCarouselTo(majorCarouselRef.current, nextIdx);
  };
  const prevMajor = () => {
    const prevIdx = majorIndex <= 0 ? maxMajorIndex : majorIndex - 1;
    setMajorIndex(prevIdx);
    scrollCarouselTo(majorCarouselRef.current, prevIdx);
  };
  const nextMinor = () => {
    const nextIdx = minorIndex >= maxMinorIndex ? 0 : minorIndex + 1;
    setMinorIndex(nextIdx);
    scrollCarouselTo(minorCarouselRef.current, nextIdx);
  };
  const prevMinor = () => {
    const prevIdx = minorIndex <= 0 ? maxMinorIndex : minorIndex - 1;
    setMinorIndex(prevIdx);
    scrollCarouselTo(minorCarouselRef.current, prevIdx);
  };

  const handleMajorScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const firstChild = container.firstElementChild as HTMLElement;
    if (!firstChild) return;
    const cardWidth = firstChild.clientWidth;
    const gap = 24;
    const newIndex = Math.round(container.scrollLeft / (cardWidth + gap));
    if (newIndex !== majorIndex && newIndex >= 0 && newIndex <= maxMajorIndex) {
      setMajorIndex(newIndex);
    }
  };

  const handleMinorScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const firstChild = container.firstElementChild as HTMLElement;
    if (!firstChild) return;
    const cardWidth = firstChild.clientWidth;
    const gap = 24;
    const newIndex = Math.round(container.scrollLeft / (cardWidth + gap));
    if (newIndex !== minorIndex && newIndex >= 0 && newIndex <= maxMinorIndex) {
      setMinorIndex(newIndex);
    }
  };

  useEffect(() => {
    setMajorIndex((p) => Math.min(p, maxMajorIndex));
    setMinorIndex((p) => Math.min(p, maxMinorIndex));
    scrollCarouselTo(majorCarouselRef.current, majorIndex);
    scrollCarouselTo(minorCarouselRef.current, minorIndex);
  }, [visibleItems, projects?.length, minorProjects?.length]);


  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredSkills = skills?.filter((skill) => {
    if (selectedCategory === "All") return true;
    return skill.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    });
  };

  return (
    <>
      <Preloader />

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navigation />

      {/* HERO SECTION */}
      <Element name="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Column - Hero Copy */}
          <div className="text-center md:text-left md:flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Futuristic Neon Live Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-xs font-semibold mb-6 tracking-wider uppercase backdrop-blur-sm select-none">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                Active Intern & Engineer
              </div>

              <h2 className="text-primary font-mono mb-3 text-lg sm:text-xl tracking-widest">Hello, I'm</h2>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-none">
                Khwaja <br />
                <span className="text-gradient">Iqyan Ali</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
                A <span className="text-foreground font-medium">Full-Stack Developer</span> crafting futuristic digital experiences with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary font-bold tracking-tight">MERN stack</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400 font-bold tracking-tight">Python</span>.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    window.location.hash = '#contact';
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 0);
                  }}
                >
                  Let's Talk <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                  asChild
                >
                  <a href="/Khwaja_Iqyan_Ali_Resume.pdf" download="Khwaja_Iqyan_Ali_Resume">
                    Resume <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Holographic Parallax 3D Portrait */}
          <div className="md:flex-1 relative flex items-center justify-center md:mt-0 mt-8 group/hero-photo">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[500px]"
            >
              <TiltCard tiltMax={14} className="w-full h-full">
                {/* Dynamic Multi-Color Backdrop Glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/50 via-secondary/30 to-accent/50 rounded-[3rem] blur-3xl opacity-75 group-hover/hero-photo:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Styled Photo Frame Box */}
                <div className="relative w-full h-full bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl transition-all duration-700">
                  {/* Primary Profile Image */}
                  <img
                    src="/images/hello_Bluebg.png"
                    alt="Khwaja Iqyan Ali"
                    className="w-full h-full object-cover transform scale-[1.01] group-hover/hero-photo:scale-105 transition-transform duration-700"
                  />

                  {/* Sci-Fi Scanner Grid HUD Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%),linear-gradient(90deg,rgba(149,104,255,0.06),rgba(59,130,246,0.02),rgba(149,104,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-40 pointer-events-none" />

                  {/* High Contrast Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80" />
                </div>

                {/* PARALLAX FLOATING HUD CHIP 1 (Pops out in Z-space!) */}
                <div
                  style={{ transform: "translateZ(70px)" }}
                  className="absolute -top-3 -left-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-xs font-semibold font-display shadow-2xl flex items-center gap-2 select-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  🚀 Full-Stack Developer
                </div>

                {/* PARALLAX FLOATING HUD CHIP 2 */}
                <div
                  style={{ transform: "translateZ(80px)" }}
                  className="absolute -bottom-3 -right-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-xs font-semibold font-display shadow-2xl flex items-center gap-2 select-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  ⚡ Intern @ iLoma
                </div>


                {/* PARALLAX FLOATING TECH CHIP 4 (Bottom Left Corner) */}
                <div
                  style={{ transform: "translateZ(50px)" }}
                  className="absolute -bottom-4 -left-3 w-10 h-10 bg-black/70 backdrop-blur-md border border-white/10 rounded-full shadow-2xl flex items-center justify-center text-secondary group-hover/hero-photo:scale-110 group-hover/hero-photo:-rotate-12 transition-all duration-500"
                >
                  <SiTypescript className="w-5 h-5" />
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

      </Element>


      {/* ── DUAL MARQUEE BAND ── */}
      <div
        onClick={() => setMarqueeLight((v) => !v)}
        className="relative cursor-pointer overflow-hidden select-none"
        title={marqueeLight ? "Click for dark mode" : "Click for light mode"}
        style={{
          background: marqueeLight
            ? "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #eef2ff 100%)"
            : "linear-gradient(135deg, #08090e 0%, #0d0f1a 50%, #0a0c14 100%)",
          transition: "background 0.5s ease",
        }}
      >
        {/* Subtle animated background orb */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: marqueeLight
              ? "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(149,104,255,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(149,104,255,0.12) 0%, transparent 70%)",
            transition: "background 0.5s ease",
          }}
        />

        {/* Left/Right edge fades matching the new bg */}
        <div
          className="absolute inset-y-0 left-0 w-20 z-20 pointer-events-none"
          style={{
            background: marqueeLight
              ? "linear-gradient(to right, #f0f4ff, transparent)"
              : "linear-gradient(to right, #08090e, transparent)",
            transition: "background 0.5s ease",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-20 z-20 pointer-events-none"
          style={{
            background: marqueeLight
              ? "linear-gradient(to left, #f0f4ff, transparent)"
              : "linear-gradient(to left, #08090e, transparent)",
            transition: "background 0.5s ease",
          }}
        />

        {/* Click hint pill */}
        <div
          className="absolute top-2 right-24 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase opacity-40 pointer-events-none"
          style={{
            border: `1px solid ${marqueeLight ? "#6366f1" : "rgba(255,255,255,0.15)"}`,
            color: marqueeLight ? "#4f46e5" : "rgba(255,255,255,0.5)",
          }}
        >
          {marqueeLight ? "🌙 Dark" : "☀️ Light"}
        </div>

        {/* ── ROW 1: Tech Stack with icons ── */}
        <div className="py-4 overflow-hidden border-b" style={{ borderColor: marqueeLight ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)", transition: "border-color 0.5s ease" }}>
          <div className="flex gap-10 w-max animate-infinite-scroll">
            {[...TechIcons, ...TechIcons, ...TechIcons].map((tech, idx) => (
              <div
                key={`r1-${tech.name}-${idx}`}
                className="flex items-center gap-2.5 group"
              >
                {/* Icon bubble */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    background: marqueeLight
                      ? "rgba(99,102,241,0.1)"
                      : "rgba(149,104,255,0.12)",
                    border: marqueeLight
                      ? "1px solid rgba(99,102,241,0.2)"
                      : "1px solid rgba(149,104,255,0.2)",
                  }}
                >
                  <tech.icon
                    className="w-4 h-4 transition-colors duration-300"
                    style={{ color: marqueeLight ? "#4f46e5" : "hsl(var(--primary))" }}
                  />
                </div>
                <span
                  className="text-sm font-display font-semibold whitespace-nowrap tracking-wide transition-colors duration-300"
                  style={{ color: marqueeLight ? "#1e1b4b" : "rgba(255,255,255,0.75)" }}
                >
                  {tech.name}
                </span>
                {/* Separator dot */}
                <span
                  className="ml-4 text-xs opacity-30"
                  style={{ color: marqueeLight ? "#6366f1" : "hsl(var(--primary))" }}
                >
                  /
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROW 2: Tools & Platforms ── */}
        <div className="py-4 overflow-hidden" style={{ transition: "border-color 0.5s ease" }}>
          <div
            className="flex gap-6 w-max"
            style={{ animation: "infinite-scroll-reverse 28s linear infinite" }}
          >
            {[
              { label: "Git / GitHub",    sym: "◈" },
              { label: "Postman",         sym: "◈" },
              { label: "Swagger API",     sym: "◈" },
              { label: "VS Code",         sym: "◈" },
              { label: "MongoDB Atlas",   sym: "◈" },
              { label: "Vercel",          sym: "◈" },
              { label: "Netlify",         sym: "◈" },
              { label: "REST APIs",       sym: "◈" },
              { label: "JWT Auth",        sym: "◈" },
              { label: "RBAC",            sym: "◈" },
              { label: "Linux CLI",       sym: "◈" },
              { label: "Git / GitHub",    sym: "◈" },
              { label: "Postman",         sym: "◈" },
              { label: "Swagger API",     sym: "◈" },
              { label: "VS Code",         sym: "◈" },
              { label: "MongoDB Atlas",   sym: "◈" },
              { label: "Vercel",          sym: "◈" },
              { label: "Netlify",         sym: "◈" },
              { label: "REST APIs",       sym: "◈" },
              { label: "JWT Auth",        sym: "◈" },
              { label: "RBAC",            sym: "◈" },
              { label: "Linux CLI",       sym: "◈" },
            ].map((item, idx) => (
              <div key={`r2-${idx}`} className="flex items-center gap-6 shrink-0">
                {/* Pill tag */}
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap"
                  style={{
                    background: marqueeLight
                      ? "rgba(99,102,241,0.08)"
                      : "rgba(255,255,255,0.04)",
                    border: marqueeLight
                      ? "1px solid rgba(99,102,241,0.2)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="text-[9px] font-mono font-black tracking-[0.15em] uppercase transition-colors duration-300"
                    style={{ color: marqueeLight ? "#3730a3" : "rgba(255,255,255,0.55)" }}
                  >
                    {item.label}
                  </span>
                </div>
                {/* Separator */}
                <span
                  className="text-xs opacity-25 transition-colors duration-300"
                  style={{ color: marqueeLight ? "#6366f1" : "hsl(var(--secondary))" }}
                >
                  {item.sym}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* ABOUT & SKILLS - BENTO GRID LAYOUT */}
      <Element name="skills" id="skills" className="py-24 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Premium Animated Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(149,104,255,0.12) 0%, rgba(59,130,246,0.12) 100%)",
              border: "1px solid rgba(149,104,255,0.3)",
              boxShadow: "0 0 20px rgba(149,104,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Animated shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2.5s_ease-in-out_infinite]" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_hsl(var(--primary))]"></span>
            </span>
            <span className="relative text-xs font-bold tracking-[0.2em] uppercase"
              style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              ⚡ Interactive Skill Dashboard
            </span>
          </div>

          {/* Heading with Static Context and Cycling Word Pairs */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight tracking-tight flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4 gap-y-2">
            <span className="text-foreground shrink-0 select-none">I turn</span>
            {/* Input word wrapper (Responsive em width to prevent clipping) */}
            <span className="relative inline-flex items-center justify-center w-[5.5em] h-[1.25em] overflow-hidden align-middle shrink-0">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`from-${cyclingWordIdx}`}
                  initial={{ y: 24, opacity: 0, filter: "blur(2px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, #a78bfa 60%, hsl(var(--secondary)) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {cyclingWords[cyclingWordIdx].from}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-foreground shrink-0 select-none">into</span>
            {/* Output word wrapper (Responsive em width to prevent clipping) */}
            <span className="relative inline-flex items-center justify-center w-[9.5em] h-[1.25em] overflow-hidden align-middle shrink-0">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`to-${cyclingWordIdx}`}
                  initial={{ y: 24, opacity: 0, filter: "blur(2px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #a78bfa 0%, hsl(var(--secondary)) 60%, hsl(var(--primary)) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {cyclingWords[cyclingWordIdx].to}
                  {/* Glowing underline on the output word */}
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
                      boxShadow: "0 0 8px hsl(var(--primary))"
                    }}
                  />
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>

          {/* Description with highlighted keywords (Increased text size for better readability) */}
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            A deep-dive into my{" "}
            <span className="text-primary/95 font-semibold">core competencies</span>,{" "}
            <span className="text-secondary/95 font-semibold">coding philosophy</span>, and{" "}
            <span style={{ color: "rgb(196,181,253)", fontWeight: 600 }}>real-world achievements</span>{" "}
            — presented in an interactive dashboard you can explore.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1: BIO & TERMINAL CODE BOX */}
          <div className="md:col-span-2 md:row-span-2">
            <TiltCard tiltMax={4} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-8 flex flex-col justify-between min-h-[480px]">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <h3 className="text-xl font-display font-bold flex items-center gap-2.5">
                      <Code2 className="text-primary w-5 h-5" />
                      Interactive developer_profile.json
                    </h3>
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    I am a results-driven Full-Stack Developer and former Software Developer Intern with hands-on experience building and deploying 5+ real-world web applications and AI-powered solutions. Specializing in the MERN stack and Python (Flask), I engineer scalable web products from fluid frontend interfaces to secure backend APIs and databases.
                  </p>
                  <p className="text-muted-foreground text-base leading-relaxed mb-8">
                    Through my internship at iLoma Technology and independent projects, I have established a strong focus on clean architecture, secure authentication systems (JWT/RBAC), and high-performance RESTful APIs. I thrive in Agile, collaborative environments, dedicating myself to code optimization and delivering reliable, production-ready software solutions.
                  </p>
                </div>

                {/* Simulated IDE / Terminal output block */}
                <div className="bg-black/40 rounded-2xl p-5 border border-white/5 font-mono text-sm leading-relaxed text-blue-300 relative group overflow-hidden">
                  <div className="absolute top-2 right-4 text-xs text-white/20 select-none">JSON</div>
                  <pre className="overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
                    <span className="text-purple-400">{"{"}</span>{"\n"}
                    {"  "}<span className="text-amber-400">"name"</span>: <span className="text-emerald-400">"Khwaja Iqyan Ali"</span>,{"\n"}
                    {"  "}<span className="text-amber-400">"currentRole"</span>: <span className="text-emerald-400">"Software Developer Intern at iLoma"</span>,{"\n"}
                    {"  "}<span className="text-amber-400">"stackFocus"</span>: <span className="text-emerald-400">["MongoDB", "Express", "React", "Node", "Flask", "TS"]</span>,{"\n"}
                    {"  "}<span className="text-amber-400">"passions"</span>: <span className="text-emerald-400">["Scalable APIs", "Intuitive UX Design", "Clean Architecture"]</span>,{"\n"}
                    {"  "}<span className="text-amber-400">"location"</span>: <span className="text-emerald-400">"Nagpur, Pune, Hyderabad, etc. (Onsite / Hybrid)"</span>{"\n"}
                    <span className="text-purple-400">{"}"}</span>
                  </pre>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* CARD 2: INTERACTIVE SKILLS GRID WITH DYNAMIC CATEGORY FILTERING */}
          <div className="md:row-span-2">
            <TiltCard tiltMax={4} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col min-h-[480px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-display font-bold flex items-center gap-2">
                    <Wrench className="text-secondary w-5 h-5 animate-spin-slow" />
                    Skills Directory
                  </h3>
                  <span className="text-[10px] font-mono bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    {filteredSkills?.length || 0} Skills
                  </span>
                </div>

                {/* Category buttons (Segmented control) */}
                <div className="flex flex-wrap gap-1 mb-6 bg-white/5 p-1 rounded-2xl border border-white/5">
                  {["All", "Programming", "Frontend", "Backend", "Databases", "Tools"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex-1 min-w-[70px] text-center px-2 py-1.5 rounded-xl text-[10px] font-bold tracking-wide transition-all duration-300 ${selectedCategory === category
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Animated lists of skills */}
                {skillsLoading ? (
                  <div className="space-y-4 flex-grow">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-14 bg-muted/20 animate-pulse rounded-2xl" />
                    ))}
                  </div>
                ) : (
                  <div className="flex-grow overflow-y-auto max-h-[360px] pr-1.5 space-y-3 custom-scrollbar">
                    <motion.div layout className="grid grid-cols-1 gap-3">
                      {filteredSkills?.map((skill) => {
                        // Dynamic Tech Icon Picker
                        const getSkillIcon = (name: string, cat: string) => {
                          const iconMap: Record<string, any> = {
                            "react": SiReact,
                            "node.js": SiNodedotjs,
                            "express.js": SiExpress,
                            "mongodb": SiMongodb,
                            "typescript": SiTypescript,
                            "javascript": SiJavascript,
                            "python": SiPython,
                            "flask": SiFlask,
                            "supabase": SiSupabase,
                            "tailwind css": SiTailwindcss,
                            "material ui": SiMui,
                            "git/github": SiGit,
                          };
                          const nameLower = name.toLowerCase();
                          if (iconMap[nameLower]) {
                            const IconComp = iconMap[nameLower];
                            return <IconComp className="w-5 h-5" />;
                          }
                          switch (cat.toLowerCase()) {
                            case "programming":
                              return <Code2 className="w-5 h-5 text-amber-400" />;
                            case "frontend":
                              return <Layout className="w-5 h-5 text-sky-400" />;
                            case "backend":
                              return <Server className="w-5 h-5 text-indigo-400" />;
                            case "databases":
                              return <Database className="w-5 h-5 text-emerald-400" />;
                            case "tools":
                              return <Wrench className="w-5 h-5 text-purple-400" />;
                            default:
                              return <Code2 className="w-5 h-5 text-primary" />;
                          }
                        };

                        return (
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            key={skill.id}
                            className="group relative p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
                          >
                            {/* Hover background gradient glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="flex items-center gap-3 relative z-10">
                              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:scale-105 transition-all duration-300">
                                {getSkillIcon(skill.name, skill.category)}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-sm text-foreground group-hover:text-white transition-colors">
                                  {skill.name}
                                </span>
                                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold">
                                  {skill.category}
                                </span>
                              </div>
                            </div>

                            {/* Progress bar Area */}
                            <div className="mt-3 relative z-10 flex flex-col gap-1">
                              <div className="flex items-center justify-between text-[10px] font-semibold">
                                <span className="text-muted-foreground font-mono">Proficiency</span>
                                <span className="text-primary/95 group-hover:text-white transition-colors font-mono">{skill.proficiency}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden relative border border-white/[0.02]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.proficiency}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                )}
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* CARD 3: REAL-TIME INTERN STATUS */}
          <div>
            <TiltCard tiltMax={8} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-1">Current Status</span>
                    <h4 className="text-lg font-display font-bold leading-tight mb-2">iLoma Technology</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Software Developer Intern</p>
                  </div>
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Local Time</span>
                    <span className="text-sm font-mono font-semibold text-primary">{time || "GMT+5:30"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Availability</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">Open to Offers</span>
                  </div>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* CARD 4: CORE METRICS */}
          <div>
            <TiltCard tiltMax={8} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col justify-between min-h-[220px]">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-3">Academic standings</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-2xl font-display font-bold text-gradient">7.7</span>
                      <span className="text-[10px] text-muted-foreground block font-semibold leading-tight">CGPA B.Tech CSE</span>
                    </div>
                    <div>
                      <span className="text-2xl font-display font-bold text-gradient">85.60%</span>
                      <span className="text-[10px] text-muted-foreground block font-semibold leading-tight">HSC Boards</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Experience</span>
                    <span className="text-sm font-bold text-foreground">2 Internships</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Graduation</span>
                    <span className="text-xs text-secondary font-mono font-bold">June 2026</span>
                  </div>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* CARD 5: CERTIFICATE SLIDESHOW */}
          <div>
            <TiltCard tiltMax={8} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col justify-between min-h-[220px] group/cert overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-[40px] rounded-full pointer-events-none group-hover/cert:bg-purple-500/20 transition-colors duration-500" />

                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2">Featured Credentials</span>
                  <h4 className="text-base font-display font-bold mb-1 leading-tight group-hover/cert:text-primary transition-colors duration-300">Certified SQL Developer</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">Issued by Simplilearn</p>

                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">SQL</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">AI & AICTE</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Verification active</span>
                  <a
                    href="#experience"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    View details <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

        </div>
      </Element>

      {/* PROJECTS */}
      <Element name="projects" id="projects" className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work, featuring full-stack applications and experimental interfaces.
            </p>
          </motion.div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-muted/20 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="relative overflow-visible">
              {/* Carousel controls */}
              {projects && projects.length > visibleItems && (
                <div className="absolute -top-16 right-4 md:-top-20 md:right-4 flex items-center gap-2.5 z-20">
                  <button
                    onClick={prevMajor}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 text-foreground transition-all duration-300 flex items-center justify-center shadow-lg active:scale-90"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMajor}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 text-foreground transition-all duration-300 flex items-center justify-center shadow-lg active:scale-90"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Slider Track Wrapper */}
              <div
                ref={majorCarouselRef}
                onScroll={handleMajorScroll}
                className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 w-full no-scrollbar px-1 py-4"
              >
                {projects?.map((project, idx) => (
                  <div
                    key={project.id}
                    className="snap-start"
                    style={{
                      width: `calc(${100 / visibleItems}% - ${(visibleItems - 1) * 24 / visibleItems}px)`,
                      flexShrink: 0
                    }}
                  >
                    <ProjectCard project={project} index={idx} />
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              {projects && projects.length > visibleItems && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: projects.length - visibleItems + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setMajorIndex(i);
                        scrollCarouselTo(majorCarouselRef.current, i);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        majorIndex === i ? "w-6 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Element>

      {/* MINOR PROJECTS */}
      <Element name="minor-projects" id="minor-projects" className="py-24 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Minor <span className="text-gradient">Projects</span></h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A collection of my lightweight practice and concept projects that helped me strengthen fundamentals, improve UI thinking, and build hands-on problem-solving experience.
          </p>
        </motion.div>

        {minorProjectsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-muted/20 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="relative overflow-visible">
            {/* Carousel controls */}
            {minorProjects && minorProjects.length > visibleItems && (
              <div className="absolute -top-16 right-4 md:-top-20 md:right-4 flex items-center gap-2.5 z-20">
                <button
                  onClick={prevMinor}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 text-foreground transition-all duration-300 flex items-center justify-center shadow-lg active:scale-90"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMinor}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 text-foreground transition-all duration-300 flex items-center justify-center shadow-lg active:scale-90"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Slider Track Wrapper */}
            <div
              ref={minorCarouselRef}
              onScroll={handleMinorScroll}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 w-full no-scrollbar px-1 py-4"
            >
              {minorProjects?.map((project, idx) => (
                <div
                  key={project.id}
                  className="snap-start"
                  style={{
                    width: `calc(${100 / visibleItems}% - ${(visibleItems - 1) * 24 / visibleItems}px)`,
                    flexShrink: 0
                  }}
                >
                  <MinorProjectCard project={project} index={idx} />
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {minorProjects && minorProjects.length > visibleItems && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: minorProjects.length - visibleItems + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMinorIndex(i);
                      scrollCarouselTo(minorCarouselRef.current, i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      minorIndex === i ? "w-6 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Element>

      {/* EXPERIENCE */}
      <Element name="experience" id="experience" className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Work <span className="text-gradient">Experience</span></h2>
            <p className="text-muted-foreground">My professional journey and certifications.</p>
          </motion.div>

          <div className="relative space-y-8 md:space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
            {experienceLoading ? (
              <div className="space-y-8">
                {[1, 2].map(i => <div key={i} className="h-40 bg-muted/20 animate-pulse rounded-2xl" />)}
              </div>
            ) : (
              experience?.map((item, idx) => (
                <ExperienceCard key={item.id} item={item} index={idx} />
              ))
            )}
          </div>
        </div>
      </Element>

      {/* CONTACT */}
      <Element name="contact" id="contact" className="py-24 relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                Available for New Projects
              </div>

              <Magnetic strength={0.2}>
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1]">
                  Let's work <br />
                  <span className="text-gradient">together.</span>
                </h2>
              </Magnetic>

              <p className="text-xl text-muted-foreground mb-12 max-w-md leading-relaxed">
                Have a vision you want to bring to life? I specialize in crafting high-performance digital experiences that merge design and technology.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Send, label: "Email", value: "khwajaiqyanali@gmail.com", href: "mailto:khwajaiqyanali@gmail.com", color: "text-primary", bgClass: "bg-primary/10 border-primary/20 group-hover:bg-primary/20", isNode: false },
                  { icon: Phone, label: "Phone", value: "+91 93594 96162", href: "tel:+919359496162", color: "text-secondary", bgClass: "bg-secondary/10 border-secondary/20 group-hover:bg-secondary/20", isNode: false },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: (
                      <div className="flex flex-col gap-2.5 mt-1">
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground text-sm font-semibold shadow-sm hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all cursor-default">
                            <span className="text-base leading-none">🍊</span> Nagpur
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground text-sm font-semibold shadow-sm hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all cursor-default">
                            <span className="text-base leading-none">🏰</span> Pune
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground text-sm font-semibold shadow-sm hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all cursor-default">
                            <span className="text-base leading-none">🕌</span> Hyderabad
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground font-medium bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10 mt-1">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                          </span>
                          Onsite & Hybrid Opportunities
                        </div>
                      </div>
                    ),
                    color: "text-emerald-400",
                    bgClass: "bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20",
                    isNode: true
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className={`group flex ${item.isNode ? 'items-start' : 'items-center'} gap-6`}
                  >
                    <Magnetic strength={0.3}>
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-colors shadow-xl shrink-0 ${item.color} ${item.bgClass || 'bg-white/5 border-white/10 group-hover:bg-white/10'}`}>
                        <item.icon size={24} />
                      </div>
                    </Magnetic>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-lg font-medium hover:text-primary transition-colors">{item.value}</a>
                      ) : item.isNode ? (
                        <div className="pt-1">{item.value}</div>
                      ) : (
                        <p className="text-lg font-medium">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Interactive Connect Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative min-h-[500px] flex items-center justify-center"
            >
              {/* Animated Connection Lines / Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-radial-gradient from-primary/20 to-transparent blur-3xl" />
              </div>

              {/* Central Hub */}
              <div className="relative z-10 w-full max-w-md">
                <SpotlightCard className="p-12 bg-card/10 backdrop-blur-3xl border-white/5 shadow-2xl overflow-visible">
                  <div className="flex flex-col items-center text-center space-y-12">
                    {/* Pulsing Core */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                      
                      {/* Rotating Badge on top-right of the profile picture */}
                      <div className="absolute -top-14 -right-20 md:-top-20 md:-right-28 z-20 pointer-events-none scale-75 md:scale-100 origin-center">
                        <RotatingBadge />
                      </div>

                      <Magnetic strength={0.4}>
                        <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-2xl relative z-10 group cursor-pointer overflow-hidden border border-white/10">
                          <img
                            src="/images/passport_img.png"
                            alt="Khwaja Iqyan Ali"
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          />

                          {/* Orbiting Tech Rings */}
                          <div className="absolute inset-[-20px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
                          <div className="absolute inset-[-40px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
                        </div>
                      </Magnetic>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-3xl font-display font-bold">Connect with me</h3>
                      <p className="text-muted-foreground">
                        Ready to start something amazing? Choose your preferred platform to reach out.
                      </p>
                    </div>

                    {/* Social Orbit Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {[
                        { icon: Github, label: "GitHub", handle: "@iqyanali17", href: "https://github.com/iqyanali17", color: "hover:text-primary" },
                        { icon: Linkedin, label: "LinkedIn", handle: "Iqyan Ali", href: "https://www.linkedin.com/in/khwaja-iqyan-ali-17-a-/", color: "hover:text-blue-400" },
                        { icon: Instagram, label: "Instagram", handle: "@_iq_.y._xn_", href: "https://www.instagram.com/_iq_.y._xn_?igsh=OXJ6MHF5ZHh2cWM1", color: "hover:text-pink-500" },
                        {
                          icon: Mail, label: "Email", handle: "Copy Email", onClick: () => {
                            navigator.clipboard.writeText("khwajaiqyanali@gmail.com");
                            toast({ title: "Email copied!", description: "My email address has been copied to your clipboard." });
                          }, color: "hover:text-emerald-400"
                        }
                      ].map((social, idx) => (
                        <Magnetic key={social.label} strength={0.2}>
                          {social.href ? (
                            <a
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300 hover:bg-white/10 group`}
                            >
                              <social.icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{social.label}</span>
                              <span className="text-[10px] opacity-50 font-mono truncate max-w-full">{social.handle}</span>
                            </a>
                          ) : (
                            <button
                              onClick={social.onClick}
                              className={`flex flex-col items-center w-full p-4 rounded-2xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300 hover:bg-white/10 group`}
                            >
                              <social.icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{social.label}</span>
                              <span className="text-[10px] opacity-50 font-mono">{social.handle}</span>
                            </button>
                          )}
                        </Magnetic>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>

                {/* Floating HUD Decorations */}
                <div className="absolute -bottom-8 -left-8 w-48 h-48 pointer-events-none opacity-20 animate-pulse">
                  <div className="w-full h-full rounded-full border-[10px] border-dashed border-primary/30 animate-[spin_20s_linear_infinite]" />
                </div>
                <div className="absolute -top-12 -right-12 w-32 h-32 pointer-events-none opacity-10">
                  <div className="w-full h-full rounded-full border-2 border-secondary/50 animate-[ping_3s_ease-in-out_infinite]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Element>

      <Footer />
      </div>
    </>
  );
}
