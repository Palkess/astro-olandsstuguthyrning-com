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
is 576×768. Every other cottage is 1920×1280. A full-bleed hero will look visibly worse for this
one cottage.
**Workaround if no reshoot arrives:** give Gula stugan a constrained (letterboxed or
reduced-height) hero rather than full-bleed. This constraint must reach the design session.
**Status:** new photos requested from the owners.

### BUG-004 — German copy is unreviewed
`src/i18n/*.de.ts` is AI-drafted and ships without native review (plan D16). Kept deliberately
short and factual to limit the damage.
**Action:** hand these two files to a German speaker if one becomes available.

### BUG-005 — Stugknuten locale URLs unverified
`stugknutenUrl()` in `src/data/site.ts` assumes Stugknuten serves `/en/stuga/<id>` and
`/de/stuga/<id>` alongside `/sv/`. **This has not been checked.** If it doesn't, non-Swedish
visitors hit a 404 on the one link that matters most.
**Action:** verify before launch. Fallback: make the function always return `sv`.

### BUG-006 — The 2021 bird list may be stale
`public/Observerade-faglar-i-Lot.pdf` and the accompanying photo are from 2021.
**Status:** shipping as-is; ask the owners whether a newer list exists.

---

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
