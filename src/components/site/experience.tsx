import { SectionHeading } from "@/components/site/shared";
import { useI18n } from "@/context/i18n";
import { EXPERIENCE } from "@/data/content";

export function Experience() {
  const { t, pick } = useI18n();
  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={t("exp.title")}
          description={t("exp.desc")}
          align="left"
        />

        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-10 border-l border-border/70 pl-8">
            {EXPERIENCE.map((job) => (
              <li key={job.company} className="relative">
                <span className="absolute -left-11 top-8 grid size-6 place-items-center rounded-full border bg-background shadow-sm">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <div className="group rounded-2xl border bg-card p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}