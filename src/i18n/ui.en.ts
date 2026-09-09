import type { UiStrings } from './ui.sv';

/** English UI strings. Drafted from `ui.sv.ts` — REVIEW REQUIRED before launch (plan D16). */
export const uiEn: UiStrings = {
    meta: {
        titleSuffix: 'Ölands Stuguthyrning',
        homeTitle: 'Holiday cottages to rent on Öland',
        homeDescription:
            'Five charming cottages to rent in Löt on eastern Öland, about 10 km from Köpingsvik. Family-run holiday rentals for over 20 years.',
        contactDescription:
            'Get in touch with Helen and Lars Andersson about renting our cottages in Löt on Öland.',
        birdwatchingDescription:
            'Birdwatching in Löt on Öland – download the list of birds observed near our cottages.',
        privacyDescription: 'How Ölands Stuguthyrning handles personal data and cookies.'
    },

    nav: {
        home: 'Home',
        cottages: 'Cottages',
        birdwatching: 'Birdwatching',
        contact: 'Contact',
        privacy: 'Privacy policy',
        skipToContent: 'Skip to content',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        chooseLanguage: 'Choose language'
    },

    home: {
        tagline: 'Your home from home on Öland',
        heading: 'Holiday cottages to rent on Öland',
        showCottages: 'See the cottages',
        welcomeHeading: 'Welcome!',
        welcomeBody: [
            'Welcome to our cottage rentals. We are Helen and Lars Andersson, and we have been renting out our cottages on Öland for over 20 years. Lars previously ran his own construction company, Spångebro Bygg AB, and has carried out every renovation and new build himself. The cottages are maintained and re-equipped regularly, and we furnish them to a modern standard so that you feel at home while you stay.',
            'Read more about the cottages below, or get in touch if you have any questions.'
        ],
        welcomeSignature: 'Warm regards, Helen and Lars.',
        welcomePortraitAlt: 'Helen and Lars Andersson',
        birdBanner: 'A birdwatcher? Read about the birds found close to our cottages.',
        birdBannerCta: 'Go to birdwatching',
        cottagesHeading: 'Our cottages',
        readMore: 'Read more'
    },

    house: {
        shortInfo: 'At a glance',
        prices: 'Prices',
        lowSeason: 'Price per week (low season)',
        highSeason: 'Price per week (high season)',
        highSeasonWeeks: 'Weeks {from} – {to}',
        fromPrice: 'From SEK {price} / week',
        perWeek: 'SEK {price}',
        bookCta: 'Check availability',
        bookCtaNote: 'Booking and availability are handled on Stugknuten.',
        gallery: 'Gallery',
        changeoverDay: 'Changeover day: Saturday',
        directions: 'Directions are provided when you book.',
        questions: 'If you would like more information, please get in touch.',
        contactHeading: 'Questions about this cottage?'
    },

    contact: {
        heading: 'Contact us',
        intro: 'Do get in touch if you have questions about the cottages, the area or your stay. Call or email — we answer as soon as we can.',
        phoneHeading: 'Telephone',
        emailHeading: 'Email',
        bookingHeading: 'Booking',
        bookingBody:
            'The booking itself and current availability are handled through Stugknuten. Each cottage page links to the right listing.',
        locationHeading: 'Where are the cottages?',
        locationBody:
            'All the cottages are in Löt on eastern Öland, about 10 km from Köpingsvik and 15 km from Borgholm. Directions are provided when you book.'
    },

    birdwatching: {
        heading: 'Birdwatching on Öland',
        intro: 'Öland is one of Sweden’s best regions for birdwatching, and our cottages sit right in the middle of it. Below is a list of birds observed in Löt.',
        downloadCta: 'Download the bird list as a PDF',
        imageAlt: 'List of birds observed in Löt during 2021'
    },

    privacy: {
        heading: 'Privacy policy',
        lastUpdatedLabel: 'Last updated',
        sections: [
            {
                heading: 'Introduction',
                body: [
                    'This website is a presentation site for our cottages. We want to be clear about what data is processed when you visit it — and what is not.'
                ]
            },
            {
                heading: 'What personal data we collect',
                body: [
                    'This website collects no personal data about you. There are no forms, no accounts and no login, and we hold no database of visitor details.',
                    'If you contact us by telephone or email, we naturally use your details to reply and to handle a possible rental. We keep them no longer than needed for that.',
                    'The booking itself takes place at Stugknuten. Any details you provide there are processed by Stugknuten under their own privacy policy, which is outside our control.'
                ]
            },
            {
                heading: 'Cookies and analytics',
                body: [
                    'We use Google Analytics via Google Tag Manager to understand how the site is used — for example which cottages are viewed most. This loads only after you consent in the cookie notice. If you decline, no analytics load and no analytics cookies are set.',
                    'Your choice is stored locally in your browser. You can change your mind at any time by clearing site data in your browser, after which you will be asked again.'
                ]
            },
            {
                heading: 'Your rights',
                body: [
                    'Under the GDPR you have the right to request access to, rectification of or erasure of personal data concerning you, to object to or request restriction of processing, and to request data portability. As we collect no data through this website, in practice this concerns details you have given us yourself by telephone or email.',
                    'You also have the right to lodge a complaint with the Swedish Authority for Privacy Protection (IMY).'
                ]
            },
            {
                heading: 'Changes to this policy',
                body: ['This policy may be updated. Any changes are published on this page.']
            },
            {
                heading: 'Contact',
                body: [
                    'If you have questions about how we handle personal data, you are welcome to contact us.'
                ]
            }
        ]
    },

    cookies: {
        heading: 'Cookies',
        body: 'We would like to use analytics cookies to see how the site is used. Nothing loads until you choose.',
        accept: 'Allow analytics',
        decline: 'Essential only',
        readMore: 'Read more in our privacy policy'
    },

    gallery: {
        open: 'Open image full screen',
        close: 'Close',
        next: 'Next image',
        previous: 'Previous image',
        counter: 'Image {current} of {total}'
    },

    video: {
        play: 'Play the video of {name}',
        note: 'The video loads from YouTube only when you click it.'
    },

    footer: {
        rights: 'All rights reserved.',
        contactHeading: 'Contact',
        cottagesHeading: 'Cottages'
    }
};
