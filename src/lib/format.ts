/**
 * Locale-aware formatting for the handful of numbers and dates on the site.
 *
 * Prices are stored as plain integers in `src/data/houses.ts`; the currency
 * *word* lives in `src/i18n/ui.*.ts` (`'{price} kr'` / `'SEK {price}'` /
 * `'{price} SEK'`) because its position differs per language. This module only
 * groups the digits — 5000 → `5 000` (sv), `5,000` (en), `5.000` (de).
 */

import { localeTags, type Locale } from '../i18n/routes';

export function formatNumber(value: number, locale: Locale): string {
    return new Intl.NumberFormat(localeTags[locale]).format(value);
}

export function formatDate(isoDate: string, locale: Locale): string {
    return new Intl.DateTimeFormat(localeTags[locale], {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(`${isoDate}T00:00:00Z`));
}
