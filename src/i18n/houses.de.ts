import type { HouseTexts } from './types';

/**
 * German. Drafted from `houses.sv.ts` and shipping WITHOUT native review
 * (plan D16). Deliberately kept short and factual rather than translating every
 * flourish of the Swedish marketing copy — machine-drafted plain facts read as
 * neutral, machine-drafted marketing prose reads as careless.
 *
 * If a German speaker becomes available, this is the file to hand them.
 */
export const housesDe: HouseTexts = {
    'grona-stugan': {
        name: 'Gröna stugan (Das grüne Häuschen)',
        shortDescription:
            'Ferienhaus von 2016 für 6 Personen. Schlafzimmer mit Doppelbett, kleines Schlafzimmer mit 2 Betten, Wohnzimmer mit 2 Schlafsofas. Küche mit Kühl-/Gefrierschrank, Mikrowelle, Herd/Backofen und Spülmaschine. Dusche, WC und Waschmaschine. In Löt im Osten von Öland, ca. 10 km von Köpingsvik.',
        description: [
            'Ferienhaus aus dem Jahr 2016 mit allem Komfort für den Urlaub.',
            'Großes Schlafzimmer mit Doppelbett, kleines Schlafzimmer mit 2 Betten, Wohnzimmer mit 2 Schlafsofas. Küche mit Kühl-/Gefrierschrank, Mikrowelle, Herd/Backofen und Spülmaschine. Dusche, WC und Waschmaschine.',
            'Endreinigung gegen Gebühr möglich. Bettwäsche und Handtücher können gemietet werden.'
        ],
        imageCaptions: {
            'exterior-front.jpg': 'Das Haus von vorne',
            'dining-table.jpg': 'Esstisch',
            'kitchen.jpg': 'Küche',
            'living-room.jpg': 'Wohnzimmer',
            'open-plan.jpg': 'Offener Wohnbereich',
            'bathroom.jpg': 'Badezimmer',
            'bedroom-singles.jpg': 'Schlafzimmer mit Einzelbetten',
            'bedroom-double.jpg': 'Schlafzimmer mit Doppelbett',
            'terrace.jpg': 'Terrasse',
            'terrace-view.jpg': 'Blick von der Terrasse',
            'exterior-overview.jpg': 'Übersicht'
        },
        amenityLabels: {
            bed: '6 Betten',
            kitchen: 'Voll ausgestattete Küche',
            shower: 'Dusche & Waschmaschine',
            swimming: '2 km zum nächsten Badeplatz'
        },
        extraCosts: {}
    },

    'vita-huset': {
        name: 'Vita huset (Das weiße Haus)',
        shortDescription:
            'Ferienhaus auf großem Grundstück für 6 + 2 Personen (2 Betten im Gästehaus). Drei Schlafzimmer, zwei davon im Obergeschoss. Voll ausgestattete Küche mit Herd/Backofen, Kühl-/Gefrierschrank und Spülmaschine, Dusche, WC und Waschmaschine. Garten mit Grill. In Löt im Osten von Öland, ca. 10 km von Köpingsvik.',
        description: [
            'Das Haus liegt auf einem großen Grundstück und bietet Platz für 6 + 2 Personen (2 Betten im Gästehaus). Es liegt in Löt an der Ostseite von Mittelöland. Drei Schlafzimmer mit insgesamt 6 neuen Einzelbetten – zwei Schlafzimmer im Obergeschoss, eines im Erdgeschoss. Voll ausgestattete Küche mit Herd/Backofen, Kühl-/Gefrierschrank und Spülmaschine, Dusche, WC und Waschmaschine.',
            'Im Außenbereich gibt es viel Platz, Gartenmöbel und einen Grill.',
            'Haustiere sind nicht erlaubt.'
        ],
        imageCaptions: {
            'exterior.jpg': 'Das weiße Haus von außen',
            'guest-house.jpg': 'Gästehaus, 2 Betten',
            'guest-house-bedroom.jpg': 'Schlafzimmer im Gästehaus',
            'terrace.jpg': 'Terrasse',
            'back-entrance.jpg': 'Hintereingang',
            'entrance.jpg': 'Eingang',
            'living-room.jpg': 'Wohnzimmer',
            'kitchen.jpg': 'Küche',
            'kitchen-2.jpg': 'Küche, zweite Ansicht',
            'dining-table.jpg': 'Esstisch',
            'upstairs-hall.jpg': 'Flur im Obergeschoss',
            'bedroom-1.jpg': 'Schlafzimmer 1 – 2 Betten',
            'bedroom-2.jpg': 'Schlafzimmer 2 – 2 Betten',
            'bedroom-3.jpg': 'Schlafzimmer 3 – 2 Betten',
            'bathroom.jpg': 'Badezimmer',
            'cot.jpg': 'Kinderbett'
        },
        amenityLabels: {
            bed: '6 + 2 Betten',
            kitchen: 'Voll ausgestattete Küche',
            shower: 'Dusche & Waschmaschine',
            swimming: '2 km zum nächsten Badeplatz'
        },
        extraCosts: {
            'guest-house-beds': {
                description: '+ 2 zusätzliche Betten im Gästehaus',
                price: '2 000 SEK / Woche'
            }
        }
    },

    'gula-stugan': {
        name: 'Gula stugan (Das gelbe Häuschen)',
        shortDescription:
            'Schön gelegenes Ferienhaus für 4 Personen, ganzjährig nutzbar. Zwei Zimmer und voll ausgestattete Küche. In Löt im Osten von Öland, ca. 10 km von Köpingsvik.',
        description: [
            'Schön gelegenes Ferienhaus, ganzjährig nutzbar. Zwei Zimmer und Küche. Voll ausgestattet.',
            '15 km nach Borgholm. Ruhige, kinderfreundliche Umgebung. Haustiere sind nicht erlaubt. Rauchen im Haus ist nicht erlaubt.',
            'Endreinigung gegen Gebühr möglich. Bettwäsche und Handtücher können gemietet werden.'
        ],
        imageCaptions: {
            'patio.jpg': 'Sitzplatz im Freien',
            'terrace-garden.jpg': 'Terrasse & Garten',
            'terrace-entrance.jpg': 'Terrasse & Eingang',
            'kitchen.jpg': 'Küche',
            'living-room.jpg': 'Wohnzimmer',
            'tv.jpg': 'Fernseher',
            'toilet.jpg': 'WC',
            'washing-machine.jpg': 'Waschmaschine',
            'bedroom-twin.jpg': 'Schlafzimmer, 2 Betten',
            'bedroom.jpg': 'Schlafzimmer'
        },
        amenityLabels: {
            bed: '4 Betten',
            kitchen: 'Voll ausgestattete Küche',
            shower: 'Dusche & Waschmaschine',
            swimming: '2 km zum nächsten Badeplatz'
        },
        extraCosts: {}
    },

    'roda-stugan': {
        name: 'Lilla röda huset (Das kleine rote Haus)',
        shortDescription:
            'Schön gelegenes Ferienhaus von 2016 für 4 Personen, ganzjährig nutzbar und voll ausgestattet. Küche mit Kühlschrank und Gefrierfach, Dusche, WC und Waschmaschine. Wohnzimmer, Schlafzimmer und Schlafboden. In Löt im Osten von Öland, ca. 10 km von Köpingsvik.',
        description: [
            'Schön gelegenes Ferienhaus für 4 Personen, ganzjährig nutzbar und voll ausgestattet: Küche mit Kühlschrank und Gefrierfach, WC und Dusche, Waschmaschine, Wohnzimmer, Schlafzimmer und Schlafboden.',
            '15 km nach Borgholm, 10 km nach Köpingsvik. Ruhige, kinderfreundliche Umgebung. Haustiere sind nicht erlaubt. Rauchen im Haus ist nicht erlaubt.',
            'Endreinigung gegen Gebühr möglich. Bettwäsche und Handtücher können gemietet werden.'
        ],
        imageCaptions: {
            'terrace.jpg': 'Terrasse',
            'surroundings.jpg': 'Umgebung',
            'living-room.jpg': 'Wohnzimmer',
            'sleeping-loft.jpg': 'Schlafboden, 2 Betten',
            'bedroom.jpg': 'Schlafzimmer, 2 Betten',
            'open-plan.jpg': 'Offener Wohnbereich',
            'kitchenette.jpg': 'Küchenzeile',
            'bathroom-shower.jpg': 'Dusche',
            'bathroom-toilet.jpg': 'WC'
        },
        amenityLabels: {
            bed: '4 Betten',
            kitchen: 'Voll ausgestattete Küche',
            shower: 'Dusche & Waschmaschine',
            swimming: '2 km zum nächsten Badeplatz'
        },
        extraCosts: {}
    },

    'beiga-stugan': {
        name: 'Beiga stugan (Das beige Häuschen)',
        shortDescription:
            'Ferienhaus von 2021 für 6 Personen, ganzjährig nutzbar und voll ausgestattet. Küche mit Kühlschrank, Dusche, WC und Waschmaschine. Kombinierte Küche und Wohnzimmer, Schlafzimmer und Schlafboden. In Löt im Osten von Öland, ca. 10 km von Köpingsvik.',
        description: [
            'Neu gebautes Ferienhaus (2021) mit allem Komfort für den Urlaub.',
            'Zwei Schlafzimmer mit Doppelbetten, ein Schlafboden mit zwei Einzelbetten (mit Stehhöhe), kombinierte Küche und Wohnzimmer. Küche mit Kühl-/Gefrierschrank, Mikrowelle, Herd/Backofen und Spülmaschine. Dusche, WC und Waschmaschine.',
            '15 km nach Borgholm. Ruhige, kinderfreundliche Umgebung. Haustiere sind nicht erlaubt.',
            'Endreinigung gegen Gebühr möglich. Bettwäsche und Handtücher können gemietet werden.'
        ],
        imageCaptions: {
            'exterior.jpg': 'Das Haus von außen',
            'kitchen.jpg': 'Küche',
            'dining-entrance.jpg': 'Esstisch & Eingang',
            'living-room.jpg': 'Wohnzimmer',
            'bedroom-double.jpg': 'Schlafzimmer mit Doppelbett',
            'bedroom-singles.jpg': 'Schlafzimmer mit Einzelbetten',
            'bathroom.jpg': 'Badezimmer'
        },
        amenityLabels: {
            bed: '6 Betten',
            kitchen: 'Voll ausgestattete Küche',
            shower: 'Dusche & Waschmaschine',
            swimming: '2 km zum nächsten Badeplatz'
        },
        extraCosts: {}
    }
};
