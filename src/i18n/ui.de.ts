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
        readMore: 'Mehr lesen',
        contactCta: 'Kontakt aufnehmen',
        aboutLabel: 'Über uns',
        cottagesNote: 'Samstag bis Samstag · Buchung über Stugknuten',
        locationCardHeading: 'Wo liegen die Häuser?',
        locationCardBody:
            'Löt liegt {kopingsvik} km von Köpingsvik, {borgholm} km von Borgholm und {beach} km vom nächsten Badestrand entfernt.',
        locationCardCta: 'Kontakt und Anfahrt'
    },

    house: {
        shortInfo: 'Kurzinfo',
        prices: 'Preise',
        lowSeason: 'Preis pro Woche (Nebensaison)',
        highSeason: 'Preis pro Woche (Hauptsaison)',
        highSeasonWeeks: 'Woche {from} – {to}',
        lowSeasonShort: 'Nebensaison',
        highSeasonShort: 'Hauptsaison',
        fromPrice: 'Ab {price} SEK / Woche',
        perWeek: '{price} SEK',
        bookCta: 'Auf Stugknuten buchen',
        bookCtaNote:
            'Buchung und freie Wochen laufen über Stugknuten. Der Link öffnet sich in einem neuen Tab.',
        gallery: 'Galerie',
        changeoverDay: 'Wechseltag: Samstag',
        directions: 'Die Anfahrtsbeschreibung erhalten Sie bei der Buchung.',
        questions: 'Wenn Sie mehr wissen möchten, melden Sie sich gerne.',
        contactHeading: 'Fragen zu diesem Haus?',
        priceHeading: 'Preis pro Woche',
        priceRange: '{low}–{high} SEK',
        perWeekNote: 'pro Woche, Samstag bis Samstag',
        perWeekShort: '/ Woche',
        aboutHeading: 'Über das Haus',
        imagesHeading: 'Bilder',
        seeAllImages: 'Alle {count} Bilder ansehen',
        moreImages: '+{count} Bilder',
        videoHeading: 'Ein Rundgang durch das Haus',
        videoBody: 'Der Film liegt bei YouTube und startet erst, wenn Sie ihn anklicken.',
        bookHeading: 'Möchten Sie {name} buchen?',
        bookBody:
            'Freie Wochen und die Buchung finden Sie bei Stugknuten. Bei Fragen zum Haus rufen Sie uns gerne direkt an.'
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
            'Alle Häuser liegen in Löt im Osten von Öland, ca. 10 km von Köpingsvik und 15 km von Borgholm. Die Anfahrtsbeschreibung erhalten Sie bei der Buchung.',
        callName: '{name} anrufen',
        languagesNote:
            'Wir sprechen Schwedisch und Englisch, leider kein Deutsch. Bitte wenden Sie sich auf Englisch an uns.',
        addressHeading: 'Adresse',
        directionsNote: 'Die genaue Anfahrt zu Ihrem Haus erhalten Sie bei der Buchung.',
        distancesHeading: 'So finden Sie uns',
        distanceUnit: '{km} km',
        distanceKopingsvik: 'Köpingsvik',
        distanceBorgholm: 'Borgholm',
        distanceBeach: 'Nächster Badestrand',
        mapAlt: 'Karte von Öland mit Löt im mittleren Teil der Insel, östlich von Borgholm.',
        mapCaption: 'Schematische Karte. Löt liegt auf Mittelöland, nordöstlich von Borgholm.'
    },

    birdwatching: {
        heading: 'Vogelbeobachtung auf Öland',
        intro: 'Öland liegt auf der Zugroute eines großen Teils der nordeuropäischen Vogelwelt. Im Frühjahr und im Herbst ziehen Zehntausende Vögel über die Insel, und auf dem Alvar brüten Arten, die anderswo im Land kaum zu sehen sind.',
        body: [
            'Von Löt aus erreichen Sie den Mittlandsskogen in einer Viertelstunde und Beijershamn in knapp einer Stunde. Zur Vogelwarte Ottenby an der Südspitze fahren Sie etwa anderthalb Stunden. Viele unserer Gäste kommen wegen der Vögel hierher und fahren schon vor dem Frühstück los.',
            'Seit einigen Jahren führen wir eine einfache Liste dessen, was im Dorf und in der Umgebung gesehen wurde. Sie können sie auf dieser Seite herunterladen.'
        ],
        downloadCta: 'Vogelliste als PDF herunterladen',
        imageAlt: 'Liste der 2021 in Löt beobachteten Vögel',
        label: 'Vogelbeobachtung',
        pdfHeading: 'In Löt beobachtete Vögel',
        pdfBody: 'Unsere eigene Artenliste dessen, was im Dorf und in der Umgebung gesehen wurde.',
        pdfMeta: 'PDF · schwedische und lateinische Namen'
    },

    privacy: {
        heading: 'Datenschutzerklärung',
        lastUpdatedLabel: 'Zuletzt aktualisiert',
        tocHeading: 'Auf dieser Seite',
        intro: 'Diese Seite nimmt weder Buchungen noch Zahlungen entgegen. Wir erheben so wenig wie möglich und geben nichts weiter.',
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
        playShort: 'Film abspielen',
        note: 'Das Video wird erst von YouTube geladen, wenn Sie darauf klicken.'
    },

    footer: {
        rights: 'Alle Rechte vorbehalten.',
        contactHeading: 'Kontakt',
        cottagesHeading: 'Ferienhäuser',
        moreHeading: 'Mehr',
        bookingNote: 'Die Buchung läuft über Stugknuten.'
    }
};
