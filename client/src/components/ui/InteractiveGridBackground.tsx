import React, { useEffect, useRef, useState } from "react";

export function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--cursor-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--cursor-y", `${e.clientY}px`);
        containerRef.current.style.setProperty("--spotlight-opacity", "1");
      }
    };

    const handlePointerLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--spotlight-opacity", "0");
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create a subtle expanding interactive ripple
      const newRipple = {
        id: ++rippleIdRef.current,
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1200);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black select-none"
      style={{
        backgroundColor: "#000000",
      }}
      aria-hidden="true"
    >
      {/* ── BASE STAGGERED BRICK GRID (Exact match to attached image) ── */}
      {/*
        Tile dimensions: 180px wide by 80px high.
        Row 1: (y: 0 to 80) has vertical lines at x = 0, 180.
        Row 2: (y: 80 to 160) has vertical lines offset by 90px (at x = 90).
        This forms the exact running bond brick tile pattern shown in the image.
      */}
      <svg
        className="absolute inset-0 w-full h-full opacity-100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Base Grid Pattern */}
          <pattern
            id="staggered-brick-grid-base"
            width="180"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal divider lines */}
            <line x1="0" y1="0" x2="180" y2="0" stroke="rgba(255, 255, 255, 0.075)" strokeWidth="1" />
            <line x1="0" y1="80" x2="180" y2="80" stroke="rgba(255, 255, 255, 0.075)" strokeWidth="1" />

            {/* Row 1 vertical lines (0 to 80) */}
            <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255, 255, 255, 0.075)" strokeWidth="1" />
            <line x1="180" y1="0" x2="180" y2="80" stroke="rgba(255, 255, 255, 0.075)" strokeWidth="1" />

            {/* Row 2 vertical line (80 to 160) - offset by 50% (90px) */}
            <line x1="90" y1="80" x2="90" y2="160" stroke="rgba(255, 255, 255, 0.075)" strokeWidth="1" />
          </pattern>

          {/* Interactive Glowing Highlight Pattern (Electric Violet / Clean Cyan Tint) */}
          <pattern
            id="staggered-brick-grid-glow"
            width="180"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <line x1="0" y1="0" x2="180" y2="0" stroke="rgba(168, 85, 247, 0.45)" strokeWidth="1.2" />
            <line x1="0" y1="80" x2="180" y2="80" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.2" />

            {/* Row 1 vertical lines */}
            <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(168, 85, 247, 0.45)" strokeWidth="1.2" />
            <line x1="180" y1="0" x2="180" y2="80" stroke="rgba(168, 85, 247, 0.45)" strokeWidth="1.2" />

            {/* Row 2 vertical line - staggered */}
            <line x1="90" y1="80" x2="90" y2="160" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.2" />
          </pattern>

          {/* High-contrast White/Silver Highlight Pattern for cursor spotlight center */}
          <pattern
            id="staggered-brick-grid-bright"
            width="180"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="180" y2="0" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
            <line x1="0" y1="80" x2="180" y2="80" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
            <line x1="180" y1="0" x2="180" y2="80" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
            <line x1="90" y1="80" x2="90" y2="160" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* 1. Base Dark Grid Layer (Clean, crisp, pitch black backdrop) */}
        <rect width="100%" height="100%" fill="url(#staggered-brick-grid-base)" />
      </svg>

      {/* ── INTERACTIVE MOUSE SPOTLIGHT (Illuminates grid lines under cursor) ── */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          maskImage: `radial-gradient(450px circle at var(--cursor-x, -1000px) var(--cursor-y, -1000px), black 0%, rgba(0,0,0,0.5) 45%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(450px circle at var(--cursor-x, -1000px) var(--cursor-y, -1000px), black 0%, rgba(0,0,0,0.5) 45%, transparent 80%)`,
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#staggered-brick-grid-glow)" />
          <rect width="100%" height="100%" fill="url(#staggered-brick-grid-bright)" opacity="0.65" />
        </svg>

        {/* Soft atmospheric torch aura around cursor */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: "var(--cursor-x, -1000px)",
            top: "var(--cursor-y, -1000px)",
            width: "500px",
            height: "500px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(149, 104, 255, 0.08) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* ── INTERACTIVE CLICK RIPPLES ── */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            animation: "grid-ripple 1.1s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
          }}
        />
      ))}

      {/* ── GENTLE AMBIENT VIGNETTE & BREATHING AURAS (Adds depth without washing out black) ── */}
      <div
        className="absolute top-0 left-1/4 w-[650px] h-[450px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(149, 104, 255, 0.15) 0%, transparent 70%)",
          filter: "blur(140px)",
          animation: "pulse 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[750px] h-[550px] rounded-full pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
          filter: "blur(160px)",
          animation: "pulse 12s ease-in-out infinite 3s",
        }}
      />

      {/* Subtle vignette on extreme edges to focus content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />

      <style>{`
        @keyframes grid-ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.6;
            border: 2px solid rgba(168, 85, 247, 0.8);
            box-shadow: 0 0 25px rgba(168, 85, 247, 0.5);
          }
          100% {
            width: 700px;
            height: 700px;
            opacity: 0;
            border: 1px solid rgba(56, 189, 248, 0.1);
            box-shadow: 0 0 60px rgba(56, 189, 248, 0);
          }
        }
      `}</style>
    </div>
  );
}

export default InteractiveGridBackground;
