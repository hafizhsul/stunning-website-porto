import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/shared";
import { useI18n } from "@/context/i18n";
import { FILTERS, PROJECTS } from "@/data/content";
import type { Filter, Project } from "@/data/content";
import { filterProjects } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const ProjectModal = lazy(() => import("./project-modal"));

function ProjectPreview({ image }: { image?: string }) {
  return (
    <div className="relative h-56 overflow-hidden bg-muted/40">
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
  featured = false,
}: {
  project: Project;
  onOpen: () => void;
  featured?: boolean;
}) {
  const { t, pick } = useI18n();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/5",
        // Featured card (newest in current filter) gets a primary tint to mark hierarchy.
        featured && "border-primary/25",
      )}
    >
      <div className="border-b border-border/70">
        <button
          type="button"
          onClick={onOpen}
          aria-label={project.title}
          className="block w-full cursor-zoom-in text-left"
        >
          <ProjectPreview image={project.image} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="rounded-full border">
            {project.category}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {pick(project.description)}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-4 border-t pt-4">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
            >
              {t("proj.live")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          <button
            type="button"
            onClick={onOpen}
            data-details-for={project.id}
            className="ml-auto inline-flex min-h-[44px] items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
          >
            {t("proj.details")}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);
  const filtered = filterProjects(PROJECTS, filter);

  // Warm the lazy modal chunk after first paint so opening feels instant.
  useEffect(() => {
    void import("./project-modal");
  }, []);

  return (
    <section id="work" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={t("proj.title")}
          description={t("proj.desc")}
          align="left"
        />

        <div className="mb-10 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors",
                filter === f
                  ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setActive(project)}
              featured={i === 0}
            />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl border bg-card p-8 text-center">
            <p className="text-sm font-medium">{t("proj.empty")}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setFilter("All")}
            >
              {t("proj.reset")}
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <a href="https://github.com/hafizhsul" target="_blank" rel="noreferrer">
              {t("proj.more")}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>

      {active && (
        <Suspense fallback={null}>
          <ProjectModal project={active} onClose={() => setActive(null)} />
        </Suspense>
      )}
    </section>
  );
}