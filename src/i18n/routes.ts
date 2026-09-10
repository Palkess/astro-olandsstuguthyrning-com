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

/**
 * Path for a route, built without `astro:i18n`.
 *
 * `routeHref()` in `./index.ts` is what pages use and stays the canonical
 * helper — it goes through `getRelativeLocaleUrl`, so it would also apply a
 * `base` if one were ever added (ADR-011). This twin exists because
 * `astro.config.mjs` needs the same paths while building the sitemap, and the
 * config is evaluated before `astro:i18n` exists. Keep the two in agreement:
 * both emit a trailing slash, matching what the build writes to disk.
 */
export function localePath(locale: Locale, key: RouteKey, param?: string): string {
    const prefix = locale === defaultLocale ? '' : `/${locale}`;
    const path = [routeSlugs[key][locale], param].filter(Boolean).join('/');
    return path ? `${prefix}/${path}/` : `${prefix}/`;
}

/**
 * The reverse: which route a built URL path belongs to, so the sitemap can pair
 * `/fagelskadning/` with `/en/birdwatching/`. Returns `null` for anything not
 * produced by this site's routing table.
 */
export function matchRoute(pathname: string): { key: RouteKey; param?: string } | null {
    const segments = pathname.split('/').filter(Boolean);
    const [first, ...rest] = segments;

    const locale = isLocale(first) ? first : defaultLocale;
    const tail = isLocale(first) ? rest : segments;

    if (tail.length === 0) return { key: 'home' };
    if (tail.length > 1) return null;

    const [segment] = tail;

    for (const key of ['birdwatching', 'privacy', 'contact'] as const) {
        if (routeSlugs[key][locale] === segment) return { key };
    }

    /* Cottage slugs are identical in every locale, so anything left is one. */
    return { key: 'cottage', param: segment };
}

/**
 * Every localized URL for the page at `pathname`, as `hreflang` → path. Used by
 * the sitemap's `serialize` hook; the pages build their own from
 * `alternateLinks()`.
 */
export function alternatePaths(pathname: string): { lang: string; path: string }[] {
    const route = matchRoute(pathname);
    if (!route) return [];

    return locales.map((locale) => ({
        lang: localeTags[locale],
        path: localePath(locale, route.key, route.param)
    }));
}
