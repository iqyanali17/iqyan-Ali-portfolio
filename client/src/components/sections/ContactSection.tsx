import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import {
  Send,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import RotatingBadge from "@/components/ui/RotatingBadge";
import { useToast } from "@/hooks/use-toast";

// Staggered Framer Motion entrance variants for smooth, reliable animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ContactSection() {
  const { toast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Live India Standard Time (Nagpur / Pune)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string, label: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast({
        title: `${label} copied!`,
        description: `${text} is copied to your clipboard.`,
      });
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <Element name="contact" id="contact" className="py-24 sm:py-28 relative overflow-hidden scroll-mt-20">
      {/* ── Dynamic Ambient Glow Backgrounds ── */}
      <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(168,85,247,0.14)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none animate-pulse transform-gpu will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none animate-pulse delay-1000 transform-gpu will-change-transform" />

      {/* Subtle Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:36px_36px] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* ════════════════════════════════════════════════════════════════
              LEFT COLUMN: Direct Contact & Availability Channels (7 Cols)
             ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Status Pill with Live Pulse */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)] text-emerald-400 text-xs sm:text-sm font-semibold select-none">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </span>
                <span>Available for Hire &amp; High-Impact Projects</span>
              </div>
            </motion.div>

            {/* Main Header */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-sm uppercase tracking-widest font-semibold">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>Let's Connect</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
                Let's build something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-sky-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]">
                  extraordinary
                </span>{" "}
                together.
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-light leading-relaxed pt-2">
                Have a startup vision, an engineering challenge, or a full-stack role you're looking to fill?
                I specialize in turning ambitious ideas into high-speed, scalable digital realities.
              </p>
            </motion.div>

            {/* Interactive Contact Channels Cards */}
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
              {/* Channel 1: Primary Email with 1-Click Copy */}
              <div className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.07] backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                      Primary Email
                    </span>
                    <a
                      href="mailto:khwajaiqyanali@gmail.com"
                      className="text-base sm:text-lg font-semibold text-white hover:text-purple-300 transition-colors tracking-tight flex items-center gap-1.5"
                    >
                      khwajaiqyanali@gmail.com
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => copyToClipboard("khwajaiqyanali@gmail.com", "Email", "email")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-zinc-200 hover:text-white transition-all active:scale-95 cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedKey === "email" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href="mailto:khwajaiqyanali@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-xs font-semibold text-purple-200 hover:text-white transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </a>
                </div>
              </div>

              {/* Channel 2: Phone & WhatsApp */}
              <div className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-sky-500/50 hover:bg-white/[0.07] backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                      Direct Phone &amp; WhatsApp
                    </span>
                    <a
                      href="tel:+919359496162"
                      className="text-base sm:text-lg font-semibold text-white hover:text-sky-300 transition-colors tracking-tight flex items-center gap-1.5"
                    >
                      +91 93594 96162
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => copyToClipboard("+919359496162", "Phone number", "phone")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-zinc-200 hover:text-white transition-all active:scale-95 cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedKey === "phone" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href="https://wa.me/919359496162"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-xs font-semibold text-emerald-200 hover:text-white transition-all active:scale-95"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Channel 3: Location Hub & Local Time */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl transition-all duration-300 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-1">
                      Preferred Work Locations
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200">
                        🍊 Nagpur
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200">
                        🏰 Pune
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200">
                        🕌 Hyderabad
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold uppercase">
                        Onsite / Remote
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{currentTime || "IST (GMT+5:30)"}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Micro Guarantee Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>Typical response time: Under 12 hours • Direct communication with Iqyan Ali</span>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT COLUMN: Interactive Holographic Social Terminal (5 Cols)
             ════════════════════════════════════════════════════════════════ */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative w-full flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Rotating Holographic Text Badge positioned on the top-right of the card */}
              <div className="absolute -top-10 -right-6 sm:-top-12 sm:-right-8 md:-top-14 md:-right-10 z-30 pointer-events-none scale-85 sm:scale-95 md:scale-100 origin-center">
                <RotatingBadge />
              </div>

              <SpotlightCard
                spotlightColor="rgba(168, 85, 247, 0.22)"
                borderColor="rgba(168, 85, 247, 0.4)"
                className="p-6 sm:p-8 bg-[#0b0c14]/90 backdrop-blur-3xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] rounded-[28px] overflow-visible relative z-10"
              >
                <div className="flex flex-col items-center text-center space-y-7">
                  {/* Clean, Unobstructed Avatar with Outer Rings */}
                  <div className="relative pt-2">
                    <Magnetic strength={0.25}>
                      <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 p-[3px] shadow-[0_0_35px_rgba(168,85,247,0.4)] relative z-10 group cursor-pointer">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black/80 relative">
                          <img
                            src="/images/passport_img.webp"
                            alt="Iqyan Ali — Full Stack Developer Avatar"
                            width={192}
                            height={192}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Orbit Rings */}
                        <div className="absolute -inset-2 rounded-full border border-purple-500/25 animate-[spin_12s_linear_infinite] pointer-events-none" />
                        <div className="absolute -inset-4 rounded-full border border-sky-400/20 border-dashed animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />
                      </div>
                    </Magnetic>
                  </div>

                  {/* Header within Card */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                      Khwaja Iqyan Ali
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-300 font-mono font-medium">
                      Full-Stack &amp; Systems Engineer
                    </p>
                    <p className="text-xs text-zinc-400 max-w-xs mx-auto pt-1">
                      Choose your preferred network to connect, inspect my code repositories, or discuss collaborations.
                    </p>
                  </div>

                  {/* 2x2 Interactive Social Terminal Tiles */}
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {/* GitHub */}
                    <Magnetic strength={0.15}>
                      <a
                        href="https://github.com/iqyanali17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300"
                      >
                        <Github className="w-6 h-6 text-zinc-300 group-hover:text-purple-300 group-hover:scale-110 transition-transform mb-1.5" />
                        <span className="text-xs font-bold text-white tracking-wide">GitHub</span>
                        <span className="text-[10px] text-zinc-400 font-mono">@iqyanali17</span>
                      </a>
                    </Magnetic>

                    {/* LinkedIn */}
                    <Magnetic strength={0.15}>
                      <a
                        href="https://www.linkedin.com/in/khwaja-iqyan-ali-17-a-/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-400/60 hover:bg-blue-500/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all duration-300"
                      >
                        <Linkedin className="w-6 h-6 text-zinc-300 group-hover:text-blue-300 group-hover:scale-110 transition-transform mb-1.5" />
                        <span className="text-xs font-bold text-white tracking-wide">LinkedIn</span>
                        <span className="text-[10px] text-zinc-400 font-mono">Iqyan Ali</span>
                      </a>
                    </Magnetic>

                    {/* Instagram */}
                    <Magnetic strength={0.15}>
                      <a
                        href="https://www.instagram.com/_iq_.y._xn_?igsh=OXJ6MHF5ZHh2cWM1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-400/60 hover:bg-pink-500/10 hover:shadow-[0_0_25px_rgba(244,114,182,0.25)] transition-all duration-300"
                      >
                        <Instagram className="w-6 h-6 text-zinc-300 group-hover:text-pink-300 group-hover:scale-110 transition-transform mb-1.5" />
                        <span className="text-xs font-bold text-white tracking-wide">Instagram</span>
                        <span className="text-[10px] text-zinc-400 font-mono">@_iq_.y._xn_</span>
                      </a>
                    </Magnetic>

                    {/* Copy Email Fast Tile */}
                    <Magnetic strength={0.15}>
                      <button
                        type="button"
                        onClick={() => copyToClipboard("khwajaiqyanali@gmail.com", "Email", "tile-email")}
                        className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:shadow-[0_0_25px_rgba(52,211,153,0.25)] transition-all duration-300 w-full cursor-pointer"
                      >
                        {copiedKey === "tile-email" ? (
                          <Check className="w-6 h-6 text-emerald-400 scale-110 mb-1.5 transition-transform" />
                        ) : (
                          <Mail className="w-6 h-6 text-zinc-300 group-hover:text-emerald-300 group-hover:scale-110 transition-transform mb-1.5" />
                        )}
                        <span className="text-xs font-bold text-white tracking-wide">
                          {copiedKey === "tile-email" ? "Copied!" : "Quick Copy"}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono">Email Address</span>
                      </button>
                    </Magnetic>
                  </div>

                  {/* Direct Launch Mail Client Action Button */}
                  <a
                    href="mailto:khwajaiqyanali@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Khwaja%20Iqyan%20Ali&body=Hi%20Iqyan%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss..."
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
                  >
                    <span>Launch Direct Email</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </SpotlightCard>

              {/* Decorative HUD Neon Ring in Background */}
              <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full border border-dashed border-purple-500/20 animate-[spin_25s_linear_infinite] pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Element>
  );
}

export default ContactSection;
