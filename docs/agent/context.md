# Domain Context

## When to consult this file
When interpreting domain terms, Swedish content, or business rules. Not needed for purely
technical tasks.

---

## What the site does

Ölands Stuguthyrning presents five holiday cottages in **Löt**, on the eastern side of central
Öland, Sweden. Run by **Helen and Lars Andersson**, who have rented them out for over 20 years.
Lars built and renovated them himself (formerly Spångebro Bygg AB).

**The site takes no bookings.** Every cottage page ends in a link to that cottage's listing on
**Stugknuten**, a Swedish rental aggregator, which owns availability, pricing enforcement and
the booking transaction. This site is a second way in — a richer, better-photographed shop
window than the aggregator listing.

The predecessor site *did* have booking requests, an admin panel and a Stugknuten scraper, but
the booking form was already commented out in production before the rewrite. None of it carried
over.

## Swedish terminology

| Swedish | English | Notes |
|---|---|---|
| Stuga / Stugor | Cottage / Cottages | The core entity |
| Uthyrning | Rental | "stuguthyrning" = cottage rental |
| Bytesdag | Changeover day | Always Saturday |
| Lågsäsong / Högsäsong | Low / high season | High season = weeks 25–32 |
| Slutstädning | Final cleaning | Offered "mot avgift" — for a fee |
| Sänglinne | Bed linen | Available to hire |
| Bädd / Bäddar | Bed / Beds | "6 bäddar" = sleeps 6 |
| Altan | Terrace / deck | |
| Sovloft | Sleeping loft | |
| Fågelskådning | Birdwatching | Route `/fagelskadning` |
| Personuppgifter | Personal data | Privacy policy route |

UI text is Swedish, English and German. Code identifiers are English.

## The five cottages

| Slug | Name | Sleeps | Stugknuten |
|---|---|---|---|
| `grona-stugan` | Gröna stugan | 6 | 13541 |
| `vita-huset` | Vita huset | 6 + 2 | 14199 |
| `gula-stugan` | Gula stugan | 4 | 1692 |
| `roda-stugan` | **Lilla röda huset** | 4 | 20992 |
| `beiga-stugan` | Beiga stugan | 6 | 9125 |

⚠️ `roda-stugan`'s slug does not match its name. This is deliberate — the slug is inherited from
the old site and kept so inbound links survive. Do not "fix" it.

## Business rules

- **Changeover is Saturday to Saturday.**
- **Two price tiers**: low season, and high season = **weeks 25–32** (`site.highSeason`).
- Prices are per week, in SEK, and are **real prices for a real business** — see bugs.md for
  their provenance and staleness risk.
- Final cleaning and linen hire are offered but **unpriced** in the source content.
- Pets are not allowed at Vita huset, Gula stugan, Lilla röda huset or Beiga stugan.
  Gröna stugan's description doesn't say. Smoking indoors is banned where stated.

## GDPR

The site targets Swedish/EU visitors. Google Tag Manager loads **only** after explicit opt-in
via the cookie banner. Never load GTM or any analytics unconditionally. The site itself collects
no personal data — there are no forms — and the privacy policy says so; keep it true.

## How to contribute to this file

Update when a business rule changes, a new cottage is added, a new external integration appears,
or Swedish content appears whose meaning isn't obvious. Focus on knowledge that would otherwise
produce technically correct but semantically wrong output.
