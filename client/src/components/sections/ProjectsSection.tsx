import React, { useState, useEffect, useRef } from "react";
import { Element } from "react-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-portfolio";
import { LineByLineReveal, SectionReveal } from "@/components/animations";

interface ProjectsSectionProps {
  onOpenProjectDetails: (project: Project) => void;
}

export function ProjectsSection({ onOpenProjectDetails }: ProjectsSectionProps) {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const [visibleItems, setVisibleItems] = useState(2);
  const [majorIndex, setMajorIndex] = useState(0);
  const majorCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setVisibleItems(1);
      } else {
        setVisibleItems(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxMajorIndex = Math.max(0, (projects?.length || 0) - visibleItems);

  const scrollCarouselTo = (container: HTMLDivElement | null, index: number) => {
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement;
    if (!firstChild) return;
    const cardWidth = firstChild.clientWidth;
    const gap = 32; // gap-8 is 32px
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const nextMajor = () => {
    const nextIdx = majorIndex >= maxMajorIndex ? 0 : majorIndex + 1;
    setMajorIndex(nextIdx);
    scrollCarouselTo(majorCarouselRef.current, nextIdx);
  };

  const prevMajor = () => {
    const prevIdx = majorIndex <= 0 ? maxMajorIndex : majorIndex - 1;
    setMajorIndex(prevIdx);
    scrollCarouselTo(majorCarouselRef.current, prevIdx);
  };

  const handleMajorScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const firstChild = container.firstElementChild as HTMLElement;
    if (!firstChild) return;
    const cardWidth = firstChild.clientWidth;
    const gap = 24;
    const newIndex = Math.round(container.scrollLeft / (cardWidth + gap));
    if (newIndex !== majorIndex && newIndex >= 0 && newIndex <= maxMajorIndex) {
      setMajorIndex(newIndex);
    }
  };

  useEffect(() => {
    setMajorIndex((p) => Math.min(p, maxMajorIndex));
    scrollCarouselTo(majorCarouselRef.current, majorIndex);
  }, [visibleItems, projects?.length, maxMajorIndex, majorIndex]);

  return (
    <Element name="projects" id="projects" className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <LineByLineReveal
          start="top 85%"
          end="bottom 15%"
          fromY={-24}
          exitY={-28}
          stagger={0.14}
          blur={10}
          duration={0.75}
          className="text-center mb-16"
        >
          <h2 className="reveal-line text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Personal <span className="text-gradient">Projects</span>
          </h2>
          <p className="reveal-line text-zinc-300 text-lg max-w-2xl mx-auto">
            A selection of my recent work, featuring full-stack applications and experimental interfaces.
          </p>
        </LineByLineReveal>

        {projectsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-muted/20 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <SectionReveal
            start="top 85%"
            end="bottom 15%"
            fromY={-20}
            exitY={-25}
            blur={6}
            className="relative"
          >
            {/* Carousel controls header */}
            {projects && projects.length > visibleItems && (
              <div className="flex items-center justify-between mb-8 px-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span>
                    Showing <strong className="text-white">{majorIndex + 1}</strong> of{" "}
                    <strong className="text-white">{projects.length}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevMajor}
                    className="w-11 h-11 rounded-full border border-white/10 bg-black/60 hover:bg-purple-500/20 hover:border-purple-500/50 text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-purple-500/20 active:scale-90 cursor-pointer backdrop-blur-md group"
                    aria-label="Previous project"
                    title="Previous Project"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={nextMajor}
                    className="w-11 h-11 rounded-full border border-white/10 bg-black/60 hover:bg-purple-500/20 hover:border-purple-500/50 text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-purple-500/20 active:scale-90 cursor-pointer backdrop-blur-md group"
                    aria-label="Next project"
                    title="Next Project"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Slider Track Wrapper with generous padding */}
            <div
              ref={majorCarouselRef}
              onScroll={handleMajorScroll}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-8 w-full no-scrollbar py-6 px-1"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {projects?.map((project, idx) => (
                <div
                  key={project.id}
                  className="snap-start shrink-0"
                  style={{
                    width: visibleItems === 1 ? "100%" : "calc(50% - 16px)",
                  }}
                >
                  <ProjectCard project={project} index={idx} onOpenDetails={onOpenProjectDetails} />
                </div>
              ))}
            </div>

            {/* Interactive Pagination Dots */}
            {projects && projects.length > visibleItems && (
              <div className="flex justify-center items-center gap-2.5 mt-8 select-none">
                {Array.from({ length: maxMajorIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setMajorIndex(i);
                      scrollCarouselTo(majorCarouselRef.current, i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      majorIndex === i
                        ? "w-8 bg-gradient-to-r from-purple-400 to-sky-400 shadow-[0_0_12px_rgba(168,85,247,0.7)]"
                        : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </SectionReveal>
        )}
      </div>
    </Element>
  );
}

export default ProjectsSection;
