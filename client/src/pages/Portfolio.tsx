import { useState, lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import type { Project } from "@/lib/data";
import { Footer } from "@/components/Footer";
import Preloader from "@/components/ui/Preloader";
import { InteractiveGridBackground } from "@/components/ui/InteractiveGridBackground";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

const ProjectDetailModal = lazy(() => import("@/components/ProjectDetailModal"));

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Preloader />

      <div className="min-h-screen bg-black text-foreground font-sans selection:bg-primary/20 relative">
        <InteractiveGridBackground />
        <Navigation />

        <main>
          {/* HERO & ABOUT ME SECTION */}
          <HeroSection />

          {/* DUAL MARQUEE TECH STACK & TOOLS */}
          <AboutSection />

          {/* INTERACTIVE SKILLS DASHBOARD */}
          <SkillsSection />

          {/* PERSONAL PROJECTS SHOWCASE & CAROUSEL */}
          <ProjectsSection onOpenProjectDetails={setSelectedProject} />

          {/* WORK EXPERIENCE ROADMAP */}
          <ExperienceSection />

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
