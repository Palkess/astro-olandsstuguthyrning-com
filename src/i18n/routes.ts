/**
 * Locale routing table.
 *
 * Swedish is the default locale and is NOT prefixed, so every URL the old site
 * had survives unchanged (plan D12/D17). Content pages get translated slugs;
 * cottages keep their Swedish slugs in every locale, because visitors arrive
 * having seen "Gröna stugan" on Stugknuten — `/en/the-green-cottage` would be
 * worse than useless to them.
 */

export const locales = ['sv', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sv';

/** Language names, each written in its own language, for the switcher. */
export const localeNames: Record<Locale, string> = {
    sv: 'Svenska',
    en: 'English',
    de: 'Deutsch'
};

/** `hreflang` values. */
export const localeTags: Record<Locale, string> = {
    sv: 'sv-SE',
    en: 'en',
    de: 'de'
};

export type RouteKey = 'home' | 'cottage' | 'birdwatching' | 'privacy' | 'contact';

/** Path segment per route per locale. `home` and `cottage` have no segment of their own. */
export const routeSlugs: Record<RouteKey, Record<Locale, string>> = {
    home: { sv: '', en: '', de: '' },
    cottage: { sv: '', en: '', de: '' },
    birdwatching: { sv: 'fagelskadning', en: 'birdwatching', de: 'vogelbeobachtung' },
    privacy: { sv: 'personuppgifter-policy', en: 'privacy-policy', de: 'datenschutz' },
    contact: { sv: 'kontakt', en: 'contact', de: 'kontakt' }
};

export function isLocale(value: string | undefined): value is Locale {
    return locales.includes(value as Locale);
}
