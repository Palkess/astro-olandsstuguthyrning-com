# Architecture

## When to consult this file
When navigating the codebase or proposing structural changes.

---

## Shape

A statically prerendered Astro site. No server, no runtime data fetching, no API. Every page is
HTML on disk at build time; the only JavaScript shipped is four Svelte islands.

```
build:  src/data + src/i18n  →  .astro pages  →  dist/  →  GitHub Pages
runtime: static HTML + 4 islands + (opt-in) GTM
```

## Data flow

1. `src/data/houses.ts` — locale-invariant facts, hand-edited.
2. `src/i18n/houses.{sv,en,de}.ts` — prose for the same cottages, keyed by slug and image file
   name.
3. `src/lib/images.ts` — `import.meta.glob` over `src/assets/images/houses/**`, returning
   `ImageMetadata` for `astro:assets`. Validates the whole set at module load.
4. Pages call `getHouseText(locale, slug)` and `getHouseImage(slug, file)` and render.

There is no other source of truth. Nothing is fetched.

## Routing

Astro's built-in i18n, `prefixDefaultLocale: false`:

| Route | sv | en | de |
|---|---|---|---|
| home | `/` | `/en/` | `/de/` |
| cottage | `/{slug}` | `/en/{slug}` | `/de/{slug}` |
| birdwatching | `/fagelskadning` | `/en/birdwatching` | `/de/vogelbeobachtung` |
| privacy | `/personuppgifter-policy` | `/en/privacy-policy` | `/de/datenschutz` |
| contact | `/kontakt` | `/en/contact` | `/de/kontakt` |

Slug mapping lives in `src/i18n/routes.ts`. **Never hand-write an internal path** — use
`routeHref()` / `houseHref()` from `src/i18n`, which apply both the locale prefix and the
`base` path.

## Domains — and why there is no `base`

The site is served from a **custom domain in every environment**: `new.olandsstuguthyrning.com`
while staging, `olandsstuguthyrning.com` after cutover. A custom domain serves from the domain
root, so `astro.config.mjs` sets **no `base`** — GitHub Pages only forces a `/<repo>/` prefix on
project pages *without* one.

This was deliberate (ADR-011): a `base` prefix is a well-known source of subtle breakage in
anything that bypasses the routing helpers, and it would have existed only to be deleted at
cutover.

`Layout.astro` derives `noindex` from `Astro.site.hostname`, so the staging build is excluded
from search and the live build isn't — with no flag to remember to flip.

## Islands (planned — phase 4)

| Island | Directive | Why it needs JS |
|---|---|---|
| `Lightbox.svelte` | `client:visible` | Full-screen gallery viewing, keyboard nav |
| `CookieConsent.svelte` | `client:load` | Must render before GTM can fire |
| `Header.svelte` | `client:load` | Mobile menu + language switcher |
| `YouTubeFacade.svelte` | `client:visible` | Swaps in the iframe on click |

Everything else is static. Adding a fifth island is a decision, not a detail.

## Components

Atomic: `atoms/` (Button…), `molecules/` (cards, rows), `organisms/` (sections, header, footer).
Astro components by default; `.svelte` only when the thing is an island.

## How to contribute to this file
Update when routes, the data flow, or the island set changes.
