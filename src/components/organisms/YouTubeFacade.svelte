<script lang="ts">
    /**
     * Poster-first YouTube embed — one of the four islands (ADR-009).
     *
     * Nothing is requested from Google until the visitor clicks: no iframe, no
     * ~1 MB player, no third-party cookie set before consent. The poster is the
     * cottage's own photograph, optimized by `astro:assets` and passed in as a
     * slot, so even the thumbnail is a first-party request — `i.ytimg.com`
     * would be a Google connection on page load, which is exactly what this
     * component exists to avoid.
     */
    import { Play } from '@lucide/svelte';

    interface Props {
        videoId: string;
        /** Full accessible name, e.g. "Spela upp videon om Gröna stugan". */
        playLabel: string;
        /** Short caption shown on the poster, e.g. "Spela film". */
        playCaption: string;
        children?: import('svelte').Snippet;
    }

    const { videoId, playLabel, playCaption, children }: Props = $props();

    let playing = $state(false);
</script>

<div class="rounded-card relative aspect-video overflow-hidden">
    {#if playing}
        <iframe
            src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0"
            title={playLabel}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen
            class="absolute inset-0 h-full w-full border-0">
        </iframe>
    {:else}
        <button
            type="button"
            onclick={() => (playing = true)}
            aria-label={playLabel}
            class="group absolute inset-0 block h-full w-full cursor-pointer p-0">
            {@render children?.()}
            <span class="bg-scrim absolute inset-0"></span>
            <span
                class="absolute inset-0 flex flex-col items-center justify-center gap-2.5
                    text-white">
                <span
                    class="bg-card group-hover:bg-accent flex size-16 items-center justify-center
                        rounded-full transition-colors">
                    <Play
                        size={24}
                        class="text-text-heading group-hover:text-accent-contrast ml-1"
                        fill="currentColor"
                        aria-hidden="true" />
                </span>
                <span class="text-small font-semibold">{playCaption}</span>
            </span>
        </button>
    {/if}
</div>
