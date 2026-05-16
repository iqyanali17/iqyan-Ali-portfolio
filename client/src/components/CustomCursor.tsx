import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHover = () => {
      const hoveredElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .project-card, .skill-bar'
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

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    const cleanupHovers = checkHover();

    // Re-check for new elements when the DOM changes
    const observer = new MutationObserver(() => {
      cleanupHovers();
      checkHover();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
      cleanupHovers();
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Glow Ring */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 border border-primary/40 rounded-full"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
          borderWidth: isHovered ? "1px" : "2px",
          backgroundColor: isHovered ? "hsl(var(--primary) / 0.1)" : "transparent",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />
      
      {/* Inner Solid Dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
        animate={{
          scale: isHovered ? 4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* Trailing particles or subtle secondary ring */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-1 bg-secondary rounded-full"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: "-50%",
          y: "-50%",
          scale: isHovered ? 0 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ delay: 0.1 }}
      />
    </div>
  );
}
