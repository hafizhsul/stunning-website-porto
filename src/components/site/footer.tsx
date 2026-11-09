import { Heart } from "lucide-react";
import { useI18n } from "@/context/i18n";
import { NAV_LINKS } from "@/data/content";

export function Footer() {
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
                Built with React, Tailwind CSS & Framer Motion. Set in Geist and
                Geist Mono.
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