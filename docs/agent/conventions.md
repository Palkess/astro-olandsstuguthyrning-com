# Conventions

## When to consult this file
When writing, editing, or reviewing code.

---

## Formatting

Prettier, config in `.prettierrc`: **4 spaces**, single quotes, no trailing commas, print width
100, `bracketSameLine`. Run `npm run format`. Do not hand-format against it.

## TypeScript

`astro/tsconfigs/strict`. No `any`. Prefer union literal types over `string` for closed sets —
`HouseSlug` and `AmenityIcon` exist so a typo is a type error.

## The data / i18n split

The single most important convention here.

- **`src/data/`** — anything a human never reads: slugs, ids, prices, file names, icon keys.
- **`src/i18n/`** — anything a human reads, in all three locales.

If you find yourself putting a Swedish string in `src/data/`, or a price in `src/i18n/`, stop.

Adding a cottage photo:
1. File → `src/assets/images/houses/<slug>/descriptive-name.jpg`
2. File name → `images` array in `src/data/houses.ts`
3. Caption → `imageCaptions` in **all three** `src/i18n/houses.*.ts`

Miss step 3 in one locale and TypeScript won't catch it (the type is `Record<string, string>`),
but the caption renders empty. Miss step 1 or 2 and the build fails loudly.

## Image file names

English, kebab-case, describing **what the photo shows** (`bedroom-double.jpg`, not
`DSC_0021.jpg`). They are identifiers, not user-facing text — the user-facing text is the
localized caption.

## Links

Always `routeHref(locale, key, param?)` or `houseHref(locale, slug)`. Never a string literal
path, never `import.meta.env.BASE_URL` by hand.

## Text with structure

Multi-paragraph copy is `string[]`, one entry per paragraph, rendered as `<p>` elements. The old
site stored `\n` escapes and rendered them via `{@html …replace(…)}` — do not reintroduce that
pattern. **No `set:html` on content that came from the data files.**

## Interpolation

Strings with placeholders use `{name}` and go through `interpolate()`. Don't concatenate
translated fragments — word order differs between Swedish, English and German.

## Icons

`@lucide/astro` in `.astro`, `@lucide/svelte` in islands. The `AmenityIcon` keys
(`bed`/`kitchen`/`shower`/`swimming`) map to lucide components in one place; add new amenities
there.

## Astro vs Svelte

Default to `.astro`. Reach for `.svelte` only when the component needs client-side state, and
then give it the narrowest `client:` directive that works.

## Styling

Tailwind 4, tokens in `@theme` in `src/styles/global.css` (ADR-012). Use the semantic token
utilities — `bg-surface`, `text-text-muted`, `border-border`, `text-h2`, `rounded-card` — not raw
values. A colour that isn't a token is a token discussion, not an arbitrary-value class.

Two custom pieces worth knowing:

- **`nav:`** is a custom breakpoint at 1100px. The desktop navigation collapses there rather than
  at `lg`, because the German labels are ~30% longer than the Swedish and the design chose the
  mobile menu over compressing them.
- **The type scale clamps.** `text-display`, `text-h1`, `text-h2` and `text-lead` interpolate
  between the 390px and 1440px artboards, so headings size themselves — don't add responsive
  font-size utilities on top.

## Anti-patterns

- Hand-written internal paths (breaks the cutover)
- `set:html` / `@html` on data-file content
- A Swedish string outside `src/i18n/`
- Adding an island for something CSS can do
- Changing `roda-stugan`'s slug to match its name (breaks inbound links — see context.md)
- A one-off colour, radius or font size instead of a token (see Styling above)
- Loading anything third-party outside the consent island

## How to contribute to this file
Add a convention when you agree on a new pattern or reject an existing one. Include the reason.
