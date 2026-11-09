import { MarqueeDemo } from "@/components/marquee-demo";
import { useI18n } from "@/context/i18n";

export function TechMarquee() {
  const { t } = useI18n();
  return (
    <section className="border-y bg-muted/40 py-10">
      <p className="mb-8 text-center text-sm text-muted-foreground">
        {t("marquee.title")}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <MarqueeDemo className="mt-0 sm:mt-0" />
      </div>
    </section>
  );
}