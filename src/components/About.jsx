import React, { useEffect, useRef } from "react";
import { personalInfo } from "../data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const initialClipPaths = [
  "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
  "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
  "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
  "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
  "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
  "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
  "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
  "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
];

const finalClipPaths = [
  "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
  "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
  "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
  "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
  "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
  "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
  "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
  "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
  "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
];

const aboutIntroWords = personalInfo.aboutIntro.split(" ");

const About = () => {
  const clipWrapperRef = useRef(null);
  const btnWrapperRef = useRef(null);
  const btnItemRef = useRef(null);
  const btnDotRef = useRef(null);

  useEffect(() => {
    const wrapper = clipWrapperRef.current;
    if (!wrapper) return;

    const imgUrl = "/images/passport_img.webp";

    // Clean existing masks if any
    wrapper.querySelectorAll(".mask").forEach((m) => m.remove());

    const masks = [];
    for (let i = 0; i < 9; i++) {
      const mask = document.createElement("div");
      mask.className = `mask mask-${i + 1}`;
      Object.assign(mask.style, {
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
      });
      wrapper.appendChild(mask);
      masks.push(mask);
    }

    const order = [
      [".mask-1"],
      [".mask-2", ".mask-4"],
      [".mask-3", ".mask-5", ".mask-7"],
      [".mask-6", ".mask-8"],
      [".mask-9"],
    ];

    // 1. Photo Mask Grid Reveal
    let photoTl = null;
    const playPhotoAnimation = () => {
      if (photoTl) photoTl.kill();
      photoTl = gsap.timeline();
      order.forEach((targets, i) => {
        const validTargets = targets
          .map((c) => wrapper.querySelector(c))
          .filter(Boolean);

        if (validTargets.length) {
          photoTl.to(
            validTargets,
            {
              clipPath: (j, el) => finalClipPaths[masks.indexOf(el)],
              duration: 0.95,
              ease: "power4.out",
              stagger: 0.08,
            },
            i * 0.12
          );
        }
      });
    };

    const resetPhotoAnimation = () => {
      if (photoTl) photoTl.kill();
      masks.forEach((m, idx) => {
        gsap.set(m, { clipPath: initialClipPaths[idx] });
      });
    };

    resetPhotoAnimation();

    const photoScrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top 78%",
      end: "bottom 10%",
      onEnter: () => playPhotoAnimation(),
      onEnterBack: () => playPhotoAnimation(),
      onLeave: () => resetPhotoAnimation(),
      onLeaveBack: () => resetPhotoAnimation(),
    });

    // 2. Section Headline Kinetic Masked Baseline Reveal
    let titleTl = null;
    const playAboutTitleAnimation = () => {
      if (titleTl) titleTl.kill();
      const el = document.querySelector(".about-three-title");
      if (el) el.classList.remove("is-revealed");

      titleTl = gsap.timeline({
        onComplete: () => {
          gsap.set(".about-title-word", { clearProps: "transform,opacity" });
          if (el) el.classList.add("is-revealed");
        },
      });

      titleTl.fromTo(
        ".about-title-word",
        {
          y: "115%",
          opacity: 0,
          rotateZ: 2,
        },
        {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          duration: 0.75,
          stagger: 0.025,
          ease: "power4.out",
          overwrite: "auto",
        }
      );
    };

    const resetAboutTitle = () => {
      if (titleTl) titleTl.kill();
      const el = document.querySelector(".about-three-title");
      if (el) el.classList.remove("is-revealed");
      gsap.set(".about-title-word", {
        y: "115%",
        opacity: 0,
        rotateZ: 2,
      });
    };

    resetAboutTitle();

    const titleScrollTrigger = ScrollTrigger.create({
      trigger: ".about-three-title",
      start: "top 88%",
      end: "bottom 8%",
      onEnter: () => playAboutTitleAnimation(),
      onEnterBack: () => playAboutTitleAnimation(),
      onLeave: () => resetAboutTitle(),
      onLeaveBack: () => resetAboutTitle(),
    });

    // 3. Sequential Kinetic Cascade for About 3 Bio Paragraphs
    let bioTl = null;
    const playAboutBioAnimation = () => {
      if (bioTl) bioTl.kill();
      const el = document.querySelector(".about-bio-wrapper");
      if (el) el.classList.remove("is-revealed");

      bioTl = gsap.timeline({
        onComplete: () => {
          gsap.set(".about-bio-paragraph", { clearProps: "transform,opacity,filter" });
          if (el) el.classList.add("is-revealed");
        },
      });

      bioTl.fromTo(
        ".about-bio-paragraph",
        {
          opacity: 0,
          x: -30,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.18,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    };

    const resetAboutBio = () => {
      if (bioTl) bioTl.kill();
      const el = document.querySelector(".about-bio-wrapper");
      if (el) el.classList.remove("is-revealed");
      gsap.set(".about-bio-paragraph", {
        opacity: 0,
        x: -30,
        filter: "blur(4px)",
      });
    };

    resetAboutBio();

    const bioScrollTrigger = ScrollTrigger.create({
      trigger: ".about-bio-wrapper",
      start: "top 85%",
      end: "bottom 10%",
      onEnter: () => playAboutBioAnimation(),
      onEnterBack: () => playAboutBioAnimation(),
      onLeave: () => resetAboutBio(),
      onLeaveBack: () => resetAboutBio(),
    });

    return () => {
      if (photoTl) photoTl.kill();
      if (titleTl) titleTl.kill();
      if (bioTl) bioTl.kill();
      if (photoScrollTrigger) photoScrollTrigger.kill();
      if (titleScrollTrigger) titleScrollTrigger.kill();
      if (bioScrollTrigger) bioScrollTrigger.kill();
    };
  }, []);

  // Parallax / magnetic effect for circular button
  const handleButtonMouseMove = (e) => {
    const btn = btnWrapperRef.current;
    const target = btnItemRef.current;
    const dot = btnDotRef.current;
    if (!btn || !target) return;

    const rect = btn.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    gsap.to(target, {
      duration: 1,
      x: ((relX - rect.width / 2) / rect.width) * 60,
      y: ((relY - rect.height / 2) / rect.height) * 60,
      ease: "power2.out",
    });

    if (dot) {
      dot.style.left = `${relX}px`;
      dot.style.top = `${relY}px`;
    }
  };

  const handleButtonMouseLeave = () => {
    const target = btnItemRef.current;
    if (target) {
      gsap.to(target, {
        duration: 1,
        x: 0,
        y: 0,
        ease: "power2.out",
      });
    }
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="about"
      className="about-three-area py-120 position-relative z-1"
    >
      <div className="container tw-container-1800-px">
        <div className="about-three-top position-relative z-1">
          <div className="row justify-content-center tw-mb-21 pt-4">
            <div className="col-xl-10">
              <div className="text-center">
                <h2 className="about-three-title text-heading tw-text-15 tw-itm-title tw-itm-anim">
                  {aboutIntroWords.map((word, idx) => (
                    <span key={idx} className="about-title-mask">
                      <span className="about-title-word">{word}</span>
                      {idx < aboutIntroWords.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div
                ref={clipWrapperRef}
                className="about-three-thumb w-100 tw-clip-anim tw-rounded-lg position-relative"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
                style={{
                  overflow: "hidden",
                }}
              >
                <img
                  className="tw-anim-img w-100 tw-rounded-lg"
                  data-animate="true"
                  src="/images/passport_img.webp"
                  alt="Khwaja Iqyan Ali - Software Engineer &amp; Full-Stack Developer"
                  loading="lazy"
                  decoding="async"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-three-right">
                <div className="about-bio-wrapper">
                  {personalInfo.aboutBio.map((bio, idx) => (
                    <p
                      key={idx}
                      className={`about-bio-paragraph tw-text-xl ${idx === 2 ? "tw-mb-10" : "tw-mb-8"}`}
                      dangerouslySetInnerHTML={{
                        __html: bio,
                      }}
                    />
                  ))}
                </div>
                <div className="about-three-counter d-inline-block">
                  <div
                    ref={btnWrapperRef}
                    className="tw-hover-btn-wrapper d-inline-block"
                    onMouseMove={handleButtonMouseMove}
                    onMouseLeave={handleButtonMouseLeave}
                  >
                    <a
                      ref={btnItemRef}
                      className="tw-btn-circle tw-hover-btn-item tw-hover-btn lh-1 d-inline-flex justify-content-center align-items-center rounded-circle position-relative overflow-hidden border border-1 border-neutral-200"
                      style={{ width: "110px", height: "110px" }}
                      href="#contact"
                      onClick={handleScrollToContact}
                    >
                      <span className="d-flex flex-column justify-content-center text-center p-1 position-relative z-1">
                        <span
                          className="text-heading fw-bold text-uppercase"
                          style={{
                            fontSize: "0.75rem",
                            lineHeight: 1.1,
                            fontWeight: 700,
                            display: "block",
                          }}
                        >
                          Build Your
                        </span>
                        <span
                          className="text-main-two-600 fw-bold text-uppercase"
                          style={{
                            fontSize: "0.75rem",
                            lineHeight: 1.1,
                            fontWeight: 700,
                            display: "block",
                          }}
                        >
                          Product <i className="ph ph-arrow-up-right"></i>
                        </span>
                      </span>
                      <i
                        ref={btnDotRef}
                        className="tw-btn-circle-dot bg-main-two-600"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-three-wrap-shape d-flex justify-content-between">
            {personalInfo.aboutCards.map((card, idx) => (
              <div
                key={idx}
                className="banner-three-counter-item tw-rounded-md position-relative"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={card.delay}
              >
                <h3 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                  {card.title}
                </h3>
                <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <img
          className="about-three-shape position-absolute start-0 w-100"
          src="/assets/images/shapes/about-three-shape.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};

export default React.memo(About);
