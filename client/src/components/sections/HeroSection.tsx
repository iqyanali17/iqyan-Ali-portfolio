import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Element } from "react-scroll";
import { SiReact, SiTypescript, SiNodedotjs, SiPython } from "react-icons/si";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/TiltCard";
import { LineByLineReveal } from "@/components/animations";

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 18 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const portraitX = useTransform(smoothX, (x) => x * 5);
  const portraitY = useTransform(smoothY, (y) => y * 5);

  const badgeX = useTransform(smoothX, (x) => x * 10);
  const badgeY = useTransform(smoothY, (y) => y * 10);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Element name="hero" id="hero" className="relative min-h-screen md:h-screen flex items-center justify-center pt-16 md:pt-14 pb-2 md:pb-4 overflow-hidden">
      {/* Target for nav #about link as well */}
      <span id="about" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 -mt-2 md:-mt-4">
        {/* Left Column - Hero Copy with Smooth Line-by-Line Entrance & Exit */}
        <div className="text-center md:text-left md:flex-1 w-full max-w-xl">
          <LineByLineReveal
            start="top 90%"
            end="bottom 15%"
            fromY={-20}
            exitY={-24}
            blur={8}
            stagger={0.12}
            duration={0.75}
            selector=".reveal-line"
          >
            {/* Line 1: Futuristic Neon Live Status Badge */}
            <div className="reveal-line inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-xs font-semibold mb-3 tracking-wider uppercase backdrop-blur-sm select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Active Intern & Engineer
            </div>

            {/* Line 2: Monospace greeting */}
            <h2 className="reveal-line text-purple-400 font-mono mb-1.5 text-base sm:text-lg tracking-widest font-semibold">
              Hello, I'm
            </h2>

            {/* Line 3 & 4: Name lines */}
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-display font-extrabold mb-3 tracking-tight leading-[1.08] text-white">
              <span className="reveal-line block">Khwaja</span>
              <span className="reveal-line block text-gradient">Iqyan Ali</span>
            </h1>

            {/* Line 5: Hero Subtitle */}
            <p className="reveal-line text-sm sm:text-base md:text-lg text-zinc-300 mb-6 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
              A <span className="text-white font-semibold">Full-Stack Developer</span> crafting futuristic digital experiences with the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-sky-400 font-bold tracking-tight">
                MERN stack
              </span>{" "}
              &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300 font-bold tracking-tight">
                Python
              </span>.
            </p>

            {/* Line 6: Action Buttons */}
            <div className="reveal-line flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
              <Button
                size="lg"
                className="rounded-full px-7 h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                onClick={() => {
                  window.location.hash = "#contact";
                  setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 0);
                }}
              >
                Let's Talk <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-7 h-12 text-sm font-semibold border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                asChild
              >
                <a
                  href="/Khwaja_Iqyan_Ali_Resume.pdf?v=2"
                  download="Khwaja_Iqyan_Ali_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </LineByLineReveal>
        </div>

        {/* Right Column - Hero Scene with Zero-Rerender GPU Parallax */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="md:flex-1 flex flex-col items-center justify-center select-none w-full max-w-full"
        >
          {/* ── SCENE: container, fits desktop height cleanly with zero cutoffs ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[440px] lg:max-w-[470px] h-[450px] sm:h-[480px] md:h-[500px] flex items-center justify-center flex-shrink-0"
          >
            {/* ── PURE SEAMLESS AMBIENT DEPTH ── */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
              style={{ transform: "translateY(-24px)" }}
            >
              <div className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,rgba(99,102,241,0.05)_45%,transparent_70%)] blur-2xl pointer-events-none" />
            </div>

            {/* ── ORBIT RING: Sleek 3D Holographic Orbit Ring around Portrait ── */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
              style={{ perspective: "900px", transform: "translateY(-24px)" }}
            >
              <motion.div
                style={{ transformStyle: "preserve-3d", rotateX: 72, rotateY: -10, width: 440, height: 440 }}
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg width="440" height="440" viewBox="0 0 440 440" fill="none" className="opacity-70">
                  <defs>
                    <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
                      <stop offset="40%" stopColor="#6366f1" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                    </linearGradient>
                    <style>{`@keyframes dash-orbit{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-1382}}`}</style>
                  </defs>
                  <ellipse cx="220" cy="220" rx="205" ry="205" stroke="rgba(168,85,247,0.15)" strokeWidth="1.5" />
                  <ellipse cx="220" cy="220" rx="205" ry="205" stroke="url(#orbitGrad)" strokeWidth="2.5" strokeDasharray="80 38" style={{ animation: "dash-orbit 7s linear infinite" }} />
                  <circle cx="220" cy="15" r="5" fill="#a78bfa" style={{ filter: "drop-shadow(0 0 10px #c084fc)" }} />
                </svg>
              </motion.div>
            </div>

            {/* ── ENLARGED PORTRAIT (Crisp Iqyan_ali.webp with Smooth 3D Parallax) ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
              style={{ transform: "translateY(-24px)", x: portraitX, y: portraitY }}
            >
              <div className="relative h-[360px] sm:h-[390px] md:h-[420px] lg:h-[440px] flex items-center justify-center pointer-events-auto">
                <TiltCard tiltMax={8} className="h-full flex items-center justify-center">
                  <img
                    src="/images/Iqyan_ali.webp"
                    alt="Khwaja Iqyan Ali"
                    width={1024}
                    height={1536}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter-none pointer-events-none transition-transform duration-300"
                  />
                </TiltCard>
              </div>
            </motion.div>

            {/* React — shoulder left, neatly rounded to the portrait */}
            <motion.div
              className="absolute z-30 top-[17%] left-[-6px] sm:left-[2%]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ x: badgeX, y: badgeY }}
              transition={{ opacity: { duration: 0.5, delay: 0.3 }, scale: { duration: 0.5, delay: 0.3 } }}
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
                <div className="w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] bg-[#0a0a0f]/90 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-[0_8px_25px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:scale-110 hover:border-purple-500/50 transition-all duration-300 cursor-default">
                  <SiReact className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 animate-[spin_12s_linear_infinite]" />
                  <span className="text-[7.5px] font-bold text-zinc-200 font-mono">React</span>
                </div>
              </motion.div>
            </motion.div>

            {/* TypeScript — shoulder right, neatly rounded to the portrait */}
            <motion.div
              className="absolute z-30 top-[17%] right-[-6px] sm:right-[2%]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ x: badgeX, y: badgeY }}
              transition={{ opacity: { duration: 0.5, delay: 0.45 }, scale: { duration: 0.5, delay: 0.45 } }}
            >
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
                <div className="w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] bg-[#0a0a0f]/90 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-[0_8px_25px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:scale-110 hover:border-blue-500/50 transition-all duration-300 cursor-default">
                  <SiTypescript className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-[7.5px] font-bold text-zinc-200 font-mono">TypeScript</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Node.js — mid-left waist, rounded curve around silhouette */}
            <motion.div
              className="absolute z-30 top-[52%] -left-3 sm:left-[0%]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ x: badgeX, y: badgeY }}
              transition={{ opacity: { duration: 0.5, delay: 0.6 }, scale: { duration: 0.5, delay: 0.6 } }}
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
                <div className="w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] bg-[#0a0a0f]/90 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-[0_8px_25px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:scale-110 hover:border-emerald-500/50 transition-all duration-300 cursor-default">
                  <SiNodedotjs className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <span className="text-[7.5px] font-bold text-zinc-200 font-mono">Node.js</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Python — mid-right waist, rounded curve around silhouette */}
            <motion.div
              className="absolute z-30 top-[52%] -right-3 sm:right-[0%]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ x: badgeX, y: badgeY }}
              transition={{ opacity: { duration: 0.5, delay: 0.75 }, scale: { duration: 0.5, delay: 0.75 } }}
            >
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}>
                <div className="w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] bg-[#0a0a0f]/90 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-[0_8px_25px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:scale-110 hover:border-yellow-500/50 transition-all duration-300 cursor-default">
                  <SiPython className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <span className="text-[7.5px] font-bold text-zinc-200 font-mono">Python</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ── STATS BAR: Sleek glass pedestal anchored at base ── */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[96%] sm:w-[94%] grid grid-cols-4 divide-x divide-white/10 bg-[#08080c]/90 border border-white/10 rounded-[18px] py-2 px-1 backdrop-blur-xl shadow-2xl z-40 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] select-none">
              <div className="flex flex-col items-center justify-center text-center px-1 group/stat cursor-default">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-purple-400 mb-0.5 group-hover/stat:scale-110 transition-transform duration-300"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path></svg>
                <span className="text-zinc-100 text-[11px] font-bold leading-none">10+</span>
                <span className="text-[7px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight text-center">Projects<br />Done</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1 group/stat cursor-default">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-sky-400 mb-0.5 group-hover/stat:scale-110 transition-transform duration-300"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
                <span className="text-zinc-100 text-[11px] font-bold leading-none">2+</span>
                <span className="text-[7px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight text-center">Internship<br />Exp.</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1 group/stat cursor-default">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-purple-400 mb-0.5 group-hover/stat:scale-110 transition-transform duration-300"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
                <span className="text-zinc-100 text-[11px] font-bold leading-none">Top 3%</span>
                <span className="text-[7px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight text-center">Academic<br />Honors</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-1 group/stat cursor-default">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-purple-400 mb-0.5 group-hover/stat:scale-110 transition-transform duration-300"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
                <span className="text-zinc-100 text-[11px] font-bold leading-none">Passion</span>
                <span className="text-[7px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight text-center">Problem<br />Solving</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Element>
  );
}

export default HeroSection;
