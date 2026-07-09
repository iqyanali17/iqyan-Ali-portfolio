import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Share2, Wind, Circle, Palette, Settings, X, Check, EyeOff, Download } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Types for the canvas physics particles
interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  birth: number;
  vx: number;
  vy: number;
}

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface CometSpark {
  x: number;
  y: number;
  size: number;
  opacity: number;
  birth: number;
  vx: number;
  vy: number;
  rotation: number;
  twinkle: number;
}

interface Bubble {
  x: number;
  y: number;
  size: number;
  opacity: number;
  birth: number;
  vx: number;
  vy: number;
  wobble: number;
  wobbleSpeed: number;
}

// Advanced color parser supporting hex, rgb/rgba, and hsl/hsla (both commas and space delimiters)
function parseColor(color: string): { r: number; g: number; b: number } {
  const fallback = { r: 149, g: 104, b: 255 }; // Electric purple fallback -> HSL(252, 100%, 68%)
  if (!color) return fallback;

  const normalized = color.trim().toLowerCase();

  // 1. Hex Format
  if (normalized.startsWith("#")) {
    let hex = normalized.slice(1);
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }
  }

  // 2. RGB/RGBA Format
  const rgbMatch = normalized.match(/rgba?\s*\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
    };
  }

  // 3. HSL/HSLA Format
  const hslMatch = normalized.match(/hsla?\s*\(\s*(\d+)\s*[, ]\s*(\d+)%?\s*[, ]\s*(\d+)%?/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]) / 360;
    const s = parseInt(hslMatch[2]) / 100;
    const l = parseInt(hslMatch[3]) / 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  // 4. Bare HSL space format (e.g. "252 100% 68%")
  const bareHslMatch = normalized.match(/^(\d+)\s+(\d+)%?\s+(\d+)%?$/);
  if (bareHslMatch) {
    const h = parseInt(bareHslMatch[1]) / 360;
    const s = parseInt(bareHslMatch[2]) / 100;
    const l = parseInt(bareHslMatch[3]) / 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  return fallback;
}

// Retrieve theme color from computed document style if available
const getThemeColor = (varName: string): string => {
  if (typeof window === "undefined") return varName === "--primary" ? "hsl(252, 100%, 68%)" : "hsl(217, 91%, 60%)";
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (!val) {
    return varName === "--primary" ? "hsl(252, 100%, 68%)" : "hsl(217, 91%, 60%)";
  }
  return `hsl(${val})`;
};

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- UI Settings State ---
  const [trailStyle, setTrailStyle] = useState<"constellation" | "ribbon" | "comet" | "bubbles" | "hidden">(
    () => (localStorage.getItem("cursor-trail-style") as any) || "comet"
  );
  
  const [trailColor, setTrailColor] = useState<string>(() => {
    // Default is electric purple, perfectly matching the project primary
    return localStorage.getItem("cursor-trail-color") || "hsl(252, 100%, 68%)";
  });

  const [particleSizeMultiplier, setParticleSizeMultiplier] = useState<number>(() => {
    const saved = localStorage.getItem("cursor-size-multiplier");
    return saved ? parseFloat(saved) : 1;
  });

  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleSetText = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      setCursorText(customEvent.detail);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("set-cursor-text", handleSetText);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("set-cursor-text", handleSetText);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Close settings panel when clicking/tapping outside of its container
  useEffect(() => {
    if (!showSettings) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    const handleTouchOutside = (event: TouchEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleTouchOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [showSettings]);

  // Save settings in localStorage
  useEffect(() => {
    localStorage.setItem("cursor-trail-style", trailStyle);
  }, [trailStyle]);

  useEffect(() => {
    localStorage.setItem("cursor-trail-color", trailColor);
  }, [trailColor]);

  useEffect(() => {
    localStorage.setItem("cursor-size-multiplier", particleSizeMultiplier.toString());
  }, [particleSizeMultiplier]);

  // --- Animation Core State & Refs ---
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const cometSparksRef = useRef<CometSpark[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });
  const isVisibleRef = useRef(false);
  const reducedMotionRef = useRef(false);

  // Dynamic references updated immediately to avoid re-binding event listeners
  const trailStyleRef = useRef(trailStyle);
  const trailColorRef = useRef(trailColor);
  const rgbRef = useRef(parseColor(trailColor));
  const sizeMultiplierRef = useRef(particleSizeMultiplier);
  const isHoveredRef = useRef(isHovered);

  const baseSize = 6;
  const trailIntensity = 6;
  const fadeSpeed = 0.4;
  const flowSpeed = 0.6;

  // Sync references
  useEffect(() => {
    trailStyleRef.current = trailStyle;
    // Clear trail cache on change
    particlesRef.current = [];
    trailPointsRef.current = [];
    cometSparksRef.current = [];
    bubblesRef.current = [];
  }, [trailStyle]);

  useEffect(() => {
    trailColorRef.current = trailColor;
    // If the color matches a dynamic variable, grab it, else parse the raw color string
    let parsedColorString = trailColor;
    if (trailColor.includes("var(--primary)")) {
      parsedColorString = getThemeColor("--primary");
    } else if (trailColor.includes("var(--secondary)")) {
      parsedColorString = getThemeColor("--secondary");
    }
    rgbRef.current = parseColor(parsedColorString);
  }, [trailColor]);

  useEffect(() => {
    sizeMultiplierRef.current = particleSizeMultiplier;
  }, [particleSizeMultiplier]);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  // Reduced motion query
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;
    const handleChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Resize canvas handler
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [trailStyle]); // Re-bind on style changes to ensure clean viewport sizing

  // Spawn constellation particles helper
  const spawnParticles = useCallback((x: number, y: number, vx: number, vy: number) => {
    const now = performance.now();
    const hoverMult = isHoveredRef.current ? 1.5 : 1;
    const count = Math.min(Math.floor(trailIntensity * hoverMult), 8);
    const particleSize = baseSize * sizeMultiplierRef.current * hoverMult;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
      const spread = particleSize * 0.2;
      particlesRef.current.push({
        x: x + Math.cos(angle) * spread * Math.random(),
        y: y + Math.sin(angle) * spread * Math.random(),
        size: particleSize * (0.8 + Math.random() * 0.4),
        opacity: 1,
        birth: now,
        vx: vx * flowSpeed * 0.1 + (Math.random() - 0.5) * 8,
        vy: vy * flowSpeed * 0.1 + (Math.random() - 0.5) * 8,
      });
    }
    if (particlesRef.current.length > 100) {
      particlesRef.current = particlesRef.current.slice(-100);
    }
  }, []);

  // Tracking Mouse Movement and Hover Elements
  useEffect(() => {
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    const checkHover = () => {
      const hoveredElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .project-card, .skill-bar, [data-hoverable="true"]'
      );

      const onEnter = () => setIsHovered(true);
      const onLeave = () => setIsHovered(false);

      hoveredElements.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      return () => {
        hoveredElements.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      };
    };

    const cleanupHovers = checkHover();

    // Re-check hovered elements dynamically as the DOM updates (perfect for SPA viewports and async content loads)
    const observer = new MutationObserver(() => {
      cleanupHovers();
      checkHover();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      observer.disconnect();
      cleanupHovers();
    };
  }, []);

  // Mouse coordinate tracker & particle generator
  useEffect(() => {
    if (isMobile || reducedMotionRef.current || trailStyle === "hidden") return;
    const container = containerRef.current;
    if (!container) return;

    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.001);
      lastTime = now;

      const vx = (x - mouseRef.current.lastX) / dt;
      const vy = (y - mouseRef.current.lastY) / dt;

      mouseRef.current = { x, y, lastX: x, lastY: y };
      if (!isVisibleRef.current) setIsVisible(true);

      const dist = Math.sqrt(vx * vx + vy * vy) * dt;

      if (dist > 1.5) {
        const hoverMult = isHoveredRef.current ? 1.5 : 1;
        const particleSize = baseSize * sizeMultiplierRef.current * hoverMult;

        if (trailStyleRef.current === "constellation") {
          spawnParticles(x, y, vx, vy);
        } else if (trailStyleRef.current === "ribbon") {
          trailPointsRef.current.push({ x, y, time: now });
          const maxPoints = Math.floor(trailIntensity * hoverMult * 15);
          if (trailPointsRef.current.length > maxPoints) {
            trailPointsRef.current = trailPointsRef.current.slice(-maxPoints);
          }
        } else if (trailStyleRef.current === "comet") {
          const sparkCount = Math.floor(trailIntensity * hoverMult * 0.6);
          for (let i = 0; i < sparkCount; i++) {
            const angle = Math.atan2(vy, vx) + Math.PI + (Math.random() - 0.5) * 1.2;
            const speed = Math.random() * 2 + 0.5;
            cometSparksRef.current.push({
              x: x + (Math.random() - 0.5) * 6,
              y: y + (Math.random() - 0.5) * 6,
              size: particleSize * (0.2 + Math.random() * 0.5),
              opacity: 0.8 + Math.random() * 0.2,
              birth: now,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              rotation: Math.random() * Math.PI * 2,
              twinkle: Math.random() * Math.PI * 2,
            });
          }
          if (cometSparksRef.current.length > 120) {
            cometSparksRef.current = cometSparksRef.current.slice(-120);
          }
        } else if (trailStyleRef.current === "bubbles") {
          const bubbleCount = Math.floor(trailIntensity * hoverMult * 0.4);
          for (let i = 0; i < bubbleCount; i++) {
            bubblesRef.current.push({
              x: x + (Math.random() - 0.5) * 20,
              y: y + (Math.random() - 0.5) * 20,
              size: particleSize * (0.6 + Math.random() * 1.2),
              opacity: 0.4 + Math.random() * 0.3,
              birth: now,
              vx: (Math.random() - 0.5) * 2,
              vy: -Math.random() * 2 - 0.5,
              wobble: Math.random() * Math.PI * 2,
              wobbleSpeed: 0.03 + Math.random() * 0.04,
            });
          }
          if (bubblesRef.current.length > 80) {
            bubblesRef.current = bubblesRef.current.slice(-80);
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [spawnParticles, trailStyle]);

  // Main Canvas Animation Render Cycle
  useEffect(() => {
    if (isMobile || trailStyle === "hidden") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxAge = fadeSpeed * 1000;

    // 1. Ribbon Renderer (bezier vector trail)
    const drawRibbon = (points: TrailPoint[], now: number) => {
      if (points.length < 2) return;
      const rgb = rgbRef.current;
      const hoverMult = isHoveredRef.current ? 1.5 : 1;
      const baseWidth = baseSize * sizeMultiplierRef.current * hoverMult * 2;

      const activePoints = points.filter((p) => now - p.time < maxAge);
      trailPointsRef.current = activePoints;

      if (activePoints.length < 2) return;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < activePoints.length; i++) {
        const p0 = activePoints[i - 1];
        const p1 = activePoints[i];

        const age0 = (now - p0.time) / maxAge;
        const age1 = (now - p1.time) / maxAge;
        const opacity = Math.pow(1 - age1, 2) * 0.85;
        const width = baseWidth * (1 - age1 * 0.7);

        if (width < 0.5) continue;

        const gradient = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        const opacity0 = Math.pow(1 - age0, 2) * 0.85;
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity0})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);

        if (i < activePoints.length - 1) {
          const p2 = activePoints[i + 1];
          const cpX = p1.x;
          const cpY = p1.y;
          const endX = (p1.x + p2.x) / 2;
          const endY = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        } else {
          ctx.lineTo(p1.x, p1.y);
        }
        ctx.stroke();
      }

      // Drawing the glowing head cursor
      if (activePoints.length > 0) {
        const tip = activePoints[activePoints.length - 1];
        const tipGlow = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, baseWidth * 1.5);
        tipGlow.addColorStop(0, `rgba(255, 255, 255, 0.85)`);
        tipGlow.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
        tipGlow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, baseWidth * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = tipGlow;
        ctx.fill();
      }
    };

    // 2. Comet Renderer (Rotational Star Sparkle trails)
    const drawComet = (now: number) => {
      const rgb = rgbRef.current;
      const newSparks: CometSpark[] = [];
      const hoverMult = isHoveredRef.current ? 1.5 : 1;
      const currentSize = baseSize * sizeMultiplierRef.current * hoverMult;

      for (const spark of cometSparksRef.current) {
        const age = now - spark.birth;
        if (age > maxAge) continue;

        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.98;
        spark.vy *= 0.98;
        spark.twinkle += 0.15;

        const normalizedAge = age / maxAge;
        const baseFade = Math.pow(1 - normalizedAge, 2);
        const twinkleFactor = 0.7 + 0.3 * Math.sin(spark.twinkle);
        spark.opacity = baseFade * twinkleFactor;

        const size = spark.size * (1 - normalizedAge * 0.5);
        if (size < 0.5) continue;

        ctx.save();
        ctx.translate(spark.x, spark.y);
        ctx.rotate(spark.rotation + normalizedAge * 2);

        // Circular glow backdrop
        const innerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.5);
        innerGlow.addColorStop(0, `rgba(255, 255, 255, ${spark.opacity * 0.95})`);
        innerGlow.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${spark.opacity * 0.7})`);
        innerGlow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = innerGlow;
        ctx.fill();

        // 4-point star cross-hair strokes
        ctx.strokeStyle = `rgba(255, 255, 255, ${spark.opacity * 0.7})`;
        ctx.lineWidth = size * 0.3;
        ctx.lineCap = "round";

        // Horizontal stroke
        ctx.beginPath();
        ctx.moveTo(-size * 1.3, 0);
        ctx.lineTo(size * 1.3, 0);
        ctx.stroke();

        // Vertical stroke
        ctx.beginPath();
        ctx.moveTo(0, -size * 1.3);
        ctx.lineTo(0, size * 1.3);
        ctx.stroke();

        ctx.restore();
        newSparks.push(spark);
      }
      cometSparksRef.current = newSparks;

      // Draw glowing comet nucleus
      const headX = mouseRef.current.x;
      const headY = mouseRef.current.y;
      const headSize = currentSize * 1.25;

      const outerGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, headSize * 3);
      outerGlow.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`);
      outerGlow.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
      outerGlow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
      ctx.beginPath();
      ctx.arc(headX, headY, headSize * 3, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      const midGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, headSize * 1.5);
      midGlow.addColorStop(0, `rgba(255, 255, 255, 0.9)`);
      midGlow.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`);
      midGlow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
      ctx.beginPath();
      ctx.arc(headX, headY, headSize * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = midGlow;
      ctx.fill();

      const coreGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, headSize * 0.7);
      coreGlow.addColorStop(0, `rgba(255, 255, 255, 1)`);
      coreGlow.addColorStop(0.6, `rgba(255, 255, 255, 0.8)`);
      coreGlow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
      ctx.beginPath();
      ctx.arc(headX, headY, headSize * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();
    };

    // 3. Bubbles Renderer (Rising wobbling water spheres)
    const drawBubbles = (now: number) => {
      const rgb = rgbRef.current;
      const newBubbles: Bubble[] = [];
      const hoverMult = isHoveredRef.current ? 1.5 : 1;
      const currentSize = baseSize * sizeMultiplierRef.current * hoverMult;

      for (const bubble of bubblesRef.current) {
        const age = now - bubble.birth;
        if (age > maxAge * 1.5) continue;

        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += bubble.vx + Math.sin(bubble.wobble) * 0.55;
        bubble.y += bubble.vy;
        bubble.vy *= 0.995; // Slow vertical climb deceleration
        bubble.vx *= 0.98;

        const normalizedAge = age / (maxAge * 1.5);
        const fadeOut = normalizedAge > 0.7 ? 1 - (normalizedAge - 0.7) / 0.3 : 1;
        bubble.opacity = bubble.opacity * fadeOut;

        const size = bubble.size * (1 + normalizedAge * 0.3); // Gradually swell
        if (bubble.opacity < 0.05) continue;

        ctx.save();

        // 3D sphere outer circle stroke
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bubble.opacity * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Translucent liquid radial highlights
        const bubbleGradient = ctx.createRadialGradient(
          bubble.x - size * 0.3,
          bubble.y - size * 0.3,
          0,
          bubble.x,
          bubble.y,
          size
        );
        bubbleGradient.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity * 0.35})`);
        bubbleGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bubble.opacity * 0.18})`);
        bubbleGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bubble.opacity * 0.05})`);
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, size, 0, Math.PI * 2);
        ctx.fillStyle = bubbleGradient;
        ctx.fill();

        // Highlight reflections
        const highlightSize = size * 0.35;
        const highlightX = bubble.x - size * 0.35;
        const highlightY = bubble.y - size * 0.35;
        const highlight = ctx.createRadialGradient(
          highlightX,
          highlightY,
          0,
          highlightX,
          highlightY,
          highlightSize
        );
        highlight.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity * 0.75})`);
        highlight.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.beginPath();
        ctx.arc(highlightX, highlightY, highlightSize, 0, Math.PI * 2);
        ctx.fillStyle = highlight;
        ctx.fill();

        // Small tertiary glare reflection
        const smallHighlightX = bubble.x + size * 0.25;
        const smallHighlightY = bubble.y + size * 0.3;
        const smallHighlightSize = size * 0.15;
        ctx.beginPath();
        ctx.arc(smallHighlightX, smallHighlightY, smallHighlightSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.4})`;
        ctx.fill();

        ctx.restore();
        newBubbles.push(bubble);
      }
      bubblesRef.current = newBubbles;

      // Soft focus cursor bubble tracker
      const cursorX = mouseRef.current.x;
      const cursorY = mouseRef.current.y;
      const cursorSize = currentSize * 0.8;
      const cursorGlow = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, cursorSize * 2);
      cursorGlow.addColorStop(0, `rgba(255, 255, 255, 0.55)`);
      cursorGlow.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`);
      cursorGlow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, cursorSize * 2, 0, Math.PI * 2);
      ctx.fillStyle = cursorGlow;
      ctx.fill();
    };

    // 4. Constellation Renderer (Star clusters and interconnected line webs)
    const drawConstellation = (now: number) => {
      const newParticles: Particle[] = [];
      const rgb = rgbRef.current;
      const hoverMult = isHoveredRef.current ? 1.5 : 1;
      const currentSize = baseSize * sizeMultiplierRef.current * hoverMult;

      for (const particle of particlesRef.current) {
        const age = now - particle.birth;
        if (age > maxAge) continue;

        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.x += particle.vx * 0.016;
        particle.y += particle.vy * 0.016;

        const normalizedAge = age / maxAge;
        particle.opacity = Math.pow(1 - normalizedAge, 1.5);
        const size = particle.size * (1 - normalizedAge * 0.2);

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          size
        );
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity})`);
        gradient.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        newParticles.push(particle);
      }

      // Elegant vector wireframe mesh connections
      const connectLimit = Math.min(newParticles.length, 40);
      ctx.lineWidth = 1;
      const particleSize = currentSize;

      for (let i = 0; i < connectLimit; i++) {
        const p1 = newParticles[i];
        for (let j = i + 1; j < Math.min(i + 5, connectLimit); j++) {
          const p2 = newParticles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < particleSize * 5) {
            const opacity = (1 - dist / (particleSize * 5)) * p1.opacity * p2.opacity * 0.5;
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      particlesRef.current = newParticles;

      // Draw clean electric core dot
      const cursorSize = currentSize * 1.5;
      const glowGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        cursorSize * 2.5
      );
      glowGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45)`);
      glowGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, cursorSize * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Nucleus
      const coreGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        cursorSize
      );
      coreGradient.addColorStop(0, `rgba(255, 255, 255, 0.95)`);
      coreGradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`);
      coreGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, cursorSize, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();
    };

    const animate = () => {
      if (reducedMotionRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width || window.innerWidth;
      const height = rect?.height || window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      if (trailStyleRef.current === "ribbon") {
        drawRibbon(trailPointsRef.current, now);
      } else if (trailStyleRef.current === "comet") {
        drawComet(now);
      } else if (trailStyleRef.current === "bubbles") {
        drawBubbles(now);
      } else if (trailStyleRef.current === "constellation") {
        drawConstellation(now);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trailStyle]);

  // Hide cursor on touch devices (standard hover-less viewport)
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  // Predefined gorgeous neon cyberpunk colors matching the site's dark aesthetic
  const colorOptions = [
    { name: "Purple", value: "hsl(252, 100%, 68%)", bg: "bg-[#9568ff]" }, // Theme Primary (electric purple)
    { name: "Blue", value: "hsl(217, 91%, 60%)", bg: "bg-[#3b82f6]" },   // Theme Secondary (electric blue)
    { name: "Rose", value: "#ff007f", bg: "bg-[#ff007f]" },               // Cyberpunk Hot Pink
    { name: "Emerald", value: "#10b981", bg: "bg-[#10b981]" },           // Acid Emerald Green
  ];

  const styleOptions = [
    { id: "comet", name: "Comet", icon: Sparkles, desc: "Twinkling star sparks" },
    { id: "constellation", name: "Constellation", icon: Share2, desc: "Connected wireframe stars" },
    { id: "ribbon", name: "Ribbon", icon: Wind, desc: "Smooth dynamic stream" },
    { id: "bubbles", name: "Bubbles", icon: Circle, desc: "Floating rising spheres" },
    { id: "hidden", name: "Off", icon: EyeOff, desc: "Use default OS cursor" },
  ];

  return (
    <>
      {/* 1. Canvas Layer & Custom Cursor elements (completely pointer-events-none) */}
      {trailStyle !== "hidden" && !isMobile && (
        <div
          ref={containerRef}
          className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
          style={{ visibility: isVisible ? "visible" : "hidden" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
        </div>
      )}

      {/* Floating Cursor Text overlay (only on desktop/mouse displays) */}
      <AnimatePresence>
        {cursorText && !isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed pointer-events-none z-[100000] px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-primary/45 text-white font-sans text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(149,104,255,0.4)] whitespace-nowrap flex items-center gap-1.5"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y + 20,
            }}
          >
            <span>{cursorText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating interactive settings widget (pointer-events-auto to enable clicks) */}
      <div className="fixed bottom-8 right-6 md:bottom-8 md:right-8 z-[999999] pointer-events-auto flex flex-col gap-3 items-end">
        {/* Floating Resume Download Button */}
        {!isMobile ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.a
                href="/Khwaja_Iqyan_Ali_Resume.pdf"
                download="Khwaja_Iqyan_Ali_Resume"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer border border-primary/30 hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 z-40"
              >
                <Download className="w-5 h-5" />
              </motion.a>
            </TooltipTrigger>
            <TooltipContent side="left" className="mr-2 font-sans font-medium text-xs">
              Download Resume
            </TooltipContent>
          </Tooltip>
        ) : (
          <motion.a
            href="/Khwaja_Iqyan_Ali_Resume.pdf"
            download="Khwaja_Iqyan_Ali_Resume"
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer border border-primary/30 transition-all duration-300 shadow-lg shadow-primary/25 z-40"
          >
            <Download className="w-5 h-5" />
          </motion.a>
        )}

        <div ref={settingsRef} className="relative hidden md:block">
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-32 right-0 w-80 rounded-2xl glass p-5 shadow-2xl border border-white/10 text-foreground font-sans z-50 backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                  <h4 className="font-display font-bold text-base text-gradient flex items-center gap-2">
                    <Palette className="w-4 h-4 text-primary" /> Cursor FX Panel
                  </h4>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 1. Style Selection */}
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono font-bold block mb-2">
                    Trail Aesthetics
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {styleOptions.map((opt) => {
                      const Icon = opt.icon;
                      const active = trailStyle === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setTrailStyle(opt.id as any)}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left transition-all duration-300 cursor-pointer ${
                            active
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "hover:bg-white/5 text-muted-foreground hover:text-foreground border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${active ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
                            <div>
                              <div className="text-xs font-bold leading-tight">{opt.name}</div>
                              <div className="text-[10px] opacity-75 font-normal leading-tight">{opt.desc}</div>
                            </div>
                          </div>
                          {active && <Check className="w-3.5 h-3.5 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Color Options */}
                {trailStyle !== "hidden" && (
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono font-bold block mb-2">
                      Cosmic Trail Color
                    </span>
                    <div className="flex gap-3">
                      {colorOptions.map((c) => {
                        const active = trailColor === c.value;
                        return (
                          <button
                            key={c.name}
                            onClick={() => setTrailColor(c.value)}
                            title={c.name}
                            className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 relative ${c.bg} ${
                              active ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105" : "opacity-80 hover:opacity-100"
                            }`}
                          >
                            {active && <Check className="w-3 h-3 text-white font-bold" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Size Customization */}
                {trailStyle !== "hidden" && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono font-bold block mb-2">
                      Core Particle Size
                    </span>
                    <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/5">
                      {["0.65", "1.0", "1.5"].map((scale) => {
                        const active = particleSizeMultiplier.toString() === scale;
                        const label = scale === "0.65" ? "Subtle" : scale === "1.0" ? "Classic" : "Hyper";
                        return (
                          <button
                            key={scale}
                            onClick={() => setParticleSizeMultiplier(parseFloat(scale))}
                            className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                              active
                                ? "bg-primary text-primary-foreground shadow"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className="w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer border border-white/10 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-500 shadow-xl hover:shadow-primary/25 z-40"
          >
            <Settings className={`w-5 h-5 ${showSettings ? "rotate-45 text-primary" : ""}`} />
          </motion.button>
        </div>
      </div>
    </>
  );
}
