import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TechChip from "./TechChip";
import { Separator } from "./ui/Separator";
import {
  Layout, Server, Cloud, Braces, Terminal,
  ShoppingBag, Lock, Palette, Download, GitBranch, Sparkles,
} from "lucide-react";

const skillGroups = [
  {
    title: "Frontend",
    items: [
      { icon: Layout, label: "React" },
      { icon: Layout, label: "Next.js" },
      { icon: Braces, label: "TypeScript" },
      { icon: Palette, label: "Tailwind CSS" },
      { icon: Sparkles, label: "Framer Motion" },
      { icon: Download, label: "Redux" },
    ],
  },
  {
    title: "Backend",
    items: [
      { icon: Terminal, label: "Node.js" },
      { icon: Terminal, label: "Go" },
      { icon: Lock, label: "GraphQL" },
      { icon: Lock, label: "tRPC" },
      { icon: Server, label: "PostgreSQL" },
      { icon: Server, label: "Redis" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { icon: Cloud, label: "AWS" },
      { icon: Cloud, label: "Docker" },
      { icon: Cloud, label: "Kubernetes" },
      { icon: Cloud, label: "Terraform" },
      { icon: GitBranch, label: "CI/CD" },
      { icon: Cloud, label: "Vercel" },
    ],
  },
  {
    title: "Tooling & Craft",
    items: [
      { icon: GitBranch, label: "Git" },
      { icon: ShoppingBag, label: "Vitest" },
      { icon: ShoppingBag, label: "Storybook" },
      { icon: ShoppingBag, label: "Turborepo" },
      { icon: Palette, label: "Figma" },
      { icon: Cloud, label: "Datadog" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      <SectionHeading
        label="Skills"
        title="Technologies I work with."
        description="A running list of tools and technologies I use to build products end-to-end."
      />

      <div className="space-y-12">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.12}>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, i) => (
                  <TechChip
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    delay={gi * 0.08 + i * 0.05}
                  />
                ))}
              </div>
            </div>
            {gi < skillGroups.length - 1 && <Separator className="mt-8" />}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
