# Project plan — olandsstuguthyrning.com rewrite

**Status:** phases 0–6 complete (phase 6: 2026-09-10). Next: phase 7 (verify and owner review).
**Written:** 2026-09-09
**Supersedes:** `github.com/Palkess/olandsstuguthyrning-svelte` (SvelteKit 2 + MSSQL + IIS)

---

## 1. What this is

A static marketing site for five holiday cottages in Löt, eastern Öland, rented out by
Helen and Lars Andersson. It is **not** a booking system. Its single job is to present the
cottages well and funnel visitors to the corresponding listing on **Stugknuten**, where the
actual booking happens. Secondary job: give people a phone number and an email address.

Target stack: **Astro 7 + Svelte 5 islands + Tailwind 4 + TypeScript (strict)**, deployed to
**GitHub Pages** via GitHub Actions, on the existing domain `olandsstuguthyrning.com`.
Three languages: **Swedish (default), English, German**.

### What the old site actually does today

Worth stating plainly, because it drives the scope decision: the booking form, the Litepicker
availability calendar and the FAQ are **all commented out** in
`src/routes/(public)/[house_slug]/+page.svelte`. The live house page renders a hero, a facts
panel, prices, a description, a YouTube embed, a lightbox gallery, and a "Visa tillgänglighet"
button pointing at a hardcoded Stugknuten URL. Everything else in that repo — MSSQL, admin
panel, bcrypt auth, nodemailer, the Selenium Stugknuten scraper, the sharp image resizer — is
infrastructure serving features that are switched off.

**So this rewrite deletes dead code; it does not remove working features.**

---

## 2. Decisions

Resolved in the planning interview. Rationale kept because the *why* is the part that rots.

| # | Decision | Rationale |
|---|---|---|
| D1 | **Pure brochure site.** No DB, admin, auth, email, scraper, availability, or booking form. | Matches what the live site already does. Everything else can't run on GitHub Pages anyway. |
| D2 | **Pages:** `/`, `/[slug]` ×5, `/fagelskadning`, `/personuppgifter-policy`, `/kontakt` — plus contact details in the footer and on each house page. | The current site's phone numbers exist *only inside commented-out markup* — today a visitor has no way to contact them except via Stugknuten. That's the biggest content bug found. |
| D3 | **Privacy policy rewritten,** URL kept. | Sections 2–5 of the current text (we collect name/phone/email/address for booking requests) become false the moment the form is gone. What remains true is the cookie/analytics section. Publishing a false GDPR notice is worse than publishing none. |
| D4 | **Content is edited by the developer via git.** No CMS. | Zero infrastructure, zero auth surface. Cost: Helen and Lars lose self-service and every price change is a round-trip. Acceptable for 5 cottages whose prices move roughly annually. |
| D5 | **Plain TypeScript data in `src/data/`,** not content collections. | Matches the `src/data/business.ts` convention in `astro-helensfotvard-se`. 5 hand-edited records don't justify a schema layer. |
| D6 | **Images into `src/assets/images/houses/<slug>/`, renamed,** served through `astro:assets`. | Image weight *is* this site. Raw 609 KB JPEGs (the `public/` option) is the wrong default for a site whose visitors are often on mobile in a summer house area. |
| D7 | **Full redesign, produced in a separate Claude design session.** | Build plan treats design as an external dependency and sequences around it. |
| D8 | **Design first, then build components to it.** Phases 0–2 (scaffold, data, images, i18n, copy) run in parallel because they are design-independent. | Avoids building a component library twice; avoids idling. |
| D9 | **GTM `GTM-M436Z79H`, gated behind a cookie-consent island.** | Same pattern as `astro-helensfotvard-se` (`PUBLIC_GTM_ID` repo variable), so one convention across both sites, and GA history stays continuous. |
| D10 | **Svelte islands:** lightbox gallery, cookie consent, header/language switcher, YouTube facade. Nothing else. | Everything else is static HTML. |
| D11 | **Full launch scope:** build → verify on a staging domain → owner review → DNS cutover → decommission IIS/Azure. | "Cut over later" is where rewrites die. |
| D21 | **Staging on `new.olandsstuguthyrning.com`, not the github.io project-pages URL.** No `base` path in any environment. | A `base` prefix would exist only until cutover while creating a lasting bug class in anything bypassing the routing helpers. Costs one DNS CNAME (apex and MX untouched) and gives the owners a real HTTPS URL to review. Staging is `noindex`ed by hostname. Supersedes the `*.github.io` step in D11. |
| D12 | **SEO:** per-house JSON-LD, sitemap, robots, canonicals, hreflang, per-house OG images, all existing URLs preserved. | The site's whole purpose is being findable. GitHub Pages cannot do server redirects, so URL preservation is the only cheap option. |
| D13 | **Quality gates: Prettier + `astro check` in CI only.** No ESLint, no Playwright, no separate link checker. | 8 routes. Strict TS + `astro check` covers the real risk. Broken-image-path risk is handled inside the asset helper instead (see §5.3). |
| D14 | **sv (default, unprefixed) + en + de.** Language switcher only — **no auto-detection or redirect.** | GitHub Pages has no server, so detection would be a client-side redirect: flash-of-wrong-language for users, and a real risk of bouncing crawlers. A switcher plus `hreflang` is what most rental sites do and carries no SEO downside. |
| D15 | **Translations split from invariant data:** `src/data/houses.ts` (slug, prices, `bookingUrl`, image list, YouTube ID, icon keys) + `src/i18n/houses.{sv,en,de}.ts` (all prose, keyed by slug). | Nothing is duplicated across locales except actual text, so adding a photo can't drift the locales out of sync. |
| D16 | **en/de copy AI-drafted from Swedish; English reviewed by Jonas, German ships best-effort.** | Mitigation: keep German copy short and factual rather than translating every flourish — machine-translated marketing prose reads worse than plain machine-translated facts. |
| D17 | **Content-page slugs translated, cottage slugs stay Swedish.** `/en/birdwatching`, `/de/vogelbeobachtung`; but `/en/grona-stugan`. | Cottages are proper names — visitors arrive having seen "Gröna stugan" on Stugknuten. |
| D18 | **New repo `astro-olandsstuguthyrning-com`,** old one archived. Full `docs/agent/` documentation set ported. | The old repo's name says "svelte", its history contains DB credentials, and it would be a poor base for GitHub Pages. |
| D20 | **Astro 7, not Astro 6.** | Written as "Astro 6" above only because `astro-helensfotvard-se` pins it. 7.3.2 is current and integration majors pair cleanly (`@astrojs/svelte@9` ↔ Astro 7). Greenfield repo, so no migration cost. |
| D19 | **Content ships as-is** (prices, descriptions, captions from the DB export), except new Gula stugan photos are requested from the owners. | See §7 — this is an accepted risk, recorded deliberately. |

---

## 3. Architecture

```
astro-olandsstuguthyrning-com/
├─ .github/workflows/deploy.yml     # astro check → astro build → Pages
├─ public/
│  ├─ CNAME                         # olandsstuguthyrning.com  (added at cutover, §8)
│  ├─ robots.txt                    # allow all + sitemap ref
│  ├─ favicon.svg / favicon.ico     # from design session
│  └─ Observerade-faglar-i-Lot.pdf  # filename preserved — it's a shared download link
├─ src/
│  ├─ assets/images/
│  │  ├─ houses/<slug>/*.jpg        # 53 cottage photos, renamed (§5.2)
│  │  ├─ lars-och-helen.jpg
│  │  ├─ birdwatching-lot.jpg
│  │  └─ logo.png
│  ├─ components/{atoms,molecules,organisms}/
│  ├─ data/
│  │  ├─ houses.ts                  # locale-invariant only
│  │  └─ site.ts                    # owners, phones, kontakt@, season definition
│  ├─ i18n/
│  │  ├─ ui.{sv,en,de}.ts           # chrome strings
│  │  ├─ houses.{sv,en,de}.ts       # names, descriptions, captions, amenity labels
│  │  ├─ routes.ts                  # slug map per locale (D17)
│  │  └─ index.ts                   # useTranslations(), locale helpers
│  ├─ layouts/Layout.astro          # head, meta, hreflang, JSON-LD slot, GTM hook
│  ├─ lib/images.ts                 # import.meta.glob resolver (§5.3)
│  ├─ pages/
│  │  ├─ index.astro,  [slug].astro,  kontakt.astro,  fagelskadning.astro,  personuppgifter-policy.astro
│  │  └─ [locale]/…                 # en + de, via getStaticPaths over routes.ts
│  └─ styles/global.css             # @import 'tailwindcss' + @theme tokens from design
└─ docs/
   ├─ project-plan.md               # this file
   └─ agent/{architecture,conventions,decisions,bugs,workflows,skills,context}.md
```

Baseline config copied from `astro-helensfotvard-se`: `astro.config.mjs` (svelte integration,
`@tailwindcss/vite`, `site:`, `inlineStylesheets: 'auto'`, `prefetch`), `svelte.config.js`,
`tsconfig.json` (`astro/tsconfigs/strict`), `.prettierrc` (4-space, single quotes, no trailing
comma, printWidth 100, the three plugins), Node 24 in CI.

Added on top: `i18n: { defaultLocale: 'sv', locales: ['sv','en','de'], routing: { prefixDefaultLocale: false } }`
and `@astrojs/sitemap`.

Icons: `@lucide/astro` / `@lucide/svelte`, replacing the five hand-rolled SVGs in the old
`static/icons/` (`bed → Bed`, `kitchen → CookingPot`, `shower → ShowerHead`, `swimming → Waves`).
The `iconName` keys in `houses.ts` stay as the mapping key.

---

## 4. Data model

`src/data/houses.ts` — locale-invariant. Changes from the current `data/houses.ts`:

- **Add `bookingUrl`** — currently hardcoded in the old `+page.server.ts`, missing from the data file entirely:

  | slug | Stugknuten |
  |---|---|
  | `grona-stugan` | `https://www.stugknuten.com/sv/stuga/13541` |
  | `vita-huset` | `https://www.stugknuten.com/sv/stuga/14199` |
  | `gula-stugan` | `https://www.stugknuten.com/sv/stuga/1692` |
  | `roda-stugan` | `https://www.stugknuten.com/sv/stuga/20992` |
  | `beiga-stugan` | `https://www.stugknuten.com/sv/stuga/9125` |

  Stored as the bare listing id, so the booking button can send a German visitor to the German
  listing rather than the Swedish one. ✅ **Verified 2026-09-09** — and Stugknuten translates the
  *path segment* as well as the prefix: `/sv/stuga/13541`, `/en/holiday-home/13541`,
  `/de/ferienhaus/13541`. `stugknutenUrl()` in `src/data/site.ts` holds the mapping (ADR-015).
- **Drop `name`, `shortDescription`, `description`** → move to `src/i18n/houses.*.ts`.
- **`images`** becomes `string[]` of file names; captions move to the i18n files, keyed by file name.
- **`info`** keeps `iconName` only; labels move to i18n.
- **`extraCosts`** keeps a stable `id`; `description` and `price` move to i18n (price strings are
  free text including currency, e.g. `2 000 kr / vecka`, and the currency word differs per locale).
- **Keep `id`** — used by nothing now, but it's the join key back to the old DB export if ever needed.

`src/data/site.ts` — owners (Helen and Lars Andersson), phones (`+46738101070` Helen,
`+46705859007` Lars), `kontakt@olandsstuguthyrning.com`, changeover day (Saturday), high season
definition (weeks 25–32), location (Löt, 10 km to Köpingsvik, 15 km to Borgholm), geo coordinates
for JSON-LD.

`src/i18n/houses.{sv,en,de}.ts` — `Record<slug, { name, shortDescription, description: string[],
imageCaptions: Record<filename, string>, infoLabels: Record<iconName, string>, extraCosts: Record<id, {description, price}> }>`.
Note `description` becomes a **`string[]` of paragraphs**, killing the old `\n`-escape /
`{@html …replace(/\\n/g, '<br />')}` hack and its XSS surface.

---

## 5. Assets

### 5.1 Inventory

56 files, 13 MB, all in the old repo's `static/uploads/images/`. Mostly 1920×1280.
Plus `static/Observerade-faglar-i-Lot.pdf` (343 KB) and 5 icon SVGs (replaced by lucide).

### 5.2 Rename map

Renamed to English kebab-case describing what the photo *shows* — derived from the existing
Swedish captions in `houses.ts`. English rather than Swedish because the captions are now
localized three ways, so the file name is a code-level identifier, not user-facing text.

**`houses/grona-stugan/`** (11) — `front.jpg → exterior-front.jpg` *(main)*, `GronaStugan-stugan.jpg → exterior-overview.jpg`,
`GronaStugan-matbord.jpg → dining-table.jpg`, `GronaStugan-kok.jpg → kitchen.jpg`,
`GronaStugan-vardagsrum.jpg → living-room.jpg`, `GronaStugan-rum.jpg → open-plan.jpg`,
`GronaStugan-badrum.jpg → bathroom.jpg`, `GronaStugan-sovrum.jpg → bedroom-singles.jpg`,
`GronaStugan-sovrum-2.jpg → bedroom-double.jpg`, `GronaStugan-altan-2.jpg → terrace.jpg`,
`GronaStugan-altan.jpg → terrace-view.jpg`

**`houses/vita-huset/`** (16) — `VitaHuset_utanfor-1.jpg → exterior.jpg` *(main)*,
`VitaHuset_gaststuga.jpg → guest-house.jpg`, `VitaHuset_sovrum.jpg → guest-house-bedroom.jpg`,
`VitaHuset_altan.jpg → terrace.jpg`, `VitaHuset_entre.jpg → back-entrance.jpg`,
`VitaHuset_entre_2.jpg → entrance.jpg`, `VitaHuset_vardagsrum.jpg → living-room.jpg`,
`VitaHuset_koket.jpg → kitchen.jpg`, `VitaHuset_koket_2.jpg → kitchen-2.jpg`,
`VitaHuset_matbord.jpg → dining-table.jpg`, `VitaHuset_overvaning.jpg → upstairs-hall.jpg`,
`VitaHuset_sovrum_2.jpg → bedroom-1.jpg`, `VitaHuset_sovrum_3.jpg → bedroom-2.jpg`,
`VitaHuset_sovrum_4.jpg → bedroom-3.jpg`, `VitaHuset_badrum.jpg → bathroom.jpg`,
`VitaHuset_barnsang.jpg → cot.jpg`

**`houses/gula-stugan/`** (10) — `20220424_103706.jpg → patio.jpg` *(main)*,
`GulaStugan_utanfor.jpg → terrace-garden.jpg`, `GulaStugan_altan.jpg → terrace-entrance.jpg`,
`20220424_103240.jpg → kitchen.jpg`, `20220424_100756.jpg → living-room.jpg`,
`20220424_100814.jpg → tv.jpg`, `20220424_100845.jpg → toilet.jpg`,
`20220424_101134.jpg → washing-machine.jpg`, `20220424_100949.jpg → bedroom-twin.jpg`,
`20220424_101041.jpg → bedroom.jpg`

**`houses/roda-stugan/`** (9) — `LillaRoedaStugan_altan.jpg → terrace.jpg` *(main)*,
`LillaRoedaStugan_utanfor.jpg → surroundings.jpg`, `LillaRoedaStugan_vardagsrum.jpg → living-room.jpg`,
`LillaRoedaStugan_sovloft.jpg → sleeping-loft.jpg`, `LillaRoedaStugan_sovrum.jpg → bedroom.jpg`,
`LillaRoedaStugan_hallen.jpg → open-plan.jpg`, `LillaRoedaStugan_koket.jpg → kitchenette.jpg`,
`LillaRoedaStugan_dusch.jpg → bathroom-shower.jpg`, `LillaRoedaStugan_toalett.jpg → bathroom-toilet.jpg`

**`houses/beiga-stugan/`** (7) — `DSC_0021.jpg → exterior.jpg` *(main)*, `DSC_0025.jpg → kitchen.jpg`,
`DSC_0029.jpg → dining-entrance.jpg`, `DSC_0024-scaled.jpg → living-room.jpg`,
`DSC_0007.jpg → bedroom-double.jpg`, `DSC_0015.jpg → bedroom-singles.jpg`, `DSC_0009.jpg → bathroom.jpg`

**Shared (3)** — `lars_helen.jpg → lars-och-helen.jpg`, `fagelskadning-lot.jpg → birdwatching-lot.jpg`,
`olandsstuguthyrning-logo.png → logo.png`

53 + 3 = 56. ✅

### 5.3 Resolver

`src/lib/images.ts` wraps `import.meta.glob<{default: ImageMetadata}>('/src/assets/images/houses/**/*.jpg', { eager: true })`
and exposes `getHouseImage(slug, filename): ImageMetadata`. **It throws at build time on a miss.**
This is the substitute for the link-checker that was scoped out (D13): the one bug class a
hand-edited data file reliably produces is a typo'd image path, and this turns it into a failed
build instead of a blank page — at the cost of about ten lines.

Rendering: `<Picture>` from `astro:assets`, AVIF + WebP, explicit `widths`/`sizes` per usage
(hero vs card vs gallery thumbnail), `loading="eager"` + `fetchpriority="high"` on the hero only.

### 5.4 Known image problem

**Gula stugan's entire photo set is 1024×768 phone shots** (one is 576×768), against 1920×1280
everywhere else. The old site stretched `20220424_103706.jpg` across a 1920-wide, 600-tall hero.
New photos have been requested from the owners (non-blocking). **Fallback if none arrive:** give
Gula stugan a constrained hero — letterboxed or reduced height — rather than full-bleed. This
constraint must be communicated to the design session.

---

## 6. Phases

### Phase 0 — Repo bootstrap ✅ *complete 2026-09-09*
- `git init`, `main`, `.gitignore`, create `github.com/Palkess/astro-olandsstuguthyrning-com`.
- Scaffold Astro 6 + `@astrojs/svelte` + `@tailwindcss/vite` + strict TS; copy config from `astro-helensfotvard-se`.
- `.github/workflows/deploy.yml`: checkout → Node 24 → `npm ci` → `astro check` → `astro build` → `upload-pages-artifact` → `deploy-pages`. Env: `PUBLIC_GTM_ID` repo variable.
- Enable Pages (source: GitHub Actions). Add DNS `new.olandsstuguthyrning.com` CNAME → `palkess.github.io` and set it as the Pages custom domain; `public/CNAME` matches. **No `base` in any environment** (D21).
- Docs skeleton: `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/agent/*`, this plan.
- ✅ **Done when:** a placeholder page is live on `https://new.olandsstuguthyrning.com` over HTTPS and a push redeploys it.

### Phase 1 — Data and assets ✅ *complete 2026-09-09*
- Copy 56 images from the old repo, rename per §5.2 into `src/assets/images/`.
- Copy `Observerade-faglar-i-Lot.pdf` to `public/` under its exact current name.
- Split `data/houses.ts` → `src/data/houses.ts` (invariant) + Swedish strings staged for `src/i18n/houses.sv.ts`. Add `bookingUrl`. Convert `description` to `string[]` paragraphs.
- Write `src/data/site.ts`.
- Write `src/lib/images.ts` with the build-time miss check.
- ✅ **Done when:** `astro check` passes, and a throwaway page rendering every image for every house builds green.

### Phase 2 — i18n foundation and copy ✅ *complete 2026-09-09*
- Astro `i18n` config; `src/i18n/routes.ts` slug map (`fagelskadning` / `birdwatching` / `vogelbeobachtung`; `personuppgifter-policy` / `privacy-policy` / `datenschutz`; `kontakt` / `contact` / `kontakt`).
- `ui.{sv,en,de}.ts` + `useTranslations()`.
- AI-draft `houses.en.ts` and `houses.de.ts` from the Swedish. **Jonas reviews English.** German kept short and factual.
- Rewrite the privacy policy text for all three locales: no personal data collected; cookies/analytics only; contact address.
- ✅ **Done when:** all three locale trees prerender with correct content and `hreflang` alternates.

### Phase 3 — Design session ✅ *complete 2026-09-09*
Brief: **[docs/design-brief.md](design-brief.md)**. All seven artboards delivered: tokens and
type scale, the component set with states, and home / cottage / kontakt / fågelskådning /
privacy at 1440 and 390.

Direction: *"Öland light, sand, timber, sea"* — limestone-warm neutrals, one deep sea blue doing
the work of link, button and focus ring, timber as a quiet second accent for icons and rules.
Newsreader for headings, Public Sans for everything else. Tokens are in `src/styles/global.css`
(ADR-012).

One thing in the artboards was deliberately **not** built: a per-amenity secondary detail line,
which would have meant inventing copy in three languages for content that doesn't exist. The
contact page's map tile *is* built, as a hand-drawn schematic SVG rather than an embed
(ADR-014).

### Phase 4 — Components ✅ *complete 2026-09-09*
Atoms/molecules/organisms per `docs/agent/architecture.md`. Four islands, no more (D10):
`Header.svelte` (`client:load`, dropdown + mobile menu + language switcher), `CookieConsent.svelte`
(`client:load`, the only thing that may load GTM), `Lightbox.svelte` (`client:visible`, native
`<dialog>` — written, not a port of the old vendored `svelte-lightbox`), `YouTubeFacade.svelte`
(`client:visible`, poster is the cottage's own photo so not even the thumbnail comes from Google).

~68 kB of JS uncompressed for the whole site.

### Phase 5 — Pages ✅ *complete 2026-09-09*
27 routes: `index`, `[slug]`, `kontakt`, `fagelskadning`, `personuppgifter-policy` × 3 locales.
Contact block (both phones + email) in the footer and on every cottage page — closing the D2 gap.

Route files are thin; the page bodies live in `src/components/pages/`. English and German share
one `[locale]/[slug].astro`, which takes the translated slugs from `routeSlugs` rather than
repeating them as file names.

### Phase 6 — SEO and analytics ✅ *complete 2026-09-10*
All of it built in `src/lib/seo.ts` and injected through `Layout.astro`, which already owned the
canonical, the `hreflang` alternates and the staging `noindex`.

- Per-cottage `VacationRental` JSON-LD and a `LodgingBusiness` node on each home page, the
  cottage pointing at the business rather than repeating it (ADR-016). `LodgingBusiness` is a
  subtype of the `LocalBusiness` this plan named, so nothing is lost.
- Occupancy and bedrooms had to become data: `sleeps` and `bedrooms` in `src/data/houses.ts`.
  The plan said "from `info`", but `info` had already become `amenities` — icon keys only, with
  the counts living as prose in `amenityLabels` ("6 bäddar"), which is unusable in structured
  data. `bedrooms` counts proper bedrooms only; sleeping lofts, sofa beds and Vita huset's guest
  house are in `sleeps` but not in `bedrooms`.
- The offer on each cottage points at its Stugknuten listing in the visitor's language, priced
  as a min/max over one week rather than a single figure (ADR-017).
- Per-cottage `og:image`, cropped to 1200×630 at build time, plus `og:image:alt` matching what
  the same photo is given on the page. Content pages share the site card.
- Sitemap alternates rebuilt from `routeSlugs` — `@astrojs/sitemap`'s own `i18n` option cannot
  pair translated slugs and was emitting asymmetric hreflang clusters (BUG-011, ADR-018).
- The one custom event: a delegated click listener pushes `stugknuten_click` with the cottage
  slug and locale. `window.dataLayer` only exists after consent, so the optional call is also
  the consent check — no consent, nothing sent.

**`PUBLIC_GTM_ID` is deliberately still unset** and will be added as a repository variable after
launch. Until then Rollup strips the GTM loader out of the bundle entirely, so the staging build
makes no third-party request under any circumstances. Setting the variable needs a rebuild.

### Phase 7 — Verify and review
Full build reviewed on `https://new.olandsstuguthyrning.com` by Jonas, then by Helen and Lars.
Sign-off on copy, prices, photos and design before any DNS change. **Confirm 2026 prices here**
(§7).

### Phase 8 — Cutover *(see runbook, §8)*

### Phase 9 — Decommission
1. **Take a full MSSQL backup first** (`db_export.sql` in the old repo contains only house
   content — no bookings, no users; if that history matters, it exists nowhere else).
2. Archive `Palkess/olandsstuguthyrning-svelte` (archive, don't delete — it holds the only
   record of the scraper and admin logic).
3. Disable the Azure Pipeline.
4. Shut down the IIS site and app pool, then the server/DB.

---

## 7. Accepted risks

- **Prices and descriptions ship as-is** from a DB export of unknown vintage (D19). Publishing
  stale 2026 prices under the owners' name is the exposure. Mitigation: ask them to confirm at
  the Phase 7 review, before cutover — it costs one message and removes the risk entirely.
- **Cleaning and linen fees are unpriced** — the descriptions say "kan beställas mot avgift"
  with no number, and only Vita huset has a priced `extraCost`. Unpriced fees are a common
  reason visitors bounce to a competitor. Not blocking; worth raising with the owners.
- **German copy ships unreviewed** (D16).
- **Owners lose self-service editing** (D4).
- **High season "v.25–32" is a hardcoded string.** Moving it to `site.ts` (§4) at least makes it
  one edit instead of a hunt.
- **The 2021 bird PDF may be stale.** Shipping as-is.
- **Two Vita huset photos share the caption "Gäststuga 2 bäddar".** Renamed distinctly in §5.2;
  captions to dedupe when the i18n files are written.

## 8. Cutover runbook

> ⚠️ **`kontakt@olandsstuguthyrning.com` is a live mailbox on this domain.** Change **only** the
> A/AAAA and `www` records. Do **not** touch MX, SPF, DKIM or DMARC records — moving the web
> host does not move the mail host, and a "clean up the DNS while I'm in here" instinct silently
> breaks their email with no error anywhere.

1. Confirm registrar/DNS provider and get access. *(Open question — unknown as of writing.)*
2. **Snapshot the current DNS zone** before changing anything. This is the rollback artifact.
3. In the repo: set `site` to `https://olandsstuguthyrning.com` in `astro.config.mjs`, change
   `public/CNAME` to `olandsstuguthyrning.com`, and update the `Sitemap:` line in
   `public/robots.txt`. Push. The `noindex` on staging lifts automatically once the hostname
   matches (`Layout.astro`).
4. Update the custom domain in the repo's Pages settings to the apex domain. *(This releases
   `new.olandsstuguthyrning.com` — a Pages site has only one custom domain at a time.)*
5. Lower TTL on the apex A/AAAA records to 300s and wait for the old TTL to expire.
6. Point apex A → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (AAAA → `2606:50c0:800{0,1,2,3}::153`); `www` CNAME → `palkess.github.io`.
7. Wait for GitHub to issue the Let's Encrypt certificate (minutes to a few hours), then enable
   **Enforce HTTPS**.
8. Verify: all three locales load over HTTPS; the `noindex` tag is **gone**; every Stugknuten
   link resolves; sitemap and robots serve; **send a test email to `kontakt@` and confirm it
   arrives**.
9. Restore normal TTLs. Remove the now-unused `new.` CNAME record.
10. Submit the sitemap in Search Console.

**Rollback:** revert the A/AAAA records to the snapshot from step 2. The IIS box stays running
until Phase 9, so rollback is a DNS change and nothing more.

---

## 9. Open questions / owner inputs

| Item | Who | Blocking? |
|---|---|---|
| Registrar / DNS provider access | Owners or Jonas | **Phase 0** — now needed for the staging CNAME too |
| GTM container access for `GTM-M436Z79H` | Jonas | No — `PUBLIC_GTM_ID` is set after launch |
| New Gula stugan photos | Owners | No — fallback in §5.4 |
| Confirm 2026 prices and fee amounts | Owners | No (D19) — but ask at Phase 7 review |
| Is the 2021 bird list current? | Owners | No |
| Favicon / logo | Owners or a designer | No — placeholder mark in place, BUG-008 |
| A home-page hero photograph | Owners | No — first cottage's exterior stands in, BUG-007 |
| A landscape bird/alvar photograph | Owners | No — the bird-list photo stands in, BUG-009 |
| Confirm the birdwatching travel times | Owners | No — estimated from distances, BUG-010 |

## 10. Bugs inherited from the old site (fix, don't reproduce)

- `src/app.html` sets `lang="en"` on an entirely Swedish site. → `lang` per locale.
- House descriptions rendered via `{@html house.description.replace(/\\n/g, '<br />')}`.
  → paragraphs array, no `@html`.
- Contact details (both phone numbers, `kontakt@`) exist only inside commented-out markup, so
  the live site offers no way to reach the owners. → D2.
- Google Fonts loaded from a CSS `@import` with a standing `TODO: Download the fonts and host
  them locally`. → self-host, or `preload`+`onload` as in `astro-helensfotvard-se`.
- Privacy policy describes data collection that will not happen. → D3.
