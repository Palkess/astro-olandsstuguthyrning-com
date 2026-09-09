import type { HouseTexts } from './types';

/**
 * Swedish is the source of truth. English and German are drafted from this file;
 * when copy changes, change it here first.
 *
 * Captions marked "deduped" differed from the database export, where several
 * photos of the same cottage shared an identical caption (three "Sovrum 2 bäddar"
 * in Vita huset, two "Gäststuga 2 bäddar", two "Badrum" in Lilla röda huset).
 * Identical captions in a lightbox tell the visitor nothing about which room
 * they're looking at.
 */
export const housesSv: HouseTexts = {
    'grona-stugan': {
        name: 'Gröna stugan',
        shortDescription:
            'En mycket charmig stuga nybyggd 2016 med alla bekvämligheter man behöver på semestern. Sovrummet (dubbelsäng), lilla sovrummet (2 bäddar). Vardagsrummet med 2 bäddsoffor. Kök med kyl/frys, micro, spis/ugn, diskmaskin. Wc/dusch och tvättmaskin. Stugan ligger i Löt på östra Öland ca 10 km från Köpingsvik.',
        description: [
            'En mycket charmig stuga nybyggd 2016 med alla bekvämligheter man behöver ha på semestern.',
            'Stora sovrummet (dubbelsäng), lilla sovrummet (2 bäddar), vardagsrummet med 2 bäddsoffor, kök med kyl/frys, micro, spis/ugn, diskmaskin, wc/dusch och tvättmaskin.',
            'Slutstädning kan beställas mot avgift. Även sänglinne och handdukar kan hyras.'
        ],
        imageCaptions: {
            'exterior-front.jpg': 'Stugan framifrån',
            'dining-table.jpg': 'Köksbord',
            'kitchen.jpg': 'Kök',
            'living-room.jpg': 'Vardagsrum',
            'open-plan.jpg': 'Planyta',
            'bathroom.jpg': 'Badrum',
            'bedroom-singles.jpg': 'Sovrum enkla bäddar',
            'bedroom-double.jpg': 'Sovrum dubbelsäng',
            'terrace.jpg': 'Altan',
            'terrace-view.jpg': 'Altan utåt',
            'exterior-overview.jpg': 'Översikt'
        },
        amenityLabels: {
            bed: '6 bäddar',
            kitchen: 'Fullt utrustat kök',
            shower: 'Dusch & tvättmaskin',
            swimming: '2 km till närmaste badplats'
        },
        extraCosts: {}
    },

    'vita-huset': {
        name: 'Vita huset',
        shortDescription:
            'Stugan ligger på en härlig tomt och erbjuder 6 + 2 bäddar (2 bäddar i gäststugan). Huset består av 3 sovrum, 2 av dem ligger på övervåningen en trappa upp. Fullt utrustat kök spis/ugn, kyl/frys, diskmaskin, wc/dusch och tvättmaskin. En härlig trädgård för mysiga grillkvällar. Stugan ligger i Löt på östra Öland ca 10 km från Köpingsvik.',
        description: [
            'Stugan ligger på en härlig tomt och erbjuder 6 + 2 bäddar (2 bäddar i gäststugan). Den ligger i Löt på mellersta Öland, östra sidan. Huset består av 3 sovrum (6 nyinköpta enkelsängar), två sovrum ligger på övervåningen en trappa upp, ett sovrum nere, fullt utrustat kök med spis/ugn, kyl/frys, diskmaskin, dusch och toalett, tvättmaskin.',
            'Utomhus finns plats för aktiviteter, även utemöbler och grill.',
            'Husdjur ej tillåtna.'
        ],
        imageCaptions: {
            'exterior.jpg': 'Vita huset utifrån',
            'guest-house.jpg': 'Gäststuga 2 bäddar',
            'guest-house-bedroom.jpg': 'Gäststugans sovrum',
            'terrace.jpg': 'Altan',
            'back-entrance.jpg': 'Bakentré',
            'entrance.jpg': 'Entré',
            'living-room.jpg': 'Vardagsrum',
            'kitchen.jpg': 'Kök',
            'kitchen-2.jpg': 'Köket, vy 2',
            'dining-table.jpg': 'Matbord',
            'upstairs-hall.jpg': 'Hall på övervåningen',
            'bedroom-1.jpg': 'Sovrum 1 – 2 bäddar',
            'bedroom-2.jpg': 'Sovrum 2 – 2 bäddar',
            'bedroom-3.jpg': 'Sovrum 3 – 2 bäddar',
            'bathroom.jpg': 'Badrum',
            'cot.jpg': 'Barnsäng'
        },
        amenityLabels: {
            bed: '6 + 2 bäddar',
            kitchen: 'Fullt utrustat kök',
            shower: 'Dusch & tvättmaskin',
            swimming: '2 km till närmaste badplats'
        },
        extraCosts: {
            'guest-house-beds': {
                description: '+ 2 extra bäddar i gäststuga',
                price: '2 000 kr / vecka'
            }
        }
    },

    'gula-stugan': {
        name: 'Gula stugan',
        shortDescription:
            'Vackert belägen charmig sommarstuga för 4 bäddar med åretruntstandard. 2 rum och kök, fullt utrustat. Stugan ligger i Löt på östra Öland ca 10 km från Köpingsvik.',
        description: [
            'Vackert belägen charmig sommarstuga med åretruntstandard. 2 rum och kök. Fullt utrustad.',
            '15 km till Borgholm. Lugnt och barnvänligt område. Husdjur ej tillåtna. Rökning inomhus ej tillåten.',
            'Slutstädning kan beställas mot avgift. Även sänglinne och handdukar kan hyras.'
        ],
        imageCaptions: {
            'patio.jpg': 'Uteplats',
            'terrace-garden.jpg': 'Altan & trädgård',
            'terrace-entrance.jpg': 'Altan & entré',
            'kitchen.jpg': 'Kök',
            'living-room.jpg': 'Vardagsrum',
            'tv.jpg': 'Tv',
            'toilet.jpg': 'Toalett',
            'washing-machine.jpg': 'Tvättmaskin',
            'bedroom-twin.jpg': 'Sovrum 2 bäddar',
            'bedroom.jpg': 'Sovrum'
        },
        amenityLabels: {
            bed: '4 bäddar',
            kitchen: 'Fullt utrustat kök',
            shower: 'Dusch & tvättmaskin',
            swimming: '2 km till närmaste badplats'
        },
        extraCosts: {}
    },

    'roda-stugan': {
        name: 'Lilla röda huset',
        shortDescription:
            'Vackert belägen stuga, nybyggd 2016, med 4 bäddar. Åretruntstandard och fullt utrustad. Kök, kyl och frysfack, wc/dusch, tvättmaskin. Vardagsrum, sovrum och sovloft. Stugan ligger i Löt på östra Öland ca 10 km från Köpingsvik.',
        description: [
            'Vackert belägen nybyggd stuga, 4 bäddar, med åretruntstandard. Fullt utrustad. Kök, kyl och frysfack, wc och dusch, tvättmaskin, vardagsrum, sovrum och sovloft.',
            '15 km till Borgholm, 10 km till Köpingsvik. Lugnt och barnvänligt område. Husdjur ej tillåtna. Rökning inomhus ej tillåten.',
            'Slutstädning kan beställas mot avgift. Sänglinne och handdukar kan hyras.'
        ],
        imageCaptions: {
            'terrace.jpg': 'Altan',
            'surroundings.jpg': 'Omgivning',
            'living-room.jpg': 'Vardagsrum',
            'sleeping-loft.jpg': 'Sovloft 2 bäddar',
            'bedroom.jpg': 'Sovrum 2 bäddar',
            'open-plan.jpg': 'Planyta',
            'kitchenette.jpg': 'Köksvrå',
            'bathroom-shower.jpg': 'Dusch',
            'bathroom-toilet.jpg': 'Toalett'
        },
        amenityLabels: {
            bed: '4 bäddar',
            kitchen: 'Fullt utrustat kök',
            shower: 'Dusch & tvättmaskin',
            swimming: '2 km till närmaste badplats'
        },
        extraCosts: {}
    },

    'beiga-stugan': {
        name: 'Beiga stugan',
        shortDescription:
            'Nybyggd 2021 med 6 bäddar. Åretruntstandard och fullt utrustad. Kök, kyl, wc/dusch, tvättmaskin. Kombinerat kök och vardagsrum, sovrum och sovloft. Stugan ligger i Löt på östra Öland ca 10 km från Köpingsvik.',
        description: [
            'En mycket charmig nybyggd stuga (2021) med alla bekvämligheter man behöver ha på semestern.',
            'Två sovrum med dubbelsängar, ett sovloft med två enkelsängar (ståhöjd på loftet), kombinerat kök och vardagsrum. Kök med kyl/frys, micro, spis/ugn och diskmaskin. Wc/dusch med tvättmaskin.',
            '15 km till Borgholm. Lugnt och barnvänligt område. Husdjur ej tillåtna.',
            'Slutstädning kan beställas mot avgift. Även sänglinne och handdukar kan hyras.'
        ],
        imageCaptions: {
            'exterior.jpg': 'Stugan utifrån',
            'kitchen.jpg': 'Kök',
            'dining-entrance.jpg': 'Köksbord & entré',
            'living-room.jpg': 'Vardagsrum',
            'bedroom-double.jpg': 'Sovrum dubbelsäng',
            'bedroom-singles.jpg': 'Sovrum enkla bäddar',
            'bathroom.jpg': 'Badrum'
        },
        amenityLabels: {
            bed: '6 bäddar',
            kitchen: 'Fullt utrustat kök',
            shower: 'Dusch & tvättmaskin',
            swimming: '2 km till närmaste badplats'
        },
        extraCosts: {}
    }
};
