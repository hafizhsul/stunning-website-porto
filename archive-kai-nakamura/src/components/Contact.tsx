import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      <Reveal>
        <div className="bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden">
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 space-y-8 max-w-2xl">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-emerald-400">
              Get in touch
            </span>

            <h2 className="text-3xl lg:text-5xl tracking-tighter leading-tight font-bold text-white">
              Let's build something
              <br />
              worth shipping.
            </h2>

            <p className="text-slate-400 leading-relaxed max-w-[50ch] text-sm lg:text-base">
              Currently open to freelance projects and select full-time roles.
              If you have an interesting problem to solve, I'd love to hear about it.
            </p>

            <motion.a
              href="mailto:kai@example.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 text-sm font-semibold rounded-full hover:bg-emerald-50 transition-colors duration-300 cursor-pointer group"
            >
              <Mail size={16} />
              kai@example.com
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>

          {/* Decorative blurs */}
          <div className="absolute right-0 bottom-0 w-64 h-64 translate-x-1/4 translate-y-1/4 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute right-16 top-8 w-32 h-32 rounded-full bg-emerald-400/5 blur-2xl pointer-events-none" />
        </div>
      </Reveal>
    </section>
  );
}
