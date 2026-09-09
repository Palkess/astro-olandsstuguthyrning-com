import type { HouseTexts } from './types';

/**
 * English. Drafted from `houses.sv.ts` — REVIEW REQUIRED by Jonas before launch
 * (plan D16). Keep in sync with the Swedish source when copy changes.
 *
 * Cottage names are kept in Swedish with a short English gloss, because guests
 * arrive having seen the Swedish name on Stugknuten.
 */
export const housesEn: HouseTexts = {
    'grona-stugan': {
        name: 'Gröna stugan (The Green Cottage)',
        shortDescription:
            'A charming cottage built in 2016 with everything you need for a holiday. Main bedroom (double bed), small bedroom (2 beds), living room with 2 sofa beds. Kitchen with fridge/freezer, microwave, hob/oven and dishwasher. Shower room with WC and washing machine. In Löt on eastern Öland, about 10 km from Köpingsvik.',
        description: [
            'A charming cottage built in 2016, with all the comforts you need on holiday.',
            'Large bedroom (double bed), small bedroom (2 beds), living room with 2 sofa beds, kitchen with fridge/freezer, microwave, hob/oven and dishwasher, shower room with WC, and a washing machine.',
            'Final cleaning can be arranged for a fee. Bed linen and towels are also available to hire.'
        ],
        imageCaptions: {
            'exterior-front.jpg': 'The cottage from the front',
            'dining-table.jpg': 'Kitchen table',
            'kitchen.jpg': 'Kitchen',
            'living-room.jpg': 'Living room',
            'open-plan.jpg': 'Open-plan area',
            'bathroom.jpg': 'Bathroom',
            'bedroom-singles.jpg': 'Bedroom with single beds',
            'bedroom-double.jpg': 'Bedroom with double bed',
            'terrace.jpg': 'Terrace',
            'terrace-view.jpg': 'View from the terrace',
            'exterior-overview.jpg': 'Overview'
        },
        amenityLabels: {
            bed: 'Sleeps 6',
            kitchen: 'Fully equipped kitchen',
            shower: 'Shower & washing machine',
            swimming: '2 km to the nearest beach'
        },
        extraCosts: {}
    },

    'vita-huset': {
        name: 'Vita huset (The White House)',
        shortDescription:
            'Set on a lovely plot, sleeping 6 + 2 (2 beds in the guest house). Three bedrooms, two of them upstairs. Fully equipped kitchen with hob/oven, fridge/freezer and dishwasher, shower room with WC, and a washing machine. A lovely garden for barbecue evenings. In Löt on eastern Öland, about 10 km from Köpingsvik.',
        description: [
            'The house sits on a lovely plot and sleeps 6 + 2 (2 beds in the guest house). It is in Löt on the eastern side of central Öland. Three bedrooms (6 newly bought single beds) — two upstairs, one downstairs — a fully equipped kitchen with hob/oven, fridge/freezer and dishwasher, shower and toilet, and a washing machine.',
            'Outside there is plenty of room for activities, plus garden furniture and a barbecue.',
            'No pets.'
        ],
        imageCaptions: {
            'exterior.jpg': 'The White House from outside',
            'guest-house.jpg': 'Guest house, 2 beds',
            'guest-house-bedroom.jpg': 'Guest house bedroom',
            'terrace.jpg': 'Terrace',
            'back-entrance.jpg': 'Back entrance',
            'entrance.jpg': 'Entrance',
            'living-room.jpg': 'Living room',
            'kitchen.jpg': 'Kitchen',
            'kitchen-2.jpg': 'Kitchen, second view',
            'dining-table.jpg': 'Dining table',
            'upstairs-hall.jpg': 'Upstairs hall',
            'bedroom-1.jpg': 'Bedroom 1 – 2 beds',
            'bedroom-2.jpg': 'Bedroom 2 – 2 beds',
            'bedroom-3.jpg': 'Bedroom 3 – 2 beds',
            'bathroom.jpg': 'Bathroom',
            'cot.jpg': 'Cot'
        },
        amenityLabels: {
            bed: 'Sleeps 6 + 2',
            kitchen: 'Fully equipped kitchen',
            shower: 'Shower & washing machine',
            swimming: '2 km to the nearest beach'
        },
        extraCosts: {
            'guest-house-beds': {
                description: '+ 2 extra beds in the guest house',
                price: 'SEK 2,000 / week'
            }
        }
    },

    'gula-stugan': {
        name: 'Gula stugan (The Yellow Cottage)',
        shortDescription:
            'A charming, beautifully located summer cottage sleeping 4, insulated for year-round use. Two rooms and a fully equipped kitchen. In Löt on eastern Öland, about 10 km from Köpingsvik.',
        description: [
            'A charming, beautifully located summer cottage, insulated for year-round use. Two rooms and a kitchen. Fully equipped.',
            '15 km to Borgholm. A quiet, child-friendly area. No pets. No smoking indoors.',
            'Final cleaning can be arranged for a fee. Bed linen and towels are also available to hire.'
        ],
        imageCaptions: {
            'patio.jpg': 'Patio',
            'terrace-garden.jpg': 'Terrace & garden',
            'terrace-entrance.jpg': 'Terrace & entrance',
            'kitchen.jpg': 'Kitchen',
            'living-room.jpg': 'Living room',
            'tv.jpg': 'TV',
            'toilet.jpg': 'Toilet',
            'washing-machine.jpg': 'Washing machine',
            'bedroom-twin.jpg': 'Bedroom, 2 beds',
            'bedroom.jpg': 'Bedroom'
        },
        amenityLabels: {
            bed: 'Sleeps 4',
            kitchen: 'Fully equipped kitchen',
            shower: 'Shower & washing machine',
            swimming: '2 km to the nearest beach'
        },
        extraCosts: {}
    },

    'roda-stugan': {
        name: 'Lilla röda huset (The Little Red House)',
        shortDescription:
            'A beautifully located cottage built in 2016, sleeping 4. Insulated for year-round use and fully equipped. Kitchen with fridge and freezer compartment, shower room with WC, washing machine. Living room, bedroom and sleeping loft. In Löt on eastern Öland, about 10 km from Köpingsvik.',
        description: [
            'A beautifully located, newly built cottage sleeping 4, insulated for year-round use. Fully equipped: kitchen with fridge and freezer compartment, WC and shower, washing machine, living room, bedroom and sleeping loft.',
            '15 km to Borgholm, 10 km to Köpingsvik. A quiet, child-friendly area. No pets. No smoking indoors.',
            'Final cleaning can be arranged for a fee. Bed linen and towels are available to hire.'
        ],
        imageCaptions: {
            'terrace.jpg': 'Terrace',
            'surroundings.jpg': 'Surroundings',
            'living-room.jpg': 'Living room',
            'sleeping-loft.jpg': 'Sleeping loft, 2 beds',
            'bedroom.jpg': 'Bedroom, 2 beds',
            'open-plan.jpg': 'Open-plan area',
            'kitchenette.jpg': 'Kitchenette',
            'bathroom-shower.jpg': 'Shower',
            'bathroom-toilet.jpg': 'Toilet'
        },
        amenityLabels: {
            bed: 'Sleeps 4',
            kitchen: 'Fully equipped kitchen',
            shower: 'Shower & washing machine',
            swimming: '2 km to the nearest beach'
        },
        extraCosts: {}
    },

    'beiga-stugan': {
        name: 'Beiga stugan (The Beige Cottage)',
        shortDescription:
            'Built in 2021, sleeping 6. Insulated for year-round use and fully equipped. Kitchen with fridge, shower room with WC, washing machine. Combined kitchen and living room, bedrooms and a sleeping loft. In Löt on eastern Öland, about 10 km from Köpingsvik.',
        description: [
            'A very charming newly built cottage (2021) with all the comforts you need on holiday.',
            'Two bedrooms with double beds, a sleeping loft with two single beds (full standing height), and a combined kitchen and living room. Kitchen with fridge/freezer, microwave, hob/oven and dishwasher. Shower room with WC and washing machine.',
            '15 km to Borgholm. A quiet, child-friendly area. No pets.',
            'Final cleaning can be arranged for a fee. Bed linen and towels are also available to hire.'
        ],
        imageCaptions: {
            'exterior.jpg': 'The cottage from outside',
            'kitchen.jpg': 'Kitchen',
            'dining-entrance.jpg': 'Kitchen table & entrance',
            'living-room.jpg': 'Living room',
            'bedroom-double.jpg': 'Bedroom with double bed',
            'bedroom-singles.jpg': 'Bedroom with single beds',
            'bathroom.jpg': 'Bathroom'
        },
        amenityLabels: {
            bed: 'Sleeps 6',
            kitchen: 'Fully equipped kitchen',
            shower: 'Shower & washing machine',
            swimming: '2 km to the nearest beach'
        },
        extraCosts: {}
    }
};
