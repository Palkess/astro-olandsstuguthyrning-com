# Ölands Stuguthyrning — Claude Code Instructions

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

📋 **@docs/project-plan.md** — the decisions behind this codebase, the phase the project is in,
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

## Reference Files

Consult only when the condition applies — do not load all of them by default:

- @docs/agent/conventions.md — when writing, editing, or reviewing code
- @docs/agent/architecture.md — when navigating the codebase or proposing structural changes
- @docs/agent/decisions.md — when making or evaluating architectural or design choices
- @docs/agent/bugs.md — when debugging or working around known issues
- @docs/agent/workflows.md — when running, building, or deploying
- @docs/agent/skills.md — when onboarding or assessing unfamiliar parts of the stack
- @docs/agent/context.md — when interpreting domain terms, Swedish content, or business rules
