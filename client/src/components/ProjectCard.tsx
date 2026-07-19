import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import ElectricBorder from "@/components/ui/ElectricBorder";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

const getProjectColor = (id: number) => {
  switch (id) {
    case 1:
      return "#9568ff"; // Electric Purple (Movie Ticket Platform)
    case 2:
      return "#10b981"; // Emerald Green (MediTalk AI)
    case 3:
      return "#0ea5e9"; // Sky Cyan (AI Assessment Creator)
    default:
      return "#9568ff";
  }
};

export function ProjectCard({ project, index, onOpenDetails }: ProjectCardProps) {
  const borderColor = getProjectColor(project.id);

  const handleMouseEnter = () => {
    const event = new CustomEvent("set-cursor-text", { detail: "Click for Details 🔍" });
    window.dispatchEvent(event);
  };

  const handleMouseLeave = () => {
    const event = new CustomEvent("set-cursor-text", { detail: null });
    window.dispatchEvent(event);
  };

  const handleCardClick = () => {
    console.log("Card clicked for project:", project.title);
    onOpenDetails(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <TiltCard className="group h-full" tiltMax={10}>
        <ElectricBorder
          color={borderColor}
          speed={1.2}
          chaos={0.08}
          borderRadius={24}
          className="h-full w-full"
        >
          <SpotlightCard
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
            className={`h-full flex flex-col bg-card/40 backdrop-blur-md shadow-2xl relative border-none ${project.projectUrl ? "cursor-pointer" : ""}`}
          >
          {/* Image Container with Overlay */}
          <div className="relative aspect-video overflow-hidden rounded-t-[1.5rem]">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75 z-10" />
            
            {/* If image url is provided use it, else a colorful gradient placeholder */}
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary/30 font-bold text-4xl">
                {project.title[0]}
              </div>
            )}
            
            {/* Floating Action Buttons (Always visible on mobile, hover slide-in on desktop) */}
            <div className="absolute top-4 right-4 flex gap-2.5 z-20 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 opacity-100 translate-y-0 transition-all duration-300">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-full bg-background/90 backdrop-blur text-foreground hover:text-primary hover:scale-110 transition-all shadow-lg"
                  title="View Code"
                >
                  <Github size={18} />
                </a>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-full bg-background/90 backdrop-blur text-foreground hover:text-primary hover:scale-110 transition-all shadow-lg"
                  title="Live Demo"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow relative z-20">
            <h3 
              className="text-lg font-bold font-display mb-2 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
              style={{ "--hover-color": borderColor } as React.CSSProperties}
            >
              {project.title}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed flex-grow">
              {project.description}
            </p>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Read More clicked for project:", project.title);
                onOpenDetails(project);
              }}
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase transition-all duration-300 group/btn cursor-pointer self-start hover:opacity-85 active:scale-95 mt-auto"
              style={{ color: borderColor }}
            >
              Read More <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </SpotlightCard>
        </ElectricBorder>
      </TiltCard>
    </motion.div>
  );
}

