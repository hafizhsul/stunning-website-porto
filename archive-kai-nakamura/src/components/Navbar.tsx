import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/Button";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hover:text-accent transition-colors duration-300"
        >
          Kai Nakamura
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative py-1 transition-colors duration-300 hover:text-slate-900 dark:hover:text-white group"
                >
                  {l.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Button size="sm">Resume</Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 -mr-2 text-slate-600 dark:text-slate-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5"
          >
            <ul className="px-6 py-4 flex flex-col gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-2">
                <Button size="sm" className="w-full">Resume</Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
