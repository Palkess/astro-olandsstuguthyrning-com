/**
 * Structured data and social-card images — everything a search engine or a link
 * preview reads but a visitor never sees.
 *
 * Two rules govern what goes in here:
 *
 * 1. **Only assert what the content already says.** Occupancy and bedroom
 *    counts come from `src/data/houses.ts`; prices, geo and contact details from
 *    `src/data/site.ts`. Nothing is invented to fill a recommended field — a
 *    plausible-looking wrong number in JSON-LD is worse than an absent one,
 *    because it is machine-read and never proofread.
 * 2. **Localize what a human will see.** Names and descriptions come from
 *    `src/i18n/`, so the German result page quotes German copy. Identifiers,
 *    amenity keys and currency codes stay invariant.
 *
 * The builders take `Astro.site` rather than reading it themselves, so they stay
 * plain functions and the cutover to the apex domain (plan §8) reaches them for
 * free.
 */

import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

import { houses, type AmenityIcon, type House } from '../data/houses';
import { site, stugknutenUrl } from '../data/site';
import { getHouseImage } from './images';
import { getHouseText, routeHref, useTranslations } from '../i18n';
import { localeTags, type Locale } from '../i18n/routes';

/** A JSON-LD node. Deliberately loose — schema.org shapes vary per type. */
export type JsonLd = Record<string, unknown>;

/** Facebook/LinkedIn/Slack all crop to roughly 1.91:1; this is that. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * The three aspect ratios Google asks for in listing structured data. The hero
 * is cropped rather than letterboxed, which is why `position: 'center'` matters:
 * a cottage exterior shot survives a centre crop, a top-left one does not.
 *
 * Gula stugan's hero is 1024×768 (BUG-003), so its 1200-wide crops are a mild
 * upscale. Acceptable for a preview card; it resolves itself when the owners
 * send the replacement photos.
 */
const SCHEMA_IMAGE_SIZES = [
    { width: 1200, height: 900 },
    { width: 1200, height: 675 },
    { width: 1200, height: 1200 }
] as const;

async function crop(image: ImageMetadata, width: number, height: number): Promise<string> {
    const result = await getImage({
        src: image,
        width,
        height,
        format: 'jpeg',
        fit: 'cover',
        position: 'center'
    });
    return result.src;
}

/** Root-relative path to a cottage's social card. The Layout absolutizes it. */
export function houseOgImage(house: House): Promise<string> {
    return crop(
        getHouseImage(house.slug, house.mainImage),
        OG_IMAGE_SIZE.width,
        OG_IMAGE_SIZE.height
    );
}

/**
 * The site-wide social card. Uses the same photo as the home hero — the first
 * cottage's exterior — because the asset set still has no establishing shot of
 * the place (BUG-007). Replace both in the same commit when one arrives.
 */
export function siteOgImage(): Promise<string> {
    return houseOgImage(houses[0]);
}

/**
 * `Astro.site` is typed `URL | undefined` because a project need not set one.
 * This one does, and structured data is meaningless without absolute URLs — so
 * a missing `site` fails the build here rather than shipping relative `@id`s,
 * the same bargain `src/lib/images.ts` strikes for a typo'd photo.
 */
function requireOrigin(origin: URL | undefined): URL {
    if (!origin) {
        throw new Error(
            'astro.config.mjs must set `site`: structured data and social cards ' +
                'need absolute URLs (src/lib/seo.ts).'
        );
    }
    return origin;
}

/**
 * Alt text for the cards, matching what the same photograph is given on the
 * page itself — a preview and the page it previews should not describe the
 * picture differently.
 */
export function houseOgImageAlt(house: House, locale: Locale): string {
    const text = getHouseText(locale, house.slug);
    return text.imageCaptions[house.mainImage] ?? text.name;
}

export function siteOgImageAlt(locale: Locale): string {
    return houseOgImageAlt(houses[0], locale);
}

function absolute(path: string, origin: URL): string {
    return new URL(path, origin).href;
}

/** Stable `@id` for the business node, so cottage nodes can point back at it. */
function businessId(origin: URL): string {
    return absolute('/#business', origin);
}

function postalAddress(): JsonLd {
    return {
        '@type': 'PostalAddress',
        addressLocality: site.location.village,
        addressRegion: site.location.region,
        addressCountry: site.location.country
    };
}

function geoCoordinates(): JsonLd {
    return {
        '@type': 'GeoCoordinates',
        latitude: site.location.geo.latitude,
        longitude: site.location.geo.longitude
    };
}

/**
 * Amenity keys that describe the *property*. `bed` is occupancy and is modelled
 * as `occupancy`; `swimming` is a distance to a beach two kilometres away, which
 * is a fact about Löt rather than a feature of the cottage. Neither belongs in
 * `amenityFeature`, so neither is listed here.
 *
 * Names are invariant English: `amenityFeature.name` is a machine-facing label,
 * and the localized version ("Dusch & tvättmaskin") is already on the page.
 */
const amenityFeatureNames: Partial<Record<AmenityIcon, string>> = {
    kitchen: 'Kitchen',
    shower: 'Shower'
};

function amenityFeatures(house: House): JsonLd[] {
    return house.amenities
        .map((amenity) => amenityFeatureNames[amenity])
        .filter((name): name is string => Boolean(name))
        .map((name) => ({
            '@type': 'LocationFeatureSpecification',
            name,
            value: true
        }));
}

/**
 * `LodgingBusiness` rather than the plainer `LocalBusiness` the plan named: it
 * is a subtype of it, so nothing that understands `LocalBusiness` is lost, and
 * it says what the business actually does (ADR-016).
 */
export async function businessSchema(locale: Locale, origin: URL | undefined): Promise<JsonLd> {
    const base = requireOrigin(origin);
    const t = useTranslations(locale);

    const lowest = Math.min(...houses.map((house) => house.pricePerWeekLowSeason));
    const highest = Math.max(...houses.map((house) => house.pricePerWeekHighSeason));

    return {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        '@id': businessId(base),
        name: site.name,
        description: t.meta.homeDescription,
        url: absolute(routeHref(locale, 'home'), base),
        image: absolute(await siteOgImage(), base),
        telephone: site.phones.map((phone) => phone.tel),
        email: site.email,
        address: postalAddress(),
        geo: geoCoordinates(),
        numberOfRooms: houses.length,
        priceRange: `${lowest}–${highest} SEK`,
        currenciesAccepted: 'SEK',
        /* Helen and Lars speak Swedish and English, not German — see the note on
           the booking band in CottagePage.astro. Saying so here is the same
           courtesy, aimed at anything that reads the page instead of it. */
        knowsLanguage: ['sv', 'en'],
        inLanguage: localeTags[locale]
    };
}

/**
 * One cottage. `VacationRental` is a `LodgingBusiness`, which is why the cottage
 * points at the site-wide business node with `parentOrganization` rather than
 * repeating its details.
 */
export async function cottageSchema(
    house: House,
    locale: Locale,
    origin: URL | undefined
): Promise<JsonLd> {
    const base = requireOrigin(origin);
    const text = getHouseText(locale, house.slug);
    const canonical = absolute(routeHref(locale, 'cottage', house.slug), base);
    const hero = getHouseImage(house.slug, house.mainImage);

    const images = await Promise.all(
        SCHEMA_IMAGE_SIZES.map(async (size) =>
            absolute(await crop(hero, size.width, size.height), base)
        )
    );

    return {
        '@context': 'https://schema.org',
        '@type': 'VacationRental',
        '@id': `${canonical}#rental`,
        name: text.name,
        description: text.shortDescription,
        url: canonical,
        inLanguage: localeTags[locale],
        image: images,
        address: postalAddress(),
        geo: geoCoordinates(),
        telephone: site.phones.map((phone) => phone.tel),
        parentOrganization: { '@id': businessId(base) },
        containsPlace: {
            '@type': 'Accommodation',
            occupancy: {
                '@type': 'QuantitativeValue',
                value: house.sleeps,
                unitText: 'guests'
            },
            numberOfBedrooms: house.bedrooms,
            amenityFeature: amenityFeatures(house)
        },
        /*
         * The offer's `url` is Stugknuten's, not ours: this site never takes a
         * booking, and pointing the offer at a page with no way to accept it
         * would be a lie told to a machine.
         *
         * Prices are per week and both tiers are real, so they go in as a
         * min/max range over a one-week reference quantity rather than as a
         * single `price` that would be wrong half the year.
         */
        offers: {
            '@type': 'Offer',
            url: stugknutenUrl(house.stugknutenId, locale),
            priceCurrency: 'SEK',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                priceCurrency: 'SEK',
                minPrice: house.pricePerWeekLowSeason,
                maxPrice: house.pricePerWeekHighSeason,
                referenceQuantity: {
                    '@type': 'QuantitativeValue',
                    value: 1,
                    unitCode: 'WEE'
                }
            }
        }
    };
}
