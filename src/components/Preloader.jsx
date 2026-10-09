import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "./Preloader.css";

const Preloader = ({ onReveal }) => {
  const preloaderRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".preloader-heading .load-text, .preloader-heading .cont", {
      delay: 0.8,
      y: -80,
      opacity: 0,
      duration: 0.5,
    })
      .to(svgRef.current, {
        duration: 0.5,
        attr: { d: curve },
        ease: "power2.inOut",
      })
      .to(svgRef.current, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.inOut",
      })
      .to(preloaderRef.current, {
        y: "-130%",
        duration: 0.7,
        ease: "power4.inOut",
        onStart: () => {
          if (onReveal) onReveal();
          window.dispatchEvent(new CustomEvent("hero-reveal"));
        },
      })
      .set(preloaderRef.current, {
        display: "none",
        zIndex: -1,
        onComplete: () => {
          AOS.refresh();
          ScrollTrigger.refresh();
        },
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="preloader" ref={preloaderRef} aria-hidden="true">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path
          ref={svgRef}
          id="preloaderSvg"
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        ></path>
      </svg>
      <div className="preloader-heading">
        <div className="load-text" style={{ textTransform: "lowercase", letterSpacing: "8px" }}>
          <span>i</span>
          <span>q</span>
          <span>y</span>
          <span>a</span>
          <span>n</span>
          <span>a</span>
          <span>l</span>
          <span>i</span>
          <span>.</span>
          <span>d</span>
          <span>e</span>
          <span>v</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Preloader);
