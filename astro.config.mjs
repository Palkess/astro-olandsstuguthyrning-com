// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { alternatePaths } from './src/i18n/routes';

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
        /*
         * The alternates are built from `routeSlugs` rather than by the plugin's
         * own `i18n` option, which pairs locales by matching the path *after*
         * the prefix. That works for the cottages, whose slug is the same in
         * every language, and quietly fails for every content page: it left
         * `/en/contact/` with no alternates at all while telling Google that
         * `/kontakt/` had only Swedish and German versions. Asymmetric hreflang
         * annotations are worse than none.
         *
         * `src/i18n/routes.ts` imports nothing, which is what makes it safe to
         * read from here — the config runs before `astro:i18n` exists.
         */
        sitemap({
            serialize(item) {
                const links = alternatePaths(new URL(item.url).pathname).map((alternate) => ({
                    lang: alternate.lang,
                    url: new URL(alternate.path, site).href
                }));

                return links.length > 0 ? { ...item, links } : item;
            }
        })
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
