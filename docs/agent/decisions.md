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

## How to contribute to this file
Add an ADR when you add or replace a library, make a non-obvious architectural choice, or
reverse a previous decision. Record the rationale, not just the outcome.
