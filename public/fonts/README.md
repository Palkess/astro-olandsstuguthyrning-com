# Self-hosted fonts

- **Newsreader** — headings. SIL Open Font License 1.1.
  https://fonts.google.com/specimen/Newsreader
- **Public Sans** — body and UI. SIL Open Font License 1.1.
  https://fonts.google.com/specimen/Public+Sans

Both are variable-weight woff2 files as served by Google Fonts, split into the
`latin` and `latin-ext` unicode subsets. They are hosted here rather than loaded
from `fonts.gstatic.com` so the site makes **no third-party request before
cookie consent** — the old site's `@import` from Google Fonts carried a standing
`TODO: Download the fonts and host them locally`, and this is that TODO closed.

Italics are deliberately not shipped: no content on the site uses them, and the
Newsreader italic file is another 100 kB.

To update, download the woff2 files linked from the Google Fonts CSS API for the
`latin` and `latin-ext` subsets and replace them under the same names. The
`@font-face` rules live in `src/styles/global.css`.
