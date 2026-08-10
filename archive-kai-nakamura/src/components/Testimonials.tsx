import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Kai is one of those rare engineers who can navigate both architecture discussions and pixel-level CSS with equal fluency. He shipped our v2 redesign in half the projected timeline.",
    name: "Lena Vogel",
    role: "CTO, Hypersolid",
    image: "https://picsum.photos/seed/lena-v/80/80",
  },
  {
    quote:
      "Working with Kai felt like having a force multiplier on the team. His monorepo tooling saved us hundreds of CI minutes per week.",
    name: "Ravi Deshmukh",
    role: "Engineering Lead, Thryve Finance",
    image: "https://picsum.photos/seed/ravi-d/80/80",
  },
  {
    quote:
      "Kai's design system work is meticulous. He thinks through every edge case and documents things so clearly that onboarding new engineers became a breeze.",
    name: "Mira Koskinen",
    role: "Product Designer, Pixelmint Studio",
    image: "https://picsum.photos/seed/mira-k/80/80",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      <SectionHeading
        label="Testimonials"
        title="What people say."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.12}>
            <div className="h-full p-6 lg:p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/10 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <Quote size={24} className="text-accent/40" />
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">
                      {t.name}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={10} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{t.role}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
