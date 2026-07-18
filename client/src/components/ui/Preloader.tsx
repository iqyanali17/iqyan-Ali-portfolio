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
  const [rotation, setRotation] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3500; // 3.5 seconds for one full scan sweep

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRotation(progress * 360);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Complete! Wait a moment, then fade out
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setGone(true), 600);
        }, 400);
      }
    };

    requestAnimationFrame(update);
  }, []);

  if (gone) return null;

  const R = 180; // Radius in pixels for scanning nodes
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

  const circles = new Array(8).fill(1);

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[9999] bg-[#07090e] flex flex-col items-center justify-center select-none"
      style={{ pointerEvents: fading ? "none" : "all" }}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      {/* Futuristic scanning container */}
      <div className="relative w-[480px] h-[480px] flex items-center justify-center scale-[0.6] xs:scale-[0.7] sm:scale-90 md:scale-100 origin-center transition-transform">
        
        {/* Sweep Line */}
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
          {/* Glowing sweeping gradient */}
          <div className="h-[2px] w-full bg-gradient-to-r from-primary via-primary/30 to-transparent shadow-[0_0_12px_hsl(var(--primary))]" />
          {/* Sweep tip electron particle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff,0_0_15px_hsl(var(--primary))]" />
        </div>

        {/* Concentric Grid Circles */}
        {circles.map((_, idx) => {
          const diameter = (idx + 1) * 50; // Diameter sizing
          return (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed pointer-events-none"
              style={{
                width: `${diameter}px`,
                height: `${diameter}px`,
                borderColor: `rgba(149, 104, 255, ${0.12 - (idx + 1) * 0.01})`,
              }}
            />
          );
        })}

        {/* Crosshair axis lines */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[1px] bg-primary/5 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[380px] bg-primary/5 pointer-events-none" />

        {/* Radar Scanning Nodes */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          const diff = rotation - item.angle;
          const isActive = rotation >= item.angle;
          
          // Phosphor trail decay calculation
          const opacity = isActive
            ? Math.max(0.2, 1 - diff / 95)
            : 0.15;

          return (
            <div
              key={idx}
              className="absolute flex flex-col items-center justify-center space-y-1.5 z-30 transition-all duration-300"
              style={{
                left: `calc(50% + ${R * Math.sin((item.angle * Math.PI) / 180)}px)`,
                top: `calc(50% - ${R * Math.cos((item.angle * Math.PI) / 180)}px)`,
                transform: "translate(-50%, -50%)",
                opacity: opacity,
              }}
            >
              {/* Outer icon shell */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-500 shadow-lg ${
                  isActive
                    ? "border-primary/50 bg-primary/10 shadow-[0_0_15px_rgba(149,104,255,0.4)]"
                    : "border-white/5 bg-[#0d0f17]/60"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 transition-colors duration-500 ${
                    isActive ? "text-primary animate-pulse" : "text-slate-500"
                  }`}
                />
              </div>
              
              {/* Text label capsule */}
              <div className="rounded-md px-2 py-0.5 bg-black/60 border border-white/5 shadow-md">
                <div
                  className={`text-center text-[8px] font-bold tracking-wider font-sans uppercase transition-colors duration-500 ${
                    isActive ? "text-white" : "text-slate-500"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            </div>
          );
        })}

        {/* Central Core Progress Indicator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex flex-col items-center justify-center z-50 bg-[#07090e]/90 border border-primary/30 shadow-[0_0_20px_rgba(149,104,255,0.2)]">
          <span className="font-mono text-sm font-bold text-white tracking-tight tabular-nums">
            {Math.floor((rotation / 360) * 100)}%
          </span>
          <span className="text-[7px] uppercase font-mono tracking-widest text-primary/80 font-bold -mt-0.5 animate-pulse">
            Scanning
          </span>
        </div>
      </div>

      {/* Footer Branding */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase mt-2 absolute bottom-8"
      >
        Khwaja Iqyan Ali · Portfolio Init
      </motion.p>
    </motion.div>
  );
}
