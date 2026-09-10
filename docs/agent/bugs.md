# Known Issues

## When to consult this file
When debugging, investigating unexpected behaviour, or before "fixing" something that looks
wrong on purpose.

---

## Open

### BUG-001 — Cottage prices are of unknown vintage
`pricePerWeekLowSeason` / `pricePerWeekHighSeason` in `src/data/houses.ts` came from an MSSQL
export of the old site, dated unknown. They have **not** been confirmed with the owners.
**Accepted deliberately** (plan D19) — the site ships with them.
**Action:** confirm with Helen and Lars at the pre-cutover review. Real prices for a real
business; being wrong here is the highest-consequence content error on the site.

### BUG-002 — Cleaning and linen fees are unpriced
Several cottage descriptions say "slutstädning kan beställas mot avgift" and "sänglinne och
handdukar kan hyras" with no amount. Only Vita huset has a priced `extraCost`. Unpriced fees are
a common reason visitors abandon a rental listing.
**Status:** raised, not resolved. Needs numbers from the owners.

### BUG-003 — Gula stugan's photos are low resolution
Its entire gallery, including the hero (`patio.jpg`), is 1024×768 phone photography; one image
is 576×768. Every other cottage is 1920×1280. Its social card and JSON-LD images are cropped
from the same file, so they upscale slightly too (`src/lib/seo.ts`).
**Resolution:** high-resolution replacements will be supplied before launch, so the design
assumes full-bleed heroes for every cottage. The earlier letterboxed-hero workaround is
**withdrawn** — do not build it.
**Status:** open until the new files land. If launch approaches without them, reopen this
decision rather than shipping a stretched 1024px hero.

### BUG-004 — German copy is unreviewed
`src/i18n/*.de.ts` is AI-drafted and ships without native review (plan D16). Kept deliberately
short and factual to limit the damage.
**Action:** hand these two files to a German speaker if one becomes available.

### BUG-006 — The 2021 bird list may be stale
`public/Observerade-faglar-i-Lot.pdf` and the accompanying photo are from 2021.
**Status:** shipping as-is; ask the owners whether a newer list exists.

### BUG-009 — The birdwatching hero is a photo of the bird list, not of birds
`birdwatching-lot.jpg` is a photograph of the printed species list. The design asked for a
landscape shot — alvar at dawn — and the asset set has none. Related to [BUG-007]; same ask,
same owners.
**Action:** request one wide bird or alvar photograph from Helen and Lars.

### BUG-010 — Birdwatching travel times are estimates, not confirmed
`birdwatching.body` in `src/i18n/ui.*.ts` quotes "a quarter of an hour" to Mittlandsskogen,
"just under an hour" to Beijershamn and "about an hour and a half" to Ottenby. These were
derived from map distances during the phase 3 design write-up, not from the owners, and were
already rounded upward once from the design's more optimistic figures.
**Action:** confirm with Helen and Lars — they drive these roads. Cheap to check, and a guest
who plans a dawn trip around a wrong number will not be pleased.

### BUG-007 — There is no home-page hero photograph
The home hero uses the **first cottage's** exterior shot (`houses[0].mainImage`), read from the
data rather than hard-coded, because the asset set contains no wide establishing photo of the
place — the old site had none either.
**Action:** ask the owners for one landscape shot of the village or a cottage in evening light
at 1920×1280 or better, drop it in `src/assets/images/`, and import it directly in
`HomePage.astro`. Until then this is a deliberate stand-in, not an oversight.

### BUG-008 — The favicon is a placeholder
`public/favicon.svg` is a plain gable mark drawn from the design tokens. The phase 3 design
session did not produce a favicon or a logo treatment, and `logo.png` from the old site is a
raster wordmark that does not reduce to 16px.
**Action:** replace when a real mark exists. `docs/project-plan.md` §9 tracks it.

---

## Fixed

### BUG-005 — Stugknuten locale URLs were wrong for en and de *(fixed 2026-09-09)*
`stugknutenUrl()` translated only the locale prefix, producing `/en/stuga/<id>` and
`/de/stuga/<id>`. Stugknuten translates the **path segment** too: the real URLs are
`/sv/stuga/<id>`, `/en/holiday-home/<id>` and `/de/ferienhaus/<id>`. Every English and German
visitor was being sent to a 404 on the single link this site exists to deliver. Found in manual
review; all 15 URLs verified against the built HTML.

### BUG-011 — `@astrojs/sitemap`'s `i18n` option mispaired the translated slugs *(fixed 2026-09-10)*
The plugin pairs locales by matching the path after the locale prefix, which only works when the
slug is the same in every language. Cottage slugs are (D17); content-page slugs are not. The
sitemap therefore told Google that `/kontakt/` had Swedish and German versions and no English
one, and listed `/en/contact/` with no alternates at all — an asymmetric hreflang cluster, which
is worse than declaring none. Found while verifying phase 6 output, not by any tool.
**Fixed by** a `serialize` hook driven by `routeSlugs` (ADR-018). All 27 URLs now carry a
complete, self-referencing set of three. **Don't** go back to the `i18n` option.

### `client:visible` on the lightbox never hydrated *(fixed 2026-09-09)*
`Lightbox.svelte` renders only a closed `<dialog>`. Astro's `client:visible` observes the
island's children, a `display: none` element never intersects, so the island never hydrated and
**every gallery thumbnail was inert** — with no error anywhere. Now `client:idle`. Don't change
it back; see architecture.md.

## Fixed (inherited from the old site — do not reintroduce)

- **`lang="en"` on a Swedish site.** The old `src/app.html` hardcoded it. The Layout now sets
  `lang` from the page locale.
- **`{@html description.replace(/\\n/g, '<br />')}`.** Descriptions were single strings with
  literal `\n` escapes rendered through `@html`. They are now `string[]` paragraphs rendered as
  `<p>`. No `set:html` on data-file content.
- **Contact details invisible.** Both phone numbers and `kontakt@olandsstuguthyrning.com`
  existed only inside commented-out markup, so the live site offered no way to reach the owners.
  They are now in `src/data/site.ts` and surfaced in the footer, on cottage pages, and on
  `/kontakt`.
- **Privacy policy described data collection that doesn't happen.** Rewritten to cover only
  cookies/analytics and phone/email contact. Keep it true — if a form is ever added, the policy
  changes in the same commit.
- **Duplicate image captions.** The export had three photos captioned "Sovrum 2 bäddar" in Vita
  huset, two "Gäststuga 2 bäddar", and two "Badrum" in Lilla röda huset. Deduped in
  `houses.sv.ts` and carried through to en/de.

---

## How to contribute to this file
Add an entry when you discover a bug (even unfixed), add a workaround (so nobody removes it
later not knowing why), or fix something listed here. **The most common mistake is fixing a bug
or adding a workaround without recording it.**
