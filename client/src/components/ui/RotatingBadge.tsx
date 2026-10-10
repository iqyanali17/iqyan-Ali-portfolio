import { motion } from "framer-motion";

export default function RotatingBadge() {
  return (
    <div className="relative w-32 h-32 md:w-36 md:h-36 select-none pointer-events-none">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-purple-500/10 to-secondary/20 blur-xl animate-pulse" />
      
      {/* Glassmorphism Outer Shell */}
      <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
        {/* Subtle Decorative Rings */}
        <div className="absolute inset-[6px] rounded-full border border-dashed border-primary/25 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-[8px] rounded-full border border-white/5" />

        {/* Clockwise Rotating Text Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path
                id="badgeTextPath"
                d="M 100, 100 m -66, 0 a 66,66 0 1,1 132,0 a 66,66 0 1,1 -132,0"
                fill="none"
              />
            </defs>
            <text className="fill-muted-foreground/80 font-mono text-[9px] tracking-[0.24em] font-semibold uppercase">
              <textPath href="#badgeTextPath" startOffset="0%">
                CODE • DEPLOY • SCALE • REPEAT • SINCE 2024 •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Clockwise Orbiting Neon Dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute inset-[10px]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#3b82f6,0_0_20px_#3b82f6]" />
        </motion.div>

        {/* Central Core: Glowing React-style atomic orbits */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          {/* Core Glow */}
          <div className="absolute w-8 h-8 rounded-full bg-primary/25 blur-md animate-pulse" />
          
          {/* Central Nucleus */}
          <div className="absolute w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_12px_hsl(var(--primary)),0_0_24px_hsl(var(--primary))]" />

          {/* Multiple Glowing Ellipses at Angles */}
          {[0, 45, 90, 135].map((angle, idx) => (
            <motion.div
              key={angle}
              className="absolute w-11 h-4 rounded-full border border-primary/30"
              style={{ rotate: angle }}
              animate={{
                scale: [1, 1.08, 1],
                borderColor: [
                  "rgba(149, 104, 255, 0.3)",
                  "rgba(59, 130, 246, 0.5)",
                  "rgba(149, 104, 255, 0.3)",
                ],
              }}
              transition={{
                duration: 2.5,
                delay: idx * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Electron Particle Animation */}
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#fff]"
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [8, 0, -8, 0, 8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
