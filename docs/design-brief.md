# Design brief — Ölands Stuguthyrning

The brief for **phase 3** of [the project plan](project-plan.md): a separate Claude design
session produces the visual design, and phases 4–5 build components against it.

Everything below the line is written to be **self-contained** — paste it into a fresh session
with no access to this repo. Keep it that way when editing: if you add a constraint, restate the
context it depends on rather than pointing at another file.

**Deliberately omitted:** Gula stugan's photos are currently 1024×768 against 1920×1280
everywhere else. High-resolution replacements are expected before launch, so the brief assumes
full-bleed heroes throughout. If those files don't arrive, reopen
[BUG-003](agent/bugs.md) rather than shipping a stretched hero.

---

Design a website for Ölands Stuguthyrning, a family-run holiday cottage rental
on the island of Öland, Sweden. Use the design skill to produce a canvas.

THE BUSINESS
Helen and Lars Andersson have rented out five cottages in the village of Löt,
on the eastern side of central Öland, for over 20 years. Lars built and
renovated every one of them himself (he previously ran a construction company).
That craftsmanship and longevity is the brand — this is not a corporate rental
operator, it's two people who built the houses their guests stay in.

THE SITE'S ONE JOB
It does not take bookings. Booking happens on Stugknuten, a Swedish rental
aggregator. This site is a second, better shop window whose only conversion is
the click through to a cottage's Stugknuten listing. That CTA must be the most
prominent element on a cottage page — visible without scrolling, and repeated
once further down. Do NOT design a booking form, a calendar, or an availability
view; none will be built.

THE FIVE COTTAGES
  Gröna stugan      sleeps 6      5 000–8 000 kr/week
  Vita huset        sleeps 6 + 2  5 000–8 000 kr/week  (+2 000 kr/week for the
                                  guest house's 2 extra beds)
  Gula stugan       sleeps 4      5 000–7 000 kr/week
  Lilla röda huset  sleeps 4      5 000–7 000 kr/week
  Beiga stugan      sleeps 6      5 000–8 000 kr/week

Two price tiers: low season, and high season = weeks 25–32. Changeover is
Saturday to Saturday. Löt is 10 km from Köpingsvik, 15 km from Borgholm, 2 km
from the nearest beach.

CONTENT PER COTTAGE
- One hero photo, plus a gallery of 6–15 photos, all 3:2 landscape at 1920×1280
- Four amenity facts with icons: beds ("6 bäddar"), fully equipped kitchen,
  shower & washing machine, distance to the beach
- A price panel: low season, high season (weeks 25–32 needs explaining), and
  for Vita huset one extra cost line
- 3–4 paragraphs of description
- One YouTube video, shown as a click-to-play poster, not an embedded player
- Standing notes: Saturday changeover, "directions given on booking"

PAGES TO DESIGN (mobile 390px and desktop 1440px for each)
1. Home — hero, a welcome section with a photo of Helen and Lars, a banner
   promoting the birdwatching page, and the list of five cottages
2. Cottage detail — the most important screen by far
3. Contact — two phone numbers, an email address, where the cottages are
4. Birdwatching — Öland is one of Sweden's best birding regions and the
   cottages sit in the middle of it; a short intro, a photo, and a PDF download
   of birds observed locally
5. Privacy policy — a plain text page, but it should not look abandoned

COMPONENTS TO DESIGN, WITH STATES
- Header: logo, nav, a dropdown listing the five cottages, a language switcher,
  and a mobile menu
- Footer: contact details, cottage links, privacy link
- Cottage card (used on the home page list)
- Amenity row, price panel, primary/secondary buttons
- Gallery thumbnail grid + full-screen lightbox (with close, next, previous,
  and an image counter)
- YouTube click-to-play poster
- Cookie consent banner — two choices, "allow analytics" and "essential only"

HARD CONSTRAINTS
- Three languages: Swedish (default), English, German. German UI labels run
  roughly 30% longer than Swedish — nothing may depend on a short label fitting.
  The language switcher is explicit; there is no auto-detection.
- Deliver the palette as semantic design tokens suitable for Tailwind 4 CSS
  custom properties (e.g. surface, card, text-heading, text-body, text-muted,
  accent, accent-contrast) — not as one-off hex values per component.
- WCAG 2.2 AA contrast throughout, including text over photography.
- Built in Astro with only four interactive islands (header, lightbox, video
  poster, cookie banner). Everything else is static HTML, so avoid designs that
  imply scroll-driven animation, carousels, or filtering.
- Mobile-first. Much of the audience browses on phones, often on poor rural
  connections, so favour designs that stay legible with fewer, larger images.
- Photography is the product. The layout's job is to get out of its way.

DIRECTION
Coastal, warm, unpretentious — Öland light, sand, timber, sea. The previous site
paired a bright corporate blue (#005be3) with a liver brown and it never cohered;
feel free to depart from it entirely. Aim for calm and trustworthy rather than
trendy. The visitors are largely Swedish and German families booking a summer
week, not a design-conscious city audience.

DELIVERABLES
Artboards for all five pages at both breakpoints, the component set with its
states, and the token palette plus a type scale.
