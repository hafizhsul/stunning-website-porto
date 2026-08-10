# Alex Carter — Software Engineer (local rebuild)

A working local rebuild of the portfolio deployed at
[`fine-ties-run.freebuff.dev`](https://fine-ties-run.freebuff.dev/), ported from the
recovered sources (see `REVERSE-ENGINEERING.md` for the extraction story).

## What changed vs. the deployed site

**Kept (ported verbatim from the recovered sourcemaps):**

- `src/pages/Landing.tsx` — the full one-file portfolio: navbar with scroll-spy,
  theme toggle, mobile menu, hero with animated code card + floating tech chips,
  tech marquee, filterable projects grid, about, experience timeline, skills,
  testimonials, contact, footer. All data (projects, jobs, testimonials) is the
  original static content.
- `src/pages/NotFound.tsx` — the deployed 404 page.
- `src/components/ui/*` — the shadcn primitives used by the pages (button, badge,
  separator, card, input, sonner toaster).
- `src/index.css` — the deployed Tailwind output verbatim (theme tokens, dark mode,
  `animate-marquee` / `animate-float` / `animate-caret` keyframes), so rendering is
  pixel-identical. It's the compiled stylesheet; if you change class names in the
  pages, regenerate it from a Tailwind source build or add classes manually.
- `index.html` — the deployed head (Inter + JetBrains Mono, theme pre-paint script,
  meta), minus the PWA manifest.

**Dropped (Convex/auth backend):**

- Convex (`@convex-dev/auth`), the `/dashboard` route, `RequireAuth`, and the
  `useAuth` hook are gone.
- `/auth` is a design-faithful stub: same card (email + OTP prompt + "Continue as
  Guest"), but submitting shows a toast + inline notice that sign-in is disabled in
  this rebuild — there is no backend to verify against.
- VlyToolbar / `@vly-ai/integrations`, the iframe route-syncer, and the runtime
  error reporter were removed (platform plumbing only).

## Run it

```bash
npm install   # already installed
npm run dev   # http://localhost:5173 (or the port Vite picks)
npm run build # tsc -b && vite build
npm run lint  # oxlint
```

## Notes

- `lucide-react` is pinned to `^0.555.0` (same as the deployed site): 1.x removed the
  brand icons (Github / Linkedin / Twitter) the design uses.
- `tsconfig.app.json` adds the `@/` path alias (matching the deployed `vite.config.ts`)
  and drops `verbatimModuleSyntax` so the ported sources compile exactly as upstream.
- The previous app in this workspace (a Kai Nakamura portfolio) was moved to
  `archive-kai-nakamura/` — nothing was deleted.
