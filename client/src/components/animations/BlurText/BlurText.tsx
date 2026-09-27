import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  easing?: string;
  exitEasing?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  start?: string;
  end?: string;
  children?: React.ReactNode;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 35,
  className = '',
  animateBy = 'words',
  direction = 'top',
  easing = 'power2.out',
  exitEasing = 'power2.in',
  onAnimationComplete,
  stepDuration = 0.35,
  highlightWords = [],
  highlightClassName = '',
  start = 'top 90%',
  end = 'top 75px',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // If text is not provided but children is a string, use children as text
  const effectiveText = useMemo(() => {
    if (text) return text;
    if (typeof children === 'string') return children;
    return '';
  }, [text, children]);

  const elements = useMemo(() => {
    if (effectiveText) {
      return animateBy === 'words' ? effectiveText.split(' ') : effectiveText.split('');
    }
    return [];
  }, [effectiveText, animateBy]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let targets = Array.from(el.querySelectorAll<HTMLElement>('.blur-text-item'));
    if (targets.length === 0) {
      targets = Array.from(el.children) as HTMLElement[];
      if (targets.length === 0) targets = [el];
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, filter: 'none' });
      return;
    }

    const fromY = direction === 'top' ? -35 : 35;
    const exitY = direction === 'top' ? -30 : 30;
    const wordDelay = Math.max((delay / 1000) * 0.75, 0.025);

    let activeTl: gsap.core.Timeline | null = null;

    // 1. COME IN / RE-COME IN: Words stagger in with signature blur clearing
    const playComeIn = () => {
      if (activeTl) activeTl.kill();
      gsap.killTweensOf(targets);

      activeTl = gsap.timeline({
        defaults: { ease: easing },
        onComplete: () => {
          if (onAnimationComplete) onAnimationComplete();
        },
      });

      activeTl.fromTo(
        targets,
        {
          opacity: 0,
          y: fromY,
          filter: 'blur(12px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: stepDuration * 2.2,
          stagger: targets.length > 1 ? wordDelay : 0,
          overwrite: 'auto',
        }
      );
    };

    // 2. COME OUT: Words stagger out with blur into scroll direction
    const playComeOut = (targetY = exitY) => {
      if (activeTl) {
        activeTl.kill();
        activeTl = null;
      }
      gsap.killTweensOf(targets);

      gsap.to(targets, {
        opacity: 0,
        y: targetY,
        filter: 'blur(10px)',
        duration: 0.32,
        stagger: targets.length > 1 ? Math.min(wordDelay * 0.5, 0.03) : 0,
        ease: exitEasing,
        overwrite: 'auto',
      });
    };

    // ScrollTrigger: direction-aware entrance & exit transitions
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onEnter: () => playComeIn(),
      onLeave: () => playComeOut(exitY),
      onEnterBack: () => playComeIn(),
      onLeaveBack: () => playComeOut(Math.abs(exitY)),
    });

    // Check if element is active on mount
    if (st.isActive) {
      playComeIn();
    } else if (st.progress > 0) {
      // Element is already scrolled past above viewport
      gsap.set(targets, {
        opacity: 0,
        y: exitY,
        filter: 'blur(10px)',
      });
    } else {
      gsap.set(targets, {
        opacity: 0,
        y: fromY,
        filter: 'blur(12px)',
      });
    }

    return () => {
      if (activeTl) activeTl.kill();
      gsap.killTweensOf(targets);
      st.kill();
    };
  }, [
    effectiveText,
    children,
    delay,
    direction,
    easing,
    exitEasing,
    stepDuration,
    start,
    end,
    onAnimationComplete,
  ]);

  // If children are passed instead of raw string text
  if (!effectiveText && children) {
    return (
      <div
        ref={containerRef}
        className={`inline-flex flex-wrap items-center gap-x-2 will-change-[transform,filter,opacity] ${className}`}
      >
        {React.Children.map(children, (child, idx) => (
          <span
            key={idx}
            className="blur-text-item inline-block will-change-[transform,filter,opacity]"
          >
            {child}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap items-center ${className}`}>
      {elements.map((segment, index) => {
        const isHighlighted = highlightWords.some(
          (w) => w.toLowerCase() === segment.trim().toLowerCase()
        );

        return (
          <span
            key={index}
            className={`blur-text-item inline-block will-change-[transform,filter,opacity] ${
              isHighlighted ? highlightClassName : ''
            }`}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </div>
  );
};

export default BlurText;
