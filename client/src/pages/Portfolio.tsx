import { useState } from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { SiReact, SiNodedotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGit } from "react-icons/si";
import { ArrowRight, Download, Send, Loader2, Code2, Database, Layout } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { MinorProjectCard } from "@/components/MinorProjectCard";
import { SkillBar } from "@/components/SkillBar";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Footer } from "@/components/Footer";
import { useProjects, useSkills, useExperience, useContact, useMinorProjects } from "@/hooks/use-portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Define schema locally for frontend-only mode
const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

const TechIcons = [
  { icon: SiReact, name: "React" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiExpress, name: "Express" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiGit, name: "Git" },
];

export default function Portfolio() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experience, isLoading: experienceLoading } = useExperience();
  const { data: minorProjects, isLoading: minorProjectsLoading } = useMinorProjects();
  const contactMutation = useContact();
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navigation />

      {/* HERO SECTION */}
      <Element name="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="text-center md:text-left md:flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-mono mb-4 text-lg">Hello, I'm</h2>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-none">
                Khwaja <br />
                <span className="text-gradient">Iqyan Ali</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
                A <span className="text-foreground font-medium">Full-Stack Web Developer</span> crafting futuristic digital experiences with the MERN stack.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  onClick={() => {
                    window.location.hash = '#contact';
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 0);
                  }}
                >
                  Let's Talk <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 h-14 text-base font-semibold border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary transition-all duration-300 backdrop-blur-sm"
                  asChild
                >
                  <a href="/resume.pdf" download>
                    Resume <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="md:flex-1 relative flex items-center justify-center md:mt-0 mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[500px]"
            >
               {/* Gradient backdrop glow */}
               <div className="absolute -inset-4 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 rounded-[3rem] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />
               
               {/* Glass morphism container */}
               <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl group hover:border-white/40 transition-all duration-700">
                 {/* Profile image */}
                 <img 
                   src="/images/profile.jpg" 
                   alt="Khwaja Iqyan Ali" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 
                 {/* Subtle overlay gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
               </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </Element>

      {/* TECH STACK MARQUEE */}
      <div className="py-12 border-y border-white/5 bg-black/20 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex gap-16 animate-infinite-scroll w-max hover:pause">
          {[...TechIcons, ...TechIcons].map((tech, idx) => (
            <div key={`${tech.name}-${idx}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-default">
              <tech.icon className="w-8 h-8" />
              <span className="text-xl font-display font-bold">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT & SKILLS */}
      <Element name="skills" id="skills" className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              About Me
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Passion for <span className="text-gradient">Creation</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a motivated Computer Science student specializing in the MERN stack. My journey involves building scalable backend logic with Node.js and creating responsive, interactive frontends using React.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Whether it's designing REST APIs, managing MongoDB databases, or deploying full-stack apps, I love the challenge of bringing ideas to life through code.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Layout className="w-8 h-8 text-secondary mb-2" />
                <h4 className="font-bold">Frontend</h4>
                <p className="text-sm text-muted-foreground">React, Tailwind, Motion</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Database className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-bold">Backend</h4>
                <p className="text-sm text-muted-foreground">Node, Express, Mongo</p>
              </div>
            </div>
          </motion.div>

          {/* Skills Bars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              Technical Proficiency
              <div className="h-px flex-grow bg-white/10" />
            </h3>
            
            {skillsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 bg-muted/20 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {skills?.map((skill, idx) => (
                  <SkillBar key={skill.id} skill={skill} index={idx} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </Element>

      {/* PROJECTS */}
      <Element name="projects" id="projects" className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work, featuring full-stack applications and experimental interfaces.
            </p>
          </motion.div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-muted/20 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}
        </div>
      </Element>

      {/* MINOR PROJECTS */}
      <Element name="minor-projects" id="minor-projects" className="py-24 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Minor <span className="text-gradient">Projects</span></h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A collection of my lightweight practice and concept projects that helped me strengthen fundamentals, improve UI thinking, and build hands-on problem-solving experience.
          </p>
        </motion.div>

        {minorProjectsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-96 bg-muted/20 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {minorProjects?.map((project, idx) => (
              <MinorProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        )}
      </Element>

      {/* EXPERIENCE */}
      <Element name="experience" id="experience" className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Work <span className="text-gradient">Experience</span></h2>
            <p className="text-muted-foreground">My professional journey and certifications.</p>
          </motion.div>

          <div className="relative space-y-8 md:space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
            {experienceLoading ? (
              <div className="space-y-8">
                 {[1, 2].map(i => <div key={i} className="h-40 bg-muted/20 animate-pulse rounded-2xl" />)}
              </div>
            ) : (
              experience?.map((item, idx) => (
                <ExperienceCard key={item.id} item={item} index={idx} />
              ))
            )}
          </div>
        </div>
      </Element>

      {/* CONTACT */}
      <Element name="contact" id="contact" className="py-24 bg-gradient-to-b from-background to-black/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="glass-card rounded-3xl p-8 md:p-12 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's work <br /><span className="text-gradient">together.</span></h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Have a project in mind or want to hire me? I'm always open to discussing new opportunities and ideas.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-foreground/80">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                      <Send size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Email</p>
                      <a href="mailto:khwajaiqyanali@gmail.com" className="hover:text-primary transition-colors">khwajaiqyanali@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-foreground/80">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary">
                      <ArrowRight size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Phone</p>
                      <a href="tel:+919359496162" className="hover:text-primary transition-colors">+91 93594 96162</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-foreground/80">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary">
                      <ArrowRight size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Location</p>
                      <p>Available for Remote & Hybrid Work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>

      <Footer />
    </div>
  );
}
