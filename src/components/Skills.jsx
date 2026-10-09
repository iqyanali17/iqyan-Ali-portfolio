import React, { memo } from "react";
import { coreExpertise } from "../data/portfolioData";
import "./Skills.css";

const Skills = () => {
  return (
    <section
      id="skills"
      className="service-three-area bg-black pt-120 tw-pb-15 position-relative"
    >
      {/* Anchor alias for backward compatibility */}
      <span id="expertise" className="position-absolute" style={{ top: 0 }} aria-hidden="true"></span>
      <div className="container tw-container-1800-px">
        <div className="row">
          <div className="col-12">
            <div className="tw-mb-15">
              <h2 className="text-white tw-text-15 text-center font-heading">
                Core Expertise
              </h2>
            </div>
            <div className="service-three-wrapper">
              {coreExpertise.map((item) => (
                <div
                  key={item.number}
                  className={`service-three-single ${item.isRightAligned ? "ms-auto" : ""}`}
                  data-aos={item.direction}
                  data-aos-duration="2000"
                  data-aos-delay={item.delay}
                >
                  <div className="service-three-item d-flex justify-content-between align-items-center">
                    <div className="service-three-content d-flex tw-gap-14">
                      <div>
                        <span className="service-three-number text-white tw-text-xl d-inline-flex align-items-center tw-gap-3 lh-1 tw-mt-5 tw-transition-3">
                          {item.number}
                          <img
                            className="tw-transition-3"
                            src="/assets/images/icons/service-three-arrow.svg"
                            alt=""
                            aria-hidden="true"
                            width="24"
                            height="24"
                            loading="lazy"
                            decoding="async"
                          />
                        </span>
                      </div>
                      <div>
                        <div>
                          <h3 className="service-three-title tw-text-15 text-white tw-mb-4">
                            <span>{item.title}</span>
                          </h3>
                        </div>
                        <div className="portfolio-list portfolio-two-list">
                          <ul className="d-flex tw-gap-205 flex-wrap">
                            {item.tags.map((tag, tIdx) => (
                              <li key={tIdx}>
                                <span className="text-uppercase text-white tw-text-sm fw-medium position-relative z-1 border border-neutral-700 tw-px-3 tw-py-1 tw-rounded-md">
                                  {tag}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="service-three-thumb">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
