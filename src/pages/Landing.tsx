import { AnimatePresence, motion, MotionConfig, useScroll } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Braces,
  Brain,
  CheckCircle2,
  Clock,
  Download,
  Github,
  Heart,
  Headphones,
  Hexagon,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  Moon,
  Network,
  Puzzle,
  Quote,
  Settings,
  Sparkles,
  Star,
  Sun,
  Tag,
  Terminal,
  Users,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiCplusplus,
  SiFlutter,
  SiJavascript,
  SiKotlin,
  SiLaravel,
  SiPhp,
  SiReact,
  SiSymfony,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MarqueeDemo } from "@/components/marquee-demo";
import {
  EXPERIENCE,
  FACTS,
  FILTERS,
  NAV_LINKS,
  PROJECTS,
  SKILL_GROUPS,
  SOCIALS,
  STRINGS,
  TESTIMONIALS,
  VALUES,
  resolve,
} from "@/data/content";
import type { Filter, I18nKey, Lang, Localized, Project } from "@/data/content";

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: I18nKey) => string;
  pick: (v: Localized) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (key) => STRINGS.en[key],
  pick: (v) => resolve(v, "en"),
});

function useI18n() {
  return useContext(I18nContext);
}


function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        <span className="h-px w-6 bg-primary/40" />
        {eyebrow}
        <span className="h-px w-6 bg-primary/40" />
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------------------------- theme ---------------------------------- */

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
      className="grid size-9 place-items-center rounded-md border bg-card text-muted-foreground transition-colors hover:text-foreground"
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

/* ------------------------------ parallax bg ------------------------------- */

function ParallaxBackground() {
  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax-speed]"),
    );
    if (reduceMotion || items.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const scrolled = window.scrollY;
      items.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax-speed") ?? "0");
        if (el.classList.contains("watermark")) {
          el.style.transform = `rotate(-15deg) translateY(${scrolled * speed}px)`;
        } else {
          // optional horizontal drift for the deeper glyph layer
          const dx = parseFloat(el.getAttribute("data-parallax-x") ?? "0");
          el.style.transform = `translate3d(${scrolled * dx}px, ${scrolled * speed}px, 0)`;
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="parallax-container hidden" aria-hidden="true">
        <div className="px-item watermark" data-parallax-speed="0.15">
        <span className="watermark-brand">hafizhesbe.my.id</span>
        <span className="watermark-status">
          &gt;_ INIT OK · MODULES LOADED · AWAITING INPUT
        </span>
      </div>
      <span
        className="px-item glyph"
        data-parallax-speed="-0.12"
        style={{ top: "25%", left: "8%" }}
      >
        &gt;_
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.25"
        style={{ top: "45%", left: "88%" }}
      >
        {"{}"}
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="-0.18"
        style={{ top: "70%", left: "12%" }}
      >
        {"/>"}
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.1"
        style={{ top: "85%", left: "82%" }}
      >
        {"()"}
      </span>
    </div>

    {/* second layer: faint glyphs drifting at different speeds for depth */}
    <div className="parallax-container hidden" aria-hidden="true">
      <span
        className="px-item glyph"
        data-parallax-speed="0.22"
        data-parallax-x="0.1"
        style={{ top: "10%", left: "78%", fontSize: "1.6rem", opacity: 0.04 }}
      >
        $
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="-0.15"
        data-parallax-x="-0.08"
        style={{ top: "22%", left: "12%", fontSize: "2rem", opacity: 0.035 }}
      >
        #
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.3"
        data-parallax-x="0.14"
        style={{ top: "38%", left: "85%", fontSize: "1.3rem", opacity: 0.03 }}
      >
        |
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="-0.2"
        data-parallax-x="0.06"
        style={{ top: "55%", left: "6%", fontSize: "2.4rem", opacity: 0.045 }}
      >
        ~
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.18"
        data-parallax-x="-0.12"
        style={{ top: "68%", left: "75%", fontSize: "1.5rem", opacity: 0.03 }}
      >
        _
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.35"
        data-parallax-x="0.1"
        style={{ top: "78%", left: "25%", fontSize: "1.3rem", opacity: 0.04 }}
      >
        {"./"}
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="-0.1"
        data-parallax-x="0.05"
        style={{ top: "88%", left: "60%", fontSize: "1.8rem", opacity: 0.035 }}
      >
        {"[]"}
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.25"
        data-parallax-x="-0.1"
        style={{ top: "30%", left: "55%", fontSize: "1.6rem", opacity: 0.04 }}
      >
        {"<>"}
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.12"
        data-parallax-x="0.08"
        style={{ top: "60%", left: "92%", fontSize: "2rem", opacity: 0.03 }}
      >
        {"{}"}
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="-0.25"
        data-parallax-x="-0.06"
        style={{ top: "82%", left: "88%", fontSize: "1.4rem", opacity: 0.035 }}
      >
        {"%%"}
      </span>
      </div>
    </>
  );
}

/* ------------------------------- site background ----------------------------- */
// Final background: dot pattern (variant B) + mouse-responsive drift parallax.
// 21st.dev research: /s/background (dot) + /s/parallax (mouse-responsive).
function SiteBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>(".bg-b"));
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 60;
      const ny = (e.clientY / window.innerHeight - 0.5) * 60;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        layers.forEach((el) => (el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`));
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="site-bg" ref={rootRef} aria-hidden="true">
      <div className="bg-b" />
    </div>
  );
}

/* ---------------------------------- navbar --------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("work");
  const { scrollYProgress } = useScroll();
  const { lang, setLang, t, pick } = useI18n();

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const pos = window.scrollY + 140;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActive(current || ids[0]);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center font-semibold tracking-tight">
          <span className="sm:hidden">Hafizh</span>
          <span className="hidden sm:block">Hafizh Sulthan Bachtiyar</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
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
            className="flex items-center gap-0.5 rounded-md border bg-card p-0.5"
          >
            {(["en", "id"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "rounded px-2 py-1 text-xs font-semibold uppercase transition-colors",
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
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">{t("nav.hire")}</a>
          </Button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-md border bg-card text-foreground md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary/60"
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
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
    </header>
  );
}

/* ----------------------------------- hero ---------------------------------- */

function TechChip({
  icon: Icon,
  label,
  detail,
  iconClass,
  className,
}: {
  icon: LucideIcon;
  label: string;
  detail: string;
  iconClass: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-20 flex items-center gap-2.5 rounded-xl border bg-card/90 px-3 py-2 shadow-lg shadow-primary/10 backdrop-blur",
        className,
      )}
    >
      <span className={cn("grid size-8 place-items-center rounded-lg", iconClass)}>
        <Icon className="size-4" />
      </span>
      <span className="text-left">
        <span className="block text-xs font-semibold leading-none">{label}</span>
        <span className="mt-1 block text-[10px] text-muted-foreground">{detail}</span>
      </span>
    </div>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge
            variant="secondary"
            className="mb-6 gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t("hero.badge")}
          </Badge>

          <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.1rem]">
            {t("hero.h1.pre")}{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="text-primary">{t("hero.h1.highlight")}</span>
              <svg
                className="absolute -bottom-2 left-0 h-2.5 w-full text-primary"
                viewBox="0 0 220 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9C60 3 160 3 217 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </span>{" "}
            {t("hero.h1.post")}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("hero.lede")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#work">
                {t("hero.cta1")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">
                {t("hero.cta2")}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-1.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-md text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              >
                <s.icon className="size-[18px]" />
              </a>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-6 sm:gap-8">
            {[
              { value: "3+", label: t("hero.stat1") },
              { value: "4+", label: t("hero.stat2") },
              { value: "5+", label: t("hero.stat3") },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && <Separator orientation="vertical" className="h-10" />}
                <div>
                  <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md pb-10 lg:max-w-none"
        >
          {/* glow */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-transparent blur-2xl"
          />
          {/* code card */}
          <div className="relative overflow-hidden rounded-2xl border bg-card/80 shadow-2xl shadow-primary/15 backdrop-blur ring-1 ring-white/5">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-yellow-400/80" />
              <span className="size-2.5 rounded-full bg-green-400/80" />
              <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Terminal className="size-3.5" />
                developer.ts
              </span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-7 sm:p-6">
              <p>
                <span className="text-muted-foreground">// hello, world 👋</span>
              </p>
              <p>
                <span className="text-violet-500 dark:text-violet-400">const</span>{" "}
                <span className="text-sky-600 dark:text-sky-400">developer</span>{" "}
                <span className="text-foreground/70">=</span>{" "}
                <span className="text-foreground/70">{"{"}</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">name</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  "Hafizh Sulthan Bachtiyar"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">role</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  "Software Engineer"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">location</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  "Jawa Timur, Indonesia"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">stack</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-foreground/70">[</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  "Laravel"
                </span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">"Symfony"</span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">"React"</span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">"TypeScript"</span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">"Android"</span>
                <span className="text-foreground/70">]</span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">openToWork</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-amber-600 dark:text-amber-400">true</span>
                <span className="text-foreground/70">,</span>
              </p>
              <p>
                <span className="text-foreground/70">{"};"}</span>
              </p>
              <p className="mt-1">
                <span className="text-violet-500 dark:text-violet-400">await</span>{" "}
                <span className="text-sky-600 dark:text-sky-400">developer</span>
                <span className="text-foreground/70">.</span>
                <span className="text-sky-600 dark:text-sky-400">ship</span>
                <span className="text-foreground/70">(</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  "nextProduct"
                </span>
                <span className="text-foreground/70">)</span>
                <span className="text-foreground/70">;</span>
                <span className="animate-caret ml-1 inline-block h-4 w-[7px] translate-y-[3px] bg-primary" />
              </p>
            </div>
          </div>

          <TechChip
            icon={Braces}
            label="PHP"
            detail="Backend"
            iconClass="bg-sky-500/15 text-sky-600 dark:text-sky-400"
            className="-right-3 -top-5 animate-float sm:-right-6"
          />
          <TechChip
            icon={Atom}
            label="Laravel"
            detail="Framework"
            iconClass="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
            className="-left-3 top-1/3 hidden animate-float-delay sm:flex lg:-left-8"
          />
          <TechChip
            icon={Hexagon}
            label="Kotlin"
            detail="Android"
            iconClass="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
            className="-bottom-4 right-12 hidden animate-float-delay md:flex"
          />

          {/* overlapping profile card */}
          <div className="absolute -bottom-1 left-2 flex items-center gap-3 rounded-2xl border bg-card p-3.5 shadow-xl shadow-primary/10 sm:-left-4">
            <img
              src="/portrait.png"
              alt="Hafizh Sulthan Bachtiyar"
              className="size-10 rounded-full object-cover"
            />
            <span>
              <span className="block text-sm font-semibold leading-none">Hafizh Sulthan Bachtiyar</span>
              <span className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {t("hero.status")}
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- marquee --------------------------------- */

function TechMarquee() {
  const { t } = useI18n();
  return (
    <section className="border-y bg-muted/40 py-10">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {t("marquee.title")}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <MarqueeDemo className="mt-0 sm:mt-0" />
      </div>
    </section>
  );
}

/* --------------------------------- projects -------------------------------- */

function ProjectPreview({
  gradient,
  image,
}: {
  gradient: string;
  image?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-56 overflow-hidden bg-gradient-to-br",
        gradient,
      )}
    >
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}
      {/* subtle dark gradient so the image stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 text-foreground opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:18px_18px]" />
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const { t, pick } = useI18n();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="border-b border-border/70">
        <div className="flex items-center gap-1.5 bg-muted/40 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="ml-2 truncate rounded-md border bg-card px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            {project.url}
          </span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          aria-label={project.title}
          className="block w-full cursor-zoom-in text-left"
        >
          <ProjectPreview
            gradient={project.gradient}
            image={project.image}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className={cn("rounded-full border", project.chip)}>
            {project.category}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {pick(project.description)}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-4 border-t pt-4">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
            >
              {t("proj.live")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {project.links?.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" />
              {t("proj.source")}
            </a>
          )}
          <button
            type="button"
            onClick={onOpen}
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
          >
            {t("proj.details")}
            <ArrowUpRight className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);
  const filtered = PROJECTS.filter(
    (p) => filter === "All" || p.category === filter,
  );

  return (
    <section id="work" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("proj.eyebrow")}
          title={t("proj.title")}
          description={t("proj.desc")}
        />

        <Reveal className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                filter === f
                  ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setActive(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <Button asChild variant="outline">
            <a href="https://github.com/hafizhsul" target="_blank" rel="noreferrer">
              {t("proj.more")}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t, pick } = useI18n();
  const gallery = project.gallery?.length
    ? project.gallery
    : project.image
      ? [project.image]
      : [];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [project.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => Math.min(i + 1, gallery.length - 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, gallery.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border bg-card shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full border bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          <div className="relative overflow-hidden border-b bg-zinc-950">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={gallery[idx] ?? project.id}
                src={gallery[idx]}
                alt={`${project.title} screenshot ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                draggable={false}
                drag={gallery.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) setIdx((i) => Math.min(i + 1, gallery.length - 1));
                  else if (info.offset.x > 60) setIdx((i) => Math.max(i - 1, 0));
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="max-h-[min(65vh,540px)] w-full cursor-grab object-contain active:cursor-grabbing"
              />
            </AnimatePresence>

            {gallery.length > 1 && (
              <>
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => setIdx((i) => i - 1)}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                )}
                {idx < gallery.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setIdx((i) => i + 1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                )}
                <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur-sm">
                  {idx + 1} / {gallery.length}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-3 p-6">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="secondary" className={cn("rounded-full border", project.chip)}>
                {project.category}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pick(project.description)}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project.links?.live || project.links?.source) && (
              <div className="mt-1 flex flex-wrap items-center gap-4 border-t pt-4">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                  >
                    {t("proj.live")}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
                {project.links?.source && (
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="size-4" />
                    {t("proj.source")}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ----------------------------------- about --------------------------------- */

function About() {
  const { t, pick } = useI18n();
  return (
    <section id="about" className="border-t bg-muted/30 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border bg-card shadow-xl shadow-primary/5">
              <img
                src="/portrait.png"
                alt="Hafizh Sulthan Bachtiyar"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary/40" />
              {t("about.eyebrow")}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("about.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              {t("about.p1")}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-6">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("about.edu")}
              </p>
              <p className="mt-1.5 text-sm font-medium">{t("about.edu1")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("about.edu2")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="mt-8 grid gap-4 sm:grid-cols-2">
            {FACTS.map((f, i) => {
              const inner = (
                <>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                      {pick(f.label)}
                    </span>
                    <span className="block text-sm font-medium">{pick(f.value)}</span>
                  </span>
                </>
              );
              const cardClass =
                "flex items-center gap-3 rounded-xl border bg-card p-3.5 transition-colors hover:border-primary/40 hover:text-primary";
              return (
                <div key={i}>
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noreferrer" className={cardClass}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  {pick(v)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- experience ------------------------------- */

function Experience() {
  const { t, pick } = useI18n();
  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("exp.eyebrow")}
          title={t("exp.title")}
          description={t("exp.desc")}
        />

        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-10 border-l border-border/70 pl-8">
            {EXPERIENCE.map((job, i) => (
              <li key={job.company} className="relative">
                <span className="absolute -left-11 top-8 grid size-6 place-items-center rounded-full border bg-background shadow-sm">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <Reveal delay={i * 0.06}>
                <div className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs font-medium text-primary">
                      {pick(job.period)}
                    </span>
                    <span className="text-xs text-muted-foreground">{pick(job.location)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    {pick(job.role)}
                    <span className="text-muted-foreground"> · {job.company}</span>
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {job.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/50" />
                        {pick(point)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {pick(tag)}
                      </span>
                    ))}
                  </div>
                </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- skills --------------------------------- */

const TAG_ICONS: Record<string, { Icon: LucideIcon | IconType; color: string }> = {
  "Hardware & software troubleshooting": { Icon: Wrench, color: "#3B82F6" },
  "Application installation": { Icon: Download, color: "#10B981" },
  "System configuration": { Icon: Settings, color: "#8B5CF6" },
  "Remote support": { Icon: Headphones, color: "#F59E0B" },
  "Basic computer networking": { Icon: Network, color: "#06B6D4" },
  PHP: { Icon: SiPhp, color: "#777BB4" },
  Kotlin: { Icon: SiKotlin, color: "#7F52FF" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "C++": { Icon: SiCplusplus, color: "#00599C" },
  Laravel: { Icon: SiLaravel, color: "#FF2D20" },
  Symfony: { Icon: SiSymfony, color: "#767676" },
  "Advantech Monitoring": { Icon: Activity, color: "#64748B" },
  Android: { Icon: SiAndroid, color: "#3DDC84" },
  Flutter: { Icon: SiFlutter, color: "#02569B" },
  React: { Icon: SiReact, color: "#61DAFB" },
  Vite: { Icon: SiVite, color: "#646CFF" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { Icon: Zap, color: "#0055FF" },
  "Team collaboration": { Icon: Users, color: "#3B82F6" },
  "User communication": { Icon: MessageSquare, color: "#06B6D4" },
  "Critical thinking": { Icon: Brain, color: "#8B5CF6" },
  "Time management": { Icon: Clock, color: "#F59E0B" },
  "Problem solving": { Icon: Puzzle, color: "#10B981" },
};

function SkillTagIcon({ tag }: { tag: Localized }) {
  const key = typeof tag === "string" ? tag : tag.en;
  const { Icon, color } = TAG_ICONS[key] ?? { Icon: Tag, color: "#64748B" };
  return <Icon className="size-3.5 shrink-0" color={color} />;
}

function Skills() {
  const { t, pick } = useI18n();
  return (
    <section id="skills" className="border-t bg-muted/30 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          description={t("skills.desc")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="shine-card group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <group.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {pick(group.title)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {pick(group.blurb)}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1.5 rounded-md border bg-muted/40 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      <SkillTagIcon tag={tag} />
                      {pick(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- testimonials ------------------------------ */

export function Testimonials() {
  const { t } = useI18n();
  return (
    <section id="testimonials" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("testi.eyebrow")}
          title={t("testi.title")}
          description={t("testi.desc")}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure
                className={`flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 ${
                  testimonial.quote
                    ? "border-primary/20 bg-card hover:border-primary/40"
                    : "border-dashed bg-card/40 hover:border-primary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Quote className="size-5 text-primary/40" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.quote || t("testi.placeholder")}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                  <span className="grid size-9 place-items-center rounded-full text-xs font-bold text-primary/70">
                    {testimonial.name
                      ? testimonial.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()
                      : "?"}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {testimonial.name || t("testi.placeholderName")}
                    </span>
                    <span className="block text-xs text-muted-foreground/70">
                      {testimonial.role || t("testi.placeholderRole")}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- contact --------------------------------- */

function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className="pb-24 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center shadow-xl shadow-primary/5 sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

            <div className="relative">
              <Badge variant="secondary" className="mb-6 gap-2 rounded-full px-3.5 py-1.5">
                <Sparkles className="size-3.5 text-primary" />
                {t("contact.badge")}
              </Badge>
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                {t("contact.title")}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                {t("contact.desc")}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <a href="mailto:hafizhbachtiyar123@gmail.com">
                    <Mail className="size-4" />
                    hafizhbachtiyar123@gmail.com
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="/resume.pdf" download>
                    <Download className="size-4" />
                    {t("contact.resume")}
                  </a>
                </Button>
              </div>
              <div className="mt-9 flex items-center justify-center gap-1.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-md border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <s.icon className="size-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- footer --------------------------------- */

function Footer() {
  const { t, pick } = useI18n();
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <img src="/logo.svg" alt="HSB" className="size-8 rounded-lg" />
              Hafizh Sulthan Bachtiyar
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("footer.tag")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("footer.navigate")}
              </p>
              <ul className="mt-3 space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      {pick(l.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("footer.connect")}
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="mailto:hafizhbachtiyar123@gmail.com"
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/hafizhsul"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/hafizhsulthan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("footer.colophon")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Built with React, Tailwind CSS & Framer Motion. Set in Inter and
                JetBrains Mono.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hafizh Sulthan Bachtiyar. {t("footer.rights")}</p>
          <p className="flex items-center gap-1.5">
            {t("footer.love")}
            <Heart className="size-3.5 fill-primary text-primary" />
            {t("footer.in")}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- whatsapp cta ------------------------------ */

function WhatsAppCta() {
  return (
    <a
      href="https://wa.me/6282235769474?text=Hi%20Hafizh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-110 motion-reduce:transition-none"
    >
      <MessageCircle className="size-6 fill-current" />
    </a>
  );
}

/* ---------------------------------- landing -------------------------------- */

export default function Landing() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("lang") === "id" ? "id" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider
      value={{
        lang,
        setLang,
        t: (key) => STRINGS[lang][key],
        pick: (v) => resolve(v, lang),
      }}
    >
      <MotionConfig reducedMotion="user">
        <div className="isolate page-bg min-h-screen text-foreground antialiased">
          <ParallaxBackground />
          <SiteBackground />
          <Navbar />
          <main>
            <Hero />
            <TechMarquee />
            <Projects />
            <About />
            <Experience />
            <Skills />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <WhatsAppCta />
        </div>
      </MotionConfig>
    </I18nContext.Provider>
  );
}
