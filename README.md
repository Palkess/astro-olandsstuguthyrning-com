# Ölands Stuguthyrning

Static marketing site for five holiday cottages in Löt on eastern Öland, rented out by
Helen and Lars Andersson. It is **not** a booking system — its job is to present the cottages
and send visitors to the matching listing on [Stugknuten](https://www.stugknuten.com), where
booking actually happens.

Replaces the SvelteKit + MSSQL + IIS site at
[Palkess/olandsstuguthyrning-svelte](https://github.com/Palkess/olandsstuguthyrning-svelte).

## Quick links

- 📋 [Project plan](docs/project-plan.md) — decisions, phases, cutover runbook
- 🌐 Staging: https://new.olandsstuguthyrning.com (noindexed)
- 🎯 Live (after cutover): https://olandsstuguthyrning.com

## Built with

- Astro 7 (static output) + Svelte 5 islands
- TypeScript (strict)
- Tailwind CSS 4 (`@tailwindcss/vite`, `@theme` tokens)
- `astro:assets` for image optimization
- GitHub Pages via GitHub Actions

## Prerequisites

Node 24+ (matches CI).

## Developing

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # astro check — TypeScript + Astro diagnostics
npm run build      # static build to dist/
npm run preview    # serve dist/ locally
npm run format     # prettier --write .
```

## Folder structure

```
root
├─ .github/workflows/deploy.yml   # check → build → GitHub Pages
├─ public/                        # copied verbatim: robots.txt, CNAME, bird-list PDF
└─ src
   ├─ assets/images/houses/<slug> # cottage photos, resolved via src/lib/images.ts
   ├─ components/{atoms,molecules,organisms}
   ├─ data/                       # locale-INVARIANT data (houses.ts, site.ts)
   ├─ i18n/                       # all human-readable text, per locale
   ├─ layouts/
   ├─ lib/images.ts               # image resolver + build-time validation
   ├─ pages/
   └─ styles/global.css
```

## Content model

The split matters and is easy to get wrong:

- `src/data/houses.ts` — slug, prices, image **file names**, YouTube id, Stugknuten id,
  amenity **icon keys**. Nothing a human reads.
- `src/i18n/houses.{sv,en,de}.ts` — names, descriptions, image **captions**, amenity
  **labels**, extra-cost wording. Keyed by the same slugs and file names.

Adding a photo therefore means: drop the file in `src/assets/images/houses/<slug>/`, add the
file name to `images` in `houses.ts`, and add a caption in **all three** i18n files. If you
miss one, the build fails with a message naming the file — see `src/lib/images.ts`.

## Languages

Swedish (default, unprefixed), English (`/en/`), German (`/de/`). No auto-detection — visitors
switch language explicitly, and `hreflang` tells search engines about the alternates. Content
page slugs are translated (`/en/birdwatching`, `/de/vogelbeobachtung`); cottage slugs stay
Swedish in every locale.

Always build internal links with `routeHref()` / `houseHref()` from `src/i18n` — they apply
both the locale prefix and the `base` path.

## Deploying

Every push to `main` runs `astro check` then `astro build` and publishes `dist/` to GitHub
Pages. There is no manual deploy step.

The site builds for **`new.olandsstuguthyrning.com`**, a staging subdomain CNAMEd to GitHub
Pages. Because it has a custom domain it serves from the domain root, so there is **no `base`
path** to reason about. Staging pages carry `noindex` (keyed off the hostname in
`Layout.astro`), so they can't compete with the live site in search.

⚠️ Going live means changing `site` in `astro.config.mjs` and `public/CNAME` to the apex domain,
then repointing DNS — a deliberate, one-time change. Follow
[the cutover runbook](docs/project-plan.md#8-cutover-runbook), which covers the records that must
**not** be touched.

## Agent documentation

`AGENTS.md` is the self-contained instruction file; `CLAUDE.md` loads the topic files in
`docs/agent/` via `@imports`. Update `docs/agent/` first, then reflect changes in `AGENTS.md`.
