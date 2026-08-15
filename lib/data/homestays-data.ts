import { OfferingType, type Homestay } from '@/types/experience'

import { convertGoogleDriveLink } from '../media-utils'

export const homestaysData: Homestay[] = [
  {
    id: 1,

    type: OfferingType.HOMESTAY,

    slug: 'kasol-manali',

    name: 'Kasol Mountain Homestay',

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
        date: '2025-10-01',
        spots: 5,
      },
      {
        date: '2025-11-15',
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
  },
]
