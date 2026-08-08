import type { ExpeditionType } from "@/types/experience";

export const expeditionsData: ExpeditionType[] = [
  {
    id: 1,
    name: "Bhutan Cultural Adventure",
    slug: "bhutan-cultural-adventure",
    country: "Bhutan",
    location: "Paro, Thimphu, and Punakha Valleys",
    tagline: "A curated cultural pilgrimage into the heart of Bhutan.",
    tier: "Easy",
    duration: "7D/6N",
    visaRequired: true, // Required for most foreigners (SDF and entry permits apply for SAARC/Indian citizens)
    bestSeason: "September to May",
    priceFrom: 54500,
    maxGroupSize: 12,
    spotsLeft: 4,
    availableDates: [
      { date: "Oct 15, 2025", spots: 8 },
      { date: "Nov 10, 2025", spots: 6 },
      { date: "Dec 05, 2025", spots: 4 },
    ],
    price: {
      twin: 54500,
      single: 68000,
    },
    gallery: [
      "https://drive.google.com/file/d/1UUjhYRQIF8sAtEy3lpeWR6Fi7Hfiyetu/view?usp=drive_link",
      "https://drive.google.com/file/d/14PILXMCXdS7jxO-JmfyNJAYUr7qPWvjA/view?usp=drive_link",
      "https://drive.google.com/file/d/1XOzevsFE1vcfK1H-uBVQiMqrTtGhpAgf/view?usp=drive_link",
      "https://drive.google.com/file/d/13OmQUm_cHdrl9vx9QUjJXY26Jx4UPMAF/view?usp=drive_link",
    ],
    description:
      "Journey into the mythical Kingdom of Bhutan, where ancient Tibetan Buddhist culture blends seamlessly with pristine Himalayan scenery. This 7-day expedition takes you deep into the western valleys of Paro, the capital of Thimphu, and the sub-tropical fortress valley of Punakha. You will hike through whispering pine forests, explore majestic fortress-monasteries (Dzongs), stand in awe of 100-foot gold statues, and ultimately climb the cliffside paths to the legendary Tiger’s Nest Monastery. It is a highly curated immersion designed to capture the true spiritual essence of Bhutan.",
    highlights: [
      "Hike to Paro Taktsang (Tiger’s Nest Monastery)",
      "Explore Punakha Dzong, the palace of great happiness",
      "Stand before the massive 169ft Buddha Dordenma Statue",
      "Traverse the panoramic Dochula Pass at 10,170 feet",
      "Walk the historic Punakha Suspension Bridge",
      "Experience traditional archery and authentic Bhutanese farm meals",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro & Transfer to Thimphu",
        from: "Paro International Airport (2,200m)",
        to: "Thimphu (2,334m)",
        altitude: "2,334 meters",
        duration: "1.5 Hours Drive",
        description:
          "Fly into the breathtaking valley of Paro. Meet your personal guide and drive along the scenic Pa Chhu and Wang Chhu rivers to the capital city, Thimphu. Check into your hotel and enjoy a peaceful evening exploring local craft markets.",
        imageUrl:
          "https://drive.google.com/file/d/1HzSqvDwgmoowccXihMibID_Inpw4JXM6/view?usp=drive_link",
      },
      {
        day: 2,
        title: "Thimphu Valley Local Sightseeing",
        from: "Thimphu",
        to: "Thimphu",
        altitude: "2,334 meters",
        description:
          "Spend a full day discovering Thimphu's historical gems. Visit the majestic National Memorial Chorten and stand before the colossal golden Buddha Dordenma. In the afternoon, head over to the Motithang Takin Preserve to view Bhutan's unique national animal, and conclude with a walk through Tashichho Dzong, the seat of government.",
        imageUrl:
          "https://drive.google.com/file/d/14PILXMCXdS7jxO-JmfyNJAYUr7qPWvjA/view?usp=drive_link",
      },
      {
        day: 3,
        title: "Scenic Drive to Punakha via Dochula Pass",
        from: "Thimphu",
        to: "Punakha Valley (1,200m)",
        altitude: "1,200 meters (Dochula Pass at 3,100m)",
        duration: "3 Hours Drive",
        description:
          "Ascend up to Dochula Pass to witness panoramic views of the high snow-capped peaks of the Eastern Himalayas, surrounded by 108 memorial chortens. Descend through alpine forests into the warm, emerald-green valleys of Punakha.",
        imageUrl:
          "https://drive.google.com/file/d/1XOzevsFE1vcfK1H-uBVQiMqrTtGhpAgf/view?usp=drive_link",
      },
      {
        day: 4,
        title: "Exploring Fortresses & Ancient Valleys",
        from: "Punakha",
        to: "Punakha",
        altitude: "1,200 meters",
        description:
          "Tour the breathtaking Punakha Dzong, famously perched at the convergence of two major glacier rivers. Cross the long, vibrating Punakha Suspension Bridge, and take a gentle afternoon walk through local terraced rice fields to visit Chimi Lhakhang, the legendary fertility temple.",
        imageUrl:
          "https://drive.google.com/file/d/1UUjhYRQIF8sAtEy3lpeWR6Fi7Hfiyetu/view?usp=drive_link",
      },
      {
        day: 5,
        title: "Return Drive to Paro & Cultural Heritage",
        from: "Punakha",
        to: "Paro",
        altitude: "2,200 meters",
        duration: "4.5 Hours Drive",
        description:
          "Drive back across the mountains to Paro Valley. Upon arrival, explore the Ta Dzong National Museum, which displays ancient artifacts and textiles. Walk down a stone staircase to visit Rinpung Dzong, an imposing fortress overlooking the valley floor.",
        imageUrl:
          "https://drive.google.com/file/d/13OmQUm_cHdrl9vx9QUjJXY26Jx4UPMAF/view?usp=drive_link",
      },
      {
        day: 6,
        title: "The Ultimate Hike to Tiger’s Nest Monastery",
        from: "Paro",
        to: "Paro (Taktsang Cliff)",
        altitude: "3,120 meters",
        duration: "4 to 5 Hours Hike",
        description:
          "Embark on an unforgettable pilgrimage hike up to Paro Taktsang (Tiger's Nest). The monastery clings precariously to a steep cliffside 900 meters above the valley floor. After taking in the mystical atmosphere and mountain vistas, descend for an evening hot-stone bath at a traditional Bhutanese farmhouse.",
        imageUrl:
          "https://drive.google.com/file/d/1W4u9KDZkHnwRJHkKvtekogBUhcMZm-nJ/view?usp=drive_link",
      },
      {
        day: 7,
        title: "Final Departure from Paro",
        from: "Paro",
        to: "Paro International Airport",
        description:
          "Savor your final morning views of the misty valleys over breakfast. Your guide will escort you to Paro International Airport for your onward flight home, marking the conclusion of an incredible Himalayan expedition.",
        imageUrl:
          "https://drive.google.com/file/d/15y6SsszKMDxxJmfSXpnu4IT0QV96HY9i/view?usp=drive_link",
      },
    ],
    inclusions: [
      "6 Nights accommodation in premium 3-star standard tourist hotels on a twin-sharing basis",
      "Full board meals (Daily Breakfast, Lunch, and Dinner) featuring authentic Bhutanese cuisine",
      "Private comfortable SUV/Coaster transportation for all transfers and sightseeing",
      "Service of a certified, fluent English-speaking Bhutanese local guide",
      "All internal monument/dzong entry fees and valley hiking permits",
      "Mineral water provided throughout the day's execution",
    ],
    exclusions: [
      "International flight tickets to/from Paro Airport",
      "Bhutan Visa Fee / Sustainable Development Fee (SDF) as mandated by your nationality",
      "Personal expenses (laundry, telephone calls, alcoholic beverages, tips for guide/driver)",
      "Optional travel insurance and medical evacuation expenses",
    ],
    testimonials: [
      {
        name: "Elena Rostova",
        city: "Prague, Czech Republic",
        quote:
          "Climbing to the Tiger's Nest was a spiritual milestone for me. The entire week was planned beautifully, and our guide felt like family.",
        image: "https://unsplash.com",
        rating: 5,
      },
    ],
  },
];
