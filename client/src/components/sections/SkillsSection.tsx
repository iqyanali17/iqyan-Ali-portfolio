import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";
import { Code2, Wrench, Layout, Server, Database, ArrowRight } from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiFlask,
  SiSupabase,
  SiTailwindcss,
  SiMui,
  SiGit,
} from "react-icons/si";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useSkills } from "@/hooks/use-portfolio";
import { LineByLineReveal, SectionReveal } from "@/components/animations";

const RadarScanWidget = React.lazy(() => import("@/components/ui/RadarScanWidget"));

// Isolated Clock micro-component: only this re-renders every 1s, keeping the rest of the app at 60fps!
function LocalTimeBadge() {
  const [time, setTime] = useState("");

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

  return <span className="text-sm font-mono font-semibold text-primary">{time || "GMT+5:30"}</span>;
}

export function SkillsSection() {
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cyclingWordIdx, setCyclingWordIdx] = useState(0);
  const [isCyclingPaused, setIsCyclingPaused] = useState(false);
  const cyclingWords = [
    { from: "Prompts", to: "Clean Code" },
    { from: "Coffee", to: "Scalable APIs" },
    { from: "Problems", to: "Smart Solutions" },
    { from: "Bugs", to: "Digital Reality" },
  ];

  const nextCyclingWord = () => {
    setCyclingWordIdx((prev) => (prev + 1) % cyclingWords.length);
  };

  useEffect(() => {
    if (isCyclingPaused) return;
    const interval = setInterval(() => {
      setCyclingWordIdx((prev) => (prev + 1) % cyclingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isCyclingPaused, cyclingWords.length]);

  const filteredSkills = skills?.filter((skill) => {
    if (selectedCategory === "All") return true;
    return skill.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getSkillIcon = (name: string, cat: string) => {
    const iconMap: Record<string, any> = {
      react: SiReact,
      "node.js": SiNodedotjs,
      "express.js": SiExpress,
      mongodb: SiMongodb,
      typescript: SiTypescript,
      javascript: SiJavascript,
      python: SiPython,
      flask: SiFlask,
      supabase: SiSupabase,
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
    <Element name="skills" id="skills" className="py-24 container mx-auto px-6 scroll-mt-20">
      <LineByLineReveal
        start="top 85%"
        end="bottom 15%"
        fromY={-24}
        exitY={-28}
        stagger={0.14}
        duration={0.75}
        className="text-center mb-16"
      >
        {/* Line 1: Premium Animated Badge */}
        <div
          className="reveal-line inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7 relative overflow-hidden"
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
          <span
            className="relative text-xs font-bold tracking-[0.2em] uppercase"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ⚡ Interactive Skill Dashboard
          </span>
        </div>

        {/* Line 2: Heading with Static Context and Interactive 3D Cycling Word Capsules */}
        <div
          onMouseEnter={() => setIsCyclingPaused(true)}
          onMouseLeave={() => setIsCyclingPaused(false)}
          className="reveal-line flex flex-col items-center justify-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-3 text-white select-none">
            <span className="sr-only">Technical Skills &amp; Stack: </span>
            <span className="text-white drop-shadow-md">I turn</span>

            {/* Dynamic Input Word Capsule */}
            <motion.button
              layout
              type="button"
              onClick={nextCyclingWord}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-2xl bg-[#0d0d14]/90 border border-purple-500/35 hover:border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.18)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-xl transition-all duration-300 overflow-hidden cursor-pointer group"
              style={{ perspective: 800 }}
              title="Click to cycle next phrase"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`from-${cyclingWordIdx}`}
                  initial={{ y: 32, opacity: 0, rotateX: -40, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                  exit={{ y: -32, opacity: 0, rotateX: 40, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block whitespace-nowrap font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-200"
                >
                  {cyclingWords[cyclingWordIdx].from}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <span className="text-white drop-shadow-md">into</span>

            {/* Dynamic Output Word Capsule */}
            <motion.button
              layout
              type="button"
              onClick={nextCyclingWord}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-2xl bg-[#0d0d14]/90 border border-sky-500/35 hover:border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.18)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] backdrop-blur-xl transition-all duration-300 overflow-hidden cursor-pointer group"
              style={{ perspective: 800 }}
              title="Click to cycle next phrase"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`to-${cyclingWordIdx}`}
                  initial={{ y: 32, opacity: 0, rotateX: -40, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                  exit={{ y: -32, opacity: 0, rotateX: 40, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block whitespace-nowrap font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-200"
                >
                  {cyclingWords[cyclingWordIdx].to}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </h2>

          {/* Interactive Dot Indicators */}
          <div className="flex items-center gap-2 mt-4 select-none">
            {cyclingWords.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCyclingWordIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  cyclingWordIdx === idx
                    ? "w-7 bg-gradient-to-r from-purple-400 to-sky-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Jump to phrase ${idx + 1}`}
                title={`${item.from} → ${item.to}`}
              />
            ))}
          </div>
        </div>

        {/* Line 3: Subtitle */}
        <p className="reveal-line text-zinc-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          A deep-dive into my <span className="text-purple-300 font-semibold">core competencies</span>,{" "}
          <span className="text-sky-300 font-semibold">coding philosophy</span>, and{" "}
          <span className="text-violet-300 font-semibold">real-world achievements</span> — presented in an
          interactive dashboard you can explore.
        </p>
      </LineByLineReveal>

      <SectionReveal
        start="top 85%"
        end="bottom 15%"
        fromY={-20}
        exitY={-25}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* CARD 1: BIO & TERMINAL CODE BOX */}
        <div className="md:col-span-2 md:row-span-2">
          <TiltCard tiltMax={4} className="h-full">
            <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-8 flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
                    <Code2 className="text-purple-400 w-5 h-5" />
                    Interactive developer_profile.json
                  </h3>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                </div>

                <p className="text-zinc-300 text-base leading-relaxed mb-6">
                  I am a results-driven Full-Stack Developer and former Software Developer Intern with hands-on
                  experience building and deploying 5+ real-world web applications and AI-powered solutions.
                  Specializing in the MERN stack and Python (Flask), I engineer scalable web products from fluid
                  frontend interfaces to secure backend APIs and databases.
                </p>
                <p className="text-zinc-300 text-base leading-relaxed mb-8">
                  Through my internship at iLoma Technology and independent projects, I have established a strong
                  focus on clean architecture, secure authentication systems (JWT/RBAC), and high-performance
                  RESTful APIs. I thrive in Agile, collaborative environments, dedicating myself to code optimization
                  and delivering reliable, production-ready software solutions.
                </p>
              </div>

              {/* Simulated IDE / Terminal output block */}
              <div className="bg-black/40 rounded-2xl p-5 border border-white/5 font-mono text-sm leading-relaxed text-blue-300 relative group overflow-hidden">
                <div className="absolute top-2 right-4 text-xs text-white/20 select-none">JSON</div>
                <pre className="overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
                  <span className="text-purple-400">{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-amber-400">"name"</span>:{" "}
                  <span className="text-emerald-400">"Khwaja Iqyan Ali"</span>,{"\n"}
                  {"  "}
                  <span className="text-amber-400">"currentRole"</span>:{" "}
                  <span className="text-emerald-400">"Software Developer Intern at iLoma"</span>,{"\n"}
                  {"  "}
                  <span className="text-amber-400">"stackFocus"</span>:{" "}
                  <span className="text-emerald-400">["MongoDB", "Express", "React", "Node", "Flask", "TS"]</span>,
                  {"\n"}
                  {"  "}
                  <span className="text-amber-400">"passions"</span>:{" "}
                  <span className="text-emerald-400">
                    ["Scalable APIs", "Intuitive UX Design", "Clean Architecture"]
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-amber-400">"location"</span>:{" "}
                  <span className="text-emerald-400">"Nagpur, Pune, Hyderabad, etc. (Onsite / Hybrid)"</span>
                  {"\n"}
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
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Wrench className="text-sky-400 w-5 h-5 animate-spin-slow" />
                  Skills Directory
                </h3>
                <span className="text-[10px] font-mono bg-purple-500/15 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  {filteredSkills?.length || 0} Skills
                </span>
              </div>

              {/* Category buttons (Segmented control) */}
              <div className="flex flex-wrap gap-1 mb-6 bg-white/5 p-1 rounded-2xl border border-white/5">
                {["All", "Programming", "Frontend", "Backend", "Databases", "Tools"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-1 min-w-[70px] text-center px-2 py-1.5 rounded-xl text-[10px] font-bold tracking-wide transition-all duration-300 ${
                      selectedCategory === category
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
                    {filteredSkills?.map((skill) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        key={skill.id}
                        className="group relative p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
                      >
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
                            <span className="text-primary/95 group-hover:text-white transition-colors font-mono">
                              {skill.proficiency}%
                            </span>
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
                    ))}
                  </motion.div>
                </div>
              )}
            </SpotlightCard>
          </TiltCard>
        </div>

        {/* CARD 3: REAL-TIME INTERN STATUS WITH ISOLATED CLOCK */}
        <div>
          <TiltCard tiltMax={8} className="h-full">
            <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col justify-between min-h-[220px]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-1">
                    Current Status
                  </span>
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
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">
                    Local Time
                  </span>
                  <LocalTimeBadge />
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">
                    Availability
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                    Open to Offers
                  </span>
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
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-3">
                  Academic standings
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-2xl font-display font-bold text-gradient">7.7</span>
                    <span className="text-[10px] text-muted-foreground block font-semibold leading-tight">
                      CGPA B.Tech CSE
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-display font-bold text-gradient">85.60%</span>
                    <span className="text-[10px] text-muted-foreground block font-semibold leading-tight">
                      HSC Boards
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">
                    Experience
                  </span>
                  <span className="text-sm font-bold text-foreground">2 Internships</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">
                    Graduation
                  </span>
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
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2">
                  Featured Credentials
                </span>
                <h4 className="text-base font-display font-bold mb-1 leading-tight group-hover/cert:text-primary transition-colors duration-300">
                  Certified SQL Developer
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">Issued by Simplilearn</p>

                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                    SQL
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                    AI & AICTE
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Verification active</span>
                <a
                  href="#experience"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                >
                  View details <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>
          </TiltCard>
        </div>

        {/* CARD 6: FUTURISTIC RADAR SCAN WIDGET */}
        <div className="md:col-span-3">
          <TiltCard tiltMax={1} className="h-full">
            <SpotlightCard className="h-full bg-card/10 backdrop-blur-xl border border-white/5 p-6 md:p-8 flex flex-col items-center justify-center min-h-[580px] overflow-hidden relative text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 [background:radial-gradient(circle,hsl(var(--primary)/0.1)_0%,transparent_70%)] rounded-full blur-[50px] pointer-events-none animate-pulse transform-gpu will-change-transform" />

              <div className="space-y-4 mb-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                  </span>
                  System Integration Sweep
                </div>

                <h4 className="text-2xl md:text-4xl font-display font-bold text-white">
                  Automation & Workflow Architect
                </h4>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {["n8n Automation", "CRM Sync", "AI Agents", "Headless E-Com", "Custom REST APIs"].map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10 font-bold font-mono tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Radar Visual Widget */}
              <div className="w-full flex items-center justify-center z-10 min-h-[480px]">
                <React.Suspense fallback={
                  <div className="w-[320px] h-[320px] rounded-full border border-purple-500/20 flex items-center justify-center animate-pulse">
                    <div className="w-20 h-20 rounded-full border border-purple-500/30" />
                  </div>
                }>
                  <RadarScanWidget />
                </React.Suspense>
              </div>
            </SpotlightCard>
          </TiltCard>
        </div>
      </SectionReveal>
    </Element>
  );
}

export default SkillsSection;
