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

  const techList: string[] = Array.isArray(project.technologies)
    ? project.technologies
    : [];

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full w-full"
    >
      <TiltCard className="group h-full w-full" tiltMax={6}>
        <ElectricBorder
          color={borderColor}
          speed={1}
          chaos={0.06}
          borderRadius={24}
          className="h-full w-full"
        >
          <SpotlightCard
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
            className={`h-full flex flex-col bg-[#0b0b10]/95 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-300 hover:border-white/20 ${project.projectUrl ? "cursor-pointer" : ""}`}
          >
          {/* Image Container with Overlay */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[1.5rem] bg-black/60">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b10] via-transparent to-transparent opacity-85 z-10" />
            
            {/* If image url is provided use it, else a colorful gradient placeholder */}
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary/30 font-bold text-4xl">
                {project.title[0]}
              </div>
            )}
            
            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 z-20 transition-all duration-300">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-white hover:text-purple-400 hover:border-purple-400/50 hover:scale-110 transition-all shadow-xl"
                  title="View Code"
                >
                  <Github size={17} />
                </a>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-white hover:text-sky-400 hover:border-sky-400/50 hover:scale-110 transition-all shadow-xl"
                  title="Live Demo"
                >
                  <ExternalLink size={17} />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-7 flex flex-col flex-grow relative z-20 justify-between">
            <div>
              <h3 
                className="text-xl sm:text-2xl font-bold font-display text-white mb-2.5 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                style={{ "--hover-color": borderColor } as React.CSSProperties}
              >
                {project.title}
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech Tags preview */}
              {techList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5 pt-2 border-t border-white/5">
                  {techList.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {techList.length > 4 && (
                    <span className="text-[10px] font-mono font-medium px-2 py-1 rounded-lg bg-white/5 text-zinc-400">
                      +{techList.length - 4} more
                    </span>
                  )}
                </div>
              )}
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails(project);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 group/btn cursor-pointer hover:opacity-90 active:scale-95"
                style={{ color: borderColor }}
              >
                Explore Case Study <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </SpotlightCard>
        </ElectricBorder>
      </TiltCard>
    </motion.div>
  );
}

