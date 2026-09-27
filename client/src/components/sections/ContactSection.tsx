import React from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { Send, Phone, MapPin, Github, Linkedin, Instagram, Mail } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import RotatingBadge from "@/components/ui/RotatingBadge";
import { useToast } from "@/hooks/use-toast";
import { LineByLineReveal, SectionReveal } from "@/components/animations";

export function ContactSection() {
  const { toast } = useToast();

  return (
    <Element name="contact" id="contact" className="py-24 relative overflow-hidden scroll-mt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 [background:radial-gradient(circle,hsl(var(--primary)/0.15)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none animate-pulse transform-gpu will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] [background:radial-gradient(circle,hsl(var(--secondary)/0.15)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none animate-pulse delay-1000 transform-gpu will-change-transform" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <LineByLineReveal
            start="top 85%"
            end="bottom 15%"
            fromY={-24}
            exitY={-28}
            stagger={0.14}
            blur={10}
            duration={0.75}
          >
            {/* Line 1: Status badge */}
            <div className="reveal-line inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Available for New Projects
            </div>

            {/* Line 2: Heading */}
            <Magnetic strength={0.2}>
              <h2 className="reveal-line text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] text-white">
                Let's work <br />
                <span className="text-gradient">together.</span>
              </h2>
            </Magnetic>

            {/* Line 3: Subtitle */}
            <p className="reveal-line text-xl text-zinc-300 mb-12 max-w-md leading-relaxed">
              Have a vision you want to bring to life? I specialize in crafting high-performance digital experiences that
              merge design and technology.
            </p>

            {/* Line 4: Contact details stack */}
            <div className="reveal-line space-y-8">
              {[
                {
                  icon: Send,
                  label: "Email",
                  value: "khwajaiqyanali@gmail.com",
                  href: "mailto:khwajaiqyanali@gmail.com",
                  color: "text-primary",
                  bgClass: "bg-primary/10 border-primary/20 group-hover:bg-primary/20",
                  isNode: false,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 93594 96162",
                  href: "tel:+919359496162",
                  color: "text-secondary",
                  bgClass: "bg-secondary/10 border-secondary/20 group-hover:bg-secondary/20",
                  isNode: false,
                },
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
                  isNode: true,
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className={`group flex ${item.isNode ? "items-start" : "items-center"} gap-6`}
                >
                  <Magnetic strength={0.3}>
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-colors shadow-xl shrink-0 ${
                        item.color
                      } ${item.bgClass || "bg-white/5 border-white/10 group-hover:bg-white/10"}`}
                    >
                      <item.icon size={24} />
                    </div>
                  </Magnetic>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-lg font-medium hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : item.isNode ? (
                      <div className="pt-1">{item.value}</div>
                    ) : (
                      <p className="text-lg font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </LineByLineReveal>

          {/* Right Side - Interactive Connect Hub */}
          <SectionReveal
            start="top 88%"
            end="bottom 15%"
            fromY={-20}
            exitY={-25}
            blur={8}
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

                    {/* Rotating Badge on top-right of the profile picture */}
                    <div className="absolute -top-14 -right-20 md:-top-20 md:-right-28 z-20 pointer-events-none scale-75 md:scale-100 origin-center">
                      <RotatingBadge />
                    </div>

                    <Magnetic strength={0.4}>
                      <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-2xl relative z-10 group cursor-pointer overflow-hidden border border-white/10">
                        <img
                          src="/images/passport_img.webp"
                          alt="Khwaja Iqyan Ali"
                          width={192}
                          height={192}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Orbiting Tech Rings */}
                        <div className="absolute inset-[-20px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
                        <div className="absolute inset-[-40px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
                      </div>
                    </Magnetic>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-display font-bold text-white">Connect with me</h3>
                    <p className="text-zinc-300">
                      Ready to start something amazing? Choose your preferred platform to reach out.
                    </p>
                  </div>

                  {/* Social Orbit Grid */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      {
                        icon: Github,
                        label: "GitHub",
                        handle: "@iqyanali17",
                        href: "https://github.com/iqyanali17",
                        color: "hover:text-primary",
                      },
                      {
                        icon: Linkedin,
                        label: "LinkedIn",
                        handle: "Iqyan Ali",
                        href: "https://www.linkedin.com/in/khwaja-iqyan-ali-17-a-/",
                        color: "hover:text-blue-400",
                      },
                      {
                        icon: Instagram,
                        label: "Instagram",
                        handle: "@_iq_.y._xn_",
                        href: "https://www.instagram.com/_iq_.y._xn_?igsh=OXJ6MHF5ZHh2cWM1",
                        color: "hover:text-pink-500",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        handle: "Copy Email",
                        onClick: () => {
                          navigator.clipboard.writeText("khwajaiqyanali@gmail.com");
                          toast({
                            title: "Email copied!",
                            description: "My email address has been copied to your clipboard.",
                          });
                        },
                        color: "hover:text-emerald-400",
                      },
                    ].map((social) => (
                      <Magnetic key={social.label} strength={0.2}>
                        {social.href ? (
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300 hover:bg-white/10 group`}
                          >
                            <social.icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                              {social.label}
                            </span>
                            <span className="text-[10px] opacity-50 font-mono truncate max-w-full">
                              {social.handle}
                            </span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={social.onClick}
                            className={`flex flex-col items-center w-full p-4 rounded-2xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300 hover:bg-white/10 group`}
                          >
                            <social.icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                              {social.label}
                            </span>
                            <span className="text-[10px] opacity-50 font-mono">{social.handle}</span>
                          </button>
                        )}
                      </Magnetic>
                    ))}
                  </div>
                </div>
              </SpotlightCard>

              {/* Floating HUD Decorations */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 pointer-events-none opacity-20 animate-pulse">
                <div className="w-full h-full rounded-full border-[10px] border-dashed border-primary/30 animate-[spin_20s_linear_infinite]" />
              </div>
              <div className="absolute -top-12 -right-12 w-32 h-32 pointer-events-none opacity-10">
                <div className="w-full h-full rounded-full border-2 border-secondary/50 animate-[ping_3s_ease-in-out_infinite]" />
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </Element>
  );
}

export default ContactSection;
