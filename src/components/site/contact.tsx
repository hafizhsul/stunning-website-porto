import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/shared";
import { useI18n } from "@/context/i18n";
import { SOCIALS } from "@/data/content";

export function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className="mt-24 pb-24 sm:mt-28 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center shadow-md sm:px-16 sm:py-20">
            <div className="relative">
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
                    className="grid size-11 place-items-center rounded-md border text-muted-foreground transition-[color,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
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