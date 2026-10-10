import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(149, 104, 255, 0.15)", // Defaults to electric purple matching the theme
  borderColor = "rgba(255, 255, 255, 0.2)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl transition-all duration-500 hover:border-white/10 ${className}`}
      {...props}
    >
      {/* Background Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Dynamic Glowing Border Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 ease-out z-30"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 60%)`,
          maskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "1px",
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
