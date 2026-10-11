import React, { useState, useEffect } from "react";
import "./BackToTop.css";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isVis = window.scrollY > 300;
          setVisible((prev) => (prev !== isVis ? isVis : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky-floating-stack" aria-label="Quick Actions">
      {/* Sticky Resume Download Button */}
      <a
        href="/Khwaja_Iqyan_Ali_Resume.pdf"
        download="Khwaja_Iqyan_Ali_Resume.pdf"
        className="sticky-floating-btn sticky-resume-btn"
        aria-label="Download Khwaja Iqyan Ali Resume"
        title="Download Resume"
      >
        <span className="sticky-btn-tooltip">Download CV</span>
        <svg
          className="sticky-btn-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 3V14M12 14L7.5 9.5M12 14L16.5 9.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 17.5V19C4.5 19.8284 5.17157 20.5 6 20.5H18C18.8284 20.5 19.5 19.8284 19.5 19V17.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/* Sticky Scroll to Top Button */}
      <button
        id="back_to_top"
        type="button"
        className={`sticky-floating-btn sticky-back-to-top-btn ${
          visible ? "is-visible" : ""
        }`}
        onClick={scrollToTop}
        aria-label="Back to Top"
        title="Back to Top"
      >
        <svg
          className="sticky-btn-icon"
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M11 6L6 1L1 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default React.memo(BackToTop);

