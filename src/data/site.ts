/**
 * Locale-invariant site-wide facts: who runs it, how to reach them, where it is.
 *
 * Anything with a language in it (opening prose, the season *label*, page titles)
 * belongs in `src/i18n/ui.*.ts` instead.
 */

export const site = {
    name: 'Ölands Stuguthyrning',
    domain: 'olandsstuguthyrning.com',

    owners: ['Helen Andersson', 'Lars Andersson'],

    /** Rendered from `tel` (E.164) and displayed as `display`. */
    phones: [
        { name: 'Helen', tel: '+46738101070', display: '073 – 810 10 70' },
        { name: 'Lars', tel: '+46705859007', display: '070 – 585 90 07' }
    ],

    email: 'kontakt@olandsstuguthyrning.com',

    /** Saturday. Used for the "bytesdag" line on every cottage page. */
    changeoverWeekday: 6,

    /** High season is weeks 25–32 inclusive. */
    highSeason: { fromWeek: 25, toWeek: 32 },

    /**
     * Shown on the privacy policy. Bump it in the same commit as any change to
     * `privacy.sections` in `src/i18n/ui.*.ts` — a policy dated before its own
     * text is worse than one with no date.
     */
    privacyLastUpdated: '2026-09-09',

    location: {
        village: 'Löt',
        island: 'Öland',
        region: 'Kalmar län',
        country: 'SE',
        distancesKm: { kopingsvik: 10, borgholm: 15, beach: 2 },
        /** Approximate — Löt, eastern Öland. Used for LocalBusiness JSON-LD. */
        geo: { latitude: 56.9333, longitude: 16.7667 }
    },

    social: {
        youtubeChannel: null
    }
} as const;

/**
 * Stugknuten listing URL for a cottage, in the visitor's language.
 *
 * Stugknuten translates the *path segment* as well as the locale prefix, so the
 * three URLs for one cottage are `/sv/stuga/13541`, `/en/holiday-home/13541`
 * and `/de/ferienhaus/13541`. Getting only the prefix right yields a 404 on the
 * single link this whole site exists to deliver — verified by hand, 2026-09-09.
 */
const stugknutenPaths = {
    sv: 'stuga',
    en: 'holiday-home',
    de: 'ferienhaus'
} as const;

export function stugknutenUrl(stugknutenId: string, locale: string): string {
    const stugknutenLocale = locale === 'de' ? 'de' : locale === 'en' ? 'en' : 'sv';
    return `https://www.stugknuten.com/${stugknutenLocale}/${stugknutenPaths[stugknutenLocale]}/${stugknutenId}`;
}
