import { useEffect, useRef } from "react";

// Dot pattern (variant B) with mouse-responsive drift parallax.
export function SiteBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>(".bg-b"));
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 60;
      const ny = (e.clientY / window.innerHeight - 0.5) * 60;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        layers.forEach((el) => (el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`));
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="site-bg" ref={rootRef} aria-hidden="true">
      <div className="bg-b" />
    </div>
  );
}