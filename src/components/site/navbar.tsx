import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/context/i18n";
import { NAV_LINKS } from "@/data/content";
import { getActiveSection } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid size-8 shrink-0 place-items-center rounded-md border bg-card text-muted-foreground transition-colors after:absolute after:-inset-2 after:content-[''] hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid place-items-center"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(SECTION_IDS[0]!);
  const { scrollY, scrollYProgress } = useScroll();
  const { lang, setLang, t, pick } = useI18n();

  const syncNav = useCallback((y: number) => {
    setScrolled(y > 12);
    const sections = SECTION_IDS.map((id) => ({
      id,
      top: document.getElementById(id)?.offsetTop ?? Number.POSITIVE_INFINITY,
    }));
    setActive(getActiveSection(sections, y) || SECTION_IDS[0]!);
  }, []);

  useMotionValueEvent(scrollY, "change", syncNav);

  useEffect(() => {
    syncNav(scrollY.get());
  }, [scrollY, syncNav]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto transition-[max-width] duration-300",
          scrolled || menuOpen ? "max-w-5xl" : "max-w-6xl",
        )}
      >
        <nav
          className={cn(
            "relative mx-auto flex h-16 items-center justify-between px-4 transition-[background-color,border-color,border-radius,box-shadow] duration-300 sm:px-6",
            scrolled || menuOpen
              ? cn(
                  "mt-3 border bg-background/85 shadow-lg shadow-primary/5 backdrop-blur-xl",
                  menuOpen ? "rounded-t-2xl border-b-0" : "rounded-2xl",
                )
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#top" className="relative flex items-center font-semibold tracking-tight after:absolute after:-inset-3 after:content-['']">
            <span className="sm:hidden">Hafizh</span>
            <span className="hidden sm:block">Hafizh Sulthan Bachtiyar</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm transition-colors after:absolute after:-inset-3 after:content-['']",
                  active === link.href.slice(1)
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {pick(link.label)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="Language"
              className="flex h-8 items-center gap-0.5 rounded-md border bg-card p-0.5"
            >
              {(["en", "id"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={cn(
                    "relative flex h-7 items-center rounded px-2 text-xs font-semibold uppercase transition-colors after:absolute after:-inset-y-[10px] after:-inset-x-1 after:content-['']",
                    lang === l
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <ThemeToggle />
            <Button asChild size="sm" className="relative hidden h-8 min-h-0 shrink-0 px-3 py-0 text-[13px] after:absolute after:-inset-2 after:content-[''] sm:inline-flex">
              <a href="#contact">{t("nav.hire")}</a>
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              className="relative grid size-9 shrink-0 place-items-center rounded-md border bg-card text-foreground after:absolute after:-inset-2 after:content-[''] md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

          <motion.div
            style={{ scaleX: scrollYProgress }}
            className={cn(
              "absolute inset-x-4 -bottom-px h-px origin-left bg-primary/60",
              menuOpen && "opacity-0",
            )}
          />
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-border bg-background md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="relative rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors after:absolute after:-inset-3 after:content-[''] hover:bg-accent hover:text-foreground"
                  >
                    {pick(link.label)}
                  </a>
                ))}
                <Separator className="my-2" />
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <a href="#contact" onClick={() => setMenuOpen(false)}>
                      {t("nav.hire")}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}