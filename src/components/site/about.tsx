import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/context/i18n";
import { FACTS, VALUES } from "@/data/content";

export function About() {
  const { t, pick } = useI18n();
  return (
    <section id="about" className="border-t bg-muted/30 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative overflow-hidden rounded-3xl border bg-card shadow-md">
            <img
              src="/portrait.webp"
              alt="Hafizh Sulthan Bachtiyar"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("about.title")}
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            {t("about.p1")}
          </p>

          <div className="mt-6">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("about.edu")}
              </p>
              <p className="mt-1.5 text-sm font-medium">{t("about.edu1")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("about.edu2")}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {FACTS.map((f, i) => {
              const inner = (
                <>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-4" aria-hidden="true" />
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
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm">
                <CheckCircle2 className="size-4 shrink-0 text-primary" />
                {pick(v)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}