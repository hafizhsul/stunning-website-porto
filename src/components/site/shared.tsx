import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  title,
  description,
  align = "center",
}: {
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-14 max-w-2xl", align === "center" ? "mx-auto text-center" : "")}>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-pretty text-base leading-relaxed text-muted-foreground", align === "left" && "max-w-xl")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function TechChip({
  icon: Icon,
  label,
  detail,
  iconClass,
  className,
}: {
  icon: LucideIcon | IconType;
  label: string;
  detail: string;
  iconClass: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-20 flex items-center gap-2.5 rounded-xl border bg-card px-3 py-2 shadow-sm",
        className,
      )}
    >
      <span className={cn("grid size-8 place-items-center rounded-lg", iconClass)}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="text-left">
        <span className="block text-xs font-semibold leading-none">{label}</span>
        <span className="mt-1 block text-[10px] text-muted-foreground">{detail}</span>
      </span>
    </div>
  );
}