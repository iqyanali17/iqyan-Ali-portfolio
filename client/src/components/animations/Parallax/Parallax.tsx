import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

export interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  offset?: NonNullable<Parameters<typeof useScroll>[0]>['offset'];
}

/**
 * Parallax
 * Applies scroll-driven depth motion to child elements.
 */
export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = -0.25,
  className = '',
  direction = 'vertical',
  offset = ['start end', 'end start'],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Calculate pixel displacement range based on speed factor
  const distance = speed * 150;
  const rawTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [distance, -distance]
  );

  // Apply spring smoothing for organic motion
  const smoothTransform = useSpring(rawTransform, {
    damping: 20,
    stiffness: 90,
    mass: 0.1,
  });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const style =
    direction === 'horizontal'
      ? { x: smoothTransform }
      : { y: smoothTransform };

  return (
    <motion.div
      ref={ref}
      style={style}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Parallax;
