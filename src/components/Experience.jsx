import React, { useState, useEffect, useRef, useMemo } from "react";
import { experienceData } from "../data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const shapeRef = useRef(null);

  const filteredData = useMemo(() => {
    if (filter === "all") return experienceData;
    return experienceData.filter((item) => item.type === filter);
  }, [filter]);

  useEffect(() => {
    const section = sectionRef.current;
    const shape = shapeRef.current;
    if (!section || !shape) return;

    // Pin the 'EXPERIENCE' watermark text in the exact middle of the screen behind the cards
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

    // Refresh triggers when filter changes
    ScrollTrigger.refresh();

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === shape || t.vars.trigger === section) t.kill();
      });
    };
  }, [filter]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-area py-120 position-relative z-1"
      style={{ backgroundColor: "#f8f7f4" }}
    >
      {/* Background Sticky Watermark - Positioned behind cards, pinned like Projects 'works' */}
      <div ref={shapeRef} className="experience-shape" aria-hidden="true">
        <div className="experience-shape-title">EXPERIENCE</div>
      </div>

      {/* Subtle light ambient glow orb */}
      <div
        className="position-absolute start-50 translate-middle-x pointer-events-none"
        style={{
          top: "8%",
          width: "700px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(237, 90, 47, 0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      ></div>

      <div className="container tw-container-1800-px position-relative z-1">
        {/* Section Header */}
        <div className="row tw-mb-15 justify-content-center text-center">
          <div className="col-xl-8 col-lg-10">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              <span className="text-main-two-600 text-uppercase fw-bold tracking-wider tw-text-sm border border-neutral-300 tw-px-4 tw-py-2 tw-rounded-md d-inline-flex align-items-center tw-gap-2 bg-white shadow-sm">
                <i className="ph ph-briefcase"></i> CAREER ROADMAP &amp;
                CREDENTIALS
              </span>
              <h2 className="tw-text-15 text-heading font-heading tw-mt-4 tw-mb-4">
                Experience &amp; Education
              </h2>
              <p className="tw-text-xl text-neutral-600 tw-mb-8">
                Software engineering internships, production deployments, and
                verified academic milestones
              </p>

              {/* Filter Tabs */}
              <div className="d-inline-flex align-items-center p-1 rounded-pill bg-white border border-neutral-200 shadow-sm tw-gap-2">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`tw-px-5 tw-py-2 rounded-pill tw-text-sm fw-semibold tw-transition-3 border-0 ${
                    filter === "all"
                      ? "bg-main-two-600 text-white shadow-sm"
                      : "bg-transparent text-neutral-600 hover-text-black"
                  }`}
                >
                  All Milestones ({experienceData.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("work")}
                  className={`tw-px-5 tw-py-2 rounded-pill tw-text-sm fw-semibold tw-transition-3 border-0 ${
                    filter === "work"
                      ? "bg-main-two-600 text-white shadow-sm"
                      : "bg-transparent text-neutral-600 hover-text-black"
                  }`}
                >
                  <i className="ph ph-briefcase"></i> Internships
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("education")}
                  className={`tw-px-5 tw-py-2 rounded-pill tw-text-sm fw-semibold tw-transition-3 border-0 ${
                    filter === "education"
                      ? "bg-main-two-600 text-white shadow-sm"
                      : "bg-transparent text-neutral-600 hover-text-black"
                  }`}
                >
                  <i className="ph ph-graduation-cap"></i> Education
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div className="position-relative">
              {/* Vertical Timeline Guide Line (Desktop) */}
              <div
                className="position-absolute d-none d-md-block"
                style={{
                  left: "24px",
                  top: "24px",
                  bottom: "24px",
                  width: "2px",
                  background:
                    "linear-gradient(to bottom, rgba(237, 90, 47, 0.7), rgba(0, 0, 0, 0.12), rgba(237, 90, 47, 0.35))",
                }}
              ></div>

              <div className="d-flex flex-column tw-gap-8">
                {filteredData.map((item, idx) => (
                  <div
                    key={item.id}
                    className="position-relative ps-md-5"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={(idx + 1) * 150}
                  >
                    {/* Timeline Node Point (Desktop) */}
                    <div
                      className="position-absolute d-none d-md-flex justify-content-center align-items-center rounded-circle bg-white border border-2 border-main-two-600"
                      style={{
                        left: "14px",
                        top: "36px",
                        width: "22px",
                        height: "22px",
                        boxShadow: "0 0 12px rgba(237, 90, 47, 0.35)",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2,
                      }}
                    >
                      <span
                        className="rounded-circle bg-main-two-600"
                        style={{ width: "8px", height: "8px" }}
                      ></span>
                    </div>

                    {/* Premium Light Experience Card */}
                    <div
                      className="experience-card p-4 p-md-5 rounded-4 bg-white border border-neutral-200 tw-transition-3 position-relative overflow-hidden"
                      style={{
                        boxShadow:
                          "0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
                      }}
                    >
                      {/* Top Header Row */}
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start tw-gap-4 tw-mb-4">
                        <div className="d-flex align-items-start tw-gap-4">
                          {/* Role Icon */}
                          <div
                            className="tw-w-13 tw-h-13 rounded-3 d-flex justify-content-center align-items-center shrink-0 border"
                            style={{
                              background:
                                item.type === "work"
                                  ? "rgba(237, 90, 47, 0.1)"
                                  : "rgba(79, 70, 229, 0.08)",
                              borderColor:
                                item.type === "work"
                                  ? "rgba(237, 90, 47, 0.25)"
                                  : "rgba(79, 70, 229, 0.22)",
                              color:
                                item.type === "work"
                                  ? "var(--main-two-600)"
                                  : "#4f46e5",
                            }}
                          >
                            <i
                              className={`${
                                item.type === "work"
                                  ? "ph ph-briefcase"
                                  : "ph ph-graduation-cap"
                              } tw-text-2xl`}
                            ></i>
                          </div>

                          {/* Role & Company */}
                          <div>
                            <div className="d-flex flex-wrap align-items-center tw-gap-2 tw-mb-1">
                              <h3 className="tw-text-2xl text-heading fw-bold tw-mb-0 font-heading">
                                {item.role}
                              </h3>
                              <span
                                className="tw-text-xs fw-semibold tw-px-205 tw-py-1 rounded text-uppercase"
                                style={{
                                  background:
                                    item.type === "work"
                                      ? "rgba(237, 90, 47, 0.1)"
                                      : "rgba(79, 70, 229, 0.08)",
                                  color:
                                    item.type === "work"
                                      ? "var(--main-two-600)"
                                      : "#4338ca",
                                  border:
                                    item.type === "work"
                                      ? "1px solid rgba(237, 90, 47, 0.25)"
                                      : "1px solid rgba(79, 70, 229, 0.22)",
                                }}
                              >
                                {item.badge}
                              </span>
                            </div>

                            <div className="d-flex flex-wrap align-items-center tw-gap-3 tw-text-sm">
                              {item.website ? (
                                <a
                                  href={item.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-heading hover-text-main-two-600 fw-semibold d-inline-flex align-items-center tw-gap-1 tw-transition-3"
                                  aria-label={`Visit ${item.company} website`}
                                >
                                  {item.company}
                                  <i className="ph ph-arrow-up-right"></i>
                                </a>
                              ) : (
                                <span className="text-heading fw-semibold">
                                  {item.company}
                                </span>
                              )}
                              <span className="text-neutral-400">•</span>
                              <span className="text-neutral-500 d-inline-flex align-items-center tw-gap-1">
                                <i className="ph ph-map-pin text-main-two-600"></i>{" "}
                                {item.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Duration Pill */}
                        <div className="d-flex flex-wrap align-items-center tw-gap-2 self-start">
                          <span className="tw-text-xs font-monospace fw-semibold text-neutral-700 border border-neutral-200 bg-neutral-100 tw-px-3 tw-py-105 rounded-pill d-inline-flex align-items-center tw-gap-105">
                            <i className="ph ph-calendar-blank text-main-two-600"></i>
                            {item.duration}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className="text-neutral-600 tw-text-base lh-lg tw-mb-5 ps-md-4 border-start border-2"
                        style={{ borderColor: "var(--main-two-600)" }}
                      >
                        {item.description}
                      </p>

                      {/* Footer Row: Skills Badges & Certificate Action */}
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center tw-gap-4 pt-3 border-top border-neutral-100">
                        {/* Skills list */}
                        <div className="d-flex flex-wrap tw-gap-2 align-items-center">
                          <span className="tw-text-xs text-neutral-500 fw-semibold text-uppercase tw-me-1">
                            Skills:
                          </span>
                          {item.skills?.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-heading tw-text-xs fw-medium bg-neutral-100 border border-neutral-200 tw-px-205 tw-py-1 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Certificate Button if present */}
                        {item.certificate && (
                          <div className="shrink-0">
                            <a
                              href={item.certificate}
                              target="_blank"
                              rel="noreferrer"
                              className="tw-text-xs fw-semibold text-heading bg-white border border-neutral-300 hover-border-main-two-600 hover-bg-main-two-600 hover-text-white tw-px-4 tw-py-2 rounded-pill d-inline-flex align-items-center tw-gap-2 tw-transition-3 shadow-sm"
                              title="View Verified Credential"
                              aria-label={`View verified credential for ${item.role} at ${item.company}`}
                            >
                              <i className="ph ph-certificate tw-text-base text-main-two-600"></i>
                              <span>Verified Certificate</span>
                              <i className="ph ph-arrow-up-right"></i>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Experience);
