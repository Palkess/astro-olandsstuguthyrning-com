/**
 * i18n helpers.
 *
 * Always build internal links with `routeHref` / `houseHref` rather than writing
 * paths by hand: they route through Astro's `getRelativeLocaleUrl`, which applies
 * both the locale prefix and the `base` path. That makes the cutover from
 * `palkess.github.io/astro-olandsstuguthyrning-com/` to `olandsstuguthyrning.com`
 * a one-line change in `astro.config.mjs` (plan §8).
 */

import { getRelativeLocaleUrl } from 'astro:i18n';

import type { HouseSlug } from '../data/houses';
import {
    defaultLocale,
    localeTags,
    locales,
    routeSlugs,
    type Locale,
    type RouteKey
} from './routes';
import type { HouseText, HouseTexts } from './types';

import { uiSv, type UiStrings } from './ui.sv';
import { uiEn } from './ui.en';
import { uiDe } from './ui.de';

import { housesSv } from './houses.sv';
import { housesEn } from './houses.en';
import { housesDe } from './houses.de';

const uiByLocale: Record<Locale, UiStrings> = { sv: uiSv, en: uiEn, de: uiDe };
const housesByLocale: Record<Locale, HouseTexts> = { sv: housesSv, en: housesEn, de: housesDe };

export function useTranslations(locale: Locale): UiStrings {
    return uiByLocale[locale];
}

export function getHouseText(locale: Locale, slug: HouseSlug): HouseText {
    return housesByLocale[locale][slug];
}

/** Replaces `{name}` placeholders. `interpolate('Bild {n}', { n: 3 })`. */
export function interpolate(template: string, values: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (match, key: string) =>
        key in values ? String(values[key]) : match
    );
}

/**
 * URL for a route in a given locale.
 * `routeHref('de', 'birdwatching')` → `/base/de/vogelbeobachtung`
 * `routeHref('en', 'cottage', 'grona-stugan')` → `/base/en/grona-stugan`
 */
export function routeHref(locale: Locale, key: RouteKey, param?: string): string {
    const segment = routeSlugs[key][locale];
    const path = [segment, param].filter((part): part is string => Boolean(part)).join('/');
    return getRelativeLocaleUrl(locale, path);
}

export function houseHref(locale: Locale, slug: HouseSlug): string {
    return routeHref(locale, 'cottage', slug);
}

export interface AlternateLink {
    locale: Locale;
    /** `hreflang` value. */
    hreflang: string;
    href: string;
}

/**
 * `hreflang` alternates for a page, for every locale plus `x-default` (Swedish).
 * `href` values are relative; the Layout resolves them against `Astro.site`.
 */
export function alternateLinks(key: RouteKey, param?: string): AlternateLink[] {
    const alternates = locales.map((locale) => ({
        locale,
        hreflang: localeTags[locale],
        href: routeHref(locale, key, param)
    }));

    return [
        ...alternates,
        {
            locale: defaultLocale,
            hreflang: 'x-default',
            href: routeHref(defaultLocale, key, param)
        }
    ];
}

export { defaultLocale, localeNames, localeTags, locales, isLocale } from './routes';
export type { Locale, RouteKey } from './routes';
export type { HouseText, HouseTexts } from './types';
export type { UiStrings } from './ui.sv';
