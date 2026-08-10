import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface TechChipProps {
  icon: LucideIcon;
  label: string;
  delay?: number;
}

export default function TechChip({ icon: Icon, label, delay = 0 }: TechChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 18,
        delay,
      }}
      whileHover={{ y: -3, scale: 1.05 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] text-sm font-medium text-slate-700 dark:text-slate-300"
    >
      <Icon size={16} className="text-accent" />
      {label}
    </motion.div>
  );
}
