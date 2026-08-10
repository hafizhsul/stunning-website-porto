import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Building2, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "Hypersolid",
    location: "Berlin, DE",
    period: "2022 — Present",
    description:
      "Leading frontend architecture for a B2B SaaS platform. Established design system governance, reduced bundle size by 41%, and mentored a team of 4 engineers.",
  },
  {
    role: "Full-Stack Developer",
    company: "Thryve Finance",
    location: "Munich, DE",
    period: "2019 — 2022",
    description:
      "Led migration from legacy PHP monolith to Next.js micro-frontends. Built real-time payment dashboards and integrated multi-currency settlement flows.",
  },
  {
    role: "Frontend Developer",
    company: "Pixelmint Studio",
    location: "Hamburg, DE",
    period: "2017 — 2019",
    description:
      "Built interactive marketing sites and web applications for clients in e-commerce and media. Introduced component-driven development and automated visual regression testing.",
  },
];

export default function Experience() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      <SectionHeading
        label="Experience"
        title="Where I've made an impact."
      />

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-12 p-6 lg:p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/10 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] transition-shadow duration-300">
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  {exp.period}
                </span>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <Building2 size={14} />
                  {exp.company}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
                  <MapPin size={14} />
                  {exp.location}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
