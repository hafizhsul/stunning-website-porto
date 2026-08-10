import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./ui/Badge";
import type { Project } from "./Projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-200, 200], [4, -4]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-4, 4]), {
    stiffness: 100,
    damping: 20,
  });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const isLarge = project.size === "large";
  const colSpan = isLarge ? "lg:col-span-5" : "lg:col-span-3";

  return (
    <motion.a
      ref={ref}
      href={project.link ?? "#"}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 22,
        delay: index * 0.1,
      }}
      whileHover={{ z: 20 }}
      className={`${colSpan} group block bg-white dark:bg-white/5 rounded-[2rem] border border-slate-200/50 dark:border-white/10
        shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]
        hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
        transition-shadow duration-500 overflow-hidden cursor-pointer`}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight size={16} className="text-slate-600 dark:text-slate-300" />
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-3">
        <span className="text-xs font-medium text-accent uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[55ch]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
