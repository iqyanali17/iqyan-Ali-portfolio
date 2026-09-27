import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SectionRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  stagger?: number;
  fromY?: number;
  exitY?: number;
  blur?: number;
  scale?: number;
  duration?: number;
  exitDuration?: number;
  ease?: string;
  exitEase?: string;
  start?: string;
  end?: string;
  trigger?: React.RefObject<HTMLElement | null> | HTMLElement | string | null;
  selector?: string | null;
  animateChildren?: boolean;
  disabled?: boolean;
}

/**
 * SectionReveal: Scroll entrance & exit transition component for section headings and content.
 * 
 * 4 Scroll Trigger States Supported:
 * 1. COME IN (onEnter - Scrolling down into view):
 *    - content comes smoothly from slightly above (y: fromY -> 0)
 *    - blur clears to sharp (blur -> 0px)
 *    - opacity 0 -> 1
 *    - scale: scale -> 1
 * 
 * 2. COME OUT (onLeave - Scrolling down past element):
 *    - reverse smoothly upward
 *    - content moves slightly upward (y -> exitY)
 *    - subtle blur (0px -> blur)
 *    - opacity 1 -> 0
 * 
 * 3. RE-COME IN (onEnterBack - Scrolling back up into view):
 *    - replay entrance animation cleanly
 * 
 * 4. RE-COME OUT (onLeaveBack - Scrolling all the way back up above element):
 *    - reverse smoothly downward (y -> abs(exitY))
 *    - subtle blur & opacity 1 -> 0
 */
export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  stagger = 0.06,
  fromY = -25,
  exitY = -30,
  blur = 8,
  scale = 0.97,
  duration = 0.9,
  exitDuration = 0.35,
  ease = 'power2.out',
  exitEase = 'power2.in',
  start = 'top 88%',
  end = 'bottom 15%',
  trigger = null,
  selector = null,
  animateChildren = false,
  disabled = false,
  ...props
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resolve target elements (selector, children with stagger, or container itself)
    const getTargets = (): HTMLElement[] => {
      if (!el) return [];
      if (selector) {
        const selected = el.querySelectorAll<HTMLElement>(selector);
        if (selected.length > 0) return Array.from(selected);
      }
      if (animateChildren || (stagger > 0 && el.children.length > 0)) {
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
        scale: 1,
      });
      return;
    }

    let activeTl: gsap.core.Timeline | null = null;

    // 1. COME IN / RE-COME IN: Smooth reveal from slightly above with blur clearing
    const playComeIn = () => {
      if (activeTl) {
        activeTl.kill();
      }
      gsap.killTweensOf(targets);

      activeTl = gsap.timeline({ defaults: { ease } });

      activeTl.fromTo(
        targets,
        {
          opacity: 0,
          y: fromY,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
          scale: scale !== 1 ? scale : 1,
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration,
          stagger: targets.length > 1 ? stagger : 0,
          overwrite: 'auto',
        }
      );
    };

    // 2. COME OUT: Reverse animation smoothly with blur and fade-out in scroll direction
    const playComeOut = (yOffset = exitY) => {
      if (activeTl) {
        activeTl.kill();
        activeTl = null;
      }
      gsap.killTweensOf(targets);

      gsap.to(targets, {
        opacity: 0,
        y: yOffset,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        scale: scale !== 1 ? scale : 1,
        duration: exitDuration,
        stagger: targets.length > 1 ? Math.min(stagger * 0.5, 0.03) : 0,
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

    // Direction-aware ScrollTrigger for all 4 scroll boundaries
    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start,
      end,
      onEnter: () => playComeIn(),
      onLeave: () => playComeOut(exitY),
      onEnterBack: () => playComeIn(),
      onLeaveBack: () => playComeOut(Math.abs(exitY)),
    });

    // Handle initial state on mount
    if (st.isActive) {
      playComeIn();
    } else if (st.progress > 0) {
      // Element is already scrolled past above viewport
      gsap.set(targets, {
        opacity: 0,
        y: exitY,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        scale: scale !== 1 ? scale : 1,
      });
    } else {
      gsap.set(targets, {
        opacity: 0,
        y: fromY,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        scale: scale !== 1 ? scale : 1,
      });
    }

    return () => {
      if (activeTl) activeTl.kill();
      gsap.killTweensOf(targets);
      st.kill();
    };
  }, [
    animateChildren,
    blur,
    disabled,
    duration,
    ease,
    end,
    exitDuration,
    exitEase,
    exitY,
    fromY,
    scale,
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

export default SectionReveal;
