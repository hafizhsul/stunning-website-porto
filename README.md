# Hafizh Sulthan Bachtiar — Portfolio

Bilingual (English / Indonesian) single-page developer portfolio built with React, Vite, TypeScript, Tailwind CSS v4, shadcn/ui, and Framer Motion.

## Stack

- React 19 + Vite (client-side routing via `react-router`)
- TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn/ui primitives (`@radix-ui/*`, `class-variance-authority`, `tailwind-merge`, `clsx`)
- Framer Motion, `lucide-react`, `sonner`, `next-themes`

## Structure

- `src/pages/Landing.tsx` — composition only: i18n provider + section order.
- `src/components/site/*` — one file per section: `navbar` (scroll-spy, theme toggle, mobile menu), `hero` (animated code card), `tech-marquee`, `projects` (+ lazy `project-modal`), `about`, `experience`, `skills`, `contact`, `footer`, `whatsapp-cta`, `background`. `shared.tsx` holds `Reveal`, `SectionHeading`, `TechChip`.
- `src/context/i18n.tsx` — language state and `useI18n` (`t`, `pick`).
- `src/lib/portfolio.ts` — pure helpers (`getActiveSection`, `filterProjects`), covered by `test/`.
- `src/pages/NotFound.tsx` — 404 page.
- `src/data/content.ts` — all content and i18n strings (EN/ID); projects, experience, skills, facts, socials. The portfolio is data-driven — edit here to change content.
- `src/components/ui/*` — shadcn primitives (button, badge, separator).
- `public/<project>/` — per-project preview screenshots (router-watch, inka, intervalfit, saku, stuntzilla).

## Run it

```bash
npm install   # already installed
npm run dev   # local dev server (Vite)
npm run build # tsc -b && vite build
npm run lint  # oxlint
npm test      # node --test, pure helpers
```

## Notes

- `lucide-react` is pinned to `^0.555.0`: 1.x removed the brand icons (GitHub / LinkedIn / Twitter) the design uses.
- `tsconfig.app.json` adds the `@/` path alias.
