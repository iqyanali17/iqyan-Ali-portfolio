import React from "react";
import { Element } from "react-scroll";
import { Briefcase } from "lucide-react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { useExperience } from "@/hooks/use-portfolio";
import { LineByLineReveal, SectionReveal } from "@/components/animations";

export function ExperienceSection() {
  const { data: experience, isLoading: experienceLoading } = useExperience();

  return (
    <Element name="experience" id="experience" className="py-24 relative overflow-hidden scroll-mt-20">
      {/* Ambient atmospheric backdrop glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] [background:radial-gradient(ellipse,hsl(var(--primary)/0.15)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none transform-gpu will-change-transform" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <LineByLineReveal
          start="top 85%"
          end="bottom 15%"
          fromY={-24}
          exitY={-28}
          stagger={0.14}
          blur={10}
          duration={0.75}
          className="text-center mb-16 flex flex-col items-center"
        >
          {/* Line 1: Premium Futuristic Pill Badge */}
          <div className="reveal-line inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-primary text-xs font-semibold mb-4 tracking-wider uppercase backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] select-none">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span>Career Roadmap</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          {/* Line 2: Main Section Heading */}
          <h2 className="reveal-line text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>

          {/* Line 3: Refined Subtitle */}
          <p className="reveal-line text-zinc-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            My professional journey, software engineering internships, and verified credentials.
          </p>

          {/* Line 4: Sleek Decorative Accent Divider */}
          <div className="reveal-line flex items-center gap-2 mt-5">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span className="h-px w-12 bg-gradient-to-r from-primary/60 via-secondary/60 to-transparent" />
          </div>
        </LineByLineReveal>

        <SectionReveal
          start="top 85%"
          end="bottom 15%"
          fromY={-20}
          exitY={-25}
          blur={6}
          className="relative space-y-8 md:space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent"
        >
          {experienceLoading ? (
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="h-40 bg-muted/20 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            experience?.map((item, idx) => (
              <ExperienceCard key={item.id} item={item} index={idx} />
            ))
          )}
        </SectionReveal>
      </div>
    </Element>
  );
}

export default ExperienceSection;
