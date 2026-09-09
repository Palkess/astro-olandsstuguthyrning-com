// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ---------------------------------------------------------------------------
// STAGING — served from https://new.olandsstuguthyrning.com (a CNAME to
// palkess.github.io, set as the Pages custom domain). Because there IS a custom
// domain, the site serves from the domain root and needs no `base`.
//
// At cutover (docs/project-plan.md §8): change `site` to the apex domain and
// update `public/CNAME` to match. Nothing else. The Layout keys `noindex` off
// this hostname, so the staging copy stops being noindexed automatically.
// ---------------------------------------------------------------------------
const site = 'https://new.olandsstuguthyrning.com';

// https://astro.build/config
export default defineConfig({
    site,

    i18n: {
        defaultLocale: 'sv',
        locales: ['sv', 'en', 'de'],
        routing: {
            // Swedish stays unprefixed so existing inbound links survive (plan D14/D17).
            prefixDefaultLocale: false
        }
    },

    integrations: [
        svelte(),
        sitemap({ i18n: { defaultLocale: 'sv', locales: { sv: 'sv-SE', en: 'en', de: 'de' } } })
    ],

    build: {
        inlineStylesheets: 'auto'
    },

    vite: {
        plugins: [tailwindcss()],
        resolve: {
            noExternal: ['@lucide/svelte']
        }
    },

    prefetch: {
        prefetchAll: true
    }
});
