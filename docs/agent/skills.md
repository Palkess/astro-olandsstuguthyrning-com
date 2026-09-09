# Stack & Required Knowledge

## When to consult this file
When onboarding, or when assessing an unfamiliar part of the stack.

---

## Stack inventory

| Technology | Version | Used for | Notes |
|---|---|---|---|
| Astro | 7.x | Static site generation, routing, i18n | `output` is static; no adapter |
| Svelte | 5.x | Interactive islands only | Runes syntax (`$state`, `$props`) |
| `@astrojs/svelte` | 9.x | Astro↔Svelte bridge | Major pairs with Astro major |
| TypeScript | 5.x | Everything | `astro/tsconfigs/strict` |
| Tailwind CSS | 4.x | Styling | Via `@tailwindcss/vite`; `@theme` tokens in `global.css` — **no `tailwind.config.js`** |
| `astro:assets` | built-in | Image optimization | `<Picture>`, AVIF/WebP, srcset |
| `@astrojs/sitemap` | 3.x | sitemap-index.xml | i18n-aware |
| `@lucide/astro` / `@lucide/svelte` | 1.x | Icons | |
| Prettier | 3.x | Formatting | + astro/svelte/tailwind plugins |

## What you need to know

- **Astro islands.** Components are static unless given a `client:` directive. If you add
  `client:load` casually you have made a performance decision — see decisions.md ADR-009.
- **Tailwind 4 is config-less.** Theme tokens are CSS custom properties inside `@theme` in
  `src/styles/global.css`. Don't create a `tailwind.config.js`.
- **`astro:assets` needs static imports.** Images must be resolvable at build time — hence the
  `import.meta.glob` resolver in `src/lib/images.ts`. A runtime string path won't optimize.
- **Astro i18n + `base`.** Both apply to URLs. Use the helpers; see conventions.md.
- **Swedish.** The primary content language. See context.md for a glossary — you will otherwise
  mistranslate things like "bytesdag" and "sovloft".

## Not in this project

No database, no server, no authentication, no email, no test framework, no ESLint. If a task
seems to need one of these, it is probably out of scope — check project-plan.md first.

## How to contribute to this file
Update when a dependency is added, removed, or majorly upgraded.
