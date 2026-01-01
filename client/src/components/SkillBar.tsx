import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export function SkillBar({ skill, index }: SkillBarProps) {
  // Determine color based on proficiency (optional visual flair)
  const isHigh = (skill.proficiency || 0) > 85;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <span className="font-mono font-medium text-sm md:text-base">{skill.name}</span>
        <span className="text-xs text-muted-foreground font-mono">{skill.proficiency}%</span>
      </div>
      
      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className={`h-full rounded-full ${
            isHigh 
              ? "bg-gradient-to-r from-primary to-purple-400" 
              : "bg-gradient-to-r from-secondary to-blue-400"
          }`}
        />
      </div>
    </div>
  );
}
