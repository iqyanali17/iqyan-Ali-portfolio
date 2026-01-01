import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MinorProject } from "@shared/schema";

export function MinorProjectCard({ project, index }: { project: MinorProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="h-full relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/30 hover:bg-white/10 transition-all duration-500 shadow-lg overflow-hidden">
        {/* Gradient glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          {/* Project Image */}
          {project.imageUrl && (
            <div className="mb-4 rounded-lg overflow-hidden bg-white/5">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <Button
              variant="default"
              size="sm"
              className="flex-1 gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
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
                className="flex-1 gap-2 rounded-lg border-white/20 hover:bg-white/10"
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
        </div>
      </div>
    </motion.div>
  );
}
