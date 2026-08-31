# Hafizh Sulthan Bachtiar — Portfolio

Bilingual (English / Indonesian) single-page developer portfolio built with React, Vite, TypeScript, Tailwind CSS v4, shadcn/ui, and Framer Motion.

## Stack

- React 19 + Vite (client-side routing via `react-router`)
- TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn/ui primitives (`@radix-ui/*`, `class-variance-authority`, `tailwind-merge`, `clsx`)
- Framer Motion, `lucide-react`, `sonner`, `next-themes`

## Structure

- `src/pages/Landing.tsx` — the full one-file portfolio: navbar (scroll-spy, theme toggle, mobile menu), hero with animated code card, tech marquee, filterable projects grid, about, experience timeline, skills, testimonials, contact, footer.
- `src/pages/NotFound.tsx` — 404 page.
- `src/data/content.ts` — all content and i18n strings (EN/ID); projects, experience, skills, testimonials, facts, socials. The portfolio is data-driven — edit here to change content.
- `src/components/ui/*` — shadcn primitives (button, badge, card, input, separator, sonner).
- `public/<project>/` — per-project preview screenshots (router-watch, inka, intervalfit, saku, stuntzilla).

## Run it

```bash
npm install   # already installed
npm run dev   # local dev server (Vite)
npm run build # tsc -b && vite build
npm run lint  # oxlint
```

## Notes

- `lucide-react` is pinned to `^0.555.0`: 1.x removed the brand icons (GitHub / LinkedIn / Twitter) the design uses.
- `tsconfig.app.json` adds the `@/` path alias.
