import React, { useEffect, useRef } from "react";
import { projects } from "../data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const shapeRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const shape = shapeRef.current;
    if (!section || !shape) return;

    // Pin the 'works' watermark text in the exact middle of the screen behind the cards (identically to Experience)
    const anim = gsap.to(shape, {
      scrollTrigger: {
        trigger: shape,
        start: "center center",
        endTrigger: section,
        end: "bottom center",
        pin: shape,
        markers: false,
        pinSpacing: false,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === shape || t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="portfolio-three-area py-120 position-relative z-1"
    >
      {/* Background Sticky Watermark - Positioned behind cards, pinned identically to Experience */}
      <div ref={shapeRef} className="portfolio-three-shape" aria-hidden="true">
        <div className="portfolio-three-shape-title">works</div>
      </div>

      <div className="container tw-container-1800-px position-relative z-1">
        <div className="row tw-mb-15 position-relative z-2">
          <div className="col-xl-12 text-center">
            <h2 className="tw-text-15 text-heading font-heading">
              Featured Live Projects
            </h2>
            <p className="tw-text-xl text-neutral-600">
              Production-ready applications built for scale, performance, and
              clean UX
            </p>
          </div>
        </div>
        <div className="row position-relative">
          <div className="col-xl-12 position-relative">
            <div
              ref={cardsWrapperRef}
              className="portfolio-three-wrapper d-flex justify-content-between flex-wrap align-items-start position-relative z-1"
            >
              {projects.map((proj, idx) => (
                <React.Fragment key={proj.id}>
                  {/* Desktop Card (>= 992px) - Original layout with staggered entrance animation like Experience */}
                  <div
                    className="portfolio-three-item tw-rounded-lg tw-mb-705 portfolio-wrapper d-none d-lg-block"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={(idx + 1) * 150}
                  >
                    <div className="portfolio-three-wrap d-flex justify-content-between flex-wrap row-gap-2">
                      <div className="tw-mb-6">
                        <div>
                          <h3 className="tw-text-605 fw-medium tw-mb-2">
                            <a
                              className="hover-text-main-two-600"
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {proj.title}
                            </a>
                          </h3>
                          <p className="tw-text-lg text-neutral-600 tw-mb-4">
                            {proj.description}
                          </p>
                        </div>
                        <div className="portfolio-three-list portfolio-list">
                          <ul className="d-flex tw-gap-205 flex-wrap">
                            {proj.tags.map((tag, tIdx) => (
                              <li key={tIdx}>
                                <span className="text-uppercase text-heading tw-text-xs fw-semibold border border-neutral-300 tw-px-2 tw-py-1 tw-rounded">
                                  {tag}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex tw-gap-2 align-items-center">
                        {proj.githubUrl && (
                          <div className="portfolio-three-button">
                            <a
                              className="portfolio-three-btn tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center text-heading rounded-circle hover-bg-main-two-600 hover-text-white"
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="GitHub Repository"
                              aria-label={`View ${proj.title} on GitHub`}
                            >
                              <i className="ph ph-github-logo"></i>
                            </a>
                          </div>
                        )}
                        <div className="portfolio-three-button">
                          <a
                            className="portfolio-three-btn tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center text-heading rounded-circle hover-bg-main-two-600 hover-text-white"
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Live Demo"
                            aria-label={`View Live Demo of ${proj.title}`}
                          >
                            <i className="ph ph-arrow-up-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="portfolio-thumb not-hide-cursor fw-bold mb-0 tw-rounded-lg"
                      data-cursor="Live Demo"
                    >
                      <a
                        className="d-block cursor-hide tw-rounded-lg"
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open Live Demo of ${proj.title}`}
                      >
                        <img
                          className="w-100 tw-rounded-lg"
                          src={proj.image}
                          alt={`${proj.title.replace(/^[0-9]+\.\s*/, "")} - web application developed by Khwaja Iqyan Ali`}
                          width="760"
                          height="475"
                          loading="lazy"
                          decoding="async"
                          style={{ aspectRatio: "16/10", objectFit: "cover" }}
                        />
                      </a>
                    </div>
                  </div>

                  {/* Dedicated Mobile Card (< 992px) - Animated with AOS fade-up identically to Experience */}
                  <div
                    className="project-mobile-card d-lg-none"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={(idx + 1) * 150}
                  >
                    {/* Header: Project Badge & Title & Quick Icons */}
                    <div className="project-mobile-header">
                      <div className="project-mobile-title-wrap">
                        <span className="project-mobile-num-badge">0{proj.id}</span>
                        <h3 className="project-mobile-title">
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="project-mobile-title-link"
                          >
                            {proj.title.replace(/^[0-9]+\.\s*/, "")}
                          </a>
                        </h3>
                      </div>
                      <div className="project-mobile-header-actions">
                        {proj.githubUrl && (
                          <a
                            className="project-mobile-icon-btn"
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${proj.title} on GitHub`}
                            title="GitHub Repository"
                          >
                            <i className="ph ph-github-logo"></i>
                          </a>
                        )}
                        <a
                          className="project-mobile-icon-btn project-mobile-live-btn"
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open Live Demo of ${proj.title}`}
                          title="Live Demo"
                        >
                          <i className="ph ph-arrow-up-right"></i>
                        </a>
                      </div>
                    </div>

                    {/* Thumbnail Preview with Live App badge */}
                    <div className="project-mobile-thumb-wrap">
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-mobile-thumb-link"
                        aria-label={`View Live Demo of ${proj.title}`}
                      >
                        <img
                          className="project-mobile-img"
                          src={proj.image}
                          alt={`${proj.title.replace(/^[0-9]+\.\s*/, "")} - web application developed by Khwaja Iqyan Ali`}
                          width="600"
                          height="375"
                          loading="lazy"
                          decoding="async"
                          style={{ aspectRatio: "16/10", objectFit: "cover" }}
                        />
                        <div className="project-mobile-thumb-overlay">
                          <span className="project-mobile-live-chip">
                            <span className="live-dot"></span> LIVE APP
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Description */}
                    <p className="project-mobile-desc">{proj.description}</p>

                    {/* Tech Stack Chips */}
                    <div className="project-mobile-tags">
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="project-mobile-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="project-mobile-action-bar">
                      <a
                        className="project-mobile-primary-cta"
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>Live Project</span>
                        <i className="ph ph-arrow-up-right"></i>
                      </a>
                      {proj.githubUrl && (
                        <a
                          className="project-mobile-secondary-cta"
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="ph ph-github-logo"></i>
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
