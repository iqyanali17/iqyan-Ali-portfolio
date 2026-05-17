import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  tiltMax?: number; // Maximum rotation in degrees
}

export function TiltCard({
  children,
  className = "",
  tiltMax = 12,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Configure smooth physics springs to eliminate stuttering
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Map normalized mouse inputs [-0.5, 0.5] to degrees of rotation
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [tiltMax, -tiltMax]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-tiltMax, tiltMax]);

  // Map coordinates to glow positions
  const glowX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates relative to card center [-0.5, 0.5]
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative h-full w-full cursor-pointer transition-shadow duration-300 ${className}`}
      {...props}
    >
      {/* 3D Holographic Inner Light Reflection */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Internal Content Container (with translateZ to make content pop forward in 3D) */}
      <div
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
