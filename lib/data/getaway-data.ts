import { OfferingType, type Getaway } from '@/types/experience'

import { convertGoogleDriveLink } from '../media-utils'

export const getawaysData: Getaway[] = [
  {
    id: 1,
    type: OfferingType.GETAWAY,
    slug: 'kasol-manali',
    name: 'Kasol & Manali Getaway',
    tagline: 'Slow mornings. Mountain air. Nowhere to rush.',
    location: 'Kasol, Himachal Pradesh, India',
    region: 'Parvati Valley',
    duration: '3 Nights / 4 Days',
    maxGuests: 12,
    priceFrom: 7999,
    pricing: {
      perNight: 7999,
      currency: 'INR',
    },
    featured: true,
    active: true,

    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1hhrLuila_DgtMz38JsyKUrnIFhWBQ9u-/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1nmXVA7Xy8VxmtVuWFyzTGMXgjM2Y6Nv-/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1p9DRauKYF9oSHkufan7e8xL1Z--Klewc/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/142pcoYb5hXyb79YwPEtNmu6BNWXEW7pf/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1LCJZF-Z3PtnypWf4LLxF7aeeKmNkDf6z/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1cf8atNpkobMyj31ptt8V2SqZea9OaBco/view?usp=drive_link'
      ),
    ],

    description:
      'A quiet mountain stay in the heart of Parvati Valley, where the days move slower and the river is never far away. Wake up to pine-covered hills, spend afternoons wandering through Kasol, and return to a warm, familiar place in the evening. This is a stay designed for slowing down, meeting people, eating well, and remembering what it feels like to have nowhere else to be.',

    highlights: [
      'Stay in the heart of Parvati Valley',
      'Wake up to mountain and river views',
      'Slow mornings and relaxed evenings',
      'Easy access to Kasol village',
      'Explore nearby trails and cafés',
      'Experience local Himachali food',
      'Walk along the Parvati River',
      'Visit nearby mountain villages',
    ],

    roomDescription:
      'Comfortable mountain rooms designed to feel warm, simple and familiar. Expect clean interiors, comfortable beds, natural surroundings and the quiet atmosphere of the valley.',

    foodDescription:
      'Simple, wholesome meals inspired by the flavours of the mountains. Expect warm breakfasts, comforting dinners and locally inspired dishes prepared with care.',

    experienceDescription:
      'This is less about checking places off a list and more about living at the pace of the valley. Spend your mornings slowly, walk beside the Parvati River, discover cafés and trails, meet fellow travellers, and let the mountains do the rest.',

    meals: 'Breakfast & Dinner',

    amenities: [
      'Comfortable private rooms',
      'Mountain views',
      'Hot water',
      'Wi-Fi',
      'Housekeeping',
      'Common sitting area',
      'Local food',
      'Parking',
    ],

    thingsToDo: [
      'Walk along the Parvati River',
      'Explore Kasol village',
      'Walk to Chalal',
      'Discover riverside cafés',
      'Visit nearby mountain villages',
      'Explore local markets',
      'Take short nature walks',
      'Spend a quiet evening by the mountains',
    ],

    availableDates: [
      {
        date: '2026-10-01',
        spots: 5,
      },
      {
        date: '2026-11-15',
        spots: 3,
      },
    ],

    testimonials: [
      {
        name: 'Anjali Sharma',
        city: 'Gurugram',
        quote:
          "Best mountain stay I've experienced. Everything felt relaxed, personal and beautifully simple.",
        rating: 5,
      },
      {
        name: 'Rohan Gupta',
        city: 'Delhi',
        quote:
          'The food was amazing, the location was beautiful and the people made it feel like home.',
        rating: 5,
      },
    ],

    inclusions: [
      'Accommodation',
      'Breakfast',
      'Dinner',
      'Housekeeping',
      'Local assistance',
      'Access to common areas',
    ],

    exclusions: [
      'Transportation to Kasol',
      'Adventure activities',
      'Entry tickets',
      'Lunch',
      'Personal expenses',
    ],

    itinerary: [
      {
        day: 1,
        from: 'Kasol',
        to: 'Kasol',
        title: 'Arrival in Parvati Valley',
        description:
          'Arrive in Kasol, check in to your mountain homestay, and spend the afternoon unwinding by the river or exploring local cafés.',
      },
      {
        day: 2,
        from: 'Kasol',
        to: 'Chalal',
        title: 'Discovering Chalal',
        description:
          'Take a slow, scenic walk to the village of Chalal. Enjoy the pine forests and a quiet afternoon before returning to Kasol.',
      },
      {
        day: 3,
        from: 'Kasol',
        to: 'Manikaran',
        title: 'Manikaran & Local Villages',
        description:
          'Visit the hot springs at Manikaran or explore nearby mountain villages before returning to the homestay for a relaxed evening.',
      },
      {
        day: 4,
        from: 'Kasol',
        to: 'Kasol',
        title: 'Departure',
        description:
          'Wake up to a slow morning, enjoy your final mountain breakfast, and prepare for your onward journey.',
      },
    ],
  },

  {
    id: 2,
    type: OfferingType.GETAWAY,
    slug: 'dev-deepawali-varanasi',
    name: 'Dev Deepawali in Varanasi',
    tagline: 'A city of light. A river of stories. One unforgettable night.',
    location: 'Varanasi, Uttar Pradesh, India',
    region: 'Kashi',
    duration: '3 Nights / 4 Days',
    maxGuests: 12,
    priceFrom: 15999,
    pricing: {
      perNight: 15999,
      currency: 'INR',
    },
    featured: true,
    active: true,

    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1hEEq_dkTt8_NrNoworOZi-6_rUjMx3_Z/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1xNAhnn70te6NgY_mxR6e_uM5Z9Gs_4C-/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1-a8wc8kLFjlERLsv6HGuGFJBJR3OAQz4/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/19cqV7n3snvmP8PX7EHuzFmQKQcMTR8OF/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1zlX8jwPKIlBDWH5rhIMlnqtYUU-O1uy7/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1USVu--vgMZq_QbmP0Wx3e5wW50dxN5Po/view?usp=drive_link'
      ),
    ],

    description:
      'Come to Varanasi when Kashi glows at its brightest. During Dev Deepawali, thousands of lamps illuminate the ghats along the Ganga, turning the ancient city into a living celebration of light, faith and culture. We slow things down around the festival, giving you time to wander the old lanes, sit by the river, experience Kashi beyond the crowds, and witness the illuminated ghats from the Ganga.',

    highlights: [
      'Experience Dev Deepawali on 24 November 2026',
      'Witness the illuminated ghats of Varanasi',
      'Experience Dev Deepawali from the Ganga',
      'Evening Ganga Aarti',
      'Explore the old lanes and ghats of Kashi',
      'Visit Kashi Vishwanath',
      'Discover Varanasi beyond the festival crowds',
      'Slow mornings and unhurried evenings',
      'Travel with a small group',
    ],

    roomDescription:
      'A comfortable stay in Varanasi chosen for easy access to the old city and ghats. The idea is simple: a calm place to return to after long walks, early mornings and an unforgettable night on the Ganga.',

    foodDescription:
      'A mix of simple, comforting meals and local flavours, with time to discover the food of Banaras along the way.',

    experienceDescription:
      'Dev Deepawali is not something to simply watch and leave. We arrive early, settle into the rhythm of Kashi, explore its lanes and ghats, and make our way onto the Ganga as the city begins to glow. As thousands of lamps light up the riverfront, the evening becomes less about ticking off a landmark and more about being present for a moment that happens only once a year.',

    meals: 'Breakfast & selected meals',

    amenities: [
      'Comfortable accommodation',
      'Wi-Fi',
      'Hot water',
      'Common sitting area',
      'Local assistance',
    ],

    thingsToDo: [
      'Witness Dev Deepawali from the Ganga',
      'Walk through the old lanes of Varanasi',
      'Experience Ganga Aarti',
      'Visit Kashi Vishwanath',
      'Explore Assi Ghat',
      'Explore Dashashwamedh Ghat',
      'Discover local Banarasi food',
      'Spend time along the Ganga',
    ],

    availableDates: [
      {
        date: '2026-11-23',
        spots: 12,
      },
    ],

    testimonials: [],

    inclusions: [
      'Accommodation',
      'Breakfast',
      'Dev Deepawali Ganga experience',
      'Local assistance',
      'Curated experiences as per itinerary',
    ],

    exclusions: [
      'Travel to and from Varanasi',
      'Personal expenses',
      'Lunch unless specified',
      'Personal shopping',
      'Optional activities',
    ],

    itinerary: [
      {
        day: 1,
        from: 'Varanasi',
        to: 'Varanasi',
        title: 'Arrive in Kashi',
        description:
          'Check in to your stay, rest, and head out for a quiet evening walk along the ghats as the city begins to prepare for the festival.',
      },
      {
        day: 2,
        from: 'Varanasi',
        to: 'Kashi Vishwanath',
        title: 'Old Lanes & Vishwanath',
        description:
          'Explore the narrow alleys of Varanasi, visit Kashi Vishwanath, and discover the local food culture.',
      },
      {
        day: 3,
        from: 'Varanasi',
        to: 'Ganga',
        title: 'Dev Deepawali',
        description:
          'Experience the breathtaking sight of the illuminated ghats and thousands of lamps along the Ganga, followed by the grand Ganga Aarti.',
      },
      {
        day: 4,
        from: 'Varanasi',
        to: 'Varanasi',
        title: 'Farewell to the City of Light',
        description:
          'Enjoy a final morning by the river, have breakfast, and depart with unforgettable memories of Kashi.',
      },
    ],
  },

  {
    id: 3,
    type: OfferingType.GETAWAY,
    slug: 'hornbill-festival-nagaland',
    name: 'Hornbill Festival, Nagaland',
    tagline:
      'Three days of Naga culture, mountain villages, and the spirit of Hornbill.',
    location: 'Kisama & Zakhama, Nagaland, India',
    region: 'Nagaland',
    duration: '2 Nights / 3 Days',
    maxGuests: 12,
    priceFrom: 9500,
    pricing: {
      perNight: 4750,
      currency: 'INR',
    },
    featured: true,
    active: true,

    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1bFPm14-VvTZmg3aYwtLfp50kqFDEIDUH/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1cxn-D6Vh9uJDdRg9pOsRN82MH56-B638/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1ZXO50m7Hh5mJ20Unn4SSKdD8Rkxgd3De/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1ngfsS8oLL0UYJbeuErzwpX3sDoUyFKiY/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1YmMR-Mpuanb-sCIC9Y36eaqRWa4tTOxc/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/17h-qfIABLO5R7p5jT3sEG-wAkV4Mpe5k/view?usp=drive_link'
      ),
    ],

    description:
      'Experience the Hornbill Festival through the villages and landscapes of Nagaland. Stay at a local homestay in Zakhama, explore the village at an unhurried pace, and spend a day immersed in the colours, music, food, traditions, and performances of the Hornbill Festival. This is a short cultural escape designed to go beyond the festival grounds and give you a glimpse into everyday life in Nagaland.',

    highlights: [
      'Experience the Hornbill Festival',
      'Stay at a local homestay in Zakhama',
      'Explore Zakhama village',
      'Spend a full day at the Hornbill Festival',
      'Local sightseeing around Kohima',
      'Visit the World War II Museum',
      'Travel with a local tour guide',
      'Private transportation from Dimapur',
      'Experience Naga culture and hospitality',
    ],

    roomDescription:
      'Stay for two nights at a comfortable local homestay in Zakhama. The experience is simple, warm, and close to the surrounding villages and mountains.',

    foodDescription:
      'Enjoy home-style meals at the homestay, including breakfast and dinner. The meals offer a chance to experience the simple, comforting flavours of Nagaland.',

    experienceDescription:
      'The Hornbill Festival is only part of the experience. Stay in Zakhama, walk through the village, meet local people, and take time to experience Nagaland beyond the festival grounds. Spend a day surrounded by Naga music, dance, food, crafts, and traditions before returning to the quiet of the homestay.',

    meals: 'Breakfast & Dinner',

    amenities: [
      'Local homestay',
      'Breakfast',
      'Dinner',
      'Tour guide',
      'Private transportation',
      'Local assistance',
    ],

    thingsToDo: [
      'Explore Zakhama village',
      'Experience the Hornbill Festival',
      'Explore local Naga culture',
      'Enjoy traditional performances',
      'Discover Naga food and crafts',
      'Visit the World War II Museum',
      'Explore nearby local sights',
      'Spend a quiet evening at the homestay',
    ],

    availableDates: [
      {
        date: '2026-12-01',
        spots: 12,
      },
    ],

    testimonials: [],

    inclusions: [
      '2 nights accommodation at Zakhama homestay',
      'Breakfast (Day 1, 2, 3)',
      'Dinner',
      'Car transportation (Dimapur pickup & drop)',
      'Local tour guide',
      'Hornbill Festival entry fee',
      'Local sightseeing as per itinerary',
    ],

    exclusions: [
      'Lunch',
      'Personal expenses',
      'Travel to and from Dimapur',
      'Anything not mentioned under inclusions',
    ],

    itinerary: [
      {
        day: 1,
        from: 'Dimapur',
        to: 'Zakhama',
        title: 'Dimapur to Zakhama',
        description:
          'Pickup from Dimapur and a scenic drive to your homestay in Zakhama. Spend the evening settling in and enjoying a warm local dinner.',
      },
      {
        day: 2,
        from: 'Zakhama',
        to: 'Kisama',
        title: 'The Hornbill Experience',
        description:
          'Head to Kisama Heritage Village for a full day of the Hornbill Festival. Witness traditional dances, taste local delicacies, and explore Naga culture.',
      },
      {
        day: 3,
        from: 'Kohima',
        to: 'Dimapur',
        title: 'WW2 Museum & Departure',
        description:
          'Visit the historic Kohima War Cemetery and World War II Museum before starting your journey back to Dimapur.',
      },
    ],
  },
]
