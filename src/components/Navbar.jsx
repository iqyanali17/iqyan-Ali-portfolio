import React, { useState, useEffect } from "react";
import { navLinks, socialLinks, personalInfo } from "../data/portfolioData";
import "./Navbar.css";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sticky = window.scrollY >= 260;
          setIsSticky((prev) => (prev !== sticky ? sticky : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOffcanvasOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = target.offsetTop - 90;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* ==================== Offcanvus Mobile Menu Start Here ==================== */}
      <div
        className={`tw-offcanvas-2-area p-relative ${isOffcanvasOpen ? "opened" : ""}`}
      >
        <div className="tw-offcanvas-2-bg is-left left-box"></div>
        <div className="tw-offcanvas-2-bg is-right right-box d-none d-md-block"></div>
        <div className="tw-offcanvas-2-wrapper">
          <div className="tw-offcanvas-2-left left-box">
            <div className="tw-offcanvas-2-left-wrap d-flex justify-content-between align-items-center">
              <div className="twoffcanvas__logo">
                <a
                  className="logo-1"
                  href="#hero"
                  onClick={(e) => handleNavClick(e, "#hero")}
                  aria-label="Khwaja Iqyan Ali - Portfolio Home"
                >
                  <h3
                    className="text-white fw-bold tw-mb-0"
                    style={{
                      textTransform: "lowercase",
                      whiteSpace: "nowrap",
                      fontSize: "1.6rem",
                      lineHeight: 1,
                    }}
                  >
                    iqyanali.dev
                  </h3>
                </a>
              </div>
              <div className="tw-offcanvas-2-close d-md-none text-end">
                <button
                  type="button"
                  aria-label="Close Navigation Menu"
                  aria-expanded={isOffcanvasOpen}
                  className="tw-offcanvas-2-close-btn"
                  onClick={() => setIsOffcanvasOpen(false)}
                >
                  <span className="text">
                    <span className="text-white">close</span>
                  </span>
                  <span className="d-inline-block">
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="32.621"
                          height="1.00918"
                          transform="matrix(0.704882 0.709325 -0.704882 0.709325 1.0061 0)"
                          fill="currentColor"
                        />
                        <rect
                          width="32.621"
                          height="1.00918"
                          transform="matrix(0.704882 -0.709325 0.704882 0.709325 0 23.2842)"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div className="tw-main-menu-mobile tw-mt-8">
              <nav>
                <ul className="d-flex flex-column tw-gap-5 list-unstyled tw-mb-0">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-white text-uppercase fw-bold hover-text-main-two-600 tw-transition-3"
                        style={{
                          color: "#ffffff",
                          fontSize: "1.8rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-block",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="tw-offcanvas-2-right right-box d-none d-md-block p-relative">
            <div className="tw-offcanvas-2-close text-end">
              <button
                className="tw-offcanvas-2-close-btn"
                onClick={() => setIsOffcanvasOpen(false)}
              >
                <span className="text">
                  <span>close</span>
                </span>
                <span className="d-inline-block">
                  <span>
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.80859 9.80762L28.1934 28.1924"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.80859 28.1924L28.1934 9.80761"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
            <div className="tw-offcanvas-2-right-inner d-flex flex-column justify-content-between h-100">
              <div className="twoffcanvas__contact-info">
                <div className="twoffcanvas__contact-title">
                  <h5
                    className="text-white tw-mb-1"
                    style={{
                      textTransform: "lowercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    iqyanali.dev
                  </h5>
                  <p className="text-neutral-400 tw-text-sm tw-mb-4">
                    {personalInfo.title}
                  </p>
                </div>
                <div className="twoffcanvas__social-info tw-mt-4">
                  <h6 className="text-white tw-mb-3">
                    Connect Across Platforms
                  </h6>
                  <ul className="d-flex flex-wrap tw-gap-3 list-unstyled">
                    {socialLinks.map((item) => (
                      <li key={item.name}>
                        <a
                          className="tw-text-sm text-white border border-neutral-700 tw-px-3 tw-py-2 tw-rounded-md d-inline-flex align-items-center tw-gap-2 hover-bg-main-two-600 hover-text-white tw-transition-3"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className={item.icon}></i> {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ==================== Offcanvus Mobile Menu End Here ==================== */}

      {/* ==================== Header Start Here ==================== */}
      <header
        className={`header header-two header-three tw-transition-all tw-z-99 position-relative ${
          isSticky ? "fixed-header" : ""
        }`}
      >
        <div className="container tw-container-1800-px">
          <nav className="d-flex align-items-center justify-content-between position-relative">
            {/* Logo Start */}
            <div className="header-three-logo">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="link text-decoration-none d-inline-block"
                aria-label="Khwaja Iqyan Ali - Return to Top"
              >
                <span className="logo-brand-text">
                  iqyanali<span className="domain-accent">.dev</span>
                </span>
              </a>
            </div>
            {/* Logo End */}

            {/* Quick Navigation Links Start */}
            <div className="navbar-clean-center d-none d-lg-block">
              <nav>
                <ul className="navbar-clean-nav">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* Navigation Links End */}

            {/* Header Right start */}
            <div className="header-right d-flex align-items-center tw-gap-705">
              {/* Menu Button Start */}
              <div className="header-three-menu">
                <button
                  type="button"
                  aria-label="Open Navigation Menu"
                  aria-expanded={isOffcanvasOpen}
                  className="tw-offcanvas-open-btn tw-w-13 tw-h-13 lh-1 d-inline-flex justify-content-center align-items-center tw-transition-3 tw-rounded-md"
                  onClick={() => setIsOffcanvasOpen(true)}
                >
                  <span className="d-inline-flex align-items-center justify-content-center">
                    <svg
                      className="header-menu-icon"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M0 15.75C0 14.5074 1.00736 13.5 2.25 13.5C3.49264 13.5 4.5 14.5074 4.5 15.75C4.5 16.9926 3.49264 18 2.25 18C1.00736 18 0 16.9926 0 15.75ZM6.75 15.75C6.75 14.5074 7.75736 13.5 9 13.5C10.2426 13.5 11.25 14.5074 11.25 15.75C11.25 16.9926 10.2426 18 9 18C7.75736 18 6.75 16.9926 6.75 15.75ZM13.5 15.75C13.5 14.5074 14.5074 13.5 15.75 13.5C16.9926 13.5 18 14.5074 18 15.75C18 16.9926 16.9926 18 15.75 18C14.5074 18 13.5 16.9926 13.5 15.75ZM0 9C0 7.75736 1.00736 6.75 2.25 6.75C3.49264 6.75 4.5 7.75736 4.5 9C4.5 10.2426 3.49264 11.25 2.25 11.25C1.00736 11.25 0 10.2426 0 9ZM6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9ZM13.5 9C13.5 7.75736 14.5074 6.75 15.75 6.75C16.9926 6.75 18 7.75736 18 9C18 10.2426 16.9926 11.25 15.75 11.25C14.5074 11.25 13.5 10.2426 13.5 9ZM0 2.25C0 1.00736 1.00736 0 2.25 0C3.49264 0 4.5 1.00736 4.5 2.25C4.5 3.49264 3.49264 4.5 2.25 4.5C1.00736 4.5 0 3.49264 0 2.25ZM6.75 2.25C6.75 1.00736 7.75736 0 9 0C10.2426 0 11.25 1.00736 11.25 2.25C11.25 3.49264 10.2426 4.5 9 4.5C7.75736 4.5 6.75 3.49264 6.75 2.25ZM13.5 2.25C13.5 1.00736 14.5074 0 15.75 0C16.9926 0 18 1.00736 18 2.25C18 3.49264 16.9926 4.5 15.75 4.5C14.5074 4.5 13.5 3.49264 13.5 2.25Z" />
                    </svg>
                  </span>
                </button>
              </div>
              {/* Menu Button End */}

              {/* Header Button Start */}
              <div className="header-three-button d-none d-md-block">
                <a
                  className="tw-hover-btn bg-black text-white fw-bold tw-py-4 tw-px-10 d-inline-block hover-text-white text-uppercase tw-rounded-md"
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  Let's Talk
                  <span className="tw-hover-btn-circle-dot bg-main-two-600"></span>
                </a>
              </div>
              {/* Header Button End */}
            </div>
            {/* Header Right End */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
    </>
  );
};

export default React.memo(Navbar);
