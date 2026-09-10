/**
 * Locale-invariant cottage data.
 *
 * All human-readable text (names, descriptions, image captions, amenity labels,
 * extra-cost wording) lives in `src/i18n/houses.{sv,en,de}.ts`, keyed by the same
 * slugs, file names and ids used here. Nothing but actual prose is duplicated
 * per locale, so adding a photo cannot drift the languages out of sync.
 *
 * Source: MSSQL export of the old site (`db_export.sql`), tables `Houses`,
 * `HouseImages`, `HouseInfo`, `ExtraCosts`. Booking ids were hardcoded in the
 * old `src/routes/(public)/[house_slug]/+page.server.ts`.
 */

export type HouseSlug =
    'grona-stugan' | 'vita-huset' | 'gula-stugan' | 'roda-stugan' | 'beiga-stugan';

/** Amenity icon keys — mapped to lucide icons in the amenity component. */
export type AmenityIcon = 'bed' | 'kitchen' | 'shower' | 'swimming';

export interface House {
    /** Primary key from the old database. Kept as the join key back to the export. */
    id: number;
    slug: HouseSlug;
    /** File name inside `src/assets/images/houses/<slug>/`. Also used as the hero. */
    mainImage: string;
    /** Gallery file names, in display order. */
    images: string[];
    youtubeId: string;
    pricePerWeekLowSeason: number;
    pricePerWeekHighSeason: number;
    amenities: AmenityIcon[];
    /**
     * Total sleeping places, including sofa beds, sleeping lofts and — for Vita
     * huset — the guest house. Matches the `bed` amenity label in every locale
     * ("6 bäddar", "6 + 2 bäddar"), which is prose and therefore unusable in
     * JSON-LD. Read as `occupancy` by the structured data (src/lib/seo.ts).
     */
    sleeps: number;
    /**
     * Proper bedrooms only. Sleeping lofts, sofa beds and Vita huset's separate
     * guest house are counted in `sleeps` but not here, because calling a loft a
     * bedroom in structured data overstates the cottage to a search engine.
     */
    bedrooms: number;
    /** Ids resolved to localized description/price in `src/i18n/houses.*.ts`. */
    extraCostIds: string[];
    /**
     * Stugknuten listing id. The full URL is built per locale by
     * `stugknutenUrl()` — a German visitor should not land on a Swedish
     * booking page.
     */
    stugknutenId: string;
}

export const houses: House[] = [
    {
        id: 1,
        slug: 'grona-stugan',
        mainImage: 'exterior-front.jpg',
        images: [
            'dining-table.jpg',
            'kitchen.jpg',
            'living-room.jpg',
            'open-plan.jpg',
            'bathroom.jpg',
            'bedroom-singles.jpg',
            'bedroom-double.jpg',
            'terrace.jpg',
            'terrace-view.jpg',
            'exterior-overview.jpg'
        ],
        youtubeId: 'kAT5dGG0rTQ',
        pricePerWeekLowSeason: 5000,
        pricePerWeekHighSeason: 8000,
        amenities: ['bed', 'kitchen', 'shower', 'swimming'],
        sleeps: 6,
        bedrooms: 2,
        extraCostIds: [],
        stugknutenId: '13541'
    },
    {
        id: 2,
        slug: 'vita-huset',
        mainImage: 'exterior.jpg',
        images: [
            'guest-house.jpg',
            'guest-house-bedroom.jpg',
            'terrace.jpg',
            'back-entrance.jpg',
            'entrance.jpg',
            'living-room.jpg',
            'kitchen.jpg',
            'kitchen-2.jpg',
            'dining-table.jpg',
            'upstairs-hall.jpg',
            'bedroom-3.jpg',
            'bedroom-2.jpg',
            'bathroom.jpg',
            'cot.jpg',
            'bedroom-1.jpg'
        ],
        youtubeId: 'DmhWUs0OBT4',
        pricePerWeekLowSeason: 5000,
        pricePerWeekHighSeason: 8000,
        amenities: ['bed', 'kitchen', 'shower', 'swimming'],
        sleeps: 8,
        bedrooms: 3,
        extraCostIds: ['guest-house-beds'],
        stugknutenId: '14199'
    },
    {
        id: 3,
        slug: 'gula-stugan',
        mainImage: 'patio.jpg',
        images: [
            'terrace-garden.jpg',
            'terrace-entrance.jpg',
            'patio.jpg',
            'kitchen.jpg',
            'living-room.jpg',
            'tv.jpg',
            'toilet.jpg',
            'washing-machine.jpg',
            'bedroom-twin.jpg',
            'bedroom.jpg'
        ],
        youtubeId: 'OGWso8iQgzE',
        pricePerWeekLowSeason: 5000,
        pricePerWeekHighSeason: 7000,
        amenities: ['bed', 'kitchen', 'shower', 'swimming'],
        sleeps: 4,
        bedrooms: 2,
        extraCostIds: [],
        stugknutenId: '1692'
    },
    {
        id: 4,
        slug: 'roda-stugan',
        mainImage: 'terrace.jpg',
        images: [
            'surroundings.jpg',
            'living-room.jpg',
            'sleeping-loft.jpg',
            'bedroom.jpg',
            'open-plan.jpg',
            'kitchenette.jpg',
            'bathroom-shower.jpg',
            'bathroom-toilet.jpg'
        ],
        youtubeId: 'UvzNnW6JB5k',
        pricePerWeekLowSeason: 5000,
        pricePerWeekHighSeason: 7000,
        amenities: ['bed', 'kitchen', 'shower', 'swimming'],
        sleeps: 4,
        bedrooms: 1,
        extraCostIds: [],
        stugknutenId: '20992'
    },
    {
        id: 5,
        slug: 'beiga-stugan',
        mainImage: 'exterior.jpg',
        images: [
            'kitchen.jpg',
            'dining-entrance.jpg',
            'living-room.jpg',
            'bedroom-double.jpg',
            'bedroom-singles.jpg',
            'bathroom.jpg'
        ],
        youtubeId: 'j96t5YgFT2Y',
        pricePerWeekLowSeason: 5000,
        pricePerWeekHighSeason: 8000,
        amenities: ['bed', 'kitchen', 'shower', 'swimming'],
        sleeps: 6,
        bedrooms: 2,
        extraCostIds: [],
        stugknutenId: '9125'
    }
];

export const houseSlugs = houses.map((house) => house.slug);

export function getHouseBySlug(slug: string): House | undefined {
    return houses.find((house) => house.slug === slug);
}
