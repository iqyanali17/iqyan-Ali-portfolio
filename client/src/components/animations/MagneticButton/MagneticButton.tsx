import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

/**
 * MagneticButton
 * Creates a premium magnetic attraction effect on hover.
 * The button smoothly pulls towards the user's cursor within a defined radius.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  radius = 120,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring physics for natural return
  const springConfig = { damping: 15, stiffness: 160, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < radius) {
        x.set(deltaX * strength);
        y.set(deltaY * strength);
        if (!isHovered) setIsHovered(true);
      } else {
        x.set(0);
        y.set(0);
        if (isHovered) setIsHovered(false);
      }
    },
    [prefersReducedMotion, radius, strength, isHovered, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  if (prefersReducedMotion) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
