import { Activity, Download, Headphones, Network, Settings, Tag, Wrench, Zap, type LucideIcon } from "lucide-react";
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
import { SectionHeading } from "@/components/site/shared";
import { useI18n } from "@/context/i18n";
import { SKILL_GROUPS } from "@/data/content";
import type { Localized } from "@/data/content";

const TAG_ICONS: Record<string, { Icon: LucideIcon | IconType; color?: string }> = {
  "Hardware & software troubleshooting": { Icon: Wrench },
  "Application installation": { Icon: Download },
  "System configuration": { Icon: Settings },
  "Remote support": { Icon: Headphones },
  "Basic computer networking": { Icon: Network },
  PHP: { Icon: SiPhp, color: "#777BB4" },
  Kotlin: { Icon: SiKotlin, color: "#7F52FF" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "C++": { Icon: SiCplusplus, color: "#00599C" },
  Laravel: { Icon: SiLaravel, color: "#FF2D20" },
  Symfony: { Icon: SiSymfony, color: "#767676" },
  "Advantech Monitoring": { Icon: Activity },
  Android: { Icon: SiAndroid, color: "#3DDC84" },
  Flutter: { Icon: SiFlutter, color: "#02569B" },
  React: { Icon: SiReact, color: "#61DAFB" },
  Vite: { Icon: SiVite, color: "#646CFF" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { Icon: Zap, color: "#0055FF" },
};

function SkillTagIcon({ tag }: { tag: Localized }) {
  const key = typeof tag === "string" ? tag : tag.en;
  const { Icon, color } = TAG_ICONS[key] ?? { Icon: Tag };
  return <Icon className="size-3.5 shrink-0" color={color} aria-hidden="true" />;
}

export function Skills() {
  const { t, pick } = useI18n();
  return (
    <section id="skills" className="border-t bg-muted/30 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={t("skills.title")}
          description={t("skills.desc")}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={i}
              className="shine-card group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <group.icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold tracking-tight">
                  {pick(group.title)}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
          ))}
        </div>
      </div>
    </section>
  );
}