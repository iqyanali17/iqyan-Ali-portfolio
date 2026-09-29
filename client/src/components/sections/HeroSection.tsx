import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Element } from "react-scroll";
import { SiReact, SiTypescript, SiNodedotjs, SiPython } from "react-icons/si";
import { ArrowRight, Download, Sparkles, Code2, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/TiltCard";
import { LineByLineReveal } from "@/components/animations";

// ── Orchestrated entrance variants for the right-side hero composition ──
const sceneContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const ambientDepthVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

const orbitRingVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 0.75,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const portraitVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

// Elastic spring pop animations for tech badges radiating from portrait center
const badgeReactVariants = {
  hidden: { opacity: 0, scale: 0, x: 20, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
      mass: 0.8,
      delay: 0.3,
    },
  },
};

const badgeTsVariants = {
  hidden: { opacity: 0, scale: 0, x: -20, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
      mass: 0.8,
      delay: 0.38,
    },
  },
};

const badgeNodeVariants = {
  hidden: { opacity: 0, scale: 0, x: 20, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
      mass: 0.8,
      delay: 0.46,
    },
  },
};

const badgePythonVariants = {
  hidden: { opacity: 0, scale: 0, x: -20, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
      mass: 0.8,
      delay: 0.54,
    },
  },
};

const statsDockVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 18 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const portraitX = useTransform(smoothX, (x) => x * 6);
  const portraitY = useTransform(smoothY, (y) => y * 6);

  const badgeX = useTransform(smoothX, (x) => x * 12);
  const badgeY = useTransform(smoothY, (y) => y * 12);

  const rectRef = React.useRef<DOMRect | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Element
      name="hero"
      id="hero"
      className="relative min-h-screen lg:h-screen lg:max-h-[960px] xl:max-h-[1050px] flex items-center justify-center pt-16 md:pt-14 lg:pt-10 pb-3 md:pb-4 overflow-hidden overflow-x-clip"
    >
      {/* Target for nav #about link as well */}
      <span id="about" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" aria-hidden="true" />

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-28 sm:-left-32 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 sm:-right-32 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 w-full max-w-7xl">
        {/* Left Column - Hero Copy with Grand Typography filling the viewport */}
        <div className="text-center lg:text-left lg:flex-1 w-full max-w-xl md:max-w-2xl xl:max-w-3xl flex flex-col justify-center">
          <LineByLineReveal
            start="top 90%"
            end="bottom 15%"
            fromY={-20}
            exitY={-24}
            stagger={0.1}
            duration={0.75}
            selector=".reveal-line"
          >
            {/* Line 1: Futuristic Neon Live Status Badge */}
            <div className="reveal-line inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.05] border border-purple-500/30 text-zinc-200 text-xs sm:text-sm font-semibold mb-2.5 sm:mb-3 tracking-wider uppercase backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.18)] select-none w-fit mx-auto lg:mx-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_#34d399]"></span>
              </span>
              <span>Available for Hire &amp; Engineering</span>
            </div>

            {/* Line 2: Monospace greeting */}
            <div className="reveal-line flex items-center justify-center lg:justify-start gap-2 mb-1 sm:mb-1.5 text-purple-400 font-mono text-sm sm:text-base md:text-lg lg:text-xl tracking-widest font-semibold">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Hello, I'm</span>
            </div>

            {/* Line 3 & 4: Name lines - Grand, Commanding Scale */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-black mb-2.5 sm:mb-3.5 tracking-tight leading-[1.04] text-white">
              <span className="sr-only">Khwaja Iqyan Ali — Full Stack Developer</span>
              <span className="reveal-line block drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">Khwaja</span>
              <span className="reveal-line block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
                Iqyan Ali
              </span>
            </h1>

            {/* Line 5: Hero Subtitle - Full, Rich & Legible */}
            <p className="reveal-line text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-zinc-300 mb-5 sm:mb-7 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              A <span className="text-white font-semibold underline decoration-purple-500/50 underline-offset-4">Full-Stack Developer</span> crafting futuristic digital experiences with the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-sky-400 font-bold tracking-tight">
                MERN stack
              </span>{" "}
              &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300 font-bold tracking-tight">
                Python
              </span>.
            </p>

            {/* Line 6: Prominent Interactive Action Buttons */}
            <div className="reveal-line flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <Button
                size="lg"
                className="rounded-2xl px-7 sm:px-8 h-12 sm:h-13 text-sm sm:text-base font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_28px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300 group"
                onClick={() => {
                  window.location.hash = "#contact";
                  setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 0);
                }}
              >
                Let's Talk <ArrowRight className="ml-2.5 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl px-7 sm:px-8 h-12 sm:h-13 text-sm sm:text-base font-semibold border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-100 hover:text-white hover:border-purple-400/40 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300 backdrop-blur-md shadow-lg"
                asChild
              >
                <a
                  href="/Khwaja_Iqyan_Ali_Resume.pdf?v=2"
                  download="Khwaja_Iqyan_Ali_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume <Download className="ml-2.5 h-4 sm:h-5 w-4 sm:w-5 text-purple-400" />
                </a>
              </Button>
            </div>

            {/* Line 7: Micro Tech Highlights Row */}
            <div className="reveal-line mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 sm:gap-6 justify-center lg:justify-start text-xs sm:text-sm text-zinc-400 select-none">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-purple-400 shrink-0" />
                <span className="text-zinc-300 font-medium">Full-Stack Web</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-sky-400 shrink-0" />
                <span className="text-zinc-300 font-medium">Fast Production APIs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300 font-medium">Clean Scalable Code</span>
              </div>
            </div>
          </LineByLineReveal>
        </div>

        {/* Right Column - Hero Scene with Animated Entrance Transitions on Portrait & Badges */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:flex-1 flex flex-col items-center justify-center select-none w-full max-w-full"
        >
          {/* ── SCENE CONTAINER: Generous portrait framing with guaranteed centering for stats ── */}
          <motion.div
            variants={sceneContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[490px] lg:max-w-[530px] xl:max-w-[580px] 2xl:max-w-[620px] h-[450px] sm:h-[510px] md:h-[550px] lg:h-[580px] xl:h-[620px] 2xl:h-[660px] max-h-[calc(100vh-80px)] flex items-center justify-center flex-shrink-0"
          >
            {/* ── 1. AMBIENT DEPTH: Blooms smoothly into view ── */}
            <motion.div
              variants={ambientDepthVariants}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
              style={{ transform: "translateY(-15px)" }}
            >
              <div className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[470px] md:h-[470px] lg:w-[520px] lg:h-[520px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,rgba(99,102,241,0.09)_45%,transparent_70%)] blur-2xl pointer-events-none" />
            </motion.div>

            {/* ── 2. ORBIT RING: Smooth scale & spin entrance ── */}
            <motion.div
              variants={orbitRingVariants}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
              style={{ perspective: "900px", transform: "translateY(-15px)" }}
            >
              <motion.div
                className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px] xl:w-[560px] xl:h-[560px]"
                style={{ transformStyle: "preserve-3d", rotateX: 72, rotateY: -10 }}
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 480 480" fill="none" className="w-full h-full opacity-75">
                  <defs>
                    <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
                      <stop offset="40%" stopColor="#6366f1" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                    </linearGradient>
                    <style>{`@keyframes dash-orbit{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-1507}}`}</style>
                  </defs>
                  <ellipse cx="240" cy="240" rx="225" ry="225" stroke="rgba(168,85,247,0.18)" strokeWidth="1.5" />
                  <ellipse cx="240" cy="240" rx="225" ry="225" stroke="url(#orbitGrad)" strokeWidth="2.5" strokeDasharray="85 40" style={{ animation: "dash-orbit 7.5s linear infinite" }} />
                  <circle cx="240" cy="15" r="5" fill="#a78bfa" style={{ filter: "drop-shadow(0 0 10px #c084fc)" }} />
                </svg>
              </motion.div>
            </motion.div>

            {/* ── 3. PORTRAIT & ATTACHED STATS PEDESTAL: Heroic Scale with guaranteed centered pedestal on legs ── */}
            <motion.div
              variants={portraitVariants}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <motion.div
                className="relative h-[370px] sm:h-[430px] md:h-[480px] lg:h-[520px] xl:h-[560px] 2xl:h-[600px] max-h-[calc(100vh-100px)] flex flex-col items-center justify-center pointer-events-auto"
                style={{ transform: "translateY(-10px)", x: portraitX, y: portraitY }}
              >
                <TiltCard tiltMax={6} className="h-full flex items-center justify-center relative">
                  <img
                    src="/images/Iqyan_ali.webp"
                    alt="Iqyan Ali — Full Stack Developer &amp; Software Engineer"
                    width={1024}
                    height={1536}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] filter-none pointer-events-none transition-transform duration-300"
                  />

                  {/* ── STATS PEDESTAL: Permanently locked directly onto the bottom of Iqyan's portrait legs ── */}
                  <div className="absolute -bottom-3 sm:-bottom-4 left-0 right-0 flex justify-center z-40 pointer-events-none">
                    <motion.div
                      variants={statsDockVariants}
                      className="w-[94%] sm:w-auto min-w-[320px] sm:min-w-[370px] md:min-w-[410px] grid grid-cols-4 divide-x divide-white/10 bg-gradient-to-r from-[#0d0e17]/95 via-[#090910]/95 to-[#0d0e17]/95 border border-white/15 rounded-[18px] sm:rounded-[20px] py-2 px-1 sm:px-1.5 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] select-none pointer-events-auto"
                    >
                      <div className="flex flex-col items-center justify-center text-center px-1 group/stat cursor-default">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400 mb-0.5 group-hover/stat:scale-115 transition-transform duration-300"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path></svg>
                        <span className="text-zinc-100 text-[11px] sm:text-xs font-extrabold leading-none tracking-tight">10+</span>
                        <span className="text-[6.5px] sm:text-[7.5px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight text-center">Projects<br />Done</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center px-1 group/stat cursor-default">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-sky-400 mb-0.5 group-hover/stat:scale-115 transition-transform duration-300"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
                        <span className="text-zinc-100 text-[11px] sm:text-xs font-extrabold leading-none tracking-tight">2+</span>
                        <span className="text-[6.5px] sm:text-[7.5px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight text-center">Internship<br />Exp.</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center px-1 group/stat cursor-default">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400 mb-0.5 group-hover/stat:scale-115 transition-transform duration-300"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
                        <span className="text-zinc-100 text-[11px] sm:text-xs font-extrabold leading-none tracking-tight">Top 3%</span>
                        <span className="text-[6.5px] sm:text-[7.5px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight text-center">Academic<br />Honors</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center px-1 group/stat cursor-default">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400 mb-0.5 group-hover/stat:scale-115 transition-transform duration-300"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
                        <span className="text-zinc-100 text-[11px] sm:text-xs font-extrabold leading-none tracking-tight">Passion</span>
                        <span className="text-[6.5px] sm:text-[7.5px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight text-center">Problem<br />Solving</span>
                      </div>
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>

            {/* ── 4. TECH BADGE 1: React — Pop-out entrance with spring bounce ── */}
            <motion.div
              variants={badgeReactVariants}
              className="absolute z-30 top-[8%] sm:top-[10%] left-0 sm:-left-3 md:-left-6 lg:-left-10 xl:-left-14"
            >
              <motion.div style={{ x: badgeX, y: badgeY }}>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
                  <div className="group w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] md:w-[82px] md:h-[82px] lg:w-[88px] lg:h-[88px] bg-gradient-to-b from-[#131422]/95 via-[#0c0d16]/95 to-[#07070d]/98 border border-white/15 hover:border-cyan-400/60 rounded-[18px] sm:rounded-[22px] md:rounded-[24px] flex flex-col items-center justify-center gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,216,255,0.18)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_35px_rgba(0,216,255,0.45)] backdrop-blur-2xl hover:scale-110 hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all duration-300 cursor-pointer select-none">
                    <div className="relative">
                      <SiReact className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#00d8ff] group-hover:rotate-180 transition-transform duration-700 ease-out" />
                      <span className="absolute -top-1 -right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d8ff]" />
                    </div>
                    <span className="text-[8.5px] sm:text-[10px] md:text-xs font-bold text-zinc-100 font-mono tracking-wider">React</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── 5. TECH BADGE 2: TypeScript — Pop-out entrance with spring bounce ── */}
            <motion.div
              variants={badgeTsVariants}
              className="absolute z-30 top-[8%] sm:top-[10%] right-0 sm:-right-3 md:-right-6 lg:-right-10 xl:-right-14"
            >
              <motion.div style={{ x: badgeX, y: badgeY }}>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
                  <div className="group w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] md:w-[82px] md:h-[82px] lg:w-[88px] lg:h-[88px] bg-gradient-to-b from-[#131422]/95 via-[#0c0d16]/95 to-[#07070d]/98 border border-white/15 hover:border-blue-400/60 rounded-[18px] sm:rounded-[22px] md:rounded-[24px] flex flex-col items-center justify-center gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(49,120,198,0.18)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_35px_rgba(49,120,198,0.45)] backdrop-blur-2xl hover:scale-110 hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 cursor-pointer select-none">
                    <div className="relative">
                      <SiTypescript className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#3178c6] group-hover:scale-110 transition-transform duration-300" />
                      <span className="absolute -top-1 -right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#3178c6]" />
                    </div>
                    <span className="text-[8.5px] sm:text-[10px] md:text-xs font-bold text-zinc-100 font-mono tracking-wider">TypeScript</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── 6. TECH BADGE 3: Node.js — Pop-out entrance with spring bounce ── */}
            <motion.div
              variants={badgeNodeVariants}
              className="absolute z-30 top-[50%] sm:top-[52%] left-0 sm:-left-3 md:-left-6 lg:-left-11 xl:-left-16"
            >
              <motion.div style={{ x: badgeX, y: badgeY }}>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
                  <div className="group w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] md:w-[82px] md:h-[82px] lg:w-[88px] lg:h-[88px] bg-gradient-to-b from-[#131422]/95 via-[#0c0d16]/95 to-[#07070d]/98 border border-white/15 hover:border-emerald-400/60 rounded-[18px] sm:rounded-[22px] md:rounded-[24px] flex flex-col items-center justify-center gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(34,197,94,0.18)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_35px_rgba(34,197,94,0.45)] backdrop-blur-2xl hover:scale-110 hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all duration-300 cursor-pointer select-none">
                    <div className="relative">
                      <SiNodedotjs className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#22c55e] group-hover:scale-110 transition-transform duration-300" />
                      <span className="absolute -top-1 -right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e]" />
                    </div>
                    <span className="text-[8.5px] sm:text-[10px] md:text-xs font-bold text-zinc-100 font-mono tracking-wider">Node.js</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── 7. TECH BADGE 4: Python — Pop-out entrance with spring bounce ── */}
            <motion.div
              variants={badgePythonVariants}
              className="absolute z-30 top-[50%] sm:top-[52%] right-0 sm:-right-3 md:-right-6 lg:-right-11 xl:-right-16"
            >
              <motion.div style={{ x: badgeX, y: badgeY }}>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}>
                  <div className="group w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] md:w-[82px] md:h-[82px] lg:w-[88px] lg:h-[88px] bg-gradient-to-b from-[#131422]/95 via-[#0c0d16]/95 to-[#07070d]/98 border border-white/15 hover:border-yellow-400/60 rounded-[18px] sm:rounded-[22px] md:rounded-[24px] flex flex-col items-center justify-center gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,212,59,0.18)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_35px_rgba(255,212,59,0.45)] backdrop-blur-2xl hover:scale-110 hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 transition-all duration-300 cursor-pointer select-none">
                    <div className="relative">
                      <SiPython className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#ffd43b] group-hover:scale-110 transition-transform duration-300" />
                      <span className="absolute -top-1 -right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#ffd43b]" />
                    </div>
                    <span className="text-[8.5px] sm:text-[10px] md:text-xs font-bold text-zinc-100 font-mono tracking-wider">Python</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Element>
  );
}

export default HeroSection;
