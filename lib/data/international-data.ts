import { OfferingType, TierLevel, type International } from '@/types/experience'

import { convertGoogleDriveLink } from '../media-utils'

export const internationalData: International[] = [
  {
    id: 1,
    type: OfferingType.INTERNATIONAL,
    slug: 'bhutan-cultural-adventure',
    name: 'Bhutan Cultural Adventure',
    tagline: 'A curated journey into the heart of Bhutan.',
    country: 'Bhutan',
    location: 'Paro, Thimphu & Punakha',
    duration: '7 Days / 6 Nights',
    tier: TierLevel.EASY,
    priceFrom: 54500,
    pricing: {
      perPerson: 54500,
      currency: 'INR',
    },
    maxGroupSize: 12,
    spotsLeft: 4,
    visaRequired: true,
    bestSeason: 'September to May',
    featured: true,
    active: true,
    availableDates: [
      {
        date: '2026-10-15',
        spots: 8,
      },
      {
        date: '2026-11-10',
        spots: 6,
      },
      {
        date: '2026-12-05',
        spots: 4,
      },
    ],
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1UUjhYRQIF8sAtEy3lpeWR6Fi7Hfiyetu/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/14PILXMCXdS7jxO-JmfyNJAYUr7qPWvjA/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1XOzevsFE1vcfK1H-uBVQiMqrTtGhpAgf/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/13OmQUm_cHdrl9vx9QUjJXY26Jx4UPMAF/view?usp=drive_link'
      ),
    ],
    description:
      "Journey into the Kingdom of Bhutan, where ancient Buddhist culture meets pristine Himalayan landscapes. This seven-day journey takes you through the valleys of Paro, Thimphu and Punakha, combining cultural discovery, mountain scenery and meaningful local experiences. Explore ancient dzongs, walk through quiet valleys, experience traditional Bhutanese food and make the climb to the legendary Tiger's Nest Monastery.",
    highlights: [
      "Hike to Paro Taktsang, the legendary Tiger's Nest Monastery",
      'Explore Punakha Dzong, the Palace of Great Happiness',
      'Visit the massive Buddha Dordenma statue',
      'Cross the panoramic Dochula Pass',
      'Walk across the historic Punakha Suspension Bridge',
      'Experience traditional Bhutanese food and local culture',
    ],

    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paro & Transfer to Thimphu',
        description:
          'Fly into the breathtaking valley of Paro. Meet your local guide and drive along the Pa Chhu and Wang Chhu rivers to Thimphu. Settle into your hotel and spend a relaxed evening exploring the capital.',
        from: 'Paro International Airport',
        to: 'Thimphu',
        duration: '1.5 Hours Drive',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1HzSqvDwgmoowccXihMibID_Inpw4JXM6/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Discover Thimphu',
        description:
          "Spend the day discovering Thimphu's cultural landmarks. Visit the National Memorial Chorten, Buddha Dordenma, Motithang Takin Preserve and Tashichho Dzong before exploring the city's quieter corners.",
        from: 'Thimphu',
        to: 'Thimphu',
        duration: '6–7 Hours',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/14PILXMCXdS7jxO-JmfyNJAYUr7qPWvjA/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Thimphu to Punakha via Dochula',
        description:
          'Leave Thimphu behind and climb towards Dochula Pass. On a clear day, the pass opens to sweeping Himalayan views. Descend through alpine forests into the warmer, greener Punakha Valley.',
        from: 'Thimphu',
        to: 'Punakha',
        duration: '3 Hours Drive',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1XOzevsFE1vcfK1H-uBVQiMqrTtGhpAgf/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Ancient Fortresses & Quiet Valleys',
        description:
          'Explore the magnificent Punakha Dzong, cross the famous suspension bridge and walk through terraced rice fields towards Chimi Lhakhang. A slower day spent close to the landscape and local life.',
        from: 'Punakha',
        to: 'Punakha',
        duration: '5–6 Hours',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1UUjhYRQIF8sAtEy3lpeWR6Fi7Hfiyetu/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        title: 'Return to Paro',
        description:
          'Drive back towards Paro Valley. Visit the Ta Dzong National Museum and explore the historic Rinpung Dzong overlooking the valley.',
        from: 'Punakha',
        to: 'Paro',
        duration: '4.5 Hours Drive',

        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/13OmQUm_cHdrl9vx9QUjJXY26Jx4UPMAF/view?usp=drive_link'
        ),
      },

      {
        day: 6,

        title: "The Tiger's Nest",

        description:
          "Begin the journey to Paro Taktsang, one of Bhutan's most iconic monasteries. The trail climbs through pine forests towards the monastery perched dramatically on the cliffside. Return to Paro and unwind with a traditional Bhutanese hot-stone bath.",

        from: 'Paro',

        to: 'Paro Taktsang',

        duration: '4–5 Hours Hike',

        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1W4u9KDZkHnwRJHkKvtekogBUhcMZm-nJ/view?usp=drive_link'
        ),
      },

      {
        day: 7,

        title: 'Departure from Paro',

        description:
          'Enjoy one final morning in the valley before transferring to Paro International Airport for your onward journey home.',

        from: 'Paro',

        to: 'Paro International Airport',

        duration: 'Morning Departure',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1W4u9KDZkHnwRJHkKvtekogBUhcMZm-nJ/view?usp=drive_link'
        ),
      },
    ],

    inclusions: [
      '6 nights accommodation on a twin-sharing basis',

      'Daily breakfast, lunch and dinner',

      'Private transportation for transfers and sightseeing',

      'Certified English-speaking Bhutanese local guide',

      'Monument and dzong entry fees',

      'Required valley hiking permits',

      'Mineral water during daily excursions',
    ],

    exclusions: [
      'International flights to and from Paro',

      'Bhutan visa fees and Sustainable Development Fee',

      'Personal expenses',

      'Laundry and telephone expenses',

      'Alcoholic beverages',

      'Tips for guide and driver',

      'Travel insurance',

      'Medical evacuation expenses',
    ],

    testimonials: [
      {
        name: 'Elena Rostova',

        city: 'Prague, Czech Republic',

        quote:
          "Climbing to the Tiger's Nest was a spiritual milestone for me. The entire week was planned beautifully, and our guide felt like family.",

        rating: 5,
      },
    ],
  },
]
