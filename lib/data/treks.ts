import { OfferingType, DifficultyLevel, type Trek } from '@/types/experience'
import { convertGoogleDriveLink } from '../media-utils'

export const trekData: Trek[] = [
  // ── KHEERGANGA TREK ─────────────────────────────────────────────────────────────────
  {
    id: 1,
    type: OfferingType.TREK,
    slug: 'kheerganga-trek',
    featured: true,
    active: true,
    title: 'Kheerganga Trek',
    tagline: 'Soak in the mountains.',
    location: 'Himachal Pradesh',
    duration: '2 Days / 1 Nights',
    difficulty: DifficultyLevel.EASY,
    priceFrom: 1499,
    maxGroupSize: 30,
    altitude: 9711,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/14IytdjzH85A4v--3Mv6xwEL0_NoU6AiI/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1EBjoiJ5nearBmpUvm1AT7KxsFcyXMciU/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1sxo31nlGNcuVgDq5sif4Ty8Ua4MxUKLZ/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1d-1-U1JeLCCxQu8SpJLJ6f-RgrCCTY5a/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1QZHJiekFy90BXZfFBj7mLcaH-rwcjdEf/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1GFY9vJJIum3ebXkmg3hwNY-6z16XR9Yk/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Parvati Kund natural hot springs',
      'Rudra Nag waterfall',
      'Parvati Valley panoramic views',
      'Dense pine forest trails',
      'Starlit camping at 9,711 ft',
    ],
    nextDate: 'Available on request',
    spotsLeft: 30,
    description:
      'The Kheerganga Trek is one of the most popular beginner treks in Himachal Pradesh, winding through the breathtaking Parvati Valley from the village of Barshaini. The 12–13 km trail passes through dense pine forests, wooden bridges, ancient villages, and the thundering Rudra Nag waterfall before reaching the natural hot springs of Parvati Kund at 9,711 ft.\n\nKheerganga is named after the milky-white sacred water of its hot spring, believed since ancient times to be blessed by Lord Shiva. The views of the Parvati River and surrounding snow-capped peaks are spectacular throughout. At the top, soak in the geothermal Parvati Kund pool and camp under one of the most star-filled skies in the Western Himalayas. An ideal first Himalayan trek for backpackers and adventure seekers.',
    itinerary: [
      {
        day: 1,
        title: 'Trek to Kheerganga',
        from: 'Barshaini',
        to: 'Kheerganga',
        altitude: 'As per itinerary',
        duration: '5–6 hrs (~12–13 km)',
        description:
          'Start from Barshaini and trek along the Parvati River through pine forests, villages, and the Rudra Nag waterfall. Reach Kheerganga by evening and soak in the famous hot springs before overnight camping in the peaceful mountain setting.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1lKNxNcwiu6jIQ08w_nrA7bdEzNgPlq_j/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Return to Barshaini',
        from: 'Kheerganga',
        to: 'Barshaini',
        altitude: '3,900 ft (1,189 m)',
        duration: '4–5 hrs',
        description:
          'Rise early for a sunrise dip in the Parvati Kund hot springs. After breakfast, descend back to Barshaini through the same scenic forest trail. Optionally explore the nearby Tosh village before concluding the trek.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1wUTOcs1yG_b-LDWxGBGlVTQ5tAoNRYCW/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Aarav Sharma',
        city: 'Delhi',
        quote:
          'Perfect first trek! The hot springs at the top felt unreal after the hike.',
        image: '',
        rating: 5,
      },
      {
        name: 'Sneha Roy',
        city: 'Chennai',
        quote:
          'Loved the forest trails and camping under the stars. Super beginner friendly.',
        image: '',
        rating: 5,
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Pick-up & drop from Barshaini',
      'All meals during the trek',
      'Camping accommodation (twin/triple sharing tents)',
      'Sleeping bags & trekking gear',
      'Certified trek guide',
      'Forest permits & entry fees',
      'First aid & basic medical kit',
    ],
    exclusions: [
      'Transport to/from Barshaini',
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 8,
    pickupDrop: 'Barshaini',
    geoLocation: '',
  },

  // ── TRIUND TREK ─────────────────────────────────────────────────────────────────
  {
    id: 2,
    type: OfferingType.TREK,
    slug: 'triund-trek',
    title: 'Triund Trek',
    featured: true,
    active: true,
    tagline: 'Your first Himalayan horizon.',
    location: 'Himachal Pradesh',
    duration: '2 Days / 1 Nights',
    difficulty: DifficultyLevel.EASY,
    priceFrom: 1499,
    maxGroupSize: 30,
    altitude: 9350,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1BM3K292yWM3lfdTjC8hPvcdhiR4WLlLi/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1hDdeXtqa-nrOEuTg-mk_Pbfy_IZFyPhe/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/14ifcSg8KloL1hdkzdFcZNUqP49q9r3ha/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1WXEx_X6VZhNo6SOL7zTtvFFqDc9zM8fM/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/17pkQa7-WHrRtLjs0_mE1BS0S4UcQyyT_/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Panoramic Dhauladhar range views',
      'Kangra Valley vistas',
      'Oak and rhododendron forests',
      'Tibetan culture in Dharamkot',
      'Sunrise over snow-capped peaks',
    ],
    nextDate: 'Available on request',
    spotsLeft: 30,
    description:
      'The Triund Trek is one of the most popular weekend treks near McLeod Ganj and Dharamshala, offering stunning views of the snow-covered Dhauladhar range and the sweeping Kangra Valley below. Situated at 9,350 ft (2,850 m), this beginner-friendly trail is one of the easiest Himalayan treks and can be completed in a single weekend from Delhi or Chandigarh.\n\nThe 7–8 km trail from Dharamkot passes through beautiful forests of oak, deodar, and rhododendron, with colourful birdlife along the way and charming tea stalls to rest at. Overnight camping at Triund ridge under a canopy of stars, followed by a dramatic sunrise over the Dhauladhar peaks, is an experience that draws trekkers back year after year.',
    itinerary: [
      {
        day: 1,
        title: 'Dharamkot to Triund',
        from: 'Dharamkot',
        to: 'Triund',
        altitude: 'As per itinerary',
        duration: '4–5 hrs (~7–8 km)',
        description:
          'Start early from Dharamkot and ascend through scenic forests to the Galu Devi Temple clearing. Continue through the Magic View Café and follow the main trail up to the Triund ridge for stunning panoramas and overnight camping.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/18uPdErLm1bi2ln4Gxl8BjDH-LKC1tPjw/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Triund to Dharamkot',
        from: 'Triund',
        to: 'Dharamkot',
        altitude: '4,780 ft (1,457 m)',
        duration: '3–4 hrs descent',
        description:
          'Witness a stunning sunrise over the Dhauladhar peaks. After a leisurely breakfast at camp, begin your descent back to Dharamkot, stopping at the famous trail cafés along the way.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1qlpTuPLAhHncQGDHK_G7qte2vILdAf6g/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Debasish Das',
        city: 'Kolkata',
        quote:
          'Perfect weekend escape. The Dhauladhar views at sunrise were unreal.',
        rating: 5,
        image: '',
      },
      {
        name: 'Srijita Das',
        city: 'Kolkata',
        quote:
          'Perfect weekend escape. The Dhauladhar views at sunrise were unreal.',
        rating: 5,
        image: '',
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Pick-up & drop from McLeod Ganj',
      'All meals during the trek',
      'Camping accommodation (twin sharing tents)',
      'Sleeping bags & trekking gear',
      'Certified trek guide',
      'Forest permits & entry fees',
      'First aid & basic medical kit',
    ],
    exclusions: [
      'Transport to/from McLeod Ganj',
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 8,
    pickupDrop: 'McLeod Ganj',
    geoLocation: '',
  },

  // ── HAMPTA PASS ─────────────────────────────────────────────────────────────────
  {
    id: 3,
    type: OfferingType.TREK,
    slug: 'hampta-pass',
    title: 'Hampta Pass Trek',
    featured: true,
    active: true,
    tagline: 'Where green valleys meet desert skies.',
    location: 'Himachal Pradesh',
    duration: '5 Days / 4 Nights',
    difficulty: DifficultyLevel.EASY_MODERATE,
    priceFrom: 6999,
    maxGroupSize: 30,
    altitude: 14100,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1TlBGM2Vju3SK0zaRAXgufnqMIShVB4Tw/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1QMe16sYKdbPSLqCvFRO5X0LQ1KTlOt6P/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1IrZXh9ei8q6uoTs-Av6dZpgnrDklwSB5/view?usp=drive_link'
      ),
    ],
    highlights: [
      "Chandratal Lake — 'Moon Lake' at 14,100 ft",
      'Dramatic Kullu-to-Spiti valley crossover',
      'River crossings and high alpine meadows',
      'Pir Panjal range panoramas',
      'Cultural glimpses of Kullu and Lahaul',
    ],
    nextDate: 'Available on request',
    spotsLeft: 30,
    description:
      "The Hampta Pass Trek is a spectacular 5-day journey that takes you from the lush green Kullu Valley into the barren, moon-like landscape of Spiti — one of the most dramatic terrain transitions in the entire Himalayas. Crossing the pass at 14,100 ft is the emotional centrepiece of the trek, revealing an almost alien world on the other side.\n\nThe adventure is capped by a visit to the sacred Chandratal Lake — the 'Moon Lake' — a brilliant crescent of turquoise water sitting at 14,100 ft amid the Spiti high desert. This trek perfectly balances moderate challenge with extraordinary reward, making it one of the best intermediate treks in Himachal Pradesh for trekkers looking to step up from beginner routes.",
    itinerary: [
      {
        day: 1,
        title: 'Manali to Chika',
        from: 'Jobra',
        to: 'Chika',
        altitude: '10,100 ft (3,080 m)',
        duration: '2–3 hrs trek',
        description:
          'Scenic drive from Manali to Jobra, followed by a short but beautiful trek through pine woodland and wooden bridges to the riverside camp at Chika beside the Hamta River.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1IrZXh9ei8q6uoTs-Av6dZpgnrDklwSB5/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Chika to Balu Ka Ghera',
        from: 'Chika',
        to: 'Balu Ka Ghera',
        altitude: '12,008 ft (3,660 m)',
        duration: '3–4 hrs',
        description:
          'Follow the Hamta River upstream through meadows and rocky boulders, with the first sweeping views of snow-capped Pir Panjal peaks appearing ahead.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1JkhT_uR3YVnsFxMRkL656Oyi_LTXH8_S/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Crossing Hampta Pass',
        from: 'Balu Ka Ghera',
        to: 'Shea Goru',
        altitude: 'As per itinerary',
        duration: '7–8 hrs',
        description:
          'The highlight day. Cross the pass and witness the breathtaking landscape shift from green Kullu to barren Lahaul. Descend to the dramatic Shea Goru campsite on the Spiti side.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1QMe16sYKdbPSLqCvFRO5X0LQ1KTlOt6P/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Shea Goru to Chandratal',
        from: 'Shea Goru',
        to: 'Chatru',
        altitude: 'As per itinerary',
        duration: '3 hrs trek + drive',
        description:
          'Trek to Chatru and drive to the sacred Chandratal Lake. Witness the stunning turquoise water change hues with the shifting light before returning to camp.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1lmDzbgDyciFqbbY2MN61mhCO8NdUd0m-/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        title: 'Return to Manali',
        from: 'Chatru',
        to: 'Manali',
        altitude: '6,726 ft (2,050 m)',
        duration: 'Drive via Atal Tunnel',
        description:
          'Return journey to Manali through the Atal Tunnel. Expected arrival by early afternoon for onward travel.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1FClcEPo4CWAjIMRUE_Mp8QPM-pehwzV6/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Karan Malhotra',
        city: 'Mumbai',
        quote:
          'The valley transition from green to Spiti desert felt like entering another planet.',
        rating: 5,
        image: '',
      },
      {
        name: 'Priya Nair',
        city: 'Bangalore',
        quote:
          'Chandratal Lake was the highlight. Worth every step of the climb.',
        rating: 5,
        image: '',
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Manali to Manali transport (Jobra, Chatru & Chandratal)',
      'All meals during the trek',
      'Camping accommodation (twin/triple sharing tents)',
      'Sleeping bags & trekking gear',
      'Certified trek guide & support staff',
      'Forest permits & entry fees',
      'First aid & basic medical kit',
    ],
    exclusions: [
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 12,
    pickupDrop: 'Manali',
    geoLocation: '',
  },

  // ── BALI PASS ─────────────────────────────────────────────────────────────────
  {
    id: 4,
    type: OfferingType.TREK,
    slug: 'bali-pass',
    title: 'Bali Pass Trek',
    featured: false,
    active: true,
    tagline: "Cross the Himalayas. Don't just climb them.",
    location: 'Uttarakhand',
    duration: '8 Days / 7 Nights',
    difficulty: DifficultyLevel.MODERATE_DIFFICULT,
    priceFrom: 18999,
    maxGroupSize: 30,
    altitude: 16207,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1OJoNXgb7mV4MgGkj2HSGQSdK6pzQsPk-/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1F4QtEdayW3MGsfnAzFNO16O58jDyZlrp/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1xkv3je28UOFC6C2U8CzjB-m4Xi1pNg9r/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1wOidsJOh8dpiy7Te-ZwgTlnlAFlu9fnS/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Ruinsara Tal glacial lake at 11,800 ft',
      'Yamunotri temple Darshan',
      'Har Ki Dun Valley traverse',
      'Ancient Garhwali heritage villages',
      'Govind Wildlife Sanctuary',
    ],
    nextDate: 'Available on request',
    spotsLeft: 30,
    description:
      'The Bali Pass Trek is one of the most epic and challenging Himalayan crossover routes in India, connecting the renowned Har Ki Dun Valley of the Tons River basin to the sacred Yamunotri location of the Yamuna Valley. Standing at 16,207 ft (4,950 m), the pass crossing involves steep snow slopes and exposed narrow ridges, emerging near the revered Yamunotri shrine — one of the Char Dhams.\n\nPremium operators guide this route within Govind Wildlife Sanctuary in Uttarkashi district, traversing ancient Garhwali villages like Osla and Gangad where traditional Kath-Kuni wooden architecture has stood for centuries. The serene Ruinsara Tal — a pristine glacial lake at 11,800 ft reflecting the Swargarohini massif — is a spiritual and scenic highlight. This trek demands high fitness, prior high-altitude experience, and strong mental resolve.',
    itinerary: [
      {
        day: 1,
        title: 'Dehradun to Sankri',
        from: 'Dehradun',
        to: 'Sankri',
        altitude: '6,400 ft (1,920 m)',
        duration: '8–10 hrs drive',
        description:
          'Scenic long-distance drive through Mussoorie and Purola to Sankri, the base camp village situated within Govind Wildlife Sanctuary.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1jMqxnJR2pxCKCibpkqJSciWXM1TlWZ8i/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Trek to Osla',
        from: 'Sankri',
        to: 'Osla',
        altitude: '7,677 ft (2,340 m)',
        duration: '6–7 hrs',
        description:
          'Short drive to Taluka then trek through dense chestnut and walnut forests and open meadows to the ancient heritage village of Osla.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1VPlhROWzgqkGh3lIUSNkj5_0yS0xJDBC/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Osla to Waterfall Camp',
        from: 'Osla',
        to: 'Waterfall Camp',
        altitude: '10,200 ft (3,100 m)',
        duration: '6–7 hrs',
        description:
          'Follow the Supin River upstream into the Ruinsara valley, where pine and fir give way to birch and rhododendron. Camp by the river amid impressive waterfalls.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/12BSkA7xkGcmmLjHaXQAgsU8iwtvM97XG/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Trek to Ruinsara Tal',
        from: 'Waterfall Camp',
        to: 'Ruinsara Tal',
        altitude: '11,800 ft (3,600 m)',
        duration: '5–6 hrs',
        description:
          'A rewarding trek to the sacred Ruinsara Tal — a pristine glacial lake surrounded by snow-clad peaks including the Swargarohini massif and Kala Nag. The reflections are extraordinary on calm mornings.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1Mw1kt76i-apMODe4qQ41KFBjw-7eKOey/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        title: 'Ruinsara Tal to Odari',
        from: 'Ruinsara Tal',
        to: 'Odari',
        altitude: '13,120 ft (4,000 m)',
        duration: '4–5 hrs',
        description:
          'Gradual climb to the high-altitude camp at Odari, situated beside a natural rock cave linked to local folklore about Bali, brother of Hanuman. Sweeping views of the Swargarohini peaks.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1tcluyDSNIhh-bs5KOcTFnQ4QmpahqO1Q/view?usp=drive_link'
        ),
      },
      {
        day: 6,
        title: 'Odari to Base Camp',
        from: 'Odari',
        to: 'Bali Pass Base Camp',
        altitude: '15,100 ft (4,600 m)',
        duration: '5–6 hrs',
        description:
          'Steep ascent on a narrow moraine ridge with exposed sections. Reach the high-altitude base camp at the foot of the Bali Pass wall. Preparation and early sleep before the summit push.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1MvM2SCHxD51yumN4hm02btrVJGmGf7fk/view?usp=drive_link'
        ),
      },
      {
        day: 7,
        title: 'The Bali Pass Summit',
        from: 'Base Camp',
        to: 'Lower Dhamni',
        altitude: 'As per itinerary',
        duration: '9–11 hrs',
        description:
          'The ultimate challenge. An early start before dawn for the steep snow ascent to the Bali Pass summit at 16,207 ft. Panoramic views of Bandarpoonch, Swargarohini, and Kala Nag reward the effort. Steep descent to the Yamunotri Valley and camp at Lower Dhamni.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1ybZIZN6rmjruMC_ZSS-00jXl5pUYnBJ9/view?usp=drive_link'
        ),
      },
      {
        day: 8,
        title: 'Yamunotri to Dehradun',
        from: 'Lower Dhamni',
        to: 'Dehradun',
        altitude: 'Finish',
        duration: '4 hrs trek + 7–8 hrs drive',
        description:
          'Trek down to Janki Chatti, then visit the sacred Yamunotri temple for Darshan before the long drive back to Dehradun.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1OwEi8OclfZezq64Wk2xLZbjvzwIOZwkR/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Arjun Verma',
        city: 'Dehradun',
        quote:
          "One of the toughest treks I've done. The summit push tested everything.",
        rating: 5,
        image: '',
      },
      {
        name: 'Megha Kapoor',
        city: 'Chandigarh',
        quote:
          'Ruinsara Tal was magical. The entire trek felt raw and untouched.',
        rating: 4,
        image: '',
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Dehradun to Dehradun transport',
      'All meals during the trek',
      'Camping accommodation (twin sharing tents)',
      'Sleeping bags & technical trekking gear',
      'Experienced trek leader & support staff',
      'Govind Wildlife Sanctuary permits & entry fees',
      'First aid & oxygen support',
    ],
    exclusions: [
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 16,
    pickupDrop: 'Dehradun',
    geoLocation: '',
  },

  // ── SAR PASS ─────────────────────────────────────────────────────────────────
  {
    id: 5,
    type: OfferingType.TREK,
    geoLocation: '',
    slug: 'sar-pass',
    title: 'Sar Pass Trek',
    featured: true,
    active: true,
    tagline: 'Snow in summer. Magic all year.',
    location: 'Himachal Pradesh',
    duration: '5 Days / 4 Nights',
    difficulty: DifficultyLevel.EASY_MODERATE,
    priceFrom: 6999,
    maxGroupSize: 30,
    altitude: 13800,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1e0F8OyEW1dD8XoFRhHf2n8NAa18ViqtT/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1GtnUgXTmgl5QhqFnl8H70JiHq0xyl1bg/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1SRUWscKla3apSCw0A4myDr2B4SL7Wdn9/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/11zlgowBBEGLoCKaIEHU8oaSH8sZloHLx/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1hFfvqmcC4iVPj-l2f30oiC0_2GqRKDz3/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1czsgVUWLeWaRVwEs9AAAhQJU9n66KJeT/view?usp=drive_link'
      ),
    ],
    highlights: [
      '360-degree Himalayan summit views at 13,800 ft',
      'Thrilling snow slide descent to Biskeri',
      'Overnight camping in Grahan village',
      'Parvati Valley and Tosh Valley panoramas',
      'Dense rhododendron and pine forests',
    ],
    nextDate: 'Available on request',
    spotsLeft: 30,
    description:
      "The Sar Pass Trek is one of the most rewarding summer treks in Himachal Pradesh, starting from the iconic backpacker hub of Kasol in the Parvati Valley. The name 'Sar' means lake in the local dialect — the pass is named after a small frozen lake encountered on the trail between Tila Lotni and Biskeri Ridge.\n\nReaching 13,800 ft (4,200 m), this 48 km circuit offers everything a first-time high-altitude trekker could want: rhododendron forests, charming Himalayan villages, expansive alpine meadows, and a famous snow slide descent from the pass to Biskeri Thach that is the highlight of the entire experience. With stunning panoramas of the Greater Himalayas and Tosh Valley, Sar Pass remains one of India's most memorable beginner-to-intermediate snow treks.",
    itinerary: [
      {
        day: 1,
        title: 'Kasol to Grahan',
        from: 'Kasol',
        to: 'Grahan',
        altitude: '7,709 ft (2,350 m)',
        duration: '5–6 hrs (~10 km)',
        description:
          'Follow the Grahan Nallah through rhododendron and pine forests, passing local tea stalls serving the famous rhododendron syrup, to reach the traditional village of Grahan.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1gWscRrQYMwgKfKpyKfqXW3d1XMKKc4dT/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Grahan to Mung Thach',
        from: 'Grahan',
        to: 'Mung Thach',
        altitude: '9,500 ft (2,895 m)',
        duration: '5–6 hrs',
        description:
          'Ascend through increasingly dense forests and open into the scenic alpine meadow camp of Mung Thach (Min Thach), with expansive views opening up on all sides.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1UAYCLMq8ZTwIO2disaF6y61c21uE1Opf/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Mung Thach to Nagaru',
        from: 'Mung Thach',
        to: 'Nagaru',
        altitude: '11,154 ft (3,400 m)',
        duration: '4–5 hrs',
        description:
          'A steeper climb above the treeline to the ridge camp at Nagaru, with sweeping views down the Parvati Valley. Snow is likely encountered on this section.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1QJzKTOfE1i4OgfqpZfAm6IRVW1b3hDRi/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Crossing Sar Pass',
        from: 'Nagaru',
        to: 'Biskeri Thach',
        altitude: 'As per itinerary',
        duration: '7–8 hrs',
        description:
          'Early alpine start for the summit push. Cross the snow-covered Sar Pass at 13,800 ft for panoramic Himalayan views, then enjoy the exhilarating snow slide descent to Biskeri Thach camp.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/12088R1sJGjvEymV4UQvYQEN47Ar0aWtI/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        title: 'Return to Kasol',
        from: 'Biskeri',
        to: 'Kasol',
        altitude: '5,200 ft (1,585 m)',
        duration: '5–6 hrs',
        description:
          'Descend through the scenic twin villages of Pulga and Tulga and across the Parvati River bridge to complete the full circuit back to Kasol base camp.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1fABZ_er8hIgnzv76qcFvBYVKZfHux332/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Salesh Jain',
        city: 'Jaipur',
        quote:
          'Snow slides were insanely fun. Easily the most exciting part of the trek.',
        rating: 5,
        image: '',
      },
      {
        name: 'Neha Gupta',
        city: 'Delhi',
        quote:
          'Great mix of forests, snow, and views. Ideal for first high-altitude trek.',
        rating: 5,
        image: '',
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Pick-up & drop from Kasol',
      'All meals during the trek',
      'Camping accommodation (twin/triple sharing tents)',
      'Sleeping bags & trekking gear',
      'Certified trek guide',
      'Forest permits & entry fees',
      'First aid & basic medical kit',
    ],
    exclusions: [
      'Transport to/from Kasol',
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 12,
    pickupDrop: 'Kasol',
  },

  // ── BURAN GHATI ──────────────────────────────────────────────────────────────
  {
    id: 6,
    type: OfferingType.TREK,
    geoLocation: "",
    slug: 'buran-ghati',
    title: 'Buran Ghati Trek',
    featured: false,
    active: true,
    tagline: 'Forests, glaciers, and a snow wall to remember.',
    location: 'Himachal Pradesh',
    duration: '7 Days / 6 Nights',
    difficulty: DifficultyLevel.MODERATE_DIFFICULT,
    priceFrom: 16500,
    maxGroupSize: 30,
    altitude: 15000,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1jexXCOYJVa76kkKrbfih6lekIsLuXxAS/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/19ODfTsLQlda7CEsW21q3J0_9PPABcosG/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1hMzQu96sSDqbC6Q-eRuKoTmHlSclPyVH/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1ThC9es711K2v1glFqJ-SV5eWK5c1pVkU/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Buran Ghati Pass at 15,000 ft',
      'Chandranahan glacial lakes at 13,900 ft',
      'Exhilarating vertical snow wall descent',
      'Kinner Kailash and Dhauladhar panoramas',
      'Ancient Kath-Kuni villages of Janglik and Barua',
    ],
    nextDate: 'Available on request',
    spotsLeft: 15,
    description:
      "The Buran Ghati Trek is one of the most diverse and dramatic Himalayan treks in Himachal Pradesh, often described as a 'complete trek' for the sheer variety it packs into seven days. Starting from the ancient Kath-Kuni village of Janglik in the Pabbar Valley, the route ascends through wide Dayara meadows, glacial waterfalls, and the sacred Chandranahan lakes before culminating in the famous Buran Ghati Pass crossing at 15,000 ft.\n\nThe defining moment of the trek is the near-vertical descent on the far side of the pass — a thrilling rappel or slide down a wall of ice that drops over 3,000 ft into the Sangla Valley. The trek ends at the beautiful orchard village of Barua, giving it a fairytale finish. An unforgettable experience for experienced trekkers seeking technical adventure.",
    itinerary: [
      {
        day: 1,
        title: 'Shimla to Janglik',
        from: 'Shimla',
        to: 'Janglik',
        altitude: '9,200 ft (2,804 m)',
        duration: '8–9 hrs drive',
        description:
          'Drive through the picturesque Pabbar Valley to the remote heritage village of Janglik. Explore the traditional Kath-Kuni wooden architecture before an overnight briefing and rest.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1JkS_n1YrzRe2Xx7L-7RiZ8OUuiNDySEO/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Janglik to Dayara',
        from: 'Janglik',
        to: 'Dayara Thach',
        altitude: '11,050 ft (3,370 m)',
        duration: '5–6 hrs (~8 km)',
        description:
          'Trek through traditional Himachali village trails into wide, lush alpine meadows of Dayara, with grazing horses and panoramic views of the surrounding snow-capped ridges.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1DILH5Ho0l1_OVg0H-YeyaCylYh2nBZYp/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Dayara to Litham',
        from: 'Dayara Thach',
        to: 'Litham',
        altitude: '11,736 ft (3,578 m)',
        duration: '3–4 hrs (~3 km)',
        description:
          'Walk through dense pine forests to the stunning Litham campsite, dramatically positioned at the confluence of two valleys with the Chandranahan waterfall cascading ahead.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1ypIMyjwCQCSEIcIE-cTSqhanpdRQPojC/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Chandranahan Lake Hike',
        from: 'Litham',
        to: 'Litham (day hike)',
        altitude: '13,900 ft (4,240 m)',
        duration: '6–7 hrs return',
        description:
          'Day hike without backpacks to the sacred Chandranahan glacial lakes — the source of the Pabbar River — passing through the dramatic waterfall snout. Up to seven alpine tarns reflect the surrounding peaks in perfect stillness.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1ITQXIRxkCGzUVV9Y_d10LYOPtdjJuNht/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        title: 'Litham to Dhunda',
        from: 'Litham',
        to: 'Dhunda',
        altitude: '13,940 ft (4,250 m)',
        duration: '4–5 hrs',
        description:
          'Leave the treeline behind and enter the boulder and moraine zone of the upper Pabbar valley. Camp at Dhunda, directly below the imposing Buran Ghati wall.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1BM7b9lFs3d8EmZhOOy1P1bN8gAabRvrp/view?usp=drive_link'
        ),
      },
      {
        day: 6,
        title: 'Buran Ghati Pass Crossing',
        from: 'Dhunda',
        to: 'Munirang / Manerang',
        altitude: 'As per itinerary',
        duration: '9–10 hrs',
        description:
          'The summit day. Depart before dawn, ascend steep scree and moraine to Buran Ghati at 15,000 ft for 360-degree views of Kinner Kailash. Descend the famous near-vertical snow wall — by rappel or thrilling slide — into the Sangla Valley.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1C7UlArPC_SN-UwZH5Nqq3WHMX5KAkJX2/view?usp=drive_link'
        ),
      },
      {
        day: 7,
        title: 'Barua to Shimla',
        from: 'Munirang',
        to: 'Shimla',
        altitude: 'Finish',
        duration: '3–4 hrs trek + drive',
        description:
          'Descend through the magnificent apple and apricot orchards of Barua village — the most beautiful trail ending in the Himalayas — and drive back to Shimla.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1bJIQlsY2tCOJbxfiTIFkwDCFq5QEyNOc/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Dev Chauhan',
        city: 'Shimla',
        quote:
          'That snow wall descent was pure adrenaline. Never experienced anything like it.',
        rating: 5,
        image: '',
      },
      {
        name: 'Ritika Bose',
        city: 'Kolkata',
        quote:
          'Every day felt different. Meadows, lakes, glaciers… a complete package.',
        rating: 5,
        image: '',
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Shimla to Shimla transport',
      'All meals during the trek',
      'Camping accommodation (twin sharing tents)',
      'Sleeping bags & trekking gear',
      'Experienced trek leader & support staff',
      'Forest permits & entry fees',
      'First aid & basic medical kit',
      'Safety equipment for the snow wall descent (rope & harness)',
    ],
    exclusions: [
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 14,
    pickupDrop: 'Shimla',
  },

  // ── BHRIGU LAKE ──────────────────────────────────────────────────────────────
  {
    id: 7,
    type: OfferingType.TREK,
    geoLocation: "",
    slug: 'bhrigu-lake',
    title: 'Bhrigu Lake Trek',
    featured: false,
    active: true,
    tagline: 'The most accessible alpine lake in the Himalayas.',
    location: 'Himachal Pradesh',
    duration: '4 Days / 3 Nights',
    difficulty: DifficultyLevel.EASY,
    priceFrom: 5599,
    maxGroupSize: 30,
    altitude: 14000,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/11S_PwkRUP3l-7oWPdkoF7yHY3V7sxJK2/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1qV9al06wyCJKkZknnREHYPZlicDSurMc/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1PsJxs7jOS8qKmKFmiNZkNwsyjoMWflJO/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1_FHngAlTmhtY69saOeSxaPVsckvMXpMm/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Bhrigu Lake at 14,000 ft — sacred alpine lake',
      'Sweeping Kullu Valley and Rohtang Pass vistas',
      'Lush Gulaba meadows',
      'Short, accessible 4-day itinerary from Manali',
    ],
    nextDate: 'Available on request',
    spotsLeft: 30,
    description:
      'The Bhrigu Lake Trek is the most accessible high-altitude alpine lake trek in the Himalayas, reaching 14,000 ft (4,267 m) from Manali in just four days. Sacred to Hindus as the lake where the sage Bhrigu meditated, it is believed to remain unfrozen even in winter, a mystery that adds to its mythical allure.\n\nThe trail passes through vibrant Gulaba meadows and opens into spectacular views of the Kullu Valley, Rohtang Pass, and the Pir Panjal range. This is an ideal step-up trek for those who have completed beginner routes and are ready for their first proper alpine lake experience without committing to a multi-week expedition.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali',
        from: 'Arrival',
        to: 'Manali',
        altitude: '6,700 ft (2,050 m)',
        duration: 'Acclimatisation',
        description:
          'Arrive in Manali and acclimatise. Explore the vibrant Mall Road, visit Hadimba Devi Temple, and receive your trek briefing for the days ahead.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1FClcEPo4CWAjIMRUE_Mp8QPM-pehwzV6/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Drive to Gulaba & Trek to Rola Kholi',
        from: 'Gulaba',
        to: 'Rola Kholi',
        altitude: '11,500 ft (3,505 m)',
        duration: '5–6 hrs',
        description:
          'Drive to Gulaba (10,000 ft) and trek through beautiful rolling meadows, crossing streams and glacial patches to the high camp at Rola Kholi.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1QMe16sYKdbPSLqCvFRO5X0LQ1KTlOt6P/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Bhrigu Lake Summit',
        from: 'Rola Kholi',
        to: 'Rola Kholi (day hike)',
        altitude: 'As per itinerary',
        duration: '6–7 hrs return',
        description:
          'Trek to the sacred Bhrigu Lake at 14,000 ft amid a bowl of snow-covered ridges. Spend time soaking in the panoramic views of the Kullu Valley before descending back to camp.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1Zczqfgz9CHIZZHXe9gUnWUwoH2yvbr3r/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Return to Manali',
        from: 'Rola Kholi',
        to: 'Manali',
        altitude: '6,700 ft (2,050 m)',
        duration: '4–5 hrs',
        description:
          'Descend through Kulang village, re-joining the road for a drive back to Manali to conclude the trek.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1wUTOcs1yG_b-LDWxGBGlVTQ5tAoNRYCW/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Aakash Singh',
        city: 'Lucknow',
        quote:
          'Hard to believe you can reach such an alpine lake in just a few days.',
        rating: 5,
        image: '',
      },
      {
        name: 'Pooja Das',
        city: 'Kolkata',
        quote:
          'The views of Kullu Valley were breathtaking. Short but incredibly scenic.',
        rating: 4,
        image: '',
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Manali to Manali transport',
      'All meals during the trek',
      'Camping accommodation (twin sharing tents)',
      'Sleeping bags & trekking gear',
      'Certified trek guide',
      'Forest permits & entry fees',
      'First aid & basic medical kit',
    ],
    exclusions: [
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 10,
    pickupDrop: 'Manali',
  },

  // ── BEAS KUND ────────────────────────────────────────────────────────────────
  {
    id: 8,
    type: OfferingType.TREK,
    geoLocation: "",
    slug: 'beas-kund',
    title: 'Beas Kund Trek',
    featured: false,
    active: true,
    tagline: 'Find the source. Lose yourself.',
    location: 'Himachal Pradesh',
    duration: '4 Days / 3 Nights',
    difficulty: DifficultyLevel.EASY,
    priceFrom: 5599,
    maxGroupSize: 30,
    altitude: 12139,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1yupKLNxBT69TwAHp75Ag3jsn1eM8ufKN/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1WKS1MzYNa5xCvmGsv3XCvHVUOZsNKggZ/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1EZa_3fNCoUYP3IvvFWcT94ivrje-3C8E/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Beas Kund — glacial origin of the sacred River Beas',
      'Hanuman Tibba and Friendship Peak views',
      'Bakarthach alpine meadows',
      'Solang Nala valley scenery',
    ],
    nextDate: 'Available on request',
    spotsLeft: 30,
    description:
      'The Beas Kund Trek leads to the sacred glacial lake that is the source of the River Beas, one of the great rivers of north India. Nestled at 12,139 ft (3,700 m) in the Solang Valley near Manali, the lake sits at the foot of towering peaks including Friendship Peak (17,352 ft) and Hanuman Tibba (19,750 ft) — some of the most impressive mountain walls in the Western Himalayas.\n\nThis short, beginner-friendly trek through the lush Bakarthach meadows is ideal as a first or second Himalayan trek. The approach follows the Beas River upstream through open valleys of extraordinary scenic beauty, accessible even to trekkers with limited experience. A deeply spiritual place and a visual feast in equal measure.',
    itinerary: [
      {
        day: 1,
        title: 'Manali Arrival',
        from: 'Arrival',
        to: 'Manali',
        altitude: '6,700 ft (2,050 m)',
        duration: 'Explore',
        description:
          'Visit the ancient Manu temple and Hadimba Devi Temple, and settle into the gateway of the Beas Kund valley. Trek briefing in the evening.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1FClcEPo4CWAjIMRUE_Mp8QPM-pehwzV6/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Trek to Bakarthach',
        from: 'Dhundi',
        to: 'Bakarthach',
        altitude: '10,800 ft (3,290 m)',
        duration: '3–4 hrs',
        description:
          'Short drive to Dhundi at the head of Solang Nala, then trek upstream through spectacular open valley views and wildflower-filled meadows to the Bakarthach camp.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/12f2uv75CRGIFnLrLGcVkXdMXT4G4ZY9W/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Beas Kund Visit',
        from: 'Bakarthach',
        to: 'Bakarthach (day hike)',
        altitude: 'As per itinerary',
        duration: '5–6 hrs return',
        description:
          'Day hike to the sacred Beas Kund lake at the foot of the Shitidhar glacier. Standing beneath the sheer walls of Hanuman Tibba and Friendship Peak is a truly humbling experience.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1V1bk5jPuieLxMP7DPT1HjM8MELU8EZwN/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Return to Manali',
        from: 'Bakarthach',
        to: 'Manali',
        altitude: '6,700 ft (2,050 m)',
        duration: '3–4 hrs',
        description:
          'Easy descent back through Dhundi and the scenic Solang Nala valley, with a final drive back to Manali.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/11f6L5QEp-wTxozHEXwgIskNOpLpc5hY1/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Nitin Arora',
        city: 'Delhi',
        quote: 'Standing at the source of the Beas River felt surreal.',
        rating: 5,
        image: '',
      },
      {
        name: 'Shruti Iyer',
        city: 'Chennai',
        quote:
          'Super beginner-friendly and insanely beautiful. Great intro to trekking.',
        rating: 5,
        image: '',
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Manali to Manali transport',
      'All meals during the trek',
      'Camping accommodation (twin sharing tents)',
      'Sleeping bags & trekking gear',
      'Certified trek guide',
      'Forest permits & entry fees',
      'First aid & basic medical kit',
    ],
    exclusions: [
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 10,
    pickupDrop: 'Manali',
  },

  //--- Har Ki Dun Trek---------------------------------------------------
  {
    id: 9,
    type: OfferingType.TREK,
    geoLocation: "",
    slug: 'har-ki-dun-trek',
    featured: false,
    active: true,
    title: 'Har Ki Dun Trek',
    tagline: 'Walk into the Valley of Gods through ancient Himalayan trails',
    location: 'Uttarkashi, Uttarakhand, India',
    duration: '6 Days / 5 Nights',
    difficulty: DifficultyLevel.MODERATE,
    priceFrom: 8999,
    maxGroupSize: 30,
    altitude: 11700,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1lZ72Ttrluj_DPq0U7UBemoH8Otz3c1Yo/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1nVp9Rab-HaZd1Yv78U56_WgrCj6WQWWl/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1iL7yQOi0msUWRD6fvR29L1FOcpS-AcXs/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1cj-8aNyqX_5geXzfZzk6QxAXR-aKQv1f/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1UmV6eTfCWyQQL9OelqUVOZySlUWwGnbH/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Explore the stunning Har Ki Dun valley, also known as the Valley of Gods',
      'Walk through dense pine, deodar, and rhododendron forests',
      'Witness panoramic views of Swargarohini, Bandarpoonch, and Black Peak',
      'Experience remote Himalayan village life in Osla',
      'Pass through Govind Pashu Vihar National Park rich in flora and fauna',
      'Visit the ancient Someshwar Mahadev temple in Osla village',
      'See alpine meadows, rivers, and glacial valleys including Jaundhar Glacier',
    ],
    nextDate: 'Flexible',
    spotsLeft: 12,
    description:
      'Har Ki Dun is one of the most scenic valley treks in the Western Himalayas, ideal for beginners and nature lovers. Nestled inside the Govind Pashu Vihar National Park, this cradle-shaped valley offers a perfect mix of forests, rivers, alpine meadows, and traditional Himalayan villages. The trail provides a gradual ascent, making it suitable for first-time trekkers while still offering rewarding views of snow-clad peaks and rich biodiversity.',
    itinerary: [
      {
        day: 1,
        title: 'Drive from Dehradun to Sankri',
        from: 'Dehradun',
        to: 'Sankri',
        altitude: '6,400 ft',
        duration: '10 hrs drive',
        description:
          'Drive through Mussoorie, Purola, Mori, and Netwar along the Tons River to reach Sankri, a scenic Himalayan village and the base for several popular treks. Enjoy beautiful mountain views and settle in for the night.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1UoTAZlRb2tGpdj6jLbW3svupwh07ztk1/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Drive to Gangad and Trek to Osla',
        from: 'Sankri',
        to: 'Osla',
        altitude: '8,500 ft',
        duration: '4–5 hrs trek',
        description:
          'Drive to Gangad village and begin a gradual trek to Osla. Walk along rivers, forests, and small waterfalls. Reach Osla village, known for its traditional wooden houses and historical structural architecture.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1Ya4CwJOfF-fg2dTIbDdV3xbVXg-S1Suo/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Trek from Osla to Kalkatiyadhar',
        from: 'Osla',
        to: 'Kalkatiyadhar',
        altitude: '8,956 ft',
        duration: '5–6 hrs trek',
        description:
          'Trek through forest clearings and river crossings. Witness the confluence of the Supin and Ruinsara rivers and enjoy views of Black Peak and Bandarpoonch. Camp at Kalkatiyadhar.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1j3neZOzyq-9veAecwLaDRPkIQIAIWli5/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Trek to Har Ki Dun Valley and Return',
        from: 'Kalkatiyadhar',
        to: 'Har Ki Dun & back',
        altitude: 'As per itinerary',
        duration: '6–7 hrs trek',
        description:
          'Reach the breathtaking Har Ki Dun valley surrounded by towering peaks. Explore alpine meadows, streams, and distant glaciers before returning to camp.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1lZ72Ttrluj_DPq0U7UBemoH8Otz3c1Yo/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        title: 'Trek back to Osla and Drive to Sankri',
        from: 'Kalkatiyadhar',
        to: 'Sankri',
        altitude: '6,400 ft',
        duration: '6–7 hrs',
        description:
          'Descend back to Osla via the same scenic route and drive to Sankri. Enjoy a relaxed evening after completing the trek.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1aRo2VzJgFbaQElFVefi03j4M1G2rY05m/view?usp=drive_link'
        ),
      },
      {
        day: 6,
        title: 'Drive back to Dehradun',
        from: 'Sankri',
        to: 'Dehradun',
        altitude: '-',
        duration: '10 hrs drive',
        description:
          'Return journey to Dehradun with memories of forests, valleys, and Himalayan life.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1ZqbA7eLPmwReQOtbIO-W3zEDbHxLQ3Mq/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Rohit Sharma',
        city: 'Delhi',
        quote:
          'Perfect trek for beginners. The valley views and village experience were unforgettable.',
        image: '',
        rating: 5,
      },
      {
        name: 'Ananya Sen',
        city: 'Kolkata',
        quote:
          'Beautiful trails, well-organized camps, and amazing guides. Highly recommended.',
        image: '',
        rating: 4,
      },
    ],
    availableDates: [
      { date: 'Apr 15, 2026', spots: 10 },
      { date: 'May 10, 2026', spots: 8 },
      { date: 'Sep 20, 2026', spots: 12 },
      { date: 'Flexible', spots: 15 },
    ],
    inclusions: [
      'Dehradun to Dehradun transport',
      'All meals during the trek',
      'Accommodation in tents and guesthouses',
      'Experienced trek leader and support staff',
      'Forest permits and entry fees',
      'First aid and basic medical kit',
      'Trekking equipment (tents, sleeping bags, etc.)',
    ],
    exclusions: [
      'Personal expenses',
      'Travel insurance',
      'Porter/mule charges',
      'Meals during transit',
      'Anything not mentioned in inclusions',
    ],
    minAge: 10,
    pickupDrop: 'Dehradun',
  },

  //--- Indrahar Pass Trek ------------------------------------------
  {
    id: 10,
    type: OfferingType.TREK,
    geoLocation: "",
    slug: 'indrahar-pass-trek',
    featured: false,
    active: true,
    title: 'Indrahar Pass Trek',
    tagline: 'Cross high mountain passes with sweeping Dhauladhar views',
    location: 'Dhauladhar Range, Himachal Pradesh, India',
    duration: '4 Days / 3 Nights',
    difficulty: DifficultyLevel.MODERATE_DIFFICULT,
    priceFrom: 6500,
    maxGroupSize: 30,
    altitude: 14245,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1YfBntx7gRJYrbmVX9wvPZEeOJwVj3WJ-/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1IFBZ6eIfi0umnpShtec18Q-Y9FZyL34B/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/12whNAAA_zPRfnCeZ3baM3Q6GzJc5Ylp_/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1WWt6ATkSsw-1pdNvFognxntZu2gKcO17/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1B0T4BU8xpIC3o-VbtEKvU7Oi4O91kQ96/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1hvXcWkPvUMrM04b36nu9_BvViqzFafF0/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1TYu-kNIJvaje-pRP3hGSY98KbQ-JVKh3/view?usp=sharing'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/13NS6vpq5Kpd6Mrow0NNGBYkWe_WJUGGv/view?usp=sharing'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1NbwMO6sG5AmPu8vHGfWvGIU-QEukm3A5/view?usp=sharing'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1cVB356Yew1ZZSeEILWqlj6D3oHE7oVvF/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1RePrxnG14rkC5hLr0Xl_8PXAXNKUSatW/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Reach the high-altitude Indrahar Pass at 4,342 meters',
      'Panoramic views of the Dhauladhar and Pir Panjal ranges',
      'Camp at scenic meadows like Triund and Laka Got',
      'Walk through dense oak, rhododendron, and cedar forests',
      'Experience Himalayan wildlife and alpine landscapes',
      'Witness dramatic sunrise and sunset over snow-clad peaks',
      'Explore the cultural charm of McLeod Ganj and Dharamkot',
    ],
    nextDate: 'Flexible',
    spotsLeft: 10,
    description:
      'The Indrahar Pass Trek is a thrilling high-altitude journey in Himachal Pradesh, starting from McLeod Ganj and climbing through forests, meadows, and rugged mountain terrain. Known for its dramatic views and steep ascents, this trek offers a perfect blend of adventure and natural beauty. Ideal for trekkers with moderate experience, it rewards you with panoramic vistas of the Dhauladhar and Pir Panjal ranges from the summit.',
    itinerary: [
      {
        day: 1,
        title: 'Trek from Dharamkot to Triund',
        from: 'Dharamkot / McLeod Ganj',
        to: 'Triund',
        altitude: '9,350 ft',
        duration: '4–5 hrs trek',
        description:
          'Begin the trek with a steady climb through oak and rhododendron forests. Reach Triund, a beautiful meadow offering wide views of the Kangra Valley and Dhauladhar range. Camp overnight.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1rzbuEQxFURp9DcPCe7ITnZIo-HkmZD0n/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Trek from Triund to Laka Got',
        from: 'Triund',
        to: 'Laka Got',
        altitude: '11,500 ft',
        duration: '4–5 hrs trek',
        description:
          'Ascend gradually through rocky terrain and alpine landscapes. Pass through scenic ridges and reach Laka Got, a popular high-altitude campsite surrounded by peaks.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1ZsV06i-YeCtTAExv0unzyU1662L1wRlU/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Summit Indrahar Pass and Return to Laka',
        from: 'Laka Got',
        to: 'Indrahar Pass & back',
        altitude: '14,245 ft',
        duration: '6–7 hrs trek',
        description:
          'Start early for the most challenging day. Climb steep sections via Lahesh Cave to reach Indrahar Pass. Enjoy breathtaking views before descending back to Laka Got.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1H9hb0NV-9HEEOKt2ktQi8Wncm61kwDo1/view?usp=sharing'
        ),
      },
      {
        day: 4,
        title: 'Descend to Dharamkot',
        from: 'Laka Got',
        to: 'Dharamkot / McLeod Ganj',
        altitude: '-',
        duration: '5–6 hrs trek',
        description:
          'Descend via Triund back to Dharamkot. The trail offers one last look at the mountains before returning to civilization.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1CckISSXumxteuXPbZLYQnHpuViX1vPj6/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Arjun Mehta',
        city: 'Mumbai',
        quote:
          'Challenging but absolutely worth it. The summit views are unreal.',
        image: '',
        rating: 5,
      },
      {
        name: 'Sneha Kapoor',
        city: 'Bangalore',
        quote:
          'Loved the mix of forest trails and high-altitude adventure. Great experience overall.',
        image: '',
        rating: 4,
      },
    ],
    availableDates: [
      { date: 'May 5, 2026', spots: 8 },
      { date: 'June 15, 2026', spots: 6 },
      { date: 'September 10, 2026', spots: 10 },
      { date: 'Flexible', spots: 15 },
    ],
    inclusions: [
      'Accommodation in tents (shared basis)',
      'All vegetarian meals from Day 1 dinner to Day 4 breakfast',
      'Experienced trek leader and support staff',
      'Permits and entry charges',
      'Basic medical kit',
    ],
    exclusions: [
      'Personal expenses',
      'Porter or mule charges',
      'Personal medication',
      'Anything not mentioned in inclusions',
    ],
    minAge: 12,
    pickupDrop: 'McLeod Ganj',
  },

  //----Buni Buni + Kheerganga Trek----------------------------------------------------------------
  {
    id: 11,
    type: OfferingType.TREK,
    geoLocation: "",
    slug: 'buni-buni-kheerganga-trek',
    title: 'Buni Buni + Kheerganga Trek',
    tagline: 'Two camps. One unforgettable Parvati Valley journey.',
    featured: false,
    active: true,
    location: 'Parvati Valley, Himachal Pradesh',
    duration: '2 Nights / 3 Days',
    difficulty: DifficultyLevel.MODERATE,
    priceFrom: 3999,
    maxGroupSize: 30,
    altitude: 9711,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1m5Bmt-KD58C3e4aiAbWzhAPcbgaT08JI/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/16b15tSyLo6Eau-6SALgARo2t6tHYbMes/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1XcfIMwAgh-nSGFT8qLIkh--se1KkwmwM/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1GFdgl0qnR0eKKw4ek_77jPO_NkgHtRIX/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1E0gMRxTZ9AomnfhJ8RU5mYDGgQUM99KE/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Bunbuni hidden meadow campsite',
      'Kheerganga hot springs',
      'Rudra Nag waterfall',
      'Forest & apple orchard trails',
      'Bonfire & stargazing camps',
    ],
    nextDate: 'Available on request',
    spotsLeft: 20,
    description:
      'A perfect beginner-friendly Himalayan combo trek covering Bunbuni meadows and Kheerganga hot springs with forest trails, waterfalls, and cultural experiences.',
    itinerary: [
      {
        day: 1,
        title: 'Barshaini to Bunbuni',
        from: 'Barshaini',
        to: 'Bunbuni',
        altitude: '3,800 ft (1,158 m)',
        duration: '5-6 hrs',
        description:
          'Trek via Kalga village through forests and orchards to reach Bunbuni campsite.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1_I_xTBT_mDA6HwhtmgXxOfmKFx3MCNh0/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Bunbuni to Kheerganga',
        from: 'Bunbuni',
        to: 'Kheerganga',
        altitude: 'As per itinerary',
        duration: '5-6 hrs',
        description:
          'Scenic trek via waterfalls and forest trails to reach Kheerganga and enjoy hot springs.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1mEwxWjE0lYTZVJmAMr5vINARpbDvvB7Z/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Return to Barshaini',
        from: 'Kheerganga',
        to: 'Barshaini',
        altitude: '3,900 ft (1,189 m)',
        duration: '4-5 hrs',
        description: 'Descend via Kalga after breakfast, concluding the trek.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1dCZ2Xqrmi6ym5US07hIq80j-Dr4wWxKV/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Rohan Shah',
        city: 'Delhi',
        quote: 'Two camps, two completely different vibes. Absolute magic.',
        image: '',
        rating: 5,
      },
      {
        name: 'Priya Mishra',
        city: 'Pune',
        quote: 'Perfect for beginners. Felt safe and confident throughout.',
        image: '',
        rating: 5,
      },
      {
        name: 'Aarav Trivedi',
        city: 'Mumbai',
        quote: 'Best value combo trek in Parvati Valley.',
        image: '',
        rating: 5,
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 20 }],
    inclusions: [
      '2 Nights stay (Bunbuni & Kheerganga)',
      '2 Breakfasts, 2 Dinners, 1 Lunch',
      'Evening snacks',
      'Tents & sleeping bags',
      'Certified trek guide',
      'First aid & medical support',
      'Permits & forest fees',
      'Bonfire (weather permitting)',
    ],
    exclusions: [
      'Transport to/from Barshaini',
      'Personal expenses',
      'Travel insurance',
      'Porter/mule charges',
      'Optional activities',
      'GST',
    ],
    minAge: 12,
    pickupDrop: 'Barshaini',
  },

  // ----Kashmir Great Lakes Trek-------------------------------------------
  {
    id: 12,
    type: OfferingType.TREK,
    geoLocation: "",
    slug: 'kashmir-great-lakes-trek',
    title: 'Kashmir Great Lakes Trek',
    featured: false,
    active: true,
    tagline: 'Seven days. Six alpine lakes. Infinite Himalayan beauty.',
    location: 'Kashmir, India',
    duration: '7 Days / 6 Nights',
    difficulty: DifficultyLevel.MODERATE,
    priceFrom: 17999,
    maxGroupSize: 30,
    altitude: 13800,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1V4YAsoB252h63Wx5ZBuwCMi-WYVbRGgC/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1HjFqwzCKeiAGUDytkvyCB2TudhY12Wdq/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1vFOo7LG88ukxNkBtrb1EtMSQi2tH3Sa3/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1S38mGTlg7AKNAEopst20EHt3SJaCvbZC/view?usp=drive_link'
      ),
    ],
    highlights: [
      '6 alpine lakes including Vishansar, Gadsar, Gangabal',
      'Sonamarg valley landscapes',
      'High mountain passes like Gadsar & Zaj Pass',
      'Meadows, glaciers & crystal-clear streams',
      'Views of Harmukh peak',
    ],
    nextDate: '25 May 2026',
    spotsLeft: 10,
    description:
      'The Kashmir Great Lakes Trek is a seven-day adventure through the heart of the Kashmir Himalayas. Starting from Sonamarg, 90 km from Srinagar, the trail takes you across five valleys and past six stunning alpine lakes, with views of snow-capped peaks, lush meadows, and crystal-clear streams. The journey offers a magnificent look into alpine landscapes, making it both challenging and deeply rewarding.',
    itinerary: [
      {
        day: 1,
        title: 'Srinagar to Sonamarg',
        from: 'Srinagar',
        to: 'Sonamarg',
        altitude: '7,800 ft (2,377 m)',
        duration: 'Drive',
        description:
          'Trekkers will gather at the Tourist Reception Centre in Srinagar around 11 AM. From there, the journey continues to Sonamarg, home to Shitkari village, which serves as the base camp for the Kashmir Great Lakes trek.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1ZPw9-oYL_YTTillRmyTIgnCo7XMiOCqC/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Sonamarg to Nichnai via Shekdur',
        from: 'Sonamarg',
        to: 'Nichnai',
        altitude: '11,500 ft (3,505 m)',
        duration: '6-7 hrs',
        description:
          'After an early meal, we begin our trek to Nichnai, our campsite for the night. The trail winds through pine and maple forests, gradually opening up to stunning views of the Sonamarg Valley. Along the way, we pass the lush meadows of Shekdur, surrounded by Bhoj trees and dotted with small peaks, making it a perfect rest stop. Following the Nichnai stream, we reach our campsite, where we’ll have dinner and stay overnight.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1gun3sK9HJWxKot7zhFD1yZKJCv8A8KrV/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Nichnai to Vishansar Lake',
        from: 'Nichnai',
        to: 'Vishansar Lake',
        altitude: '12,000 ft (3,658 m)',
        duration: '6-7 hrs',
        description:
          'After breakfast, we trek towards the beautiful Vishansar Lake. Surrounded by alpine forests, glaciers, and dramatic valleys, it holds great structural aesthetic prominence. As we ascend through meadows, the twin peaks near Nichnai Pass come into view, offering breathtaking vistas of the Sonamarg Valley before we reach the lake nestled at the base of the mountains.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/13k35-9Q8JI8E1ytfssEIs4jFHkyYodld/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Vishansar to Gadsar',
        from: 'Vishansar Lake',
        to: 'Gadsar',
        altitude: 'As per itinerary',
        duration: '7-8 hrs',
        description:
          'After morning tea and brunch, we head toward our next destination. Vishansar sits just above Kishansar Lake, about 500 feet apart, offering stunning views of clear waters and lush meadows. As we move ahead, Gadsar Pass comes into view, followed by the small Yamsar Lake. Continuing further, we reach the pristine Gadsar Lake, set against snow-covered cliffs. After soaking in the scenery, we proceed to our campsite, enjoy dinner, and stay overnight.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1j8KhV-xUvQdikYQ6kMYebzNZ2Rj1QVeN/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        title: 'Gadsar to Satsar',
        from: 'Gadsar',
        to: 'Satsar',
        altitude: '12,000 ft (3,658 m)',
        duration: '6-7 hrs',
        description:
          'After breakfast, we head towards Satsar Camp at 12,000 ft, known for its seven lakes, visible depending on the season. The trail passes through lush forests, rivers, and valleys, with stunning mountain views along the way. Crossing a ridge that marks the entrance to Satsar, we near the army camp. We set up camp a short distance away, enjoy dinner, and stay overnight in the peaceful surroundings.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1Pb9NffMW8rfNPspH15rLTjotAbYmJc0h/view?usp=drive_link'
        ),
      },
      {
        day: 6,
        title: 'Satsar to Gangabal (via Zaj Pass)',
        from: 'Satsar',
        to: 'Gangabal / Nundkol',
        altitude: '11,500 ft (3,505 m)',
        duration: '6-7 hrs',
        description:
          'After breakfast, we begin a hike with steady ascents and descents through a rugged trail dotted with unnamed peaks and lakes. Eventually, we reach Gangabal, the largest lake in the location, with Nundkol located just beside it. Nestled at the base of Mount Harmukh and its hanging glacier, Nundkol offers a dramatic, sheltered setting. We set up our campsite here at Nundkol, have dinner, and spend the night under the mountain skies.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/17YQS_UTJhXUBzbtjIrtggVKTiynpFj3l/view?usp=drive_link'
        ),
      },
      {
        day: 7,
        title: 'Gangabal to Srinagar via Naranag',
        from: 'Gangabal',
        to: 'Srinagar',
        altitude: '5,200 ft (1,585 m)',
        duration: '5-6 hrs + drive',
        description:
          'After breakfast, we begin our descent from Gangabal campsite. The trail gradually transitions from alpine wilderness to green canopies and signs of civilization. At around 8,500 ft, meadows give way to wooden cottages as Naranag comes into view, along with the road leading onward. From here, we drive back to Srinagar, where the group disperses and the journey comes to an end.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1xGNcdvAo8gNMfMpXrS2YqHhKwuWIdPe6/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Rohit Sharma',
        city: 'Delhi',
        quote:
          'Perfect trek for beginners. The valley views and village experience were unforgettable.',
        image: '',
        rating: 5,
      },
      {
        name: 'Ananya Sen',
        city: 'Kolkata',
        quote:
          'Beautiful trails, well-organized camps, and amazing guides. Highly recommended.',
        image: '',
        rating: 4,
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 30 }],
    inclusions: [
      'Pick-up & drop from Srinagar',
      'All meals during trek',
      'Tents (double/triple sharing)',
      'Sleeping bags & trekking gear',
      'Morning & evening tea with snacks',
      'Forest permits & fees',
      'First aid medical kit',
      'Expert trek guide',
    ],
    exclusions: [
      'Food during transit (pick-up/drop journey)',
      'Porter / mule charges',
      'Personal expenses',
      'Optional activities',
      'Insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 10,
    pickupDrop: 'Srinagar',
  },

  // ── Gaumukh Tapovan Trek ───────────────────────────────────────────────────────────────
  {
    id: 13,
    type: OfferingType.TREK,
    geoLocation: "https://maps.app.goo.gl/HFasQTTuvsGefYnv8",
    slug: 'gaumukh-tapovan-trek',
    featured: false,
    active: true,
    title: 'Gaumukh Tapovan Trek',
    tagline: 'Journey to the source of the holy Ganges.',
    location: 'Uttarakhand',
    duration: '7 Days / 6 Nights',
    difficulty: DifficultyLevel.MODERATE_DIFFICULT,
    priceFrom: 17999,
    maxGroupSize: 30,
    altitude: 14200,
    gallery: [
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1VmvXwOTUKcar4gdRIidxbNelnbU-W6Dz/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/13RH5pGaGRc1c0x7I-cfkUqfE-NVcYd6d/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1cMujVHYhgIC38W72QhUfyd_UBVShTFoa/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1SNpf4PwtUofntvHspEwB8fLx5eiJPUjJ/view?usp=drive_link'
      ),
      convertGoogleDriveLink(
        'https://drive.google.com/file/d/1MesSejgrJz7-Um_h8PYJG-X6Jx_k4GGP/view?usp=drive_link'
      ),
    ],
    highlights: [
      'Source of River Ganges at Gaumukh Glacier',
      'Stunning alpine meadows of Tapovan',
      'Close-up views of Mt. Shivling and Bhagirathi massifs',
      'Camping at the base of towering Himalayan peaks',
      'Trekking through Gangotri National Park',
    ],
    nextDate: 'Available on request',
    spotsLeft: 15,
    description:
      'The Gaumukh Tapovan Trek is a legendary high-altitude journey in Uttarakhand, taking you deep into the heart of the Garhwal Himalayas from the holy town of Gangotri. The ~46 km trail traverses the rugged terrain of Gangotri National Park, tracking the tumultuous Bhagirathi River up to its mythical source at the Gaumukh Glacier terminus.\n\nBeyond the glacier lies the steep, demanding ascent to Tapovan—a breathtaking alpine meadow sitting at 14,200 ft. Tapovan serves as a pristine oasis right under the immediate, imposing face of Mt. Shivling, offering unparalleled vistas of the Bhagirathi peaks. This trek blends deep spiritual heritage with raw, challenging Himalayan adventure, making it a must-do for seasoned trekkers looking for a demanding and deeply rewarding expedition.',
    itinerary: [
      {
        day: 1,
        title: 'Trek from Gangotri to Chirbasa',
        from: 'Gangotri',
        to: 'Chirbasa',
        altitude: '11,761 ft (3,585 m)',
        duration: '4-5 hrs (~9 km)',
        description:
          'Complete forest department formalities and enter Gangotri National Park. Enjoy a gentle, steady climb through beautiful pine (Chir) forests keeping the river to your right, arriving at the riverside camp of Chirbasa.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1-pLirwUEGia6gTefI7dL_PgqrxprgZTc/view?usp=drive_link'
        ),
      },
      {
        day: 2,
        title: 'Trek from Chirbasa to Bhojwasa',
        from: 'Chirbasa',
        to: 'Bhojwasa',
        altitude: '12,440 ft (3,792 m)',
        duration: '3-4 hrs (~5 km)',
        description:
          'A shorter trekking day moving past the tree line. The terrain opens up into barren mountainscapes filled with birch (Bhoj) trees. Reach Bhojwasa by afternoon, where you catch your first striking glimpse of the Bhagirathi peaks.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1MesSejgrJz7-Um_h8PYJG-X6Jx_k4GGP/view?usp=drive_link'
        ),
      },
      {
        day: 3,
        title: 'Trek to Tapovan via Gaumukh Glacier',
        from: 'Bhojwasa',
        to: 'Tapovan',
        altitude: 'As per itinerary',
        duration: '6-8 hrs (~10-14 km)',
        description:
          'The most challenging day. Trek to Gaumukh to see the snout of the Ganges source. Cross the massive boulder-strewn glacier zone, and then navigate a nearly vertical, loose-scree climb up to the beautiful golden meadows of Tapovan.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1qlbmJ4hnGO2EmjwvcfYaFxcDPnoWjX-c/view?usp=drive_link'
        ),
      },
      {
        day: 4,
        title: 'Explore Tapovan and Descend to Bhojwasa',
        from: 'Tapovan',
        to: 'Bhojwasa',
        altitude: '12,440 ft (3,792 m)',
        duration: '4-5 hrs (~6 km)',
        description:
          'Wake up to an unforgettable sunrise on Mt. Shivling. After exploring the high-altitude meadow and taking photos, carefully descend the steep trail back across the glacier to settle into your campsite at Bhojwasa.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/1GfX6GzPWPYcqRnb9X0_P9XdOHXSCf2Iq/view?usp=drive_link'
        ),
      },
      {
        day: 5,
        title: 'Trek from Bhojwasa back to Gangotri',
        from: 'Bhojwasa',
        to: 'Gangotri',
        altitude: '11,204 ft (3,415 m)',
        duration: '6-7 hrs (~14 km)',
        description:
          'Trace your steps back through Chirbasa. The long downhill march brings you back to Gangotri town by late afternoon. Celebrate the successful completion of the trek and enjoy a comfortable stay at a guest house.',
        imageUrl: convertGoogleDriveLink(
          'https://drive.google.com/file/d/14s2CM-o_Ojc9dqQDxr_-_FklncS0xpBP/view?usp=drive_link'
        ),
      },
    ],
    testimonials: [
      {
        name: 'Rahul Verma',
        city: 'Mumbai',
        quote:
          'Standing right below Mt. Shivling in Tapovan was a spiritual experience. The climb up from the glacier is tough but completely worth it.',
        image: '',
        rating: 5,
      },
      {
        name: 'Priyanka Nair',
        city: 'Bengaluru',
        quote:
          'Gaumukh is massive and humbling. The trek tests your stamina, so preparation is key. An absolute classic Himalayan trail.',
        image: '',
        rating: 5,
      },
    ],
    availableDates: [{ date: 'Flexible', spots: 15 }],
    inclusions: [
      'Camping accommodation in Gangotri National Park (twin sharing tents)',
      'All meals during the trek',
      'Experienced trek leader & support staff',
      'Gangotri National Park permits & entry fees',
      'Sleeping bags & trekking gear',
      'First aid & oxygen support',
    ],
    exclusions: [
      'Transport to/from Gangotri',
      'Personal expenses',
      'Porter/mule charges',
      'Travel insurance',
      'Anything not mentioned in inclusions',
      '5% GST',
    ],
    minAge: 16,
    pickupDrop: 'Gangotri',
  },
]
