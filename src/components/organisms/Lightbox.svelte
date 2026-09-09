<script lang="ts">
    /**
     * Full-screen gallery viewer — one of the four islands (ADR-009).
     *
     * The thumbnails themselves are NOT in here: they are rendered statically by
     * `CottageGallery.astro` with `<Picture>`, so every photo is in the HTML for
     * crawlers and for anyone without JS. This component only attaches to that
     * grid and opens over it, which is why it takes a `containerId` rather than
     * the thumbnails as props.
     *
     * Uses a native `<dialog>`: the browser gives us the focus trap, the
     * backdrop, Escape-to-close and inertness of the page behind for free.
     * Written rather than ported — the old site vendored `svelte-lightbox`,
     * which predates all of that.
     */
    import { ChevronLeft, ChevronRight, X } from '@lucide/svelte';

    interface LightboxImage {
        src: string;
        srcset: string;
        width: number;
        height: number;
        caption: string;
    }

    interface Props {
        containerId: string;
        images: LightboxImage[];
        labels: {
            close: string;
            next: string;
            previous: string;
            counter: string;
        };
    }

    const { containerId, images, labels }: Props = $props();

    let dialog: HTMLDialogElement;
    let index = $state(0);
    let open = $state(false);

    const current = $derived(images[index]);
    const counter = $derived(
        labels.counter
            .replace('{current}', String(index + 1))
            .replace('{total}', String(images.length))
    );

    function show(next: number) {
        index = (next + images.length) % images.length;
    }

    function openAt(next: number) {
        index = next;
        open = true;
        dialog?.showModal();
    }

    function close() {
        open = false;
        dialog?.close();
    }

    function onKeydown(event: KeyboardEvent) {
        if (!open) return;
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            show(index + 1);
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            show(index - 1);
        }
    }

    /* Swipe, for the mobile artboard's "swipe på mobil". */
    let touchStartX = 0;

    function onTouchStart(event: TouchEvent) {
        touchStartX = event.changedTouches[0]?.clientX ?? 0;
    }

    function onTouchEnd(event: TouchEvent) {
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX;
        if (Math.abs(delta) > 50) show(index + (delta < 0 ? 1 : -1));
    }

    $effect(() => {
        const container = document.getElementById(containerId);
        if (!container) return;

        function onClick(event: Event) {
            const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-index]');
            if (!trigger) return;
            event.preventDefault();
            openAt(Number(trigger.dataset.index));
        }

        container.addEventListener('click', onClick);
        return () => container.removeEventListener('click', onClick);
    });
</script>

<svelte:window onkeydown={onKeydown} />

<dialog
    bind:this={dialog}
    onclose={() => (open = false)}
    class="m-0 h-full max-h-none w-full max-w-none bg-[oklch(0.20_0.015_60)] p-0
        backdrop:bg-[oklch(0.15_0.01_60_/_0.85)]">
    {#if open && current}
        <div class="flex h-full flex-col gap-3 p-4 sm:p-6">
            <div class="flex items-center justify-between gap-4">
                <span class="text-small font-medium text-[oklch(0.92_0.01_84)]" aria-live="polite">
                    {counter}
                </span>
                <button
                    type="button"
                    onclick={close}
                    class="rounded-button text-small flex items-center gap-2
                        border border-[oklch(0.55_0.01_84)] px-3 py-2.5 font-medium
                        text-[oklch(0.92_0.01_84)] hover:bg-[oklch(0.30_0.015_60)]">
                    {labels.close}
                    <X size={16} strokeWidth={2} aria-hidden="true" />
                </button>
            </div>

            <div
                class="flex min-h-0 flex-1 items-center gap-3"
                ontouchstart={onTouchStart}
                ontouchend={onTouchEnd}>
                {#if images.length > 1}
                    <button
                        type="button"
                        aria-label={labels.previous}
                        onclick={() => show(index - 1)}
                        class="flex size-11 flex-none items-center justify-center rounded-full
                            bg-[oklch(0.30_0.015_60)] text-white hover:bg-[oklch(0.38_0.015_60)]">
                        <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
                    </button>
                {/if}

                <img
                    src={current.src}
                    srcset={current.srcset}
                    sizes="90vw"
                    width={current.width}
                    height={current.height}
                    alt={current.caption}
                    class="min-h-0 flex-1 object-contain"
                    style="max-height:100%" />

                {#if images.length > 1}
                    <button
                        type="button"
                        aria-label={labels.next}
                        onclick={() => show(index + 1)}
                        class="flex size-11 flex-none items-center justify-center rounded-full
                            bg-[oklch(0.30_0.015_60)] text-white hover:bg-[oklch(0.38_0.015_60)]">
                        <ChevronRight size={22} strokeWidth={2} aria-hidden="true" />
                    </button>
                {/if}
            </div>

            <p class="text-small m-0 text-center text-[oklch(0.82_0.01_84)]">{current.caption}</p>
        </div>
    {/if}
</dialog>
