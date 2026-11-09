import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/context/i18n";
import type { Project } from "@/data/content";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t, pick } = useI18n();
  const gallery = project.gallery?.length
    ? project.gallery
    : project.image
      ? [project.image]
      : [];
  const [idx, setIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Capture the opener during render: by the time effects run, autoFocus
  // has already moved focus inside the dialog. Stable across re-renders.
  const openerRef = useRef<HTMLElement | null>(null);
  if (openerRef.current === null && typeof document !== "undefined") {
    openerRef.current = document.activeElement as HTMLElement | null;
  }
  // onClose is an inline arrow from the parent; keep it in a ref so the
  // mount/unmount effect below runs exactly once per open (stable prev focus).
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    setIdx(0);
  }, [project.id]);

  useEffect(() => {
    // Move focus explicitly into the dialog (autoFocus is unreliable).
    dialogRef.current
      ?.querySelector<HTMLElement>('button[aria-label="Close"]')
      ?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      // Trap Tab inside the dialog so keyboard users can't slip behind it.
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const items = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null);
        if (items.length === 0) return;
        const first = items[0]!;
        const last = items[items.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (e.key === "ArrowRight") setIdx((i) => Math.min(i + 1, gallery.length - 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Return focus to the opener; it may have moved, so re-query by stable id.
      const prev = openerRef.current;
      try {
        if (prev && document.contains(prev)) {
          prev.focus();
        } else {
          const prevId =
            prev?.dataset?.detailsFor ??
            prev?.getAttribute("aria-label") ??
            undefined;
          if (prevId) {
            const fallback =
              document.querySelector<HTMLElement>(
                `[data-details-for="${CSS.escape(prevId)}"]`,
              ) ??
              Array.from(
                document.querySelectorAll<HTMLElement>("#work button"),
              ).find((el) => el.getAttribute("aria-label") === prevId);
            fallback?.focus?.();
          }
        }
      } catch {
        // ignore focus errors (element unmounted, etc.)
      }
    };
  }, [gallery.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => closeRef.current()}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/5"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => closeRef.current()}
          autoFocus
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full border bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          <div className="relative overflow-hidden border-b bg-zinc-950">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={gallery[idx] ?? project.id}
                src={gallery[idx]}
                alt={`${project.title} screenshot ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                draggable={false}
                drag={gallery.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) setIdx((i) => Math.min(i + 1, gallery.length - 1));
                  else if (info.offset.x > 60) setIdx((i) => Math.max(i - 1, 0));
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="max-h-[min(65vh,540px)] w-full cursor-grab object-contain active:cursor-grabbing"
              />
            </AnimatePresence>

            {gallery.length > 1 && (
              <>
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => setIdx((i) => i - 1)}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                )}
                {idx < gallery.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setIdx((i) => i + 1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                )}
                <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 font-mono text-[11px] text-white">
                  {idx + 1} / {gallery.length}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-3 p-6">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="secondary" className="rounded-full border">
                {project.category}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pick(project.description)}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project.links?.live || project.links?.source) && (
              <div className="mt-1 flex flex-wrap items-center gap-4 border-t pt-4">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                  >
                    {t("proj.live")}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
                {project.links?.source && (
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="size-4" />
                    {t("proj.source")}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}