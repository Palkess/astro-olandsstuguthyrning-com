import type { UiStrings } from './ui.sv';

/**
 * German UI strings. Drafted from `ui.sv.ts`, shipping without native review
 * (plan D16). Kept plain and factual on purpose.
 */
export const uiDe: UiStrings = {
    meta: {
        titleSuffix: 'Ölands Stuguthyrning',
        homeTitle: 'Ferienhäuser auf Öland mieten',
        homeDescription:
            'Fünf Ferienhäuser zur Miete in Löt im Osten von Öland, ca. 10 km von Köpingsvik. Familiäre Vermietung seit über 20 Jahren.',
        contactDescription:
            'Kontaktieren Sie Helen und Lars Andersson wegen der Vermietung unserer Ferienhäuser in Löt auf Öland.',
        birdwatchingDescription:
            'Vogelbeobachtung in Löt auf Öland – Liste der in der Nähe unserer Ferienhäuser beobachteten Vögel herunterladen.',
        privacyDescription:
            'So geht Ölands Stuguthyrning mit personenbezogenen Daten und Cookies um.'
    },

    nav: {
        home: 'Startseite',
        cottages: 'Ferienhäuser',
        birdwatching: 'Vogelbeobachtung',
        contact: 'Kontakt',
        privacy: 'Datenschutz',
        skipToContent: 'Zum Inhalt springen',
        openMenu: 'Menü öffnen',
        closeMenu: 'Menü schließen',
        chooseLanguage: 'Sprache wählen'
    },

    home: {
        tagline: 'Ihr Zuhause auf Zeit auf Öland',
        heading: 'Ferienhäuser auf Öland mieten',
        showCottages: 'Ferienhäuser ansehen',
        welcomeHeading: 'Herzlich willkommen!',
        welcomeBody: [
            'Willkommen bei unserer Ferienhausvermietung. Wir sind Helen und Lars Andersson und vermieten unsere Häuser auf Öland seit über 20 Jahren. Lars hatte früher ein eigenes Bauunternehmen, Spångebro Bygg AB, und hat alle Renovierungen und Neubauten selbst ausgeführt. Die Häuser werden regelmäßig gepflegt und ausgestattet, damit Sie sich bei uns wie zu Hause fühlen.',
            'Lesen Sie mehr über die Häuser weiter unten oder melden Sie sich bei Fragen.'
        ],
        welcomeSignature: 'Herzliche Grüße, Helen und Lars.',
        welcomePortraitAlt: 'Helen und Lars Andersson',
        birdBanner:
            'Vogelbeobachter? Lesen Sie, welche Vögel in der Nähe unserer Ferienhäuser vorkommen.',
        birdBannerCta: 'Zur Vogelbeobachtung',
        cottagesHeading: 'Unsere Ferienhäuser',
        readMore: 'Mehr lesen'
    },

    house: {
        shortInfo: 'Kurzinfo',
        prices: 'Preise',
        lowSeason: 'Preis pro Woche (Nebensaison)',
        highSeason: 'Preis pro Woche (Hauptsaison)',
        highSeasonWeeks: 'Woche {from} – {to}',
        fromPrice: 'Ab {price} SEK / Woche',
        perWeek: '{price} SEK',
        bookCta: 'Verfügbarkeit ansehen',
        bookCtaNote: 'Buchung und Verfügbarkeit werden über Stugknuten abgewickelt.',
        gallery: 'Galerie',
        changeoverDay: 'Wechseltag: Samstag',
        directions: 'Die Anfahrtsbeschreibung erhalten Sie bei der Buchung.',
        questions: 'Wenn Sie mehr wissen möchten, melden Sie sich gerne.',
        contactHeading: 'Fragen zu diesem Haus?'
    },

    contact: {
        heading: 'Kontakt',
        intro: 'Melden Sie sich gerne bei Fragen zu den Häusern, zur Umgebung oder zu Ihrem Aufenthalt. Sie erreichen uns telefonisch oder per E-Mail. Wir antworten so schnell wie möglich.',
        phoneHeading: 'Telefon',
        emailHeading: 'E-Mail',
        bookingHeading: 'Buchung',
        bookingBody:
            'Die Buchung selbst und die aktuelle Verfügbarkeit laufen über Stugknuten. Auf jeder Hausseite finden Sie den Link zum richtigen Inserat.',
        locationHeading: 'Wo liegen die Häuser?',
        locationBody:
            'Alle Häuser liegen in Löt im Osten von Öland, ca. 10 km von Köpingsvik und 15 km von Borgholm. Die Anfahrtsbeschreibung erhalten Sie bei der Buchung.'
    },

    birdwatching: {
        heading: 'Vogelbeobachtung auf Öland',
        intro: 'Öland ist eine der besten Regionen Schwedens für die Vogelbeobachtung, und unsere Häuser liegen mittendrin. Unten finden Sie eine Liste der in Löt beobachteten Vögel.',
        downloadCta: 'Vogelliste als PDF herunterladen',
        imageAlt: 'Liste der 2021 in Löt beobachteten Vögel'
    },

    privacy: {
        heading: 'Datenschutzerklärung',
        lastUpdatedLabel: 'Zuletzt aktualisiert',
        sections: [
            {
                heading: 'Einleitung',
                body: [
                    'Diese Website stellt unsere Ferienhäuser vor. Wir möchten deutlich machen, welche Daten bei einem Besuch verarbeitet werden – und welche nicht.'
                ]
            },
            {
                heading: 'Welche personenbezogenen Daten wir erheben',
                body: [
                    'Diese Website erhebt keine personenbezogenen Daten über Sie. Es gibt keine Formulare, keine Konten und keinen Login, und wir führen keine Datenbank mit Besucherdaten.',
                    'Wenn Sie uns telefonisch oder per E-Mail kontaktieren, verwenden wir Ihre Angaben selbstverständlich, um Ihnen zu antworten und eine mögliche Vermietung abzuwickeln. Wir speichern sie nicht länger als dafür nötig.',
                    'Die Buchung selbst erfolgt bei Stugknuten. Die dort angegebenen Daten werden von Stugknuten nach deren eigener Datenschutzerklärung verarbeitet, auf die wir keinen Einfluss haben.'
                ]
            },
            {
                heading: 'Cookies und Analyse',
                body: [
                    'Wir nutzen Google Analytics über den Google Tag Manager, um zu verstehen, wie die Website genutzt wird – zum Beispiel, welche Häuser am häufigsten angesehen werden. Dies wird erst geladen, nachdem Sie im Cookie-Hinweis zugestimmt haben. Wenn Sie ablehnen, wird keine Analyse geladen und es werden keine Analyse-Cookies gesetzt.',
                    'Ihre Auswahl wird lokal in Ihrem Browser gespeichert. Sie können sie jederzeit ändern, indem Sie die Websitedaten in Ihrem Browser löschen; danach werden Sie erneut gefragt.'
                ]
            },
            {
                heading: 'Ihre Rechte',
                body: [
                    'Nach der DSGVO haben Sie das Recht, Auskunft über Sie betreffende personenbezogene Daten sowie deren Berichtigung oder Löschung zu verlangen, der Verarbeitung zu widersprechen oder deren Einschränkung zu verlangen und Datenübertragbarkeit zu verlangen. Da wir über diese Website keine Daten erheben, betrifft dies in der Praxis Angaben, die Sie uns selbst telefonisch oder per E-Mail gemacht haben.',
                    'Sie haben außerdem das Recht, eine Beschwerde bei der schwedischen Datenschutzbehörde (IMY) einzureichen.'
                ]
            },
            {
                heading: 'Änderungen dieser Erklärung',
                body: [
                    'Diese Erklärung kann aktualisiert werden. Änderungen werden auf dieser Seite veröffentlicht.'
                ]
            },
            {
                heading: 'Kontakt',
                body: [
                    'Bei Fragen zum Umgang mit personenbezogenen Daten können Sie uns gerne kontaktieren.'
                ]
            }
        ]
    },

    cookies: {
        heading: 'Cookies',
        body: 'Wir würden gerne Analyse-Cookies verwenden, um zu sehen, wie die Website genutzt wird. Bis zu Ihrer Auswahl wird nichts geladen.',
        accept: 'Analyse erlauben',
        decline: 'Nur notwendige',
        readMore: 'Mehr in unserer Datenschutzerklärung'
    },

    gallery: {
        open: 'Bild im Vollbild öffnen',
        close: 'Schließen',
        next: 'Nächstes Bild',
        previous: 'Vorheriges Bild',
        counter: 'Bild {current} von {total}'
    },

    video: {
        play: 'Video über {name} abspielen',
        note: 'Das Video wird erst von YouTube geladen, wenn Sie darauf klicken.'
    },

    footer: {
        rights: 'Alle Rechte vorbehalten.',
        contactHeading: 'Kontakt',
        cottagesHeading: 'Ferienhäuser'
    }
};
