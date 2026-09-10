# Architectural Decisions

## When to consult this file
When making or evaluating an architectural or design choice, or when tempted to reverse
something that looks arbitrary. Full rationale for each is in
[../project-plan.md](../project-plan.md) §2.

---

## ADR-001 — Static brochure site, no backend
**Decision:** No database, admin panel, auth, email, scraper, availability calendar or booking
form. All booking goes to Stugknuten.
**Why:** The predecessor had all of it, but the booking form and calendar were already commented
out in production. The rewrite deletes dead code rather than removing working features.
**Consequence:** GitHub Pages is viable. No server, no secrets, no attack surface.

## ADR-002 — GitHub Pages + GitHub Actions
**Decision:** Replaces IIS on Windows Server + Azure Pipelines.
**Consequence:** No server-side redirects are possible, so existing URLs must be preserved
exactly rather than redirected (see ADR-006).

## ADR-003 — Content edited via git, no CMS
**Decision:** The developer edits TypeScript files and pushes.
**Why:** For 5 cottages whose prices change roughly annually, a CMS costs more than it saves.
**Consequence:** Owners lose self-service editing. Revisit if edit requests become frequent.

## ADR-004 — Locale-invariant data split from translations
**Decision:** `src/data/houses.ts` holds slugs, prices, image file names, ids. All prose lives
in `src/i18n/houses.{sv,en,de}.ts`, keyed by the same identifiers.
**Why:** Nothing is duplicated across locales except actual text, so adding a photo cannot leave
the languages structurally out of sync.
**Rejected:** inline `{sv,en,de}` fields (file triples in size); Paraglide (long prose in JSON
message files is unpleasant to edit).

## ADR-005 — Language switcher, no auto-detection
**Decision:** Swedish unprefixed, `/en/` and `/de/` prefixed, chosen explicitly by the visitor.
**Why:** A static host can only detect language in client-side JS, which means a redirect —
flash-of-wrong-language for users and a real risk of bouncing crawlers. `hreflang` does the job
for search engines.

## ADR-006 — All existing URLs preserved
**Decision:** `/`, `/{cottage-slug}`, `/fagelskadning`, `/personuppgifter-policy` map 1:1 from
the old site. Cottage slugs stay Swedish in every locale; content-page slugs are translated.
**Why:** GitHub Pages cannot redirect. Preserving is the only cheap option.

## ADR-007 — Images through `astro:assets`, validated at build
**Decision:** Photos live in `src/assets/images/houses/<slug>/`, resolved by
`src/lib/images.ts`, which throws at module load if a referenced file is missing or an on-disk
file is referenced by nothing.
**Why:** The project deliberately has no link checker (ADR-008). A typo'd image path is the one
bug a hand-edited data file reliably produces, and this converts it from a silent blank into a
failed build for about ten lines of code.

## ADR-008 — Minimal quality gates
**Decision:** Prettier + `astro check` in CI. No ESLint, no unit tests, no E2E.
**Why:** 8 routes of static content. Strict TS plus `astro check` covers the real risk.
**Revisit if:** the site grows interactive features beyond the four islands.

## ADR-009 — Four Svelte islands only
**Decision:** Lightbox gallery, cookie consent, header/language switcher, YouTube facade.
Everything else is static HTML.
**Why:** Astro ships zero JS by default; each island must earn its bytes. The YouTube facade in
particular avoids ~1 MB of player per cottage page and stops a third-party embed loading before
consent.

## ADR-010 — Astro 7, not Astro 6
**Decision:** Astro 7 + `@astrojs/svelte` 9, though the sibling repo `astro-helensfotvard-se`
pins Astro 6 + `@astrojs/svelte` 8.
**Why:** Greenfield repo; integration majors pair cleanly with Astro majors. The project plan
was written saying "Astro 6" only because that's what the sibling repo had.

## ADR-011 — Custom domain in every environment, no `base` path
**Decision:** Staging is served from `new.olandsstuguthyrning.com` (CNAME → `palkess.github.io`,
set as the Pages custom domain) rather than the `palkess.github.io/<repo>/` project-pages URL.
`astro.config.mjs` therefore sets no `base`.
**Why:** A `base` prefix would have existed only until cutover, while creating a persistent
class of bugs in anything that bypasses `routeHref()`/`houseHref()` — meta tags, `og:image`
URLs, hrefs inside Svelte islands. Staging on a real HTTPS domain is also a much better thing to
put in front of Helen and Lars than a github.io path.
**Consequence:** Requires one DNS record for the subdomain (apex and MX untouched). Staging
pages are `noindex`ed via hostname so they cannot compete with the live site in search.
**Reverses:** the original plan's "verify on *.github.io" step (D11).

## ADR-012 — Design tokens in `@theme`, fonts self-hosted
**Decision:** The phase 3 design session's palette ships as semantic CSS custom properties in
`src/styles/global.css` (`surface`, `card`, `text-heading`, `accent`, `timber`, `border`,
`focus`, `scrim`…), in oklch, with a clamped type scale. Newsreader (headings) and Public Sans
(body) are served from `public/fonts/` as variable woff2, latin + latin-ext subsets.
**Why:** Semantic names mean a colour change is one line, not a search-and-replace across
components. Self-hosting closes the old site's standing `TODO: Download the fonts and host them
locally` and — more importantly — means the site makes **no third-party request at all** before
cookie consent, which is what the privacy policy claims.
**Consequence:** ~160 kB of font over the wire on first load (latin only; latin-ext never
fetches for sv/en/de). Italics are not shipped — no content uses them.
**Don't:** add a one-off hex in a component. If a colour isn't a token, that's a token decision.

## ADR-013 — Gallery thumbnails are static; the lightbox attaches to them
**Decision:** `CottageGallery.astro` renders every thumbnail as server-side `<Picture>` markup
inside `<button>` elements; `Lightbox.svelte` (`client:visible`) finds that grid by id and
delegates clicks from it.
**Why:** The obvious alternative — rendering the grid inside the Svelte island — would keep the
photos out of the HTML, which costs image indexing and shows nothing without JS. This way the
photos are always there and only the *enlarging* needs JS.
**Consequence:** the island takes a `containerId` rather than the thumbnails as props, and the
full-size variants are generated with `getImage()` at build time and passed in as plain data.

## ADR-014 — The contact map is a hand-drawn SVG, never an embed
**Decision:** `LocationMap.astro` draws Öland, Kalmarsund, the mainland and Löt as inline SVG,
styled with the `@theme` tokens. No Google, Mapbox or Leaflet, and no raster tile export.
**Why:** A map embed is a third-party request on page load, on the page whose neighbour is a
privacy policy promising we make none — and a tile export is still someone else's copyrighted
image, needing attribution the design has no room for. Inline SVG costs zero requests, scales,
and recolours with the palette.
**Consequence:** It is a *diagram*, not a survey map. The coastline is simplified and there is
no scale, because at whole-island zoom the 2 / 10 / 15 km figures in the distances panel are all
the same dot — the caption says "schematic" in all three locales so nobody navigates by it. Its
labels are proper nouns spelt identically in sv/en/de, so only the `alt` text is translated.
**Supersedes:** the original "no map at all" decision, which was made because no asset existed.
Drawing one turned out to be cheaper than sourcing one.
**Don't:** reach for a tile provider the next time a map is wanted. Extend the SVG.

## ADR-015 — Stugknuten's path segment is translated, not just its locale prefix
**Decision:** `stugknutenUrl()` maps each locale to both a prefix and a path segment:
`/sv/stuga/<id>`, `/en/holiday-home/<id>`, `/de/ferienhaus/<id>`.
**Why:** The plan assumed only the prefix changed. It doesn't, and the wrong segment 404s — on
the outbound click that is the entire point of the site. Verified against the live listings.
**Consequence:** adding a locale means adding its Stugknuten segment, not just its prefix. The
mapping is a `const` beside the function so the two can't drift.

## ADR-016 — `LodgingBusiness` and `VacationRental`, not bare `LocalBusiness`
**Decision:** The home page carries a `LodgingBusiness` node; each cottage page carries a
`VacationRental` node pointing back at it with `parentOrganization`. Both are built in
`src/lib/seo.ts` and injected by `Layout.astro`.
**Why:** The plan said "LocalBusiness". `LodgingBusiness` is a subtype of it, so nothing that
understands `LocalBusiness` loses anything, and it says what the business actually is.
`VacationRental` is in turn a `LodgingBusiness`, which is why a cottage can point at the
business node instead of repeating its address, phones and geo five times per locale.
**Consequence:** occupancy and bedroom counts had to become data (`sleeps` / `bedrooms` in
`src/data/houses.ts`) — they previously existed only as prose in `amenityLabels` ("6 bäddar"),
which is unusable in structured data and differs per locale.
**Don't:** invent a value to fill a recommended field. Bathroom counts, check-in times and
ratings are all absent because the content does not state them, and a machine-read guess is
never proofread by anyone.

## ADR-017 — The offer in a cottage's JSON-LD points at Stugknuten
**Decision:** `offers.url` on each `VacationRental` is that cottage's Stugknuten listing, in the
visitor's language, not the page it appears on. The price is a min/max `UnitPriceSpecification`
over a one-week reference quantity, not a single `price`.
**Why:** This site never takes a booking (ADR-001). An offer whose URL leads to a page with no
way to accept it is a lie told to a machine. And both price tiers are real, so a single figure
would be wrong for half the year.

## ADR-018 — Sitemap alternates are built from `routeSlugs`, not by `@astrojs/sitemap`
**Decision:** `astro.config.mjs` passes a `serialize` hook that derives each URL's `hreflang`
links from `alternatePaths()` in `src/i18n/routes.ts`. The plugin's own `i18n` option is not
used.
**Why:** That option pairs locales by matching the path *after* the locale prefix. Cottage slugs
are identical in every language so they paired fine; every content page has a translated slug
(D17) and did not. The result was not merely incomplete but wrong: `/kontakt/` advertised
Swedish and German alternates and no English one, while `/en/contact/` was left with none at
all. Asymmetric hreflang annotations are a documented way to have the whole cluster ignored.
**Consequence:** `src/i18n/routes.ts` gained `localePath()` / `matchRoute()` / `alternatePaths()`
— pure functions with no imports, which is what makes the file safe to read from the config,
where `astro:i18n` does not yet exist. `routeHref()` remains what pages use; the two must keep
emitting the same paths, trailing slash included.

## How to contribute to this file
Add an ADR when you add or replace a library, make a non-obvious architectural choice, or
reverse a previous decision. Record the rationale, not just the outcome.
