import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
        <SectionHeading
          label="About"
          title="I build things that ship and scale."
        />

        <Reveal delay={0.15}>
          <div className="space-y-4 text-slate-500 dark:text-slate-400 leading-relaxed max-w-[55ch] text-sm lg:text-base">
            <p>
              Currently a senior engineer at a 40-person startup in Berlin, I spend my days
              architecting frontend systems and my nights diving into Rust. I care deeply about
              performance budgets, accessible markup, and developer experience.
            </p>
            <p>
              Before this, I cut my teeth at a fintech scale-up where I led the migration from a
              legacy PHP monolith to a Next.js micro-frontend architecture — reducing page load by
              63% and deploy times from 12 minutes to under 40 seconds.
            </p>
            <p>
              When I'm not coding, you'll find me climbing limestone crags in Frankenjura or
              tinkering with my split ergonomic keyboard layout. I believe good tools make good
              craft.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
