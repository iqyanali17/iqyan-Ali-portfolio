import React, { memo } from "react";
import { marqueeItems } from "../data/portfolioData";
import "./Marquee.css";

const Marquee = () => {
  return (
    <div
      className="marquee tw-pt-17 bg-black overflow-hidden"
      aria-hidden="true"
    >
      <div className="marquee-container-flex align-items-center tw-gap-16">
        {/* Render for continuous infinite scroll */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
          (item, index) => (
            <div key={index} className="flex-shrink-0">
              <span
                className={`marquee-two-title marquee-three-title text-uppercase font-heading d-block ${
                  item.stroke ? "text-stroke" : "text-white"
                }`}
              >
                {item.text} <span className="text-white">-</span>
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default memo(Marquee);
