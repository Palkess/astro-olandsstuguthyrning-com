<script lang="ts">
    /**
     * Cookie consent — one of the four islands (ADR-009), and the only thing on
     * the site that may load Google Tag Manager.
     *
     * GTM is injected **only** after an explicit accept. Declining, or ignoring
     * the banner, means no GTM script, no analytics cookie and no request to
     * Google at all — the site sets nothing but this one preference key itself.
     * Keep it that way; `docs/agent/context.md` treats it as a business rule,
     * and the privacy policy states it as fact.
     */
    import { onMount } from 'svelte';

    interface Props {
        heading: string;
        body: string;
        accept: string;
        decline: string;
        readMore: string;
        privacyHref: string;
    }

    const { heading, body, accept, decline, readMore, privacyHref }: Props = $props();

    const STORAGE_KEY = 'analytics-consent';
    const gtmId = import.meta.env.PUBLIC_GTM_ID;

    let visible = $state(false);

    function loadGtm() {
        if (!gtmId || document.getElementById('gtm-script')) return;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

        const script = document.createElement('script');
        script.id = 'gtm-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
        document.head.appendChild(script);
    }

    function choose(consent: 'granted' | 'denied') {
        try {
            localStorage.setItem(STORAGE_KEY, consent);
        } catch {
            /* Private mode, storage disabled — the choice just isn't remembered. */
        }
        visible = false;
        if (consent === 'granted') loadGtm();
    }

    onMount(() => {
        let stored: string | null = null;
        try {
            stored = localStorage.getItem(STORAGE_KEY);
        } catch {
            /* See above. */
        }

        if (stored === 'granted') loadGtm();
        else if (stored !== 'denied') visible = true;
    });
</script>

{#if visible}
    <div
        class="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5"
        role="dialog"
        aria-modal="false"
        aria-label={heading}>
        <div
            class="border-border-strong bg-card shadow-banner rounded-card mx-auto flex max-w-[1100px]
                flex-col gap-5 border p-5 sm:flex-row sm:items-center">
            <p class="text-small m-0 flex-1">
                {body}
                <a href={privacyHref} class="text-accent hover:text-accent-hover">{readMore}</a>
            </p>
            <div class="flex flex-col gap-2.5 sm:flex-row">
                <button
                    type="button"
                    onclick={() => choose('granted')}
                    class="bg-accent text-accent-contrast hover:bg-accent-hover rounded-button
                        text-small px-5 py-4 font-semibold">
                    {accept}
                </button>
                <button
                    type="button"
                    onclick={() => choose('denied')}
                    class="border-border-strong text-text-heading hover:bg-surface-sunken
                        rounded-button text-small border-[1.5px] px-[18px] py-[14px] font-semibold">
                    {decline}
                </button>
            </div>
        </div>
    </div>
{/if}
