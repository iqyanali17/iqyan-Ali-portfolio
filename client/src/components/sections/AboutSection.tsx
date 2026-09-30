import React, { useState } from "react";
import { SectionReveal } from "@/components/animations";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiMui,
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiFlask,
  SiSupabase,
  SiGit,
} from "react-icons/si";

export const TechIcons = [
  { icon: SiReact, name: "React" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiMui, name: "Material UI" },
  { icon: SiExpress, name: "Express" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiPython, name: "Python" },
  { icon: SiFlask, name: "Flask" },
  { icon: SiSupabase, name: "Supabase" },
  { icon: SiGit, name: "Git" },
];

export function AboutSection() {
  const [marqueeLight, setMarqueeLight] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setMarqueeLight((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setMarqueeLight((v) => !v);
        }
      }}
      className="relative cursor-pointer overflow-hidden select-none"
      aria-label={marqueeLight ? "Switch marquee to dark theme" : "Switch marquee to light theme"}
      title={marqueeLight ? "Click for dark mode" : "Click for light mode"}
      style={{
        background: marqueeLight
          ? "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #eef2ff 100%)"
          : "linear-gradient(135deg, #000000 0%, #08080c 50%, #000000 100%)",
        transition: "background 0.5s ease",
      }}
    >
      {/* Subtle animated background orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: marqueeLight
            ? "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)"
            : "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(149,104,255,0.12) 0%, transparent 70%)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Left/Right edge fades matching the bg */}
      <div
        className="absolute inset-y-0 left-0 w-20 z-20 pointer-events-none"
        style={{
          background: marqueeLight
            ? "linear-gradient(to right, #f0f4ff, transparent)"
            : "linear-gradient(to right, #000000, transparent)",
          transition: "background 0.5s ease",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 z-20 pointer-events-none"
        style={{
          background: marqueeLight
            ? "linear-gradient(to left, #f0f4ff, transparent)"
            : "linear-gradient(to left, #000000, transparent)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Click hint pill */}
      <div
        className="absolute top-2 right-24 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase opacity-40 pointer-events-none"
        style={{
          border: `1px solid ${marqueeLight ? "#6366f1" : "rgba(255,255,255,0.15)"}`,
          color: marqueeLight ? "#4f46e5" : "rgba(255,255,255,0.5)",
        }}
      >
        {marqueeLight ? "🌙 Dark" : "☀️ Light"}
      </div>

      <SectionReveal
        start="top 92%"
        end="bottom 10%"
        fromY={-20}
        exitY={-25}
        duration={0.8}
      >
        {/* ── ROW 1: Tech Stack with icons ── */}
        <div
          className="py-4 overflow-hidden border-b"
        style={{
          borderColor: marqueeLight ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
          transition: "border-color 0.5s ease",
        }}
      >
        <div className="flex gap-10 w-max animate-infinite-scroll">
          {[...TechIcons, ...TechIcons, ...TechIcons].map((tech, idx) => (
            <div key={`r1-${tech.name}-${idx}`} className="flex items-center gap-2.5 group">
              {/* Icon bubble */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                style={{
                  background: marqueeLight
                    ? "rgba(99,102,241,0.1)"
                    : "rgba(149,104,255,0.12)",
                  border: marqueeLight
                    ? "1px solid rgba(99,102,241,0.2)"
                    : "1px solid rgba(149,104,255,0.2)",
                }}
              >
                <tech.icon
                  className="w-4 h-4 transition-colors duration-300"
                  style={{ color: marqueeLight ? "#4f46e5" : "hsl(var(--primary))" }}
                />
              </div>
              <span
                className="text-sm font-display font-semibold whitespace-nowrap tracking-wide transition-colors duration-300"
                style={{ color: marqueeLight ? "#1e1b4b" : "rgba(255,255,255,0.75)" }}
              >
                {tech.name}
              </span>
              {/* Separator dot */}
              <span
                className="ml-4 text-xs opacity-30"
                style={{ color: marqueeLight ? "#6366f1" : "hsl(var(--primary))" }}
              >
                /
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ROW 2: Tools & Platforms ── */}
      <div className="py-4 overflow-hidden" style={{ transition: "border-color 0.5s ease" }}>
        <div
          className="flex gap-6 w-max"
          style={{ animation: "infinite-scroll-reverse 28s linear infinite" }}
        >
          {[
            { label: "Git / GitHub", sym: "◈" },
            { label: "Postman", sym: "◈" },
            { label: "Swagger API", sym: "◈" },
            { label: "VS Code", sym: "◈" },
            { label: "MongoDB Atlas", sym: "◈" },
            { label: "Vercel", sym: "◈" },
            { label: "Netlify", sym: "◈" },
            { label: "REST APIs", sym: "◈" },
            { label: "JWT Auth", sym: "◈" },
            { label: "RBAC", sym: "◈" },
            { label: "Linux CLI", sym: "◈" },
            { label: "Git / GitHub", sym: "◈" },
            { label: "Postman", sym: "◈" },
            { label: "Swagger API", sym: "◈" },
            { label: "VS Code", sym: "◈" },
            { label: "MongoDB Atlas", sym: "◈" },
            { label: "Vercel", sym: "◈" },
            { label: "Netlify", sym: "◈" },
            { label: "REST APIs", sym: "◈" },
            { label: "JWT Auth", sym: "◈" },
            { label: "RBAC", sym: "◈" },
            { label: "Linux CLI", sym: "◈" },
          ].map((item, idx) => (
            <div key={`r2-${idx}`} className="flex items-center gap-6 shrink-0">
              {/* Pill tag */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap"
                style={{
                  background: marqueeLight
                    ? "rgba(99,102,241,0.08)"
                    : "rgba(255,255,255,0.04)",
                  border: marqueeLight
                    ? "1px solid rgba(99,102,241,0.2)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="text-[9px] font-mono font-black tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{ color: marqueeLight ? "#3730a3" : "rgba(255,255,255,0.55)" }}
                >
                  {item.label}
                </span>
              </div>
              {/* Separator */}
              <span
                className="text-xs opacity-25 transition-colors duration-300"
                style={{ color: marqueeLight ? "#6366f1" : "hsl(var(--secondary))" }}
              >
                {item.sym}
              </span>
            </div>
          ))}
        </div>
      </div>
      </SectionReveal>
    </div>
  );
}

export default AboutSection;
