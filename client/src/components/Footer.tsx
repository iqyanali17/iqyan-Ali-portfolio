export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-white/5 bg-background/50 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6 flex justify-center items-center">
        <p className="text-xs md:text-sm text-muted-foreground/60 font-mono tracking-wider text-center">
          © {currentYear} Khwaja Iqyan Ali. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
