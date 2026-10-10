import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "../data/portfolioData";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const titleWords = [
  {
    letters: [
      { char: "I", orange: true },
      { char: "Q", orange: false },
      { char: "Y", orange: false },
      { char: "A", orange: false },
      { char: "N", orange: false },
    ],
  },
  {
    letters: [
      { char: "A", orange: true },
      { char: "L", orange: false },
      { char: "I", orange: false },
    ],
  },
];

const heroDescWords = personalInfo.heroDescription.split(" ");

const Hero = () => {
  const hasAnimatedRef = useRef(false);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  const wrapAnimatedRef = useRef(false);
  const heroTlRef = useRef(null);
  const cardsTlRef = useRef(null);

  useEffect(() => {
    const setCardsInitialState = () => {
      gsap.set(".banner-three-left", {
        opacity: 0,
        y: 40,
      });
      gsap.set(".banner-three-left-title", {
        opacity: 0,
        y: 20,
      });
      gsap.set(".banner-three-list li", {
        opacity: 0,
        x: -24,
      });
      gsap.set(".banner-three-list li span img", {
        scale: 0,
        rotation: -45,
      });
      gsap.set(".banner-three-right", {
        opacity: 0,
        y: 40,
      });
      gsap.set(".banner-three-right .banner-three-counter-item", {
        opacity: 0,
        x: 30,
        y: 15,
      });
      gsap.set(".banner-three-line-shape", {
        opacity: 0,
        scale: 0.85,
      });
    };

    const resetHeroSection = () => {
      if (heroTlRef.current) heroTlRef.current.kill();
      if (cardsTlRef.current) cardsTlRef.current.kill();
      if (titleTl) titleTl.kill();

      hasAnimatedRef.current = false;
      wrapAnimatedRef.current = false;

      // 1. Initial hidden state for the Hero top elements
      gsap.set(".banner-three-title .title-letter", {
        opacity: 0,
        y: 28,
        scale: 0.88,
        filter: "blur(5px)",
      });
      gsap.set(".banner-three-man img", {
        opacity: 0,
        y: 75,
        scale: 0.96,
      });

      // 2. Initial hidden state for the cards section & internal text items
      setCardsInitialState();

      // 3. Initial hidden state for the center headline text & button
      resetTitleWords();
    };

    const playWrapCardsAnimation = () => {
      if (wrapAnimatedRef.current) return;
      wrapAnimatedRef.current = true;

      if (cardsTlRef.current) cardsTlRef.current.kill();
      cardsTlRef.current = gsap.timeline({
        onComplete: () => {
          // Clear transform after animation completes so hover transitions work smoothly
          gsap.set(
            [
              ".banner-three-left",
              ".banner-three-right",
              ".banner-three-right .banner-three-counter-item",
            ],
            { clearProps: "transform" }
          );
        },
      });

      // 1. Radar line and circle pulse shape
      cardsTlRef.current
        .to(".banner-three-line-shape", {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        // 2. Left card floats up
        .to(
          ".banner-three-left",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        // 3. Left card heading text slides in
        .to(
          ".banner-three-left-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.45"
        )
        // 4. Staggered list items and spinning plus icons slide in
        .to(
          ".banner-three-list li",
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.35"
        )
        .to(
          ".banner-three-list li span img",
          {
            scale: 1,
            rotation: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "back.out(1.5)",
          },
          "<"
        )
        // 5. Right container and staggered stat cards glide in
        .to(
          ".banner-three-right",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          ".banner-three-right .banner-three-counter-item",
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "back.out(1.2)",
          },
          "-=0.5"
        );

      // Play center headline text & explore projects button
      playTitleAnimation();
    };

    const playHeroAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      if (heroTlRef.current) heroTlRef.current.kill();
      heroTlRef.current = gsap.timeline({
        onComplete: () => {
          playWrapCardsAnimation();
        },
      });

      // Step 1: Text letter-by-letter typing in smooth clean animation transition
      heroTlRef.current
        .to(".banner-three-title .title-letter", {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.28,
          stagger: 0.07,
          ease: "power2.out",
        })
        // Step 2: Iqyan image glides in smoothly
        .to(
          ".banner-three-man img",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
          },
          "-=0.1"
        );
    };

    // -------------------------------------------------------------
    // Center headline paragraph transition animation:
    // Plays clean stagger entrance when user comes to this section,
    // and replays the exact same transition every time they scroll away and return.
    // -------------------------------------------------------------
    let isPageRevealed = false;
    let titleTl = null;

    const playTitleAnimation = () => {
      if (titleTl) titleTl.kill();
      const el = document.querySelector(".banner-three-center-title");
      if (el) el.classList.remove("is-revealed");

      titleTl = gsap.timeline({
        onComplete: () => {
          gsap.set(".banner-three-center-title .hero-desc-word", {
            clearProps: "transform,filter",
          });
          gsap.set(".banner-three-button", {
            clearProps: "transform",
          });
          if (el) el.classList.add("is-revealed");
        },
      });

      titleTl
        .fromTo(
          ".banner-three-center-title .hero-desc-word",
          {
            opacity: 0,
            y: 30,
            scale: 0.94,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            stagger: 0.032,
            ease: "power2.out",
            overwrite: "auto",
          }
        )
        .fromTo(
          ".banner-three-button",
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          },
          "-=0.25"
        );
    };

    const resetTitleWords = () => {
      if (titleTl) titleTl.kill();
      const el = document.querySelector(".banner-three-center-title");
      if (el) el.classList.remove("is-revealed");
      gsap.set(".banner-three-center-title .hero-desc-word", {
        opacity: 0,
        y: 30,
        scale: 0.94,
        filter: "blur(6px)",
      });
      gsap.set(".banner-three-button", {
        opacity: 0,
        y: 18,
      });
    };

    // Initially prime all Hero section elements into hidden entrance state
    resetHeroSection();

    const titleScrollTrigger = ScrollTrigger.create({
      trigger: ".banner-three-center-title",
      start: "top 88%",
      end: "bottom 10%",
      onEnter: () => {
        if (!isPageRevealed) return;
        playTitleAnimation();
      },
      onEnterBack: () => {
        if (!isPageRevealed) return;
        playTitleAnimation();
      },
      onLeave: () => {
        if (!isPageRevealed) return;
        resetTitleWords();
      },
      onLeaveBack: () => {
        if (!isPageRevealed) return;
        resetTitleWords();
      },
    });

    // Repeatable ScrollTrigger for the Entire Hero Section:
    // When user scrolls down past the Hero section, it resets cleanly.
    // When user returns to the Hero section (from below), it replays the full initial entrance transition!
    const heroScrollTrigger = ScrollTrigger.create({
      trigger: ".banner-three-area",
      start: "top top",
      end: "bottom 20%",
      onLeave: () => {
        if (!isPageRevealed) return;
        resetHeroSection();
      },
      onEnterBack: () => {
        if (!isPageRevealed) return;
        resetHeroSection();
        playHeroAnimation();
      },
    });

    const handleReveal = () => {
      isPageRevealed = true;
      ScrollTrigger.refresh();
      playHeroAnimation();
    };

    window.addEventListener("hero-reveal", handleReveal, { once: true });

    // Ensure ScrollTrigger accurately measures after image load
    const imgEl = document.querySelector(".banner-three-man img");
    if (imgEl) {
      if (imgEl.complete) {
        ScrollTrigger.refresh();
      } else {
        imgEl.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      }
    }

    // Fallback timer if preloader is skipped or takes longer
    const fallbackTimer = setTimeout(() => {
      if (!isPageRevealed) {
        isPageRevealed = true;
        playHeroAnimation();
      }
    }, 3500);

    return () => {
      window.removeEventListener("hero-reveal", handleReveal);
      clearTimeout(fallbackTimer);
      if (heroScrollTrigger) {
        heroScrollTrigger.kill();
      }
      if (titleScrollTrigger) {
        titleScrollTrigger.kill();
      }
      if (heroTlRef.current) {
        heroTlRef.current.kill();
      }
      if (cardsTlRef.current) {
        cardsTlRef.current.kill();
      }
      if (titleTl) {
        titleTl.kill();
      }
    };
  }, []);

  return (
    <section id="hero" className="banner-three-area">
      <div className="container tw-container-1800-px">
        <div className="row">
          <div className="col-xl-12">
            <div className="banner-three-wrapper position-relative z-1">
              <div
                className="banner-three-man position-absolute start-50 translate-middle-x"
                style={{ pointerEvents: "none", zIndex: 1 }}
              >
                <img
                  src="/images/Iqyan_ali.webp"
                  alt="Khwaja Iqyan Ali - Full-Stack AI Developer & Software Engineer"
                  fetchPriority="high"
                  decoding="async"
                  style={{ pointerEvents: "none" }}
                />
              </div>
              <h1
                className="banner-three-title text-black tw-mb-30 text-uppercase"
                aria-label="Khwaja Iqyan Ali — Full-Stack AI Developer & Software Engineer"
              >
                {titleWords.map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="title-word"
                    style={{ display: "inline-block", whiteSpace: "nowrap" }}
                  >
                    {word.letters.map((l, lIdx) => (
                      <span
                        key={lIdx}
                        className={`title-letter ${l.orange ? "text-main-two-600" : ""}`}
                        style={{ display: "inline-block" }}
                      >
                        {l.char}
                      </span>
                    ))}
                    {wIdx < titleWords.length - 1 && (
                      <span style={{ display: "inline-block" }}>&nbsp;</span>
                    )}
                  </span>
                ))}
              </h1>
              <div className="banner-three-wrap d-flex justify-content-between align-items-end position-relative">
                <div className="banner-three-left tw-rounded-lg">
                  <h2 className="banner-three-left-title tw-text-3xl tw-mb-6">
                    Hi, I'm Khwaja <span className="text-main-two-600">I</span>
                    qyan <span className="text-main-two-600">A</span>li <br />
                    <span className="text-main-two-600">
                      {personalInfo.heroSubtitle}
                    </span>{" "}
                    {personalInfo.heroSubtitleSuffix}
                  </h2>
                  <div className="banner-three-list">
                    <ul>
                      {personalInfo.heroFocusList.map((item, idx) => (
                        <li
                          key={idx}
                          className="tw-text-lg fw-medium d-inline-flex align-items-center tw-gap-2 tw-mb-4"
                        >
                          <span>
                            <img
                              src="/assets/images/icons/banner-three-pluse.svg"
                              alt=""
                              aria-hidden="true"
                            />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className="banner-three-center text-center"
                  style={{
                    position: "relative",
                    zIndex: 999,
                    pointerEvents: "auto",
                  }}
                >
                  <h3 className="banner-three-center-title tw-text-120">
                    {heroDescWords.map((word, wIdx) => (
                      <span
                        key={wIdx}
                        className="hero-desc-word"
                        style={{ display: "inline-block" }}
                      >
                        {word}{wIdx < heroDescWords.length - 1 ? "\u00A0" : ""}
                      </span>
                    ))}
                  </h3>
                  <div
                    className="banner-three-button"
                    style={{ position: "relative", zIndex: 1000, pointerEvents: "auto" }}
                  >
                    <a
                      className="tw-hover-btn bg-black text-white fw-bold tw-py-4 tw-px-10 d-inline-block hover-text-white text-uppercase tw-rounded-lg"
                      href="#projects"
                      onClick={handleScrollToProjects}
                      style={{
                        position: "relative",
                        zIndex: 1001,
                        pointerEvents: "auto",
                        cursor: "pointer",
                      }}
                    >
                      explore projects
                      <span
                        className="tw-hover-btn-circle-dot bg-main-two-600"
                        style={{ pointerEvents: "none" }}
                      ></span>
                    </a>
                  </div>
                </div>
                <div className="banner-three-right tw-rounded-lg">
                  {/* Stat 1 */}
                  <div className="banner-three-counter-item tw-rounded-md tw-mb-4 position-relative">
                    <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                      <span className="purecounter font-heading">
                        {personalInfo.stats[0].value}
                      </span>
                      {personalInfo.stats[0].suffix}
                    </h4>
                    <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">
                      {personalInfo.stats[0].label}
                    </p>
                  </div>
                  {/* Stat 2 */}
                  <div className="banner-three-counter-item tw-rounded-md tw-mb-4 ms-auto bg-black">
                    <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-white tw-mb-2 lh-1">
                      <span className="purecounter font-heading">
                        {personalInfo.stats[1].value}
                      </span>
                      {personalInfo.stats[1].suffix}
                    </h4>
                    <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-white">
                      {personalInfo.stats[1].label}
                    </p>
                  </div>
                  {/* Stat 3 */}
                  <div className="banner-three-counter-item tw-rounded-md tw-mb-4">
                    <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                      {personalInfo.stats[2].value}
                    </h4>
                    <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">
                      {personalInfo.stats[2].label}
                    </p>
                  </div>
                </div>
                <div
                  className="banner-three-line-shape position-absolute start-50 translate-middle-x z-n1"
                  style={{ pointerEvents: "none", zIndex: 0 }}
                >
                  <img
                    src="/assets/images/shapes/banner-three-shape.webp"
                    alt=""
                    aria-hidden="true"
                    style={{ pointerEvents: "none" }}
                  />
                  <div
                    className="banner-three-carcel-shape"
                    style={{ pointerEvents: "none" }}
                  >
                    <div style={{ pointerEvents: "none" }}>
                      <span style={{ pointerEvents: "none" }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
