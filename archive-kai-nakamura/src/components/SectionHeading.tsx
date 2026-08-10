import Reveal from "./Reveal";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-16 space-y-4">
      {label && (
        <span className="text-xs font-medium uppercase tracking-widest text-accent">
          {label}
        </span>
      )}
      <h2 className="text-3xl lg:text-5xl tracking-tighter leading-none font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-[55ch] text-sm lg:text-base">
          {description}
        </p>
      )}
    </Reveal>
  );
}
