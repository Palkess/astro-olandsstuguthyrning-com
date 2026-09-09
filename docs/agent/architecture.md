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

## Islands

Four, and only four. ~68 kB of JS uncompressed across the whole site.

| Island | Directive | Why it needs JS | Degrades to |
|---|---|---|---|
| `Header.svelte` | `client:load` | Cottage dropdown, mobile menu | Logo + language links; every cottage is in the footer |
| `CookieConsent.svelte` | `client:load` | Must render before GTM can fire | No banner, and therefore no GTM |
| `Lightbox.svelte` | `client:idle` | Full-screen viewing, keyboard nav | Thumbnails stay visible — they're server-rendered |
| `YouTubeFacade.svelte` | `client:visible` | Injects the iframe on click | A poster image with no player |

Each is passed plain, build-time-resolved data — no i18n tables, no routing helpers, no image
logic reaches the browser. `Header.astro` is the wrapper that does that resolution.

Adding a fifth island is a decision, not a detail.

**`client:visible` needs a visible box.** Astro's visibility directive observes the island's
*children*, so a component whose markup starts hidden — the Lightbox renders nothing but a
closed `<dialog>`, which is `display: none` — never intersects and never hydrates. It fails
silently: the page looks fine and the feature is simply dead. That is why the Lightbox is
`client:idle`. Anything else that starts hidden must be too.

## Components

```
components/
├─ atoms/      Button, SectionLabel, AmenityIcon
├─ molecules/  CottageCard, AmenityGrid, PricePanel, InfoCard, LocationMap
├─ organisms/  Header(.astro + .svelte), Footer, CottageGallery, Lightbox,
│              YouTubeFacade, CookieConsent
└─ pages/      HomePage, CottagePage, ContactPage, BirdwatchingPage, PrivacyPage
```

`components/pages/*` hold the page *bodies*. The files under `src/pages/` are thin route
wrappers that pick a locale, a body and the `<Layout>` metadata — which is why `/en/` and `/de/`
need one `[locale]/[slug].astro` rather than six files, and why the translated slugs come out of
`routeSlugs` instead of being repeated as file names.

Astro components by default; `.svelte` only when the thing is an island.

## How to contribute to this file
Update when routes, the data flow, or the island set changes.
