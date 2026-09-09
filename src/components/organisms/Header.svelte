<script lang="ts">
    /**
     * Site header — one of the four islands (ADR-009). It needs JS for exactly
     * two things: the cottage dropdown and the mobile menu.
     *
     * Everything it renders is computed at build time in `Header.astro` and
     * passed in as plain data, so no i18n or routing logic ships to the browser.
     *
     * The desktop nav collapses at 1100px (`--breakpoint-nav`), earlier than
     * you might expect, because the German labels ("Vogelbeobachtung",
     * "Ferienhäuser") are ~30% longer than the Swedish and the design chose to
     * switch to the menu rather than compress them.
     */
    import { ChevronDown, Menu, X } from '@lucide/svelte';

    interface NavItem {
        key: string;
        label: string;
        href: string;
    }

    interface CottageLink {
        name: string;
        href: string;
        beds: string;
        current: boolean;
    }

    interface LanguageLink {
        code: string;
        name: string;
        href: string;
        current: boolean;
    }

    interface Props {
        siteName: string;
        eyebrow: string;
        homeHref: string;
        navItems: NavItem[];
        cottagesLabel: string;
        cottages: CottageLink[];
        languages: LanguageLink[];
        /** Which nav item is the current page: a nav key, or 'cottage'. */
        active: string;
        labels: { openMenu: string; closeMenu: string; chooseLanguage: string };
    }

    const {
        siteName,
        eyebrow,
        homeHref,
        navItems,
        cottagesLabel,
        cottages,
        languages,
        active,
        labels
    }: Props = $props();

    let menuOpen = $state(false);
    let dropdownOpen = $state(false);
    let headerEl: HTMLElement;

    const cottagesActive = $derived(active === 'cottage');

    function closeAll() {
        menuOpen = false;
        dropdownOpen = false;
    }

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') closeAll();
    }

    /**
     * Pointerdown rather than click: a click that lands on a link inside the
     * dropdown would otherwise close the menu before the navigation starts on
     * some browsers.
     */
    function onPointerDown(event: PointerEvent) {
        if (headerEl && !headerEl.contains(event.target as Node)) closeAll();
    }
</script>

<svelte:window onkeydown={onKeydown} onpointerdown={onPointerDown} />

<header bind:this={headerEl} class="bg-card border-border relative z-40 border-b">
    <div class="mx-auto flex h-20 max-w-[1440px] items-center gap-8 px-5 lg:px-12">
        <a href={homeHref} class="flex flex-col leading-none no-underline">
            <span class="text-text-heading font-serif text-[1.125rem] lg:text-[1.375rem]">
                {siteName}
            </span>
            <span
                class="text-text-muted mt-1 hidden text-[0.6875rem] font-medium tracking-[0.16em]
                    uppercase sm:block">
                {eyebrow}
            </span>
        </a>

        <!-- Desktop navigation -->
        <nav class="nav:flex ml-auto hidden items-center gap-7" aria-label={siteName}>
            {#each navItems as item (item.key)}
                {#if item.key === 'cottages'}
                    <div class="relative">
                        <button
                            type="button"
                            class="flex items-center gap-1.5 border-b-2 pb-[3px] font-medium
                                {cottagesActive || dropdownOpen
                                ? 'border-accent text-text-heading'
                                : 'text-text-body hover:text-text-heading border-transparent'}"
                            aria-expanded={dropdownOpen}
                            onclick={() => (dropdownOpen = !dropdownOpen)}>
                            {cottagesLabel}
                            <ChevronDown
                                size={14}
                                strokeWidth={2}
                                class="transition-transform {dropdownOpen ? 'rotate-180' : ''}"
                                aria-hidden="true" />
                        </button>

                        {#if dropdownOpen}
                            <div
                                class="border-border bg-card shadow-dropdown rounded-card absolute
                                    top-full right-0 mt-3 w-[340px] overflow-hidden border">
                                {#each cottages as cottage, index (cottage.href)}
                                    <a
                                        href={cottage.href}
                                        class="border-border hover:bg-surface-sunken flex items-baseline
                                            justify-between gap-3 px-[18px] py-3.5
                                            no-underline
                                            {index > 0 ? 'border-t' : ''}
                                            {cottage.current ? 'bg-accent-soft' : ''}">
                                        <span class="text-text-heading font-medium">
                                            {cottage.name}
                                        </span>
                                        <span class="text-text-muted text-small whitespace-nowrap">
                                            {cottage.beds}
                                        </span>
                                    </a>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {:else}
                    <a
                        href={item.href}
                        class="border-b-2 pb-[3px] font-medium no-underline
                            {active === item.key
                            ? 'border-accent text-text-heading'
                            : 'text-text-body hover:text-text-heading border-transparent'}"
                        aria-current={active === item.key ? 'page' : undefined}>
                        {item.label}
                    </a>
                {/if}
            {/each}

            <ul
                class="bg-surface-sunken rounded-button m-0 flex list-none gap-0.5 p-[3px]"
                aria-label={labels.chooseLanguage}>
                {#each languages as language (language.code)}
                    <li>
                        <a
                            href={language.href}
                            hreflang={language.code}
                            lang={language.code}
                            aria-current={language.current ? 'true' : undefined}
                            class="rounded-chip text-small block px-2.5 py-[7px] no-underline
                                {language.current
                                ? 'bg-accent text-accent-contrast font-semibold'
                                : 'text-text-body hover:text-text-heading font-medium'}">
                            <abbr title={language.name} class="no-underline">
                                {language.code.toUpperCase()}
                            </abbr>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>

        <!-- Mobile trigger -->
        <button
            type="button"
            class="text-text-heading nav:hidden -mr-2.5 ml-auto p-2.5"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            onclick={() => (menuOpen = !menuOpen)}>
            {#if menuOpen}
                <X size={24} strokeWidth={2} aria-hidden="true" />
            {:else}
                <Menu size={24} strokeWidth={2} aria-hidden="true" />
            {/if}
        </button>
    </div>

    <!-- Mobile menu -->
    {#if menuOpen}
        <nav class="bg-card border-border nav:hidden border-t pb-3.5" aria-label={siteName}>
            <a
                href={navItems[0]?.href ?? homeHref}
                class="text-text-heading block px-5 py-3.5 font-medium no-underline">
                {navItems[0]?.label}
            </a>

            <div class="border-border border-t">
                <div
                    class="text-text-muted px-5 pt-3.5 pb-2 text-[0.75rem] font-semibold
                        tracking-[0.12em] uppercase">
                    {cottagesLabel}
                </div>
                {#each cottages as cottage (cottage.href)}
                    <a
                        href={cottage.href}
                        aria-current={cottage.current ? 'page' : undefined}
                        class="text-text-body flex items-baseline justify-between gap-3 py-2.5 pr-5
                            pl-7 no-underline">
                        <span>{cottage.name}</span>
                        <span class="text-text-muted text-small">{cottage.beds}</span>
                    </a>
                {/each}
            </div>

            {#each navItems.slice(1) as item (item.key)}
                {#if item.key !== 'cottages'}
                    <a
                        href={item.href}
                        aria-current={active === item.key ? 'page' : undefined}
                        class="text-text-heading border-border block border-t px-5 py-3.5
                            font-medium no-underline">
                        {item.label}
                    </a>
                {/if}
            {/each}

            <ul
                class="border-border m-0 flex list-none gap-2 border-t px-5 pt-4 pb-1"
                aria-label={labels.chooseLanguage}>
                {#each languages as language (language.code)}
                    <li class="flex-1">
                        <a
                            href={language.href}
                            hreflang={language.code}
                            lang={language.code}
                            aria-current={language.current ? 'true' : undefined}
                            class="rounded-button block px-2 py-3.5 text-center no-underline
                                {language.current
                                ? 'bg-accent text-accent-contrast font-semibold'
                                : 'bg-surface-sunken text-text-body font-medium'}">
                            {language.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    {/if}
</header>
