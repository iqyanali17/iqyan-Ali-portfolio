import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Database, 
  Cpu, 
  Bot, 
  ShoppingCart, 
  Layers, 
  Sparkles, 
  TrendingUp 
} from "lucide-react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2s swift, smooth scan sweep

    const update = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(elapsed / duration, 1);
      setProgress(currentProgress);

      if (currentProgress < 1) {
        requestAnimationFrame(update);
      } else {
        // Complete! Snappy pause, then seamless fade out
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setGone(true), 400);
        }, 150);
      }
    };

    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (gone) return null;

  const rotation = progress * 360;
  const R = 185; // Radius in pixels for radar scanning nodes

  const items = [
    { text: "Web Development", angle: 0, icon: Globe },
    { text: "CRM Integration", angle: 45, icon: Database },
    { text: "n8n Automation", angle: 90, icon: Cpu },
    { text: "AI Integrations", angle: 135, icon: Bot },
    { text: "E-Commerce Web", angle: 180, icon: ShoppingCart },
    { text: "Modern Web", angle: 225, icon: Layers },
    { text: "Futuristic UI", angle: 270, icon: Sparkles },
    { text: "Scalable Solutions", angle: 315, icon: TrendingUp },
  ];

  const circles = [70, 130, 190, 250, 310, 370];

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none"
      style={{ pointerEvents: fading ? "none" : "all" }}
    >
      {/* Seamless Ambient Depth (Matches the site's dark palette perfectly, no muddy wash) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.06)_0%,rgba(99,102,241,0.02)_40%,transparent_70%)] pointer-events-none" />

      {/* Futuristic Scanning HUD Container */}
      <div className="relative w-[480px] h-[480px] flex items-center justify-center scale-[0.68] xs:scale-[0.78] sm:scale-95 md:scale-100 origin-center transition-transform">
        
        {/* Radar Sweep Light Wedge & Line */}
        <div
          className="absolute z-40 h-[2px] bg-transparent pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: `${R}px`,
            transformOrigin: "left center",
            transform: `translate(0, -50%) rotate(${rotation - 90}deg)`,
          }}
        >
          {/* Glowing sweeping gradient beam */}
          <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 via-violet-400 to-transparent shadow-[0_0_14px_rgba(168,85,247,0.9)]" />
          {/* Sweep tip glowing photon */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_18px_#c084fc]" />
        </div>

        {/* Concentric Crisp Radar Rings */}
        {circles.map((diameter, idx) => (
          <div
            key={idx}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: `${diameter}px`,
              height: `${diameter}px`,
              border: `1px ${idx % 2 === 0 ? "dashed" : "solid"} rgba(168, 85, 247, ${0.14 - idx * 0.015})`,
            }}
          />
        ))}

        {/* Crosshair precision axis lines */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[390px] h-[1px] bg-purple-500/10 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[390px] bg-purple-500/10 pointer-events-none" />

        {/* Radar Scanning Nodes — Sharp, Clear & Persistently Illuminated */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isPassed = rotation >= item.angle;
          const isCurrent = Math.abs(rotation - item.angle) < 22;

          return (
            <div
              key={idx}
              className="absolute flex flex-col items-center justify-center space-y-1.5 z-30 transition-all duration-300"
              style={{
                left: `calc(50% + ${R * Math.sin((item.angle * Math.PI) / 180)}px)`,
                top: `calc(50% - ${R * Math.cos((item.angle * Math.PI) / 180)}px)`,
                transform: "translate(-50%, -50%)",
                opacity: isPassed ? 1 : 0.6,
              }}
            >
              {/* Outer icon shell with high contrast */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 shadow-lg ${
                  isPassed
                    ? isCurrent
                      ? "border-purple-400 bg-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.7)] scale-110"
                      : "border-purple-500/50 bg-[#0d0f1a] shadow-[0_0_15px_rgba(147,51,234,0.35)]"
                    : "border-white/10 bg-[#0a0a0f]/90 hover:border-white/20"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-all duration-300 ${
                    isPassed
                      ? isCurrent
                        ? "text-white scale-110"
                        : "text-purple-300"
                      : "text-zinc-400"
                  }`}
                />
              </div>
              
              {/* Text label capsule — Crisp, fully readable typography */}
              <div
                className={`rounded-md px-2.5 py-0.5 border shadow-md transition-all duration-300 ${
                  isPassed
                    ? "bg-[#09090f]/95 border-purple-500/40"
                    : "bg-[#08080c]/90 border-white/10"
                }`}
              >
                <span
                  className={`block text-center text-[8.5px] font-bold tracking-wider font-mono uppercase whitespace-nowrap transition-colors duration-300 ${
                    isPassed ? "text-zinc-100" : "text-zinc-400"
                  }`}
                >
                  {item.text}
                </span>
              </div>
            </div>
          );
        })}

        {/* Central Core with Circular Progress Ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex flex-col items-center justify-center z-50 bg-[#050508] border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.25)]">
          {/* Radial SVG Progress Meter */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="2.5"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="url(#coreGradient)"
              strokeWidth="2.5"
              strokeDasharray={226}
              strokeDashoffset={226 * (1 - progress)}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-75"
            />
            <defs>
              <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>

          <span className="font-mono text-base font-extrabold text-white tracking-tight tabular-nums relative z-10">
            {Math.floor(progress * 100)}%
          </span>
          <span className="text-[7.5px] uppercase font-mono tracking-widest text-purple-300 font-bold -mt-0.5 relative z-10">
            {progress >= 1 ? "READY" : "SCANNING"}
          </span>
        </div>
      </div>

      {/* Footer Branding — High contrast, clean terminal font */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase mt-4 absolute bottom-8 select-none"
      >
        Khwaja Iqyan Ali · Portfolio Init
      </motion.p>
    </motion.div>
  );
}
