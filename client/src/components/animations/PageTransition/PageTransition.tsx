import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'wouter';

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageTransition
 * Wraps page routes to deliver polished entrance animations on navigation.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`w-full flex-grow ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
