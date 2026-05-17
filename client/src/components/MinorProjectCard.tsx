import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MinorProject } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function MinorProjectCard({ project, index }: { project: MinorProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <TiltCard className="group h-full" tiltMax={8}>
        <SpotlightCard className="h-full bg-card/40 backdrop-blur-xl rounded-3xl p-6 border-none shadow-xl transition-all duration-500 flex flex-col justify-between">
          <div className="relative z-10 w-full">
            {/* Project Image */}
            {project.imageUrl && (
              <div className="mb-4 rounded-xl overflow-hidden bg-white/5 aspect-[2/1]">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Role */}
            <p className="text-xs text-secondary mb-4 font-medium">
              {project.role}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {JSON.parse(project.technologies).map((tech: string) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs bg-white/10 hover:bg-white/20 transition-colors cursor-default"
                  data-testid={`badge-tech-${tech}`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/5 relative z-10">
            <Button
              variant="default"
              size="sm"
              className="flex-1 gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
              asChild
              data-testid={`button-github-${project.title}`}
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </Button>

            {project.liveUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 rounded-xl border-white/20 hover:bg-white/10"
                asChild
                data-testid={`button-live-${project.title}`}
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </SpotlightCard>
      </TiltCard>
    </motion.div>
  );
}
