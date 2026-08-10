import { motion } from "framer-motion";
import {
  Hexagon, Braces, Terminal, Server, Cloud, Lock, Atom, Radio,
} from "lucide-react";

const techs = [
  { icon: Hexagon, label: "React" },
  { icon: Braces, label: "TypeScript" },
  { icon: Terminal, label: "Node.js" },
  { icon: Server, label: "PostgreSQL" },
  { icon: Cloud, label: "AWS" },
  { icon: Lock, label: "Rust" },
  { icon: Radio, label: "WebSockets" },
  { icon: Atom, label: "GraphQL" },
  { icon: Hexagon, label: "Next.js" },
  { icon: Braces, label: "Go" },
  { icon: Terminal, label: "Kafka" },
  { icon: Server, label: "Redis" },
  { icon: Cloud, label: "Docker" },
  { icon: Lock, label: "WASM" },
  { icon: Radio, label: "gRPC" },
  { icon: Atom, label: "Prisma" },
];

const row = techs.concat(techs);

export default function Marquee() {
  return (
    <section className="border-y border-slate-200/60 dark:border-white/5 py-5 overflow-hidden">
      <div className="flex gap-0">
        <motion.div
          className="flex gap-8 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {row.map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap"
            >
              <Icon size={14} className="text-accent" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
