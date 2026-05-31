import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import ElectricBorder from "@/components/ui/ElectricBorder";

interface ProjectCardProps {
  project: Project;
  index: number;
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

export function ProjectCard({ project, index }: ProjectCardProps) {
  const borderColor = getProjectColor(project.id);

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
          <SpotlightCard className="h-full flex flex-col bg-card/40 backdrop-blur-md shadow-2xl relative border-none">
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
            
            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>
            
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {JSON.parse(project.technologies).map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
        </ElectricBorder>
      </TiltCard>
    </motion.div>
  );
}

