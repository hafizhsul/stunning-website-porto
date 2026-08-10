import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, GitFork, Building2, Mail } from "lucide-react";

const socials = [
  { icon: GitFork, href: "#", label: "GitHub" },
  { icon: Building2, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-300 cursor-pointer select-none"
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex items-center max-w-[1400px] mx-auto px-6 lg:px-12 pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 w-full items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.3 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50 text-xs font-medium text-emerald-700 dark:text-emerald-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for new projects
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-[0.95] font-bold text-slate-900 dark:text-white">
            Building digital
            <br />
            <span className="text-accent">experiences</span> that
            <br />
            leave a mark.
          </h1>

          <p className="text-base lg:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-[55ch]">
            Full-stack developer crafting performant, pixel-perfect interfaces.
            I turn ambitious ideas into polished products — from zero to deploy.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton href="#work">
              View my work
              <ArrowRight size={16} />
            </MagneticButton>

            <div className="flex items-center gap-1 ml-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors duration-300 rounded-full hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.5 }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative w-full max-w-[420px] aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 dark:from-emerald-900/20 via-white dark:via-slate-950 to-emerald-50/40 dark:to-emerald-900/10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-slate-200/50 dark:border-white/10 overflow-hidden">
              <div className="absolute top-6 left-8 right-8 space-y-2.5">
                {[100, 70, 90, 40, 85, 55].map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{ delay: 0.8 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-2.5 rounded-full ${i === 0 ? "bg-emerald-400/60 dark:bg-emerald-500/40" : "bg-slate-200 dark:bg-white/10"}`}
                  />
                ))}
              </div>
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 right-10 w-20 h-20 rounded-2xl bg-emerald-400/20 dark:bg-emerald-500/10 backdrop-blur-sm border border-white/60 dark:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              />
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute bottom-20 left-10 w-14 h-14 rounded-full bg-slate-300/30 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/20"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-16 right-16 w-10 h-10 rounded-lg bg-emerald-300/30 dark:bg-emerald-500/10 backdrop-blur-sm border border-white/50 dark:border-white/20"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
