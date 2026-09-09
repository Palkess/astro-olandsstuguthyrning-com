# Ölands Stuguthyrning — Agent Instructions

Self-contained instructions for any coding agent. `CLAUDE.md` loads the same material
via `@imports`; this file inlines the essentials for agents that don't support them.

---

Static marketing site for five holiday cottages on Öland, Sweden. Astro 7 + Svelte 5 islands,
TypeScript (strict), Tailwind 4, deployed to GitHub Pages. Swedish/English/German.
It is a brochure that funnels visitors to Stugknuten — **there is no booking system here.**

---

## Quick Start

```bash
npm install
npm run dev          # http://localhost:4321
npm run check        # astro check
npm run build        # static build
npm run preview      # serve dist/
npm run format       # prettier --write .
```

---

## Read this first

📋 **`docs/project-plan.md`** — the decisions behind this codebase, the phase the project is in,
and the cutover runbook. If you are picking up work, start there.

---

## Boundaries

Do not change these without explicit human review:

- **`astro.config.mjs` `site` / `base`** — switching these is the production cutover, not a
  refactor. See project-plan.md §8.
- **`.github/workflows/deploy.yml`** — CI/CD.
- **`public/CNAME`** — controls the custom domain. Adding or editing it repoints the live site.
- **`src/data/houses.ts` prices** — real prices for a real business. Change only when the owners
  have confirmed the numbers.
- **`src/i18n/*.de.ts`** — German copy ships without native review; don't "improve" it casually.

---

---

## Essentials

See `docs/agent/` for the full set. The four things most likely to trip you up:

1. **The data/i18n split.** `src/data/` holds what nobody reads (slugs, prices, file
   names, ids). `src/i18n/` holds all human-readable text, in sv/en/de. A Swedish string
   in `src/data/` is a bug.
2. **Never hand-write internal paths.** Use `routeHref()` / `houseHref()` from
   `src/i18n` — they apply the locale prefix *and* the `base` path, which changes at
   cutover.
3. **Images are validated at build.** Adding a photo means: file into
   `src/assets/images/houses/<slug>/`, name into `images` in `houses.ts`, caption into
   **all three** i18n files. A missing file fails the build by design.
4. **No `set:html` on data-file content.** Multi-paragraph copy is `string[]`.
5. **Four islands, and only four.** `Header`, `CookieConsent`, `Lightbox`, `YouTubeFacade`.
   Everything else is static `.astro`. Adding a fifth is a decision, not a detail.
6. **Style with the design tokens.** Tailwind 4 `@theme` tokens live in
   `src/styles/global.css` (`bg-surface`, `text-text-muted`, `text-h2`, `rounded-card`,
   `border-border`…). A one-off hex or font size in a component is a bug. Note the custom
   `nav:` breakpoint at 1100px, where the desktop nav collapses so German labels don't crowd.
7. **Nothing third-party loads before consent.** Fonts are self-hosted, the YouTube player is
   a poster until clicked, and only `CookieConsent.svelte` may load GTM. The privacy policy
   says so in three languages.

Formatting: Prettier, 4 spaces, single quotes, no trailing commas, width 100.
TypeScript strict, no `any`.

Read `docs/project-plan.md` before starting work — it holds the decisions, the current
phase, and the cutover runbook.
