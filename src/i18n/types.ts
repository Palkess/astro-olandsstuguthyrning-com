import type { AmenityIcon, HouseSlug } from '../data/houses';

export interface HouseText {
    name: string;
    shortDescription: string;
    /**
     * One entry per paragraph. The old site stored these as a single string with
     * literal `\n` escapes and rendered them through
     * `{@html description.replace(/\\n/g, '<br />')}` — an XSS surface for no
     * reason. Paragraphs are structure, so they're modelled as structure.
     */
    description: string[];
    /** Keyed by image file name exactly as declared in `src/data/houses.ts`. */
    imageCaptions: Record<string, string>;
    amenityLabels: Record<AmenityIcon, string>;
    /** Keyed by the ids in `House.extraCostIds`. Price is free text incl. currency. */
    extraCosts: Record<string, { description: string; price: string }>;
}

export type HouseTexts = Record<HouseSlug, HouseText>;
