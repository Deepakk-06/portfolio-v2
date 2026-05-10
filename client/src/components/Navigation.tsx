import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Mail, Github } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(240_6%_5%/0.92)] backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 group"
          data-testid="nav-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center group-hover:bg-white/[0.12] transition-colors">
            <span className="text-xs font-bold text-white tracking-tight">DK</span>
          </div>
          <span className="text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors">
            Deepak K
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm text-white/50 hover:text-white/90 transition-colors hover-line"
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}

          <div className="h-4 w-px bg-white/10 mx-1" />

          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com/in/deepk6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-md text-white/40 hover:text-white/80 hover:bg-white/[0.07] transition-all"
              data-testid="nav-linkedin"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:deeeeps06@gmail.com"
              className="w-8 h-8 flex items-center justify-center rounded-md text-white/40 hover:text-white/80 hover:bg-white/[0.07] transition-all"
              data-testid="nav-email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Deepakk-06"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-md text-white/40 hover:text-white/80 hover:bg-white/[0.07] transition-all"
              data-testid="nav-github"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-white/60 hover:text-white hover:bg-white/[0.07] transition-all"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="nav-mobile-toggle"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[hsl(240_5%_7%)] border-b border-white/[0.07]"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-base font-medium text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/[0.07] flex gap-5">
                <a href="https://linkedin.com/in/deepk6" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:deeeeps06@gmail.com" className="text-white/40 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/Deepakk-06" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
