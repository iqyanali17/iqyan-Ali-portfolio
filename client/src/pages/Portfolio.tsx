import { useState, useEffect } from "react";
import EyeScrollIndicator from "@/components/ui/EyeScrollIndicator";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { SiReact, SiNodedotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGit, SiPython, SiFlask, SiSupabase, SiMui, SiTypescript } from "react-icons/si";
import { ArrowRight, Download, Send, Loader2, Code2, Database, Layout, Server, Wrench, Github, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
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
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import Magnetic from "@/components/ui/Magnetic";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  { icon: SiMui, name: "Material UI" },
  { icon: SiExpress, name: "Express" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiPython, name: "Python" },
  { icon: SiFlask, name: "Flask" },
  { icon: SiSupabase, name: "Supabase" },
  { icon: SiGit, name: "Git" },
];

export default function Portfolio() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experience, isLoading: experienceLoading } = useExperience();
  const { data: minorProjects, isLoading: minorProjectsLoading } = useMinorProjects();
  const contactMutation = useContact();
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredSkills = skills?.filter((skill) => {
    if (selectedCategory === "All") return true;
    return skill.category.toLowerCase() === selectedCategory.toLowerCase();
  });

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
          {/* Left Column - Hero Copy */}
          <div className="text-center md:text-left md:flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Futuristic Neon Live Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-xs font-semibold mb-6 tracking-wider uppercase backdrop-blur-sm select-none">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                Active Intern & Engineer
              </div>

              <h2 className="text-primary font-mono mb-3 text-lg sm:text-xl tracking-widest">Hello, I'm</h2>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-none">
                Khwaja <br />
                <span className="text-gradient">Iqyan Ali</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
                A <span className="text-foreground font-medium">Full-Stack Developer</span> crafting futuristic digital experiences with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary font-bold tracking-tight">MERN stack</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400 font-bold tracking-tight">Python</span>.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
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
                  className="rounded-full px-8 h-14 text-base font-semibold border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                  asChild
                >
                  <a href="/Khwaja_Iqyan_Ali_Resume.pdf" download="Khwaja_Iqyan_Ali_Resume">
                    Resume <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Holographic Parallax 3D Portrait */}
          <div className="md:flex-1 relative flex items-center justify-center md:mt-0 mt-8 group/hero-photo">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[500px]"
            >
              <TiltCard tiltMax={14} className="w-full h-full">
                {/* Dynamic Multi-Color Backdrop Glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/50 via-secondary/30 to-accent/50 rounded-[3rem] blur-3xl opacity-75 group-hover/hero-photo:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Styled Photo Frame Box */}
                <div className="relative w-full h-full bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl transition-all duration-700">
                  {/* Styled Image */}
                  <img
                    src="/images/profile.jpg"
                    alt="Khwaja Iqyan Ali"
                    className="w-full h-full object-cover transform scale-[1.01] group-hover/hero-photo:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Sci-Fi Scanner Grid HUD Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%),linear-gradient(90deg,rgba(149,104,255,0.06),rgba(59,130,246,0.02),rgba(149,104,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-40 pointer-events-none" />

                  {/* High Contrast Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80" />
                </div>

                {/* PARALLAX FLOATING HUD CHIP 1 (Pops out in Z-space!) */}
                <div
                  style={{ transform: "translateZ(70px)" }}
                  className="absolute -top-3 -left-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-xs font-semibold font-display shadow-2xl flex items-center gap-2 select-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  🚀 Full-Stack Developer
                </div>

                {/* PARALLAX FLOATING HUD CHIP 2 */}
                <div
                  style={{ transform: "translateZ(80px)" }}
                  className="absolute -bottom-3 -right-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-xs font-semibold font-display shadow-2xl flex items-center gap-2 select-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  ⚡ Intern @ iLoma
                </div>

                {/* PARALLAX FLOATING TECH CHIP 3 (Top Right Corner) */}
                <div
                  style={{ transform: "translateZ(55px)" }}
                  className="absolute -top-4 -right-4 w-11 h-11 bg-black/70 backdrop-blur-md border border-white/10 rounded-full shadow-2xl flex items-center justify-center text-primary group-hover/hero-photo:scale-110 group-hover/hero-photo:rotate-12 transition-all duration-500"
                >
                  <SiReact className="w-5.5 h-5.5 animate-spin-slow" />
                </div>

                {/* PARALLAX FLOATING TECH CHIP 4 (Bottom Left Corner) */}
                <div
                  style={{ transform: "translateZ(50px)" }}
                  className="absolute -bottom-4 -left-3 w-10 h-10 bg-black/70 backdrop-blur-md border border-white/10 rounded-full shadow-2xl flex items-center justify-center text-secondary group-hover/hero-photo:scale-110 group-hover/hero-photo:-rotate-12 transition-all duration-500"
                >
                  <SiTypescript className="w-5 h-5" />
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <EyeScrollIndicator />
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

      {/* ABOUT & SKILLS - BENTO GRID LAYOUT */}
      <Element name="skills" id="skills" className="py-24 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Interactive Bento Workspace
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Engineering <span className="text-gradient">Digital Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my core competencies, work style, achievements, and real-time availability in an interactive dashboard format.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: BIO & TERMINAL CODE BOX */}
          <div className="md:col-span-2 md:row-span-2">
            <TiltCard tiltMax={4} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-8 flex flex-col justify-between min-h-[480px]">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <h3 className="text-xl font-display font-bold flex items-center gap-2.5">
                      <Code2 className="text-primary w-5 h-5" />
                      Interactive developer_profile.json
                    </h3>
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    I am a final-year B.Tech Computer Science student and a Software Developer Intern at iLoma technology Pvt. Ltd. My expertise revolves around building production-grade applications using the MERN stack, TypeScript, and Python.
                  </p>
                  <p className="text-muted-foreground text-base leading-relaxed mb-8">
                    I specialize in designing secure authentication systems (JWT/RBAC), constructing scalable RESTful APIs, and implementing lightning-fast React interfaces.
                  </p>
                </div>

                {/* Simulated IDE / Terminal output block */}
                <div className="bg-black/40 rounded-2xl p-5 border border-white/5 font-mono text-sm leading-relaxed text-blue-300 relative group overflow-hidden">
                  <div className="absolute top-2 right-4 text-xs text-white/20 select-none">JSON</div>
                  <pre className="overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
                    <span className="text-purple-400">{"{"}</span>{"\n"}
                    {"  "}<span className="text-amber-400">"name"</span>: <span className="text-emerald-400">"Khwaja Iqyan Ali"</span>,{"\n"}
                    {"  "}<span className="text-amber-400">"currentRole"</span>: <span className="text-emerald-400">"Software Developer Intern at iLoma"</span>,{"\n"}
                    {"  "}<span className="text-amber-400">"stackFocus"</span>: <span className="text-emerald-400">["MongoDB", "Express", "React", "Node", "Flask", "TS"]</span>,{"\n"}
                    {"  "}<span className="text-amber-400">"passions"</span>: <span className="text-emerald-400">["Scalable APIs", "Intuitive UX Design", "Clean Architecture"]</span>,{"\n"}
                    {"  "}<span className="text-amber-400">"location"</span>: <span className="text-emerald-400">"Nagpur, Pune, Hyderabad, etc. (Onsite / Hybrid)"</span>{"\n"}
                    <span className="text-purple-400">{"}"}</span>
                  </pre>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* CARD 2: INTERACTIVE SKILLS GRID WITH DYNAMIC CATEGORY FILTERING */}
          <div className="md:row-span-2">
            <TiltCard tiltMax={6} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col min-h-[480px]">
                <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                  <Wrench className="text-secondary w-5 h-5 animate-spin-slow" />
                  Skills Directory
                </h3>
                
                {/* Category buttons */}
                <div className="flex flex-wrap gap-1 mb-6 bg-white/5 p-1 rounded-xl border border-white/5">
                  {["All", "Programming", "Frontend", "Backend", "Databases", "Tools"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Animated lists of skills */}
                {skillsLoading ? (
                  <div className="space-y-4 flex-grow">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 bg-muted/20 animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="flex-grow overflow-y-auto max-h-[340px] pr-2 space-y-3 custom-scrollbar">
                    <motion.div layout className="grid grid-cols-1 gap-2.5">
                      {filteredSkills?.map((skill) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          key={skill.id}
                          className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{skill.name}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{skill.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-primary/80 font-mono font-bold">{skill.proficiency}%</span>
                            <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${skill.proficiency}%` }} />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* CARD 3: REAL-TIME INTERN STATUS */}
          <div>
            <TiltCard tiltMax={8} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-1">Current Status</span>
                    <h4 className="text-lg font-display font-bold leading-tight mb-2">iLoma Technology</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Software Developer Intern</p>
                  </div>
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Local Time</span>
                    <span className="text-sm font-mono font-semibold text-primary">{time || "GMT+5:30"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Availability</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">Open to Offers</span>
                  </div>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* CARD 4: CORE METRICS */}
          <div>
            <TiltCard tiltMax={8} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col justify-between min-h-[220px]">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-3">Academic standings</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-2xl font-display font-bold text-gradient">7.7</span>
                      <span className="text-[10px] text-muted-foreground block font-semibold leading-tight">CGPA B.Tech CSE</span>
                    </div>
                    <div>
                      <span className="text-2xl font-display font-bold text-gradient">85.60%</span>
                      <span className="text-[10px] text-muted-foreground block font-semibold leading-tight">HSC Boards</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Experience</span>
                    <span className="text-sm font-bold text-foreground">2 Internships</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Graduation</span>
                    <span className="text-xs text-secondary font-mono font-bold">June 2026</span>
                  </div>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* CARD 5: CERTIFICATE SLIDESHOW */}
          <div>
            <TiltCard tiltMax={8} className="h-full">
              <SpotlightCard className="h-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 flex flex-col justify-between min-h-[220px] group/cert overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-[40px] rounded-full pointer-events-none group-hover/cert:bg-purple-500/20 transition-colors duration-500" />
                
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2">Featured Credentials</span>
                  <h4 className="text-base font-display font-bold mb-1 leading-tight group-hover/cert:text-primary transition-colors duration-300">Certified SQL Developer</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">Issued by Simplilearn</p>
                  
                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">SQL</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">AI & AICTE</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Verification active</span>
                  <a
                    href="#experience"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    View details <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

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
      <Element name="contact" id="contact" className="py-24 relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                Available for New Projects
              </div>
              
              <Magnetic strength={0.2}>
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1]">
                  Let's work <br />
                  <span className="text-gradient">together.</span>
                </h2>
              </Magnetic>

              <p className="text-xl text-muted-foreground mb-12 max-w-md leading-relaxed">
                Have a vision you want to bring to life? I specialize in crafting high-performance digital experiences that merge design and technology.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Send, label: "Email", value: "khwajaiqyanali@gmail.com", href: "mailto:khwajaiqyanali@gmail.com", color: "text-primary", bgClass: "bg-primary/10 border-primary/20 group-hover:bg-primary/20", isNode: false },
                  { icon: ArrowRight, label: "Phone", value: "+91 93594 96162", href: "tel:+919359496162", color: "text-secondary", bgClass: "bg-secondary/10 border-secondary/20 group-hover:bg-secondary/20", isNode: false },
                  { 
                    icon: MapPin, 
                    label: "Location", 
                    value: (
                      <div className="flex flex-col gap-2.5 mt-1">
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground text-sm font-semibold shadow-sm hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all cursor-default">
                            <span className="text-base leading-none">🍊</span> Nagpur
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground text-sm font-semibold shadow-sm hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all cursor-default">
                            <span className="text-base leading-none">🏰</span> Pune
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground text-sm font-semibold shadow-sm hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all cursor-default">
                            <span className="text-base leading-none">🕌</span> Hyderabad
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground font-medium bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10 mt-1">
                           <span className="relative flex h-1.5 w-1.5">
                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                             <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                           </span>
                           Onsite & Hybrid Opportunities
                        </div>
                      </div>
                    ), 
                    color: "text-emerald-400",
                    bgClass: "bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20",
                    isNode: true
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className={`group flex ${item.isNode ? 'items-start' : 'items-center'} gap-6`}
                  >
                    <Magnetic strength={0.3}>
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-colors shadow-xl shrink-0 ${item.color} ${item.bgClass || 'bg-white/5 border-white/10 group-hover:bg-white/10'}`}>
                        <item.icon size={24} />
                      </div>
                    </Magnetic>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-lg font-medium hover:text-primary transition-colors">{item.value}</a>
                      ) : item.isNode ? (
                        <div className="pt-1">{item.value}</div>
                      ) : (
                        <p className="text-lg font-medium">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Interactive Connect Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative min-h-[500px] flex items-center justify-center"
            >
              {/* Animated Connection Lines / Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-radial-gradient from-primary/20 to-transparent blur-3xl" />
              </div>

              {/* Central Hub */}
              <div className="relative z-10 w-full max-w-md">
                <SpotlightCard className="p-12 bg-card/10 backdrop-blur-3xl border-white/5 shadow-2xl overflow-visible">
                  <div className="flex flex-col items-center text-center space-y-12">
                    {/* Pulsing Core */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                      <Magnetic strength={0.4}>
                        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-2xl relative z-10 group cursor-pointer">
                          <Mail className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-500" />
                          
                          {/* Orbiting Tech Rings */}
                          <div className="absolute inset-[-20px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                          <div className="absolute inset-[-40px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        </div>
                      </Magnetic>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-3xl font-display font-bold">Connect with me</h3>
                      <p className="text-muted-foreground">
                        Ready to start something amazing? Choose your preferred platform to reach out.
                      </p>
                    </div>

                    {/* Social Orbit Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {[
                        { icon: Github, label: "GitHub", handle: "@iqyanali17", href: "https://github.com/iqyanali17", color: "hover:text-primary" },
                        { icon: Linkedin, label: "LinkedIn", handle: "Iqyan Ali", href: "https://www.linkedin.com/in/khwaja-iqyan-ali-17-a-/", color: "hover:text-blue-400" },
                        { icon: Instagram, label: "Instagram", handle: "@_iq_.y._xn_", href: "https://www.instagram.com/_iq_.y._xn_?igsh=OXJ6MHF5ZHh2cWM1", color: "hover:text-pink-500" },
                        { icon: Mail, label: "Email", handle: "Copy Email", onClick: () => {
                          navigator.clipboard.writeText("khwajaiqyanali@gmail.com");
                          toast({ title: "Email copied!", description: "My email address has been copied to your clipboard." });
                        }, color: "hover:text-emerald-400" }
                      ].map((social, idx) => (
                        <Magnetic key={social.label} strength={0.2}>
                          {social.href ? (
                            <a
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300 hover:bg-white/10 group`}
                            >
                              <social.icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{social.label}</span>
                              <span className="text-[10px] opacity-50 font-mono truncate max-w-full">{social.handle}</span>
                            </a>
                          ) : (
                            <button
                              onClick={social.onClick}
                              className={`flex flex-col items-center w-full p-4 rounded-2xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300 hover:bg-white/10 group`}
                            >
                              <social.icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{social.label}</span>
                              <span className="text-[10px] opacity-50 font-mono">{social.handle}</span>
                            </button>
                          )}
                        </Magnetic>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>

                {/* Floating HUD Decorations */}
                <div className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none opacity-20 animate-pulse">
                  <div className="w-full h-full rounded-full border-[10px] border-dashed border-primary/30 animate-[spin_20s_linear_infinite]" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 pointer-events-none opacity-10">
                  <div className="w-full h-full rounded-full border-2 border-secondary/50 animate-[ping_3s_ease-in-out_infinite]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Element>

      <Footer />
    </div>
  );
}
