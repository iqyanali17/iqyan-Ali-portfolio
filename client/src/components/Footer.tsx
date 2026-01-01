import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/5 bg-background/50 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          © {currentYear} Khwaja Iqyan Ali. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <span className="text-sm text-muted-foreground">Connect with me:</span>
          <a
            href="https://github.com/iqyanali17"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/khwaja-iqyan-ali-17-a-/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://www.instagram.com/_iq_.y._xn_?igsh=OXJ6MHF5ZHh2cWM1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram size={28} />
          </a>
          <a
            href="mailto:khwajaiqyanali@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}
