/**
 * Resolves the image file names in `src/data/houses.ts` to `ImageMetadata`
 * for `astro:assets`.
 *
 * Why this exists: the plan scopes out a link checker (D13), and the one bug a
 * hand-edited data file reliably produces is a typo'd image path — which would
 * otherwise render a blank gallery slot with no warning. `validateHouseImages()`
 * runs at module load, so a bad path fails the BUILD instead.
 *
 * Shared, non-cottage images (lars-och-helen.jpg, birdwatching-lot.jpg, logo.png)
 * are imported directly where they're used — there's no lookup to get wrong.
 */

import type { ImageMetadata } from 'astro';
import { houses } from '../data/houses';

const HOUSE_IMAGE_ROOT = '/src/assets/images/houses';

const houseImages = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/images/houses/**/*.{jpg,jpeg,png}',
    { eager: true }
);

function keyFor(slug: string, fileName: string): string {
    return `${HOUSE_IMAGE_ROOT}/${slug}/${fileName}`;
}

export function getHouseImage(slug: string, fileName: string): ImageMetadata {
    const module = houseImages[keyFor(slug, fileName)];

    if (!module) {
        const available = Object.keys(houseImages)
            .filter((key) => key.startsWith(`${HOUSE_IMAGE_ROOT}/${slug}/`))
            .map((key) => `  - ${key.split('/').pop()}`)
            .sort()
            .join('\n');

        throw new Error(
            `Image not found: ${keyFor(slug, fileName)}\n` +
                `Referenced from src/data/houses.ts.\n` +
                `Available images for "${slug}":\n${available || '  (none — is the folder missing?)'}`
        );
    }

    return module.default;
}

/** Every gallery image for a cottage, in the order declared in the data file. */
export function getHouseGallery(slug: string, fileNames: string[]): ImageMetadata[] {
    return fileNames.map((fileName) => getHouseImage(slug, fileName));
}

/**
 * Fails the build if any file name in `houses.ts` has no matching asset, or if
 * an asset on disk is referenced by nothing (usually a rename that was only
 * half-applied).
 */
function validateHouseImages(): void {
    const referenced = new Set<string>();
    const errors: string[] = [];

    for (const house of houses) {
        for (const fileName of [house.mainImage, ...house.images]) {
            const key = keyFor(house.slug, fileName);
            referenced.add(key);
            if (!houseImages[key]) {
                errors.push(`  missing asset: ${key}`);
            }
        }
    }

    for (const key of Object.keys(houseImages)) {
        if (!referenced.has(key)) {
            errors.push(`  orphaned asset (on disk, referenced by nothing): ${key}`);
        }
    }

    if (errors.length > 0) {
        throw new Error(`House image validation failed (src/lib/images.ts):\n${errors.join('\n')}`);
    }
}

validateHouseImages();
