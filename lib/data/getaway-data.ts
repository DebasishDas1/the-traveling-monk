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
      'A quiet mountain stay in the heart of Parvati Valley, where the days move slower and the river is never far away. Wake up to pine-covered hills, spend afternoons wandering through Kasol, and return to a warm, familiar place in the evening. This is a stay designed for slowing down, meeting people, and remembering what it feels like to have nowhere else to be.',

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
        from: 'Delhi',
        to: 'Manali',
        title: 'Depart from Delhi',
        description:
          'Depart from Delhi in the evening and begin your overnight journey towards Manali.',
        pointers: [
          'Depart from Delhi',
          'Overnight journey',
          'Travel towards Manali',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/14UVybCLsuafxQRoM9NqxEjmKlhLDcDPC/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        from: 'Delhi',
        to: 'Manali',
        title: 'Arrive in Manali & Local Sightseeing',
        description:
          'Arrive in Manali, check in to your stay, and explore the town and its surrounding attractions at a relaxed pace.',
        pointers: [
          'Arrive in Manali',
          'Hotel check-in',
          'Local sightseeing',
          'Explore Manali',
          'Relaxed evening',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1cf8atNpkobMyj31ptt8V2SqZea9OaBco/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        from: 'Manali',
        to: 'Solang Valley',
        title: 'Adventure & Snow at Solang Valley',
        description:
          'Head to Solang Valley for a day surrounded by spectacular mountain scenery. Enjoy adventure and snow activities depending on the season and weather conditions.',
        pointers: [
          'Visit Solang Valley',
          'Mountain views',
          'Adventure activities',
          'Snow activities',
          'Explore Solang Valley',
          'Return to Manali',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1TDK8Z6qkIKpLWRaduiG8fbBlDDKVk8XY/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        from: 'Manali',
        to: 'Kasol',
        title: 'Manali to Kasol & Parvati Valley',
        description:
          'Travel from Manali to Kasol through scenic mountain roads and arrive in the heart of Parvati Valley. Spend the day exploring Kasol and its peaceful riverside surroundings.',
        pointers: [
          'Depart from Manali',
          'Scenic mountain drive',
          'Arrive in Kasol',
          'Explore Parvati Valley',
          'Walk along the Parvati River',
          'Explore local cafés and village surroundings',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1kk8sMuXftcNU4yhe1CRW_NzNuzghuLkA/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        from: 'Kasol',
        to: 'Delhi',
        title: 'Relax in Kasol & Depart for Delhi',
        description:
          'Enjoy a relaxed morning in Kasol, take a final walk through the village or along the Parvati River, and begin the journey back to Delhi.',
        pointers: [
          'Relaxed morning',
          'Explore Kasol',
          'Parvati River walk',
          'Free time',
          'Depart for Delhi',
          'Journey back home',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1SuxeISGGYu-EJWACdoQ2aE_JQ67cnP5H/view?usp=drive_link'
        ),
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
      'Come to Varanasi when Kashi glows at its brightest. During Dev Deepawali, thousands of lamps illuminate the ghats along the Ganga, turning the ancient city into a living celebration of light, faith and culture. Explore the sacred temples, heritage of Kashi, vibrant local markets, and the spiritual rhythm of the Ganga before experiencing the spectacular Dev Deepawali celebrations from the river.',

    highlights: [
      'Experience Dev Deepawali on 24 November 2026',
      'Visit Kashi Vishwanath Temple',
      'Seek blessings at Kal Bhairav and Annapurna Devi Temple',
      'Experience Subhe Banaras at Assi Ghat',
      'Visit Sankat Mochan Temple and Durga Kund Temple',
      'Explore Banaras Hindu University and BHU Vishwanath Temple',
      'Enjoy an exclusive Dev Deepawali evening boat ride',
      'Witness illuminated ghats, Ganga Aarti and Deep Daan',
      'Experience cultural performances, drone and laser shows',
      'Enjoy authentic Banarasi snacks',
      'Visit Sarnath and Sarvaved Mahamandir Dham',
      'Professional photography session',
    ],

    roomDescription:
      'Stay in selected 3-star or 4-star hotels on a comfortable double-sharing or triple-sharing basis, offering a convenient and relaxing base for exploring the spiritual and cultural heart of Varanasi.',

    availableDates: [
      {
        date: '2026-11-23',
        spots: 12,
      },
    ],

    inclusions: [
      'Accommodation on double-sharing or triple-sharing basis',
      'Accommodation in selected 3-star or 4-star hotels',
      'Daily breakfast at the hotel (3 breakfasts)',
      'Darshan at Kashi Vishwanath Temple',
      'Darshan at Kal Bhairav Temple',
      'Darshan at Annapurna Devi Temple',
      'Visit to Sankat Mochan Temple',
      'Visit to Durga Kund Temple',
      'Visit to BHU Vishwanath Temple',
      'Excursion to Sarnath',
      'Visit to Sarvaved Mahamandir Dham',
      'Exclusive evening boat ride during Dev Deepawali',
      'Welcome session',
      'Authentic Banarasi snacks',
      'Deep Daan ceremony',
      'Ganga Aarti experience',
      'Professional photography session',
      'Access to cultural performances',
      'Laser show',
      'Drone show',
      'Fireworks',
      'Airport or railway station pickup and drop-off',
      'Private air-conditioned vehicle according to group size',
      'Experienced local tour guide',
      'All toll taxes',
      'Parking charges',
      'Fuel expenses',
      'Driver allowances',
      'Dedicated Travzee tour manager',
      'On-ground assistance',
      'All applicable taxes',
    ],

    exclusions: [
      'Airfare and train tickets to and from Varanasi',
      'Early check-in charges',
      'Late check-out charges',
      'VIP Darshan',
      'Special entry fees',
      'Pandit fees',
      'Lunch',
      'Dinner',
      'Meals not specifically mentioned in the inclusions',
      'Drinks',
      'Bottled water',
      'Beverages',
      'Refreshments except those mentioned in the inclusions',
      'Personal expenses',
      'Shopping',
      'Laundry',
      'Porterage',
      'Tips',
      'Camera and videography charges at temples, museums, and monuments',
      'Travel insurance',
      'Medical expenses',
      'Emergency evacuation charges',
      'Additional expenses arising from changes in government taxes',
      'Fuel surcharges',
      'Transportation cost increases after booking',
      'Expenses caused by delays',
      'Natural calamities',
      'Road closures',
      'Weather conditions',
      'Other unforeseen circumstances',
      'Any services not specifically mentioned under the package inclusions',
    ],

    itinerary: [
      {
        day: 1,
        from: 'Varanasi Airport / Railway Station',
        to: 'Varanasi',
        title: 'Arrival & Introduction to Kashi',
        description:
          'Arrive in Varanasi around noon and check in to your hotel. Begin your Kashi experience with visits to the sacred Kashi Vishwanath Temple, Annapurna Devi Temple, and Kal Bhairav Temple. Later, explore the spiritual charm of the ancient city and its vibrant local markets before returning to the hotel for an overnight stay.',
        pointers: [
          'Arrival at Varanasi Airport or Railway Station',
          'Airport / railway station pickup around 12 PM',
          'Hotel check-in',
          'Visit Kashi Vishwanath Temple',
          'Visit Annapurna Devi Temple',
          'Visit Kal Bhairav Temple',
          'Explore ancient streets and local markets',
          'Experience the spiritual atmosphere of Kashi',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1TLL6P6IG_ZrESbghVPz0QJ3X2rMA92f1/view?usp=drive_link'
        ),
      },

      {
        day: 2,
        from: 'Assi Ghat',
        to: 'Assi Ghat',
        title: 'Heritage of Kashi',
        description:
          'Begin the morning with the Subhe Banaras experience and Ganga Aarti at Assi Ghat. After breakfast, explore some of Kashi’s important spiritual and educational landmarks, including Sankat Mochan Temple, Durga Kund Temple, and the Banaras Hindu University campus with its Vishwanath Temple. Return to Assi Ghat in the evening for another Ganga Aarti, with an optional boat ride.',
        pointers: [
          'Early morning Subhe Banaras at Assi Ghat',
          'Morning Ganga Aarti',
          'Breakfast at hotel',
          'Visit Sankat Mochan Temple',
          'Visit Durga Kund Temple',
          'Explore Banaras Hindu University campus',
          'Visit BHU Vishwanath Temple',
          'Evening Ganga Aarti at Assi Ghat',
          'Optional boat ride',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1USVu--vgMZq_QbmP0Wx3e5wW50dxN5Po/view?usp=drive_link'
        ),
      },

      {
        day: 3,
        from: 'Varanasi',
        to: 'Ganga',
        title: 'Dev Deepawali Celebration',
        description:
          'Enjoy breakfast and a relaxed morning before preparing for the grand evening celebrations. Capture your journey with a professional photography session, then board an evening boat for a magical sunset ride along the Ganges. Witness the ghats illuminated with millions of diyas, followed by Ganga Aarti, devotional chants, cultural performances, drone and laser shows, spectacular fireworks, and authentic Banarasi festive snacks.',
        pointers: [
          'Breakfast at hotel',
          'Leisure time',
          'Prepare for Dev Deepawali celebrations',
          'Professional photography session',
          'Sunset boat ride on the Ganges',
          'Witness millions of illuminated diyas',
          'Grand Ganga Aarti',
          'Devotional chants',
          'Cultural performances',
          'Drone show',
          'Laser show',
          'Spectacular fireworks',
          'Authentic Banarasi snacks',
          'Festive celebrations',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/19cqV7n3snvmP8PX7EHuzFmQKQcMTR8OF/view?usp=drive_link'
        ),
      },

      {
        day: 4,
        from: 'Varanasi',
        to: 'Varanasi Airport / Railway Station',
        title: 'Temples, Heritage & Farewell',
        description:
          'Enjoy breakfast before checking out and heading to Sarnath, the sacred site where Lord Buddha delivered his first sermon after attaining enlightenment. Continue to Sarvaved Mahamandir Dham before transferring to the airport or railway station with cherished memories of Dev Deepawali and the eternal city of Kashi.',
        pointers: [
          'Breakfast at hotel',
          'Hotel check-out',
          'Visit Sarnath',
          'Explore the UNESCO World Heritage Site',
          'Visit Sarvaved Mahamandir Dham',
          'Transfer to airport or railway station',
          'Departure around 5 PM',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1zlX8jwPKIlBDWH5rhIMlnqtYUU-O1uy7/view?usp=drive_link'
        ),
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

    priceFrom: 10500,
    pricing: {
      perNight: 9500,
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
      'Experience the Hornbill Festival through the villages and landscapes of Nagaland. Stay for two nights at a local homestay in Zakhama, explore the village at an unhurried pace, and spend a full day immersed in the colours, music, food, traditions, and performances of the Hornbill Festival.',

    highlights: [
      'Experience the Hornbill Festival',
      'Stay for 2 nights at a local homestay in Zakhama',
      'Explore Zakhama village',
      'Spend a full day at the Hornbill Festival',
      'Local sightseeing',
      'Visit the World War II Museum',
      'Travel with a local tour guide',
      'Private transportation from Dimapur',
      'Experience Naga culture and hospitality',
    ],

    roomDescription:
      'Stay for two nights at a comfortable local homestay in Zakhama. The experience is simple, warm, and close to the surrounding villages and mountains.',

    availableDates: [
      {
        date: '2026-12-01',
        spots: 12,
      },
    ],

    inclusions: [
      'Transportation from Dimapur to Zakhama and back',
      '2 nights homestay accommodation',
      'Breakfast',
      'Dinner',
      'Tour guide',
      'Hornbill Festival entry fee',
      'Local sightseeing',
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
        title: 'Dimapur to Zakhama Homestay',
        description:
          'Pickup from Dimapur and transfer to your homestay in Zakhama. Spend the rest of the day enjoying local sightseeing and leisure time before dinner at the homestay.',
        pointers: [
          'Pickup from Dimapur',
          'Transfer to Zakhama',
          'Check-in at homestay',
          'Local sightseeing',
          'Leisure time',
          'Dinner at homestay',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1nYexCj3FEbskGx_-ZpyhWvF9gz72jbMU/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        from: 'Zakhama',
        to: 'Kisama',
        title: 'Zakhama Village & Hornbill Festival',
        description:
          'Enjoy breakfast at the homestay, explore Zakhama village, and then head to the Hornbill Festival for a full day of cultural performances, food, music, and local traditions. Return to the homestay after the festival.',
        pointers: [
          'Breakfast',
          'Explore Zakhama village',
          'Visit Hornbill Festival',
          'Traditional performances',
          'Naga food and culture',
          'Festival exploration',
          'Return to homestay',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1ZXO50m7Hh5mJ20Unn4SSKdD8Rkxgd3De/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        from: 'Zakhama',
        to: 'Dimapur',
        title: 'World War II Museum & Departure',
        description:
          'Enjoy breakfast before visiting the World War II Museum and exploring the historic surroundings. After sightseeing, transfer back to Dimapur.',
        pointers: [
          'Breakfast',
          'Visit World War II Museum',
          'Local sightseeing',
          'Transfer to Dimapur',
          'Drop-off in Dimapur',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1IQFceCF2mUKBGdRTBOSRj-41d3_HvIxi/view?usp=drive_link'
        ),
      },
    ],
  },

  {
    id: 4,
    type: OfferingType.GETAWAY,
    slug: 'darjeeling-kalimpong-offbeat',
    name: 'Darjeeling & Kalimpong Offbeat Getaway',
    tagline:
      'Hidden Himalayan villages, misty tea gardens, and peaceful mountain escapes.',
    location: 'Darjeeling & Kalimpong, West Bengal, India',
    region: 'Eastern Himalayas',
    duration: '4 Nights / 5 Days',

    priceFrom: 14999,
    pricing: {
      perNight: 14999,
      currency: 'INR',
    },

    featured: true,
    active: true,

    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1z292kDa_EqAMUVfOwm3UChBDILuGitvQ/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1yplWdlBDAjRGBbp3hjoipwjX0BZIhRdD/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1fmPBw-g1-6dSoSmyLas1PbT9HedDr52c/view?usp=drive_link'
      ),
    ],

    description:
      'Discover the quieter side of the Eastern Himalayas on this 4-night journey through Rishop, Takdah, Darjeeling, and the scenic landscapes of Kalimpong. Experience peaceful mountain villages, panoramic viewpoints, historic monasteries, lush tea gardens, and the timeless charm of Darjeeling. From sunrise at Tiger Hill to the tranquil waters of Mirik Lake, this journey combines offbeat destinations with iconic Himalayan experiences.',

    highlights: [
      'Explore the peaceful mountain village of Rishop',
      'Visit Lava Monastery and Lava View Point',
      'Discover Kalimpong and its scenic viewpoints',
      'Explore Deolo Park and Morgan House',
      'Visit Pine View Nursery and Kalimpong Monastery',
      'Enjoy the scenic Peshok Tea Garden',
      'Stay in the tranquil surroundings of Takdah',
      'Explore Lamahatta Eco Park and Gumbadara View Point',
      'Witness sunrise at Tiger Hill',
      'Visit Batasia Loop and Ghoom Monastery',
      'Explore Padmaja Naidu Himalayan Zoological Park and Himalayan Mountaineering Institute',
      'Visit Peace Pagoda and Japanese Temple',
      'Enjoy the scenic route through Lepchajagat and Mirik',
      'Visit Simana View Point and Gopaldhara Tea Estate',
      'Experience the beauty of Mirik Lake',
    ],

    roomDescription:
      'Enjoy comfortable hotel and homestay accommodation across Rishop, Takdah, and Darjeeling. Experience peaceful mountain surroundings, welcoming hospitality, and relaxing stays throughout your Himalayan journey.',

    availableDates: [
      {
        date: '2026-10-10',
        spots: 8,
      },
      {
        date: '2026-11-05',
        spots: 6,
      },
      {
        date: '2026-12-18',
        spots: 10,
      },
    ],

    inclusions: [
      'Hotel and homestay accommodation for 4 nights',
      'NJP pickup and drop-off',
      'Private vehicle for transfers and sightseeing',
      'All meals from Day 1 lunch through Day 5 breakfast',
      'Sightseeing as specified in the itinerary',
    ],

    exclusions: [
      'Food and beverages outside the included meal plan',
      'Entry fees at sightseeing attractions',
      'Personal expenses',
      'Optional activities not mentioned in the inclusions',
      'Any services not specifically mentioned under inclusions',
    ],

    itinerary: [
      {
        day: 1,
        from: 'NJP',
        to: 'Rishop',
        title: 'NJP Pickup & Transfer to Rishop',
        description:
          'Meet your driver at NJP Railway Station and begin your journey into the Eastern Himalayas. Travel towards the peaceful village of Rishop and explore its natural surroundings, visiting Lava Monastery and Lava View Point before settling into your mountain stay.',
        pointers: [
          'Pickup from NJP Railway Station',
          'Scenic drive towards Rishop',
          'Visit Lava Monastery',
          'Explore Lava View Point',
          'Check in to your hotel or homestay',
          'Dinner and overnight stay in Rishop',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1lHarDK_B3yX8Fwd4ggl5HbQaSexIfOge/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        from: 'Rishop',
        to: 'Takdah',
        title: 'Rishop to Takdah via Kalimpong',
        description:
          'After breakfast, travel towards Takdah via Kalimpong and Teesta Bazaar. Discover Kalimpong’s viewpoints, colonial heritage, monasteries, and beautiful nurseries before continuing through the scenic Peshok Tea Garden to Takdah.',
        pointers: [
          'Breakfast and departure from Rishop',
          'Visit Deolo Park',
          'Explore Morgan House',
          'Visit Pine View Nursery',
          'Visit Kalimpong Monastery',
          'Stop at Lovers Meet View Point',
          'Pass through Teesta Bazaar',
          'Enjoy the scenery at Peshok Tea Garden',
          'Check in and overnight stay in Takdah',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1wyUD5tDiCQhXRrlVn7YRZJzLR_qLFZZl/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        from: 'Takdah',
        to: 'Darjeeling',
        title: 'Takdah to Darjeeling via Scenic Viewpoints',
        description:
          'Enjoy the peaceful atmosphere of Takdah before heading towards Darjeeling. En route, stop at Gumbadara View Point and Lamahatta Eco Park to admire the mountain scenery and forest surroundings. Continue to Darjeeling for check-in and a relaxed evening.',
        pointers: [
          'Breakfast at the accommodation',
          'Depart from Takdah',
          'Stop at Gumbadara View Point',
          'Explore Lamahatta Eco Park',
          'Drive to Darjeeling',
          'Hotel check-in',
          'Evening at leisure',
          'Overnight stay in Darjeeling',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1fmPBw-g1-6dSoSmyLas1PbT9HedDr52c/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        from: 'Darjeeling',
        to: 'Darjeeling',
        title: 'Tiger Hill Sunrise & Darjeeling Sightseeing',
        description:
          'Start early with a sunrise excursion to Tiger Hill, followed by visits to Batasia Loop and Ghoom Monastery. After breakfast, explore Darjeeling’s famous zoo, Himalayan Mountaineering Institute, Peace Pagoda, Japanese Temple, and tea garden, subject to opening hours and local conditions.',
        pointers: [
          'Early morning visit to Tiger Hill',
          'Visit Batasia Loop',
          'Explore Ghoom Monastery',
          'Return for breakfast',
          'Visit Padmaja Naidu Himalayan Zoological Park',
          'Visit Himalayan Mountaineering Institute',
          'Explore Peace Pagoda',
          'Visit Japanese Temple',
          'Explore a local tea garden',
          'Overnight stay in Darjeeling',
        ],
        imageUrl:
          'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      },
      {
        day: 5,
        from: 'Darjeeling',
        to: 'NJP',
        title: 'Darjeeling to NJP via Mirik',
        description:
          'After breakfast, check out and begin your return journey to NJP via the scenic Mirik route. Enjoy stops around Lepchajagat, Simana View Point, the India–Nepal border area near Pashupati, Gopaldhara Tea Estate, and Mirik Lake before your drop-off.',
        pointers: [
          'Breakfast and hotel check-out',
          'Depart from Darjeeling',
          'Visit Lepchajagat',
          'Stop at Simana View Point',
          'Visit the Pashupati border area, subject to access restrictions',
          'Explore Gopaldhara Tea Estate',
          'Visit Mirik Lake',
          'Drop-off at NJP Railway Station',
        ],
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1qiXT4KiQ_JHopzr6dMBQMLJSWch1u9Jz/view?usp=drive_link'
        ),
      },
    ],
  },

  {
    id: 5,
    type: OfferingType.GETAWAY,
    slug: 'gangtok-sikkim-tour',
    name: 'Sikkim & Gangtok Mountain Getaway',
    tagline: 'Sacred lakes, Himalayan views, and the vibrant charm of Gangtok.',
    location: 'Gangtok, Sikkim, India',
    region: 'Eastern Himalayas',
    duration: '3 Nights / 4 Days',

    priceFrom: 12499,
    pricing: {
      perNight: 12499,
      currency: 'INR',
    },

    featured: true,
    active: true,

    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    ],

    description:
      'Experience the beauty of Sikkim on this 3-night Gangtok getaway, combining Himalayan landscapes, sacred monasteries, peaceful lakes, and lively local markets. Travel along the scenic Teesta Valley, explore the highlights of Gangtok, and take an excursion to Tsomgo Lake and Baba Harbhajan Singh Mandir, with an optional visit to Nathula Pass subject to permits, weather, and road conditions.',

    highlights: [
      'Enjoy a scenic drive from NJP or Bagdogra to Gangtok',
      'Explore MG Marg and Gangtok’s local markets',
      'Visit the beautiful high-altitude Tsomgo Lake',
      'Explore Baba Harbhajan Singh Mandir',
      'Optional excursion to Nathula Pass, subject to permits',
      'Enjoy panoramic views from Tashi View Point',
      'Visit Ganesh Tok and Hanuman Tok',
      'Explore Enchey Monastery',
      'Discover Banjhakri Falls',
      'Visit Namgyal Institute of Tibetology',
      'Explore Do Drul Chorten',
      'Visit the Flower Exhibition Centre',
      'Enjoy an optional Gangtok ropeway ride',
      'Experience the scenic Teesta Valley',
    ],

    roomDescription:
      'Stay in a comfortable hotel in Gangtok with convenient access to local sightseeing and MG Marg. Enjoy a relaxing base for exploring Sikkim’s mountain landscapes, monasteries, and cultural attractions.',

    availableDates: [
      {
        date: '2026-10-18',
        spots: 8,
      },
      {
        date: '2026-11-12',
        spots: 6,
      },
      {
        date: '2026-12-22',
        spots: 10,
      },
    ],

    inclusions: [
      'Hotel accommodation for 3 nights in Gangtok',
      'Pickup from NJP Railway Station or Bagdogra Airport',
      'Drop-off at NJP Railway Station or Bagdogra Airport',
      'Private vehicle for transfers and sightseeing as arranged',
      'Tsomgo Lake and Baba Mandir excursion, subject to permits and operating conditions',
      'Gangtok local sightseeing as specified in the itinerary',
    ],

    exclusions: [
      'Meals unless specifically included in the confirmed package',
      'Entry fees and activity charges',
      'Optional ropeway tickets',
      'Nathula Pass excursion charges, if not included in the package',
      'Permit-related charges, if not included in the package',
      'Personal expenses',
      'Any services not specifically mentioned under inclusions',
    ],

    itinerary: [
      {
        day: 1,
        from: 'NJP / Bagdogra',
        to: 'Gangtok',
        title: 'Arrival & Transfer to Gangtok',
        description:
          'Meet your driver at NJP Railway Station or Bagdogra Airport and begin your scenic journey to Gangtok. Travel through the beautiful Teesta Valley, enjoying mountain and river views along the way. After checking in, spend the evening exploring MG Marg and the local market.',
        pointers: [
          'Pickup from NJP Railway Station or Bagdogra Airport',
          'Scenic drive to Gangtok',
          'Enjoy views of the Teesta River and surrounding hills',
          'Hotel check-in',
          'Visit MG Marg',
          'Explore local shops and cafés',
          'Overnight stay in Gangtok',
        ],
        imageUrl:
          'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277',
      },
      {
        day: 2,
        from: 'Gangtok',
        to: 'Gangtok',
        title: 'Tsomgo Lake, Baba Mandir & Optional Nathula Pass',
        description:
          'Depart early for the spectacular Himalayan landscapes around Tsomgo Lake. Continue to Baba Harbhajan Singh Mandir and, if arranged and approved, Nathula Pass. All high-altitude excursions are subject to permits, weather, road conditions, and local authority restrictions. Return to Gangtok in the evening.',
        pointers: [
          'Early morning departure from Gangtok',
          'Visit Tsomgo (Changu) Lake',
          'Visit Baba Harbhajan Singh Mandir',
          'Optional visit to Nathula Pass, subject to permit approval',
          'Enjoy Himalayan mountain scenery',
          'Return to Gangtok',
          'Evening at MG Marg',
          'Overnight stay in Gangtok',
        ],
        imageUrl:
          'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
      },
      {
        day: 3,
        from: 'Gangtok',
        to: 'Gangtok',
        title: 'Gangtok Local Sightseeing',
        description:
          'Explore Gangtok’s cultural attractions, monasteries, viewpoints, and natural surroundings. Visit Tashi View Point, Ganesh Tok, Hanuman Tok, Enchey Monastery, Banjhakri Falls, Namgyal Institute of Tibetology, Do Drul Chorten, and the Flower Exhibition Centre. Finish the day with free time at MG Marg.',
        pointers: [
          'Visit Tashi View Point',
          'Explore Ganesh Tok',
          'Visit Hanuman Tok',
          'Explore Enchey Monastery',
          'Visit Banjhakri Falls',
          'Discover Namgyal Institute of Tibetology',
          'Visit Do Drul Chorten',
          'Explore the Flower Exhibition Centre',
          'Optional Gangtok ropeway ride',
          'Evening at MG Marg',
          'Overnight stay in Gangtok',
        ],
        imageUrl:
          'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
      },
      {
        day: 4,
        from: 'Gangtok',
        to: 'NJP / Bagdogra',
        title: 'Departure from Gangtok',
        description:
          'Enjoy breakfast and check out from your hotel before beginning the return drive to NJP Railway Station or Bagdogra Airport. Travel through the scenic Teesta Valley, with brief photo stops where time and road conditions permit.',
        pointers: [
          'Breakfast at the hotel',
          'Hotel check-out',
          'Drive from Gangtok to NJP or Bagdogra',
          'Enjoy scenic Teesta Valley views',
          'Photo stops en route, subject to schedule',
          'Drop-off at NJP Railway Station or Bagdogra Airport',
        ],
        imageUrl:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      },
    ],
  },
]
