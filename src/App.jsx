import React, { useEffect } from "react";
import AOS from "aos";
import Preloader from "./components/Preloader";
import MagicCursor from "./components/MagicCursor";
import BackToTop from "./components/BackToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Marquee from "./components/Marquee";

// Code-split below-the-fold sections for fast initial load
const Skills = React.lazy(() => import("./components/Skills"));
const Projects = React.lazy(() => import("./components/Projects"));
const WhatIBuild = React.lazy(() => import("./components/WhatIBuild"));
const Experience = React.lazy(() => import("./components/Experience"));
const Contact = React.lazy(() => import("./components/Contact"));

function App() {
  const initializedRef = React.useRef(false);

  const initAnimations = React.useCallback(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    AOS.init({
      once: false,
      offset: 0,
      duration: 1000,
      anchorPlacement: "top-bottom",
    });
    AOS.refreshHard();
  }, []);

  useEffect(() => {
    // Safety fallback: if preloader is skipped or takes longer than 3.5s
    const timer = setTimeout(() => {
      initAnimations();
    }, 3500);
    return () => clearTimeout(timer);
  }, [initAnimations]);

  return (
    <div className="tw-magic-cursor">
      {/* Preloader */}
      <Preloader onReveal={initAnimations} />

      {/* Magic Cursor */}
      <MagicCursor />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <About />
          <Marquee />
          <React.Suspense fallback={null}>
            <Skills />
            <Projects />
            <WhatIBuild />
            <Experience />
            <Contact />
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
