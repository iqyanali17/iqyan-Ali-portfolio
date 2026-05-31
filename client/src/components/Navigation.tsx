import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ElectricBorder from "@/components/ui/ElectricBorder";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavClick = (href: string) => {
    window.location.hash = href;
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-white/5 py-4 shadow-lg"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a
            href="#"
            onClick={() => handleNavClick("")}
            className="font-display text-2xl font-bold tracking-tighter hover:text-primary transition-colors"
          >
            Iqyan<span className="text-primary">.dev</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className={cn(
                  "text-sm font-medium transition-colors uppercase tracking-wide",
                  activeHash === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://github.com/iqyanali17"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary text-sm font-medium transition-all duration-300"
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.3 } }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700" />
            </div>

            <div className="flex flex-col gap-4 relative z-10 w-full max-w-sm px-6 mt-8">
              {navItems.map((item, i) => {
                const currentHash = activeHash || "#about";
                const isActive = currentHash === item.href;

                const innerContent = (
                  <>
                    {/* Background animated shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                    
                    <span className={cn(
                      "text-xl font-display font-bold tracking-wide relative z-10",
                      isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                    )}>
                      {item.name}
                    </span>

                    {/* Chevron Icon Container */}
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10",
                      isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-white/5 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                    )}>
                      <ChevronRight size={20} className={cn("transition-transform duration-300", isActive ? "translate-x-1" : "group-hover:translate-x-1")} />
                    </div>
                  </>
                );

                const linkClasses = cn(
                  "relative flex items-center justify-between p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 group overflow-hidden w-full",
                  isActive 
                    ? "bg-primary/20 border-transparent shadow-[0_0_30px_-5px_rgba(var(--primary),0.4)] scale-105" 
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]"
                );

                const linkProps = {
                  href: item.href,
                  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: "smooth" });
                  },
                  className: linkClasses
                };

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8, x: -30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 30, transition: { delay: i * 0.05, duration: 0.2 } }}
                    transition={{ delay: i * 0.1, duration: 0.4, type: "spring", bounce: 0.4 }}
                    className="w-full"
                  >
                    {isActive ? (
                      <ElectricBorder color="#9568ff" speed={1.5} chaos={0.15} borderRadius={16} className="w-full">
                        <a {...linkProps}>{innerContent}</a>
                      </ElectricBorder>
                    ) : (
                      <a {...linkProps}>{innerContent}</a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
