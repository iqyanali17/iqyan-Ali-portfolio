import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface LineByLineRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  stagger?: number;
  fromY?: number;
  exitY?: number;
  blur?: number;
  duration?: number;
  exitDuration?: number;
  ease?: string;
  exitEase?: string;
  start?: string;
  end?: string;
  trigger?: React.RefObject<HTMLElement | null> | HTMLElement | string | null;
  selector?: string;
  disabled?: boolean;
}

/**
 * LineByLineReveal
 * Smooth scroll-driven line-by-line entrance and exit animation.
 * 
 * Features:
 * - Line-by-line cascading reveal (badge -> heading line 1 -> heading line 2 -> subtitle)
 * - Crystal clear blur-clearing entrance on scroll enter (onEnter & onEnterBack)
 * - Smooth blur-and-glide exit when user scrolls past (onLeave & onLeaveBack)
 * - Zero flickering, zero instant jumps
 */
export const LineByLineReveal: React.FC<LineByLineRevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  stagger = 0.12,
  fromY = -20,
  exitY = -20,
  blur = 0,
  duration = 0.75,
  exitDuration = 0.32,
  ease = 'power3.out',
  exitEase = 'power2.inOut',
  start = 'top 85%',
  end = 'bottom 12%',
  trigger = null,
  selector = '.reveal-line',
  disabled = false,
  ...props
}) => {
  const containerRef = useRef<HTMLElement>(null);

  // Minimalist blur cap: Ensure any blur is strictly subtle (max 2px) or completely disabled (0)
  const safeBlur = Math.min(Math.max(0, blur), 2);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Get individual line elements: either matching selector or direct children
    const getTargets = (): HTMLElement[] => {
      if (!el) return [];
      if (selector) {
        const selected = el.querySelectorAll<HTMLElement>(selector);
        if (selected.length > 0) return Array.from(selected);
      }
      if (el.children.length > 0) {
        return Array.from(el.children) as HTMLElement[];
      }
      return [el];
    };

    const targets = getTargets();
    if (targets.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(targets, {
        opacity: 1,
        y: 0,
        filter: 'none',
      });
      return;
    }

    let activeTl: gsap.core.Timeline | null = null;

    // 1. COME IN / RE-COME IN: Smooth line-by-line reveal with clean transforms
    const playComeIn = () => {
      if (activeTl) activeTl.kill();
      gsap.killTweensOf(targets);

      activeTl = gsap.timeline({ defaults: { ease } });

      activeTl.fromTo(
        targets,
        {
          opacity: 0,
          y: fromY,
          ...(safeBlur > 0 ? { filter: `blur(${safeBlur}px)` } : { filter: 'none' }),
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: targets.length > 1 ? stagger : 0,
          overwrite: 'auto',
          onComplete: () => {
            // Clean up filter completely to keep typography 100% sharp
            gsap.set(targets, { clearProps: 'filter' });
          },
        }
      );
    };

    // 2. COME OUT: Smooth line-by-line exit in scroll direction with clean fade
    const playComeOut = (targetY = exitY) => {
      if (activeTl) {
        activeTl.kill();
        activeTl = null;
      }
      gsap.killTweensOf(targets);

      gsap.to(targets, {
        opacity: 0,
        y: targetY,
        ...(safeBlur > 0 ? { filter: `blur(${safeBlur * 0.5}px)` } : {}),
        duration: exitDuration,
        stagger: targets.length > 1 ? Math.min(stagger * 0.5, 0.04) : 0,
        ease: exitEase,
        overwrite: 'auto',
      });
    };

    // Determine trigger DOM element
    const resolveTrigger = (): Element => {
      if (!trigger) return el;
      if (typeof trigger === 'string') return document.querySelector(trigger) || el;
      if ('current' in trigger && trigger.current) return trigger.current;
      if (trigger instanceof Element) return trigger;
      return el;
    };

    const triggerEl = resolveTrigger();

    // ScrollTrigger instance for all 4 scroll boundaries
    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start,
      end,
      onEnter: () => playComeIn(),
      onLeave: () => playComeOut(exitY),
      onEnterBack: () => playComeIn(),
      onLeaveBack: () => playComeOut(Math.abs(exitY)),
    });

    // Check initial state on mount
    if (st.isActive) {
      playComeIn();
    } else if (st.progress > 0) {
      // Element is scrolled past above the viewport
      gsap.set(targets, {
        opacity: 0,
        y: exitY,
        ...(safeBlur > 0 ? { filter: `blur(${safeBlur * 0.5}px)` } : { filter: 'none' }),
      });
    } else {
      // Element is below the viewport
      gsap.set(targets, {
        opacity: 0,
        y: fromY,
        ...(safeBlur > 0 ? { filter: `blur(${safeBlur}px)` } : { filter: 'none' }),
      });
    }

    return () => {
      if (activeTl) activeTl.kill();
      gsap.killTweensOf(targets);
      st.kill();
    };
  }, [
    safeBlur,
    disabled,
    duration,
    ease,
    end,
    exitDuration,
    exitEase,
    exitY,
    fromY,
    selector,
    stagger,
    start,
    trigger,
  ]);

  return (
    <Component ref={containerRef} className={className} {...props}>
      {children}
    </Component>
  );
};

export default LineByLineReveal;
