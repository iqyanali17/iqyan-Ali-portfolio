import React, { useState } from "react";
import { whatIBuild } from "../data/portfolioData";
import "./WhatIBuild.css";

const WhatIBuild = () => {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const bg = e.currentTarget.querySelector(".hover__reveal-bg");
    if (bg) {
      bg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  const handleMobileClick = (idx) => {
    setHoveredIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="what-i-build"
      className="feature-three-area py-120 position-relative z-1 bg-black"
    >
      <div className="container tw-container-1800-px">
        <div className="row tw-mb-15">
          <div className="col-12 text-center">
            <h2 className="tw-text-15 text-white font-heading">What I Build</h2>
            <p className="tw-text-xl text-neutral-400">
              Tailored digital products crafted for businesses, founders, and
              startups
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="feature-three-wrapper hover__widget">
              {whatIBuild.map((item, idx) => {
                const isCurrent = hoveredIdx === idx;
                return (
                  <div
                    key={item.id}
                    className={`feature-three-single hover__reveal-item ${
                      isCurrent ? "current" : ""
                    }`}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isCurrent}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onClick={() => handleMobileClick(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleMobileClick(idx);
                      }
                    }}
                  >
                    {/* DESKTOP LAYOUT (>= 992px) - 100% UNTOUCHED ORIGINAL DESKTOP STRUCTURE */}
                    <div className="feature-three-item d-none d-lg-flex justify-content-between align-items-center">
                      <div className="feature-three-left d-flex align-items-center">
                        <div>
                          <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block tw-w-20">
                            {item.id}
                          </span>
                        </div>
                        <div>
                          <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block tw-w-160-px">
                            {item.category}
                          </span>
                        </div>
                        <div>
                          <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block">
                            {item.title}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block">
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    {/* MOBILE LAYOUT (< 992px) - CLEAN, PREMIUM, ZERO TEXT CLIPPING */}
                    <div className="feature-three-mobile-item d-lg-none">
                      <div className="feature-three-mobile-top d-flex align-items-center justify-content-between">
                        <div className="feature-three-mobile-badges d-flex align-items-center">
                          <span className="feature-three-mobile-id">{item.id}</span>
                          <span className="feature-three-mobile-cat">{item.category}</span>
                        </div>
                        <span className="feature-three-mobile-tag">{item.tag}</span>
                      </div>
                      <div className="feature-three-mobile-title-wrap">
                        <h3 className="feature-three-mobile-title">{item.title}</h3>
                      </div>
                      {/* Interactive Preview Card on mobile (smooth accordion reveal) */}
                      <div
                        className={`feature-three-mobile-preview ${
                          isCurrent ? "active" : ""
                        }`}
                      >
                        <div className="feature-three-mobile-img-box">
                          <img
                            src={item.bgImage}
                            alt={`${item.title} - application developed by Khwaja Iqyan Ali`}
                            width="480"
                            height="270"
                            loading="lazy"
                            decoding="async"
                            style={{ aspectRatio: "16/9", objectFit: "cover", width: "100%" }}
                          />
                          <div className="feature-three-mobile-img-overlay">
                            <span className="feature-three-mobile-explore-btn">
                              Preview Showcase <i className="ph ph-arrow-up-right"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Hover Reveal Image (strictly hidden on mobile, visible on desktop) */}
                    <div
                      className="hover__reveal-bg bg-img d-none d-lg-block"
                      style={{
                        backgroundImage: `url(${item.bgImage})`,
                        opacity: isCurrent ? 1 : 0,
                        visibility: isCurrent ? "visible" : "hidden",
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhatIBuild);
