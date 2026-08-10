import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectPreview from "./ProjectPreview";

export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  size: "large" | "small";
  link?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Drift",
    category: "Real-time Collaboration",
    description:
      "A multiplayer whiteboard with WebSocket sync, spatial cursors, and an infinite canvas. Handles 200+ concurrent editors with sub-50ms latency.",
    tags: ["React", "WebSocket", "Canvas API", "Rust"],
    image: "https://picsum.photos/seed/drift-board/800/500",
    size: "large",
    featured: true,
  },
  {
    title: "Meridian",
    category: "Developer Tooling",
    description:
      "CLI toolkit for monorepo management. Smart caching, dependency graph visualization, and parallel task orchestration.",
    tags: ["TypeScript", "Node.js", "Graphviz"],
    image: "https://picsum.photos/seed/meridian-tool/600/400",
    size: "small",
  },
  {
    title: "Flux",
    category: "Design System",
    description:
      "A component library powering 4 product surfaces at scale. Tree-shakeable, 98% test coverage, WCAG 2.1 AA compliant.",
    tags: ["React", "Storybook", "Radix UI", "Vitest"],
    image: "https://picsum.photos/seed/flux-system/600/400",
    size: "small",
  },
  {
    title: "Helix Pay",
    category: "Fintech Platform",
    description:
      "Payment orchestration layer handling multi-currency settlements, fraud detection, and real-time ledger reconciliation.",
    tags: ["Next.js", "PostgreSQL", "tRPC", "Temporal"],
    image: "https://picsum.photos/seed/helix-pay/800/500",
    size: "large",
    featured: true,
  },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const grid = projects;

  return (
    <section id="work" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      <SectionHeading
        label="Selected Work"
        title="Projects that solve real problems."
        description="From real-time collaboration tools to fintech platforms — each project is built with performance and craft at its core."
      />

      {/* Featured previews */}
      <div className="space-y-24 lg:space-y-32 mb-24">
        {featured.map((p, i) => (
          <ProjectPreview key={p.title} project={p} index={i} />
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6">
        {grid.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
