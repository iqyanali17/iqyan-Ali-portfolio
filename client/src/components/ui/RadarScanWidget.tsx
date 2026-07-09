import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

export default function RadarScanWidget() {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId: number;
    const startTime = Date.now();
    const duration = 6000; // Slow, premium scan speed (6s per sweep)

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      setRotation(progress * 360);
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView]);

  const R = 190; // Optimized radius to increase gaps between nodes
  const items = [
    { text: "Web Dev", angle: 0, icon: Globe },
    { text: "CRM Sync", angle: 45, icon: Database },
    { text: "n8n Flows", angle: 90, icon: Cpu },
    { text: "AI Agents", angle: 135, icon: Bot },
    { text: "E-Com Web", angle: 180, icon: ShoppingCart },
    { text: "Modern Web", angle: 225, icon: Layers },
    { text: "Creative UI", angle: 270, icon: Sparkles },
    { text: "Scale Systems", angle: 315, icon: TrendingUp },
  ];

  const circles = new Array(8).fill(1);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[480px] flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Radar scanning circle wrapper (Responsive Scale) */}
      <div className="relative w-[480px] h-[480px] flex items-center justify-center scale-[0.55] xs:scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 origin-center pointer-events-none transition-transform">
        
        {/* Sweep line */}
        <div
          className="absolute z-20 h-[1.5px] bg-transparent pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: `${R}px`,
            transformOrigin: "left center",
            transform: `translate(0, -50%) rotate(${rotation - 90}deg)`,
          }}
        >
          <div className="h-[1.5px] w-full bg-gradient-to-r from-primary via-primary/30 to-transparent shadow-[0_0_8px_hsl(var(--primary))]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff,0_0_12px_hsl(var(--primary))]" />
        </div>

        {/* Concentric grid circles */}
        {circles.map((_, idx) => {
          const diameter = (idx + 1) * 50;
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

        {/* Scanning Nodes */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          
          // Calculate angle difference smoothly (handle wrap-around)
          let diff = rotation - item.angle;
          if (diff < 0) diff += 360;
          
          // High readability opacity settings (minimum opacity of 0.65)
          const opacity = Math.max(0.65, 1 - diff / 130);
          const isActive = diff <= 45; // highlighted when sweep is close

          return (
            <div
              key={idx}
              className="absolute flex flex-col items-center justify-center space-y-2 z-10 transition-all duration-300 pointer-events-auto"
              style={{
                left: `calc(50% + ${R * Math.sin((item.angle * Math.PI) / 180)}px)`,
                top: `calc(50% - ${R * Math.cos((item.angle * Math.PI) / 180)}px)`,
                transform: "translate(-50%, -50%)",
                opacity: opacity,
              }}
            >
              {/* Outer icon shell (Larger size) */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 shadow-md ${
                  isActive
                    ? "border-primary bg-primary/25 shadow-[0_0_15px_rgba(149,104,255,0.45)] text-white"
                    : "border-white/10 bg-[#0d0f17]/95 text-slate-300"
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition-colors duration-500 ${
                    isActive ? "text-primary animate-pulse" : "text-slate-400"
                  }`}
                />
              </div>
              
              {/* Text label capsule (Optimized size and margins for perfect layout gaps) */}
              <div className={`rounded-lg px-2 py-0.5 border transition-all duration-500 shadow-md ${
                isActive 
                  ? "bg-primary/20 border-primary/45" 
                  : "bg-black/90 border-white/10"
              }`}>
                <span
                  className={`text-[9px] font-bold tracking-wider font-mono uppercase transition-colors duration-500 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                >
                  {item.text}
                </span>
              </div>
            </div>
          );
        })}

        {/* Center core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex flex-col items-center justify-center z-30 bg-[#07090e]/95 border border-primary/20 shadow-[0_0_15px_rgba(149,104,255,0.15)]">
          <span className="font-mono text-sm font-bold text-white tracking-tight tabular-nums">
            SYS
          </span>
          <span className="text-[7px] uppercase font-mono tracking-widest text-primary/80 font-bold -mt-0.5 animate-pulse">
            ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
