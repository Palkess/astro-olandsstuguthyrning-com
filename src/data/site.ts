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
 * NOTE: the `/en/` and `/de/` paths are assumed but UNVERIFIED — see
 * docs/project-plan.md §9. If Stugknuten does not serve them, change
 * `stugknutenLocale` to always return 'sv'.
 */
export function stugknutenUrl(stugknutenId: string, locale: string): string {
    const stugknutenLocale = locale === 'de' ? 'de' : locale === 'en' ? 'en' : 'sv';
    return `https://www.stugknuten.com/${stugknutenLocale}/stuga/${stugknutenId}`;
}
