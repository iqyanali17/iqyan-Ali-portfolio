import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MagicCursor = () => {
  const ballRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Touch support for .tw-hover-btn ripple positioning on mobile & tablet
    const handleTouchStart = (e) => {
      const btn = e.target.closest(".tw-hover-btn");
      if (!btn) return;
      const dot = btn.querySelector(".tw-hover-btn-circle-dot, .tw-btn-circle-dot");
      if (!dot) return;
      const touch = e.touches[0];
      const rect = btn.getBoundingClientRect();
      dot.style.left = `${touch.clientX - rect.left}px`;
      dot.style.top = `${touch.clientY - rect.top}px`;
    };
    document.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Only run custom mouse ball on desktop devices with hover & fine pointer
    const isTouch =
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(hover: none)").matches ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isTouch) {
      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
      };
    }

    const ball = ballRef.current;
    if (!ball) return;

    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    const ratio = 0.15;
    const ballWidth = 5;
    const ballHeight = 5;
    const ballScale = 1;
    const ballOpacity = 1;
    const ballBorderWidth = 1;
    let isTickerRunning = false;
    let activeBtn = null;

    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      width: ballWidth,
      height: ballHeight,
      borderWidth: ballBorderWidth,
      opacity: ballOpacity,
      position: "fixed",
      pointerEvents: "none",
      zIndex: 999999,
    });

    const updatePosition = () => {
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      pos.x += dx * ratio;
      pos.y += dy * ratio;
      gsap.set(ball, { x: pos.x, y: pos.y });

      // Sleep ticker when motion settles to save CPU/battery
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        gsap.ticker.remove(updatePosition);
        isTickerRunning = false;
      }
    };

    const mouseMoveHandler = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(cursorRef.current, { duration: 0.3, autoAlpha: 1 });

      if (!isTickerRunning) {
        gsap.ticker.add(updatePosition);
        isTickerRunning = true;
      }
    };

    window.addEventListener("mousemove", mouseMoveHandler, { passive: true });

    // Global cursor hover handling with delegation
    const handleMouseOver = (e) => {
      // Track active hover button for instant bailout in mousemove and place dot immediately
      const btn = e.target.closest(".tw-hover-btn");
      if (btn) {
        activeBtn = btn;
        const dot = btn.querySelector(".tw-hover-btn-circle-dot, .tw-btn-circle-dot");
        if (dot) {
          const rect = btn.getBoundingClientRect();
          dot.style.left = `${e.clientX - rect.left}px`;
          dot.style.top = `${e.clientY - rect.top}px`;
        }
      }

      // 1. Data-cursor element hover (Live Demo bubble)
      const cursorTarget = e.target.closest("[data-cursor]");
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "Live Demo";
        ball.classList.add("with-blur");
        let viewEl = ball.querySelector(".ball-view");
        if (!viewEl) {
          viewEl = document.createElement("div");
          viewEl.className = "ball-view";
          ball.appendChild(viewEl);
        }
        viewEl.textContent = text;
        gsap.to(ball, {
          duration: 0.3,
          yPercent: -75,
          width: 140,
          height: 140,
          opacity: 1,
          borderWidth: 1,
          zIndex: 999999,
          backdropFilter: "blur(14px)",
          backgroundColor: "#ff5101",
          boxShadow: "0px 1px 3px 0px rgba(18, 20, 32, 0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: "700",
          fontSize: "14px",
          textAlign: "center",
        });
        gsap.to(viewEl, { duration: 0.3, scale: 1, autoAlpha: 1 });
        return;
      }

      // 2. Button and link hover: shrink ball
      const linkOrButton = e.target.closest("a, button, .tw-hover-btn");
      if (linkOrButton && !linkOrButton.classList.contains("cursor-hide")) {
        gsap.to(ball, { duration: 0.3, scale: 0, opacity: 0 });
      }
    };

    const handleMouseOut = (e) => {
      if (activeBtn && (!e.relatedTarget || !e.relatedTarget.closest(".tw-hover-btn"))) {
        activeBtn = null;
      }

      const cursorTarget = e.target.closest("[data-cursor]");
      if (cursorTarget) {
        ball.classList.remove("with-blur");
        const viewEl = ball.querySelector(".ball-view");
        if (viewEl) {
          gsap.to(viewEl, {
            duration: 0.3,
            scale: 0,
            autoAlpha: 0,
            onComplete: () => viewEl.remove(),
          });
        }
        gsap.to(ball, {
          duration: 0.3,
          yPercent: -50,
          width: ballWidth,
          height: ballHeight,
          opacity: ballOpacity,
          borderWidth: ballBorderWidth,
          backgroundColor: "#1c1d21",
          boxShadow: "none",
          backdropFilter: "none",
        });
        return;
      }

      const linkOrButton = e.target.closest("a, button, .tw-hover-btn");
      if (linkOrButton && !linkOrButton.classList.contains("cursor-hide")) {
        if (!e.relatedTarget || !e.relatedTarget.closest("a, button, .tw-hover-btn")) {
          gsap.to(ball, {
            duration: 0.3,
            scale: ballScale,
            opacity: ballOpacity,
          });
        }
      }
    };

    // Button ripple / dot follow effect for .tw-hover-btn
    const handleButtonMouseMove = (e) => {
      const btn = activeBtn || e.target.closest(".tw-hover-btn");
      if (!btn) return;
      const dot = btn.querySelector(".tw-hover-btn-circle-dot, .tw-btn-circle-dot");
      if (!dot) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mousemove", handleButtonMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousemove", handleButtonMouseMove);
      if (isTickerRunning) {
        gsap.ticker.remove(updatePosition);
      }
    };
  }, []);

  return (
    <div id="magic-cursor" ref={cursorRef} aria-hidden="true">
      <div id="ball" ref={ballRef}></div>
    </div>
  );
};

export default React.memo(MagicCursor);
