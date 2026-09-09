/**
 * Swedish UI strings — the source of truth for `ui.en.ts` and `ui.de.ts`.
 * The shape of this object defines the `UiStrings` type the other locales must match.
 */
export const uiSv = {
    meta: {
        titleSuffix: 'Ölands Stuguthyrning',
        homeTitle: 'Uthyrning av stugor på Öland',
        homeDescription:
            'Fem charmiga stugor att hyra i Löt på östra Öland, ca 10 km från Köpingsvik. Uthyrning av semesterstugor med åretruntstandard sedan över 20 år.',
        contactDescription:
            'Kontakta Helen och Lars Andersson om uthyrning av våra stugor i Löt på Öland.',
        birdwatchingDescription:
            'Fågelskådning i Löt på Öland – ladda ner listan över observerade fåglar i närheten av våra stugor.',
        privacyDescription: 'Så behandlar Ölands Stuguthyrning personuppgifter och cookies.'
    },

    nav: {
        home: 'Hem',
        cottages: 'Stugor',
        birdwatching: 'Fågelskådning',
        contact: 'Kontakt',
        privacy: 'Personuppgiftspolicy',
        skipToContent: 'Hoppa till innehåll',
        openMenu: 'Öppna meny',
        closeMenu: 'Stäng meny',
        chooseLanguage: 'Välj språk'
    },

    home: {
        tagline: 'Ditt tillfälliga hem på Öland!',
        heading: 'Uthyrning av stugor på Öland',
        showCottages: 'Visa stugor',
        welcomeHeading: 'Välkommen till oss!',
        welcomeBody: [
            'Välkommen till vår stuguthyrning! Vi heter Helen och Lars Andersson och har hyrt ut våra stugor på Öland i över 20 år. Lars har tidigare drivit ett eget byggbolag som heter Spångebro Bygg AB och har gjort alla renoveringar och nybyggnationer för alla våra stugor. Stugorna underhålls och utrustas regelbundet och vi inreder dem modernt för att ni som gäster ska känna er som hemma när ni är på besök.',
            'Läs gärna mer om stugorna nedanför eller kontakta oss om ni har några frågor!'
        ],
        welcomeSignature: 'Vänliga hälsningar, Helen och Lars.',
        welcomePortraitAlt: 'Helen och Lars Andersson',
        birdBanner: 'Fågelskådare? Läs mer om vilka fåglar som finns i närheten av våra stugor!',
        birdBannerCta: 'Gå till fågelskådning',
        cottagesHeading: 'Våra stugor',
        readMore: 'Läs mer'
    },

    house: {
        shortInfo: 'Kort info',
        prices: 'Priser',
        lowSeason: 'Pris per vecka (lågsäsong)',
        highSeason: 'Pris per vecka (högsäsong)',
        highSeasonWeeks: 'Vecka {from} – {to}',
        fromPrice: 'Fr. {price} kr / vecka',
        perWeek: '{price} kr',
        bookCta: 'Visa tillgänglighet',
        bookCtaNote: 'Bokning och tillgänglighet hanteras på Stugknuten.',
        gallery: 'Galleri',
        changeoverDay: 'Bytesdag lördagar',
        directions: 'Vägbeskrivning ges vid bokning.',
        questions: 'Vill ni ha mer information så hör gärna av er!',
        contactHeading: 'Har du frågor om stugan?'
    },

    contact: {
        heading: 'Kontakta oss',
        intro: 'Hör gärna av dig om du har frågor om stugorna, området eller din vistelse. Det går bra att ringa eller mejla — vi svarar så snart vi kan.',
        phoneHeading: 'Telefon',
        emailHeading: 'E-post',
        bookingHeading: 'Bokning',
        bookingBody:
            'Själva bokningen och den aktuella tillgängligheten sköts via Stugknuten. Du hittar en länk till rätt stuga på varje stugsida.',
        locationHeading: 'Var ligger stugorna?',
        locationBody:
            'Samtliga stugor ligger i Löt på östra Öland, ca 10 km från Köpingsvik och 15 km från Borgholm. Vägbeskrivning ges vid bokning.'
    },

    birdwatching: {
        heading: 'Fågelskådning på Öland',
        intro: 'Öland är ett av Sveriges bästa landskap för fågelskådning, och våra stugor ligger mitt i det. Nedan finns en lista över fåglar som observerats i Löt.',
        downloadCta: 'Ladda ner fågellistan som pdf',
        imageAlt: 'Lista på fåglar skådade i Löt under 2021'
    },

    privacy: {
        heading: 'Personuppgiftspolicy',
        lastUpdatedLabel: 'Senast uppdaterad',
        sections: [
            {
                heading: 'Inledning',
                body: [
                    'Den här webbplatsen är en presentationssida för våra stugor. Vi vill att det ska vara tydligt vilka uppgifter som behandlas när du besöker den — och vilka som inte gör det.'
                ]
            },
            {
                heading: 'Vilka personuppgifter vi samlar in',
                body: [
                    'Webbplatsen samlar inte in några personuppgifter om dig. Det finns inga formulär, inga konton och ingen inloggning, och vi lagrar ingen databas med besökarnas uppgifter.',
                    'Om du kontaktar oss via telefon eller e-post använder vi naturligtvis dina uppgifter för att svara dig och för att hantera en eventuell uthyrning. Vi sparar dem inte längre än vad som behövs för det.',
                    'Själva bokningen sker hos Stugknuten. De uppgifter du lämnar där behandlas av Stugknuten enligt deras egen personuppgiftspolicy, som vi inte råder över.'
                ]
            },
            {
                heading: 'Cookies och analys',
                body: [
                    'Vi använder Google Analytics via Google Tag Manager för att förstå hur webbplatsen används — till exempel vilka stugor som besöks mest. Detta laddas först efter att du har samtyckt i cookie-rutan. Väljer du att inte samtycka laddas ingen analys och inga analyscookies sätts.',
                    'Ditt val sparas lokalt i din webbläsare. Du kan när som helst ändra dig genom att rensa webbplatsdata i din webbläsare, varefter frågan ställs på nytt.'
                ]
            },
            {
                heading: 'Dina rättigheter',
                body: [
                    'Enligt GDPR har du rätt att begära tillgång till, rättelse av eller radering av personuppgifter som rör dig, att invända mot eller begära begränsning av behandlingen, samt att begära dataportabilitet. Eftersom vi inte samlar in några uppgifter via webbplatsen gäller detta i praktiken uppgifter du själv har lämnat till oss per telefon eller e-post.',
                    'Du har också rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY).'
                ]
            },
            {
                heading: 'Ändringar i policyn',
                body: ['Policyn kan komma att uppdateras. Ändringar publiceras på den här sidan.']
            },
            {
                heading: 'Kontakt',
                body: [
                    'Har du frågor om hur vi behandlar personuppgifter är du välkommen att kontakta oss.'
                ]
            }
        ]
    },

    cookies: {
        heading: 'Cookies',
        body: 'Vi vill gärna använda analyscookies för att se hur webbplatsen används. Inget laddas förrän du väljer.',
        accept: 'Tillåt analys',
        decline: 'Endast nödvändiga',
        readMore: 'Läs mer i vår personuppgiftspolicy'
    },

    gallery: {
        open: 'Öppna bilden i helskärm',
        close: 'Stäng',
        next: 'Nästa bild',
        previous: 'Föregående bild',
        counter: 'Bild {current} av {total}'
    },

    video: {
        play: 'Spela upp videon om {name}',
        note: 'Videon laddas från YouTube först när du klickar på den.'
    },

    footer: {
        rights: 'Alla rättigheter förbehållna.',
        contactHeading: 'Kontakt',
        cottagesHeading: 'Stugor'
    }
};

export type UiStrings = typeof uiSv;
