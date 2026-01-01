import { motion } from "framer-motion";
import { Calendar, Briefcase, Award, FolderOpen } from "lucide-react";
import type { Experience } from "@shared/schema";
import { useState } from "react";

interface ExperienceCardProps {
  item: Experience;
  index: number;
}

export function ExperienceCard({ item, index }: ExperienceCardProps) {
  const [showCertificates, setShowCertificates] = useState(false);
  
  const hasCertificates = item.certificate || item.certificates;
  const certificateList = item.certificates ? JSON.parse(item.certificates) : (item.certificate ? [item.certificate] : []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline connector for mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden" />
      <div className="absolute left-[-4px] top-6 w-2 h-2 rounded-full bg-primary md:hidden" />

      <div className="glass-card p-6 rounded-2xl group hover:bg-white/5 transition-colors">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h3 className="text-lg md:text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
              {item.role}
            </h3>
            <div className="flex items-center gap-2 text-primary font-medium mt-1">
              <Briefcase size={14} />
              {item.website ? (
                <a 
                  href={item.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors underline underline-offset-2"
                >
                  {item.company}
                </a>
              ) : (
                <span>{item.company}</span>
              )}
              {hasCertificates && (
                <button
                  onClick={() => setShowCertificates(!showCertificates)}
                  className="ml-2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  title={certificateList.length > 1 ? "View All Certificates" : "View Certificate"}
                >
                  {certificateList.length > 1 ? (
                    <FolderOpen size={18} className="text-primary hover:text-secondary" />
                  ) : (
                    <Award size={18} className="text-primary hover:text-secondary" />
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full self-start">
            <Calendar size={12} />
            <span className="font-mono">{item.duration}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-primary/20 pl-4">
          {item.description}
        </p>
        
        {showCertificates && certificateList.length > 0 && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-sm font-semibold text-primary mb-3">Certificates:</h4>
            <div className="grid grid-cols-1 gap-2">
              {certificateList.map((cert: string, certIndex: number) => (
                <button
                  key={certIndex}
                  onClick={() => window.open(cert, '_blank')}
                  className="flex items-center gap-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                >
                  <Award size={14} className="text-primary" />
                  <span className="text-sm text-muted-foreground hover:text-foreground">
                    {cert.split('/').pop()?.replace('.jpg', '').replace(/_/g, ' ') || `Certificate ${certIndex + 1}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
