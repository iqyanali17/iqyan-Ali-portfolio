import { useState, useEffect, lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import type { Project } from "@/lib/data";
import { Footer } from "@/components/Footer";
import Preloader from "@/components/ui/Preloader";
import { InteractiveGridBackground } from "@/components/ui/InteractiveGridBackground";

import { HeroSection } from "@/components/sections/HeroSection";
import { ContactSection } from "@/components/sections/ContactSection";

// Safely code-split heavy below-the-fold sections while keeping Hero and Contact immediately available
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const SkillsSection = lazy(() => import("@/components/sections/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/sections/ExperienceSection"));
const ProjectDetailModal = lazy(() => import("@/components/ProjectDetailModal"));

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Warm up below-the-fold chunks during idle time for instant, zero-delay rendering on scroll
  useEffect(() => {
    const prefetchChunks = () => {
      import("@/components/sections/AboutSection");
      import("@/components/sections/SkillsSection");
      import("@/components/sections/ProjectsSection");
      import("@/components/sections/ExperienceSection");
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(prefetchChunks);
      } else {
        setTimeout(prefetchChunks, 600);
      }
    }
  }, []);

  return (
    <>
      <Preloader />

      <div className="min-h-screen bg-black text-foreground font-sans selection:bg-primary/20 relative overflow-x-hidden">
        <InteractiveGridBackground />
        <Navigation />

        <main>
          {/* HERO & ABOUT ME SECTION (Rendered Immediately for Instant LCP) */}
          <HeroSection />

          {/* DUAL MARQUEE TECH STACK & TOOLS */}
          <Suspense fallback={<div className="h-[96px] bg-black pointer-events-none" aria-hidden="true" />}>
            <AboutSection />
          </Suspense>

          {/* INTERACTIVE SKILLS DASHBOARD */}
          <Suspense fallback={<div className="min-h-[700px] py-24 bg-black pointer-events-none" aria-hidden="true" />}>
            <SkillsSection />
          </Suspense>

          {/* PERSONAL PROJECTS SHOWCASE & CAROUSEL */}
          <Suspense fallback={<div className="min-h-[650px] py-24 bg-black pointer-events-none" aria-hidden="true" />}>
            <ProjectsSection onOpenProjectDetails={setSelectedProject} />
          </Suspense>

          {/* WORK EXPERIENCE ROADMAP */}
          <Suspense fallback={<div className="min-h-[600px] py-24 bg-black pointer-events-none" aria-hidden="true" />}>
            <ExperienceSection />
          </Suspense>

          {/* CONTACT & CONNECT HUB */}
          <ContactSection />
        </main>

        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectDetailModal
              project={selectedProject}
              isOpen={selectedProject !== null}
              onOpenChange={(open) => {
                if (!open) setSelectedProject(null);
              }}
            />
          </Suspense>
        )}

        <Footer />
      </div>
    </>
  );
}
