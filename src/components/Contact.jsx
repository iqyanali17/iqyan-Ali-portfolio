import React from "react";
import { socialLinks, navLinks, personalInfo } from "../data/portfolioData";
import "./Contact.css";

const Contact = () => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="contact"
      className="footer-three-area pt-120 tw-pb-10 position-relative z-1 bg-black"
    >
      <div className="container tw-container-1800-px">
        <div className="row pb-120 justify-content-center text-center">
          <div className="col-xl-8 col-lg-10">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <span className="contact-header-badge text-main-two-600 text-uppercase fw-bold tracking-wider tw-text-sm border border-neutral-800 tw-px-4 tw-py-2 tw-rounded-md">
                CONNECT ACROSS PLATFORMS
              </span>
              <h2 className="tw-text-15 text-white font-heading tw-mt-4 tw-mb-4">
                Let's Build Something Great Together
              </h2>
              <p className="tw-text-xl text-neutral-400 tw-mb-10">
                Explore my work, code repositories, and updates across GitHub, LinkedIn, and Instagram.
              </p>

              {/* Desktop Social Links (>= 992px) */}
              <div className="d-none d-lg-flex align-items-center justify-content-center flex-wrap tw-gap-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    className="tw-text-lg text-white bg-neutral-900 border border-neutral-800 tw-px-6 tw-py-4 tw-rounded-lg d-inline-flex align-items-center tw-gap-3 hover-border-main-two-600 hover-bg-main-two-600 tw-transition-3"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Connect with Khwaja Iqyan Ali on ${item.name}`}
                  >
                    <i className={`${item.icon} tw-text-2xl`}></i>{" "}
                    <span className="fw-semibold">{item.name}</span>
                  </a>
                ))}
              </div>

              {/* Mobile Social Links Grid (< 992px) */}
              <div className="d-lg-none contact-mobile-social-grid">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    className={`contact-mobile-social-btn ${
                      item.name.toLowerCase() === "resume"
                        ? "contact-mobile-social-resume"
                        : ""
                    }`}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Connect with Khwaja Iqyan Ali on ${item.name}`}
                  >
                    <div className="contact-mobile-social-btn-content">
                      <i className={`${item.icon} contact-mobile-social-icon`}></i>
                      <span className="contact-mobile-social-name">{item.name}</span>
                    </div>
                    {item.name.toLowerCase() === "resume" ? (
                      <span className="contact-resume-badge">PDF</span>
                    ) : (
                      <i className="ph ph-arrow-up-right contact-mobile-social-arrow"></i>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Middle Section (>= 992px) */}
      <div className="footer-three-border tw-px-18 tw-mb-10 d-none d-lg-block">
        <div className="container-fluid gx-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="footer-three-middile d-flex align-items-center justify-content-between">
                <div
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                >
                  <h4 className="tw-text-2xl text-white tw-mb-2">Quick Links</h4>
                  <ul className="d-flex tw-gap-4 flex-wrap list-unstyled">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          className="tw-text-lg text-white"
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="300"
                >
                  <a
                    className="footer-three-back-to-top tw-w-170 tw-h-170 lh-1 d-inline-flex justify-content-center align-items-center bg-main-two-600 text-white tw-text-3xl rounded-circle"
                    href="#"
                    onClick={scrollToTop}
                    aria-label="Back to Top"
                  >
                    <i className="ph ph-arrow-up"></i>
                  </a>
                </div>
                <div
                  className="text-lg-end"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="400"
                >
                  <h4 className="tw-text-2xl text-white tw-mb-2">
                    {personalInfo.shortName} Portfolio
                  </h4>
                  <p className="tw-text-lg text-white">
                    © 2026 {personalInfo.shortName}. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Middle Section (< 992px) */}
      <div className="footer-mobile-middle-wrapper d-lg-none">
        <div className="container px-3">
          {/* Quick Links Card */}
          <div
            className="footer-mobile-links-card"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="footer-mobile-links-header">
              <h4 className="footer-mobile-section-heading">
                <i className="ph ph-navigation-arrow text-main-two-600 me-2"></i>
                QUICK LINKS
              </h4>
              <span className="footer-mobile-badge">Navigate</span>
            </div>
            <div className="footer-mobile-nav-grid">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  className="footer-mobile-nav-item"
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span>{link.label}</span>
                  <i className="ph ph-arrow-up-right footer-nav-mini-arrow"></i>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Footer Bottom Row: Brand & Back-to-Top Button */}
          <div
            className="footer-mobile-bottom-row"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="300"
          >
            <div className="footer-mobile-branding">
              <h4 className="footer-mobile-branding-title">
                <span className="text-main-two-600">{personalInfo.shortName}</span> Portfolio
              </h4>
              <p className="footer-mobile-branding-copy">
                © 2026 {personalInfo.shortName}. All rights reserved.
              </p>
            </div>
            <a
              className="footer-mobile-btt-btn"
              href="#"
              onClick={scrollToTop}
              aria-label="Back to Top"
            >
              <i className="ph ph-arrow-up footer-mobile-btt-icon"></i>
              <span className="footer-mobile-btt-label">TOP</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Big Watermark Title */}
      <div className="footer-bottom-title-wrap">
        <div className="container tw-container-1800-px">
          <div className="row">
            <div className="col-xl-12">
              <div className="footer-three-bottom text-center">
                <h5 className="footer-three-bottom-title text-white text-center text-uppercase">
                  <span className="text-main-two-600">I</span>QYAN{" "}
                  <span className="text-main-two-600">A</span>LI
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img
          className="footer-bg-shape position-absolute top-0 start-0 z-n1"
          src="/assets/images/shapes/footer-three-bg-shape.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
    </footer>
  );
};

export default React.memo(Contact);
