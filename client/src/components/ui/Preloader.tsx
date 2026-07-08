import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let current = 0;
    const TOTAL_MS = 700;
    const TICK_MS = 20;
    const INCREMENT = 100 / (TOTAL_MS / TICK_MS);

    const timer = setInterval(() => {
      current = Math.min(current + INCREMENT, 100);
      setProgress(Math.floor(current));

      if (current >= 100) {
        clearInterval(timer);
        // Brief pause at 100%, then fade out
        setTimeout(() => {
          setFading(true);
          // Remove from DOM after fade completes
          setTimeout(() => setGone(true), 550);
        }, 200);
      }
    }, TICK_MS);

    return () => clearInterval(timer);
  }, []);

  // Fully gone — render nothing
  if (gone) return null;

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[9999] bg-[#090b11] flex flex-col items-center justify-center select-none"
      style={{ pointerEvents: fading ? "none" : "all" }}
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-[200px] h-[200px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Name above pill */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-display text-xs tracking-[0.4em] text-white/30 uppercase mb-6"
      >
        Khwaja Iqyan Ali
      </motion.p>

      {/* Pill Capsule Loader */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-72 h-14 bg-[#0d0f17] border border-primary/30 rounded-full flex items-center justify-between px-6 overflow-hidden"
        style={{
          boxShadow: "0 0 30px rgba(149,104,255,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Top border shimmer */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        {/* Progress fill bar */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/15 via-primary/10 to-secondary/10 rounded-full"
          style={{
            width: `${progress}%`,
            transition: "width 20ms linear",
          }}
        />

        {/* LOADING label */}
        <span className="relative z-10 font-display text-[11px] font-bold tracking-[0.3em] text-white/90 uppercase">
          Loading
        </span>

        {/* Percentage + blinking cursor */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-white/85 w-10 text-right tabular-nums">
            {progress}%
          </span>

          {/* CSS-animated blinking block — avoids framer-motion easing issues */}
          <span
            className="inline-block w-[9px] h-[18px] bg-white rounded-[2px]"
            style={{
              boxShadow: "0 0 8px rgba(255,255,255,0.8)",
              animation: "blink-cursor 0.55s step-end infinite",
            }}
          />
        </div>
      </motion.div>

      {/* Subtitle under pill */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="font-mono text-[10px] tracking-widest text-white/15 uppercase mt-5"
      >
        Portfolio · Full-Stack Developer
      </motion.p>

      {/* CSS keyframe for blink cursor */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
