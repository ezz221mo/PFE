import { Link, useLocation } from "wouter";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (location !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "/", action: null },
    { label: "About", href: null, action: () => scrollToSection("about") },
    { label: "Projects", href: "/projects", action: null },
    { label: "Contact", href: null, action: () => scrollToSection("contact") },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="font-mono text-sm tracking-[0.2em] uppercase hover:text-primary transition-colors duration-300" data-testid="nav-logo">
          E. Elsadat
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.action!}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 relative group bg-transparent border-0 cursor-pointer"
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            )
          )}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
            data-testid="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        <button
          className="md:hidden p-2 hover:text-primary transition-colors"
          onClick={() => setIsOpen(true)}
          data-testid="mobile-menu-open"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-5 right-6 p-2 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              data-testid="mobile-menu-close"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) =>
                link.href ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-serif text-5xl md:text-6xl hover:text-primary transition-colors duration-300 italic"
                      data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  >
                    <button
                      onClick={link.action!}
                      className="font-serif text-5xl md:text-6xl hover:text-primary transition-colors duration-300 italic bg-transparent border-0 cursor-pointer"
                      data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                )
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <button
                  onClick={() => { toggleTheme(); setIsOpen(false); }}
                  className="font-mono uppercase tracking-widest text-xs mt-4 py-2 px-6 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                  data-testid="mobile-theme-toggle"
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
