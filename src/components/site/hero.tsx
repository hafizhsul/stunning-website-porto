import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { SiKotlin, SiLaravel, SiPhp } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechChip } from "@/components/site/shared";
import { useI18n } from "@/context/i18n";
import { SOCIALS } from "@/data/content";

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-60">
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
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
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
                className="grid size-11 place-items-center rounded-md text-muted-foreground transition-[color,transform] hover:-translate-y-0.5 hover:text-primary"
              >
                <s.icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md pb-10 lg:max-w-none"
        >
          {/* Single focus glow: marks the code card as the hero focal point (1 of max 2). */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-transparent blur-2xl"
          />
          {/* code card: solid surface; the hero glow behind it is the single focus accent */}
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/5">
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
                <span className="text-muted-foreground">// hello, world</span>
              </p>
              <p>
                <span className="text-violet-700 dark:text-violet-400">const</span>{" "}
                <span className="text-sky-700 dark:text-sky-400">developer</span>{" "}
                <span className="text-foreground/70">=</span>{" "}
                <span className="text-foreground/70">{"{"}</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-700 dark:text-sky-400">name</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">
                  "Hafizh Sulthan Bachtiyar"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-700 dark:text-sky-400">role</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">
                  "Software Engineer"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-700 dark:text-sky-400">location</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">
                  "Jawa Timur, Indonesia"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-700 dark:text-sky-400">stack</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-foreground/70">[</span>
                <span className="text-emerald-700 dark:text-emerald-400">"Laravel"</span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">"Symfony"</span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">"React"</span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">"TypeScript"</span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">"Android"</span>
                <span className="text-foreground/70">]</span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-700 dark:text-sky-400">openToWork</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-amber-700 dark:text-amber-400">true</span>
                <span className="text-foreground/70">,</span>
              </p>
              <p>
                <span className="text-foreground/70">{"};"}</span>
              </p>
              <p className="mt-1">
                <span className="text-violet-700 dark:text-violet-400">await</span>{" "}
                <span className="text-sky-700 dark:text-sky-400">developer</span>
                <span className="text-foreground/70">.</span>
                <span className="text-sky-700 dark:text-sky-400">ship</span>
                <span className="text-foreground/70">(</span>
                <span className="text-emerald-700 dark:text-emerald-400">"nextProduct"</span>
                <span className="text-foreground/70">)</span>
                <span className="text-foreground/70">;</span>
                <span className="animate-caret ml-1 inline-block h-4 w-[7px] translate-y-[3px] bg-primary" />
              </p>
            </div>
          </div>

          <TechChip
            icon={SiPhp}
            label="PHP"
            detail="Backend"
            iconClass="bg-sky-500/15 text-sky-700 dark:text-sky-400"
            className="-right-3 -top-5 sm:-right-6"
          />
          <TechChip
            icon={SiLaravel}
            label="Laravel"
            detail="Framework"
            iconClass="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
            className="-left-3 top-1/3 hidden sm:flex lg:-left-8"
          />
          <TechChip
            icon={SiKotlin}
            label="Kotlin"
            detail="Android"
            iconClass="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
            className="-bottom-4 right-12 hidden md:flex"
          />

          {/* overlapping profile card: secondary elevation below the code-card focal */}
          <div className="absolute -bottom-1 left-2 flex items-center gap-3 rounded-2xl border bg-card p-3.5 shadow-md sm:-left-4">
            <img
              src="/portrait.webp"
              alt="Hafizh Sulthan Bachtiyar"
              fetchPriority="high"
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