import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import Reveal from "./Reveal";
import type { Project } from "./Projects";

export default function ProjectPreview({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <Reveal>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          isReversed ? "lg:[direction:rtl]" : ""
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="lg:[direction:ltr]"
        >
          <div className="rounded-[2rem] overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <div className="lg:[direction:ltr] space-y-5">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {project.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <a href={project.link ?? "#"}>
              View case study <ArrowUpRight size={14} />
            </a>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
