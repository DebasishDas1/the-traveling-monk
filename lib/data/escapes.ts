import { EscapeType } from "@/lib/type";

export const escapesData: EscapeType[] = [
  {
    id: 1,
    name: "Kasol Manali Escape",
    slug: "kasol-manali",

    location: "Himachal Pradesh, India",
    duration: "4D/3N",

    pickup: "Delhi",
    maxGroupSize: 12,
    availableDates: [
      { date: "Oct 01, 2025", spots: 5 },
      { date: "Nov 15, 2025", spots: 3 },
    ],
    spotsLeft: 10,
    price: {
      double: 7999,
      triple: 8999,
    },

    gallery: [
      "https://drive.google.com/file/d/1hhrLuila_DgtMz38JsyKUrnIFhWBQ9u-/view?usp=drive_link",
      "https://drive.google.com/file/d/1nmXVA7Xy8VxmtVuWFyzTGMXgjM2Y6Nv-/view?usp=drive_link",
      "https://drive.google.com/file/d/1p9DRauKYF9oSHkufan7e8xL1Z--Klewc/view?usp=drive_link",
      "https://drive.google.com/file/d/142pcoYb5hXyb79YwPEtNmu6BNWXEW7pf/view?usp=drive_link",
      "https://drive.google.com/file/d/1LCJZF-Z3PtnypWf4LLxF7aeeKmNkDf6z/view?usp=drive_link",
      "https://drive.google.com/file/d/1cf8atNpkobMyj31ptt8V2SqZea9OaBco/view?usp=drive_link",
    ],

    description:
      "It begins where the city refuses to sleep — in the restless hum of Delhi — and slowly unfolds into a world where time forgets to hurry. As the roads wind higher into Himachal, the noise fades, replaced by whispers of pine forests and distant rivers. In Manali, you wander through stories etched in temples and mountain air, before chasing adrenaline in the vast, open stretches of Solang Valley. And just when the journey feels complete, Kasol draws you in — quieter, softer — where days drift beside the Parvati River and evenings linger in café corners. This isn’t just an escape; it’s a gentle unlearning of chaos, and a return to stillness.",

    highlights: [
      "Hadimba Devi Temple",
      "Mall Road Manali",
      "Van Vihar nature park",
      "Tibetan Monastery",
      "Solang Valley adventure activities",
      "Atal Tunnel & Sissu",
      "Kasol riverside cafés",
      "Parvati River views",
    ],

    itinerary: [
      {
        day: 1,
        title: "Departure from Delhi",
        from: "Delhi",
        to: "Manali",
        description:
          "As the city lights of Delhi begin to fade behind you, your journey to the mountains quietly begins. Settle into your seat as the hum of the road replaces the chaos of the city. With every passing mile, the air grows cooler, the skies darker, and somewhere between midnight conversations and window-side reflections, the mountains start calling you closer. Overnight journey to Manali.",
        imageUrl:
          "https://drive.google.com/file/d/14UVybCLsuafxQRoM9NqxEjmKlhLDcDPC/view?usp=drive_link",
      },
      {
        day: 2,
        title: "Manali Local Sightseeing",
        from: "Manali",
        to: "Manali",
        description:
          "Wake up to crisp mountain air and the scent of pine as Manali greets you. After check-in and some rest, step into a world where nature and culture intertwine. Wander through the ancient Hadimba Temple surrounded by towering deodar trees, stroll along the lively Mall Road, and find quiet moments at Van Vihar. As evening falls, the town glows softly, inviting you to slow down and simply exist.",
        imageUrl:
          "https://drive.google.com/file/d/1Dte2Te94VC5PWPvniEZ-WOjJljfVgXCI/view?usp=drive_link",
      },
      {
        day: 3,
        title: "Solang Valley / Sissu",
        from: "Manali",
        to: "Sissu",
        description:
          "Today is where the mountains show their wild side. Head to Solang Valley, where snow-draped landscapes turn into your playground. Feel the rush as you glide, ride, and soar through adventure activities. Later, drive through the iconic Atal Tunnel, emerging into the surreal beauty of Sissu — a hidden gem where waterfalls tumble down cliffs and silence feels almost sacred.",
        imageUrl:
          "https://drive.google.com/file/d/1TDK8Z6qkIKpLWRaduiG8fbBlDDKVk8XY/view?usp=drive_link",
      },
      {
        day: 4,
        title: "Manali to Kasol",
        from: "Manali",
        to: "Kasol",
        description:
          "Leave behind the bustle of Manali and follow the winding roads into the heart of Parvati Valley. Kasol welcomes you with the gentle sound of the river and a slower rhythm of life. Walk along the Parvati River, cross over to Chalal, and lose track of time in cozy cafés. The mountains here don’t rush you — they invite you to stay a little longer.",
        imageUrl:
          "https://drive.google.com/file/d/1kk8sMuXftcNU4yhe1CRW_NzNuzghuLkA/view?usp=drive_link",
      },
      {
        day: 5,
        title: "Return to Delhi",
        from: "Kasol",
        to: "Delhi",
        description:
          "Your final morning begins with the calming murmur of the river and a sky that feels a little closer than before. Sip on a warm cup at a riverside café, take one last walk through the valley, and let the stillness sink in. As you begin your journey back to Delhi, you’re not just carrying photos — but stories, moments, and a quiet piece of the mountains within you.",
        imageUrl:
          "https://drive.google.com/file/d/1SuxeISGGYu-EJWACdoQ2aE_JQ67cnP5H/view?usp=drive_link",
      },
    ],

    testimonials: [
      {
        name: "Anjali Sharma",
        city: "Gurugram",
        quote:
          "Best solo trip I’ve ever taken! Safe, organized, and the views were unreal.",
        image: "/images/kasol-manali.jpg",
        rating: 5,
      },
      {
        name: "Rohan Gupta",
        city: "Delhi",
        quote:
          "The food was amazing and the guide was super friendly. 10/10 would recommend.",
        image: "/images/kasol-manali.jpg",
        rating: 5,
      },
    ],

    inclusions: [
      "Delhi to Delhi transportation",
      "2 nights stay in Manali",
      "1 night stay in Kasol",
      "Breakfast & Dinner",
      "Sightseeing as per itinerary",
      "Trip captain support",
      "All toll tax and parking",
    ],

    exclusions: [
      "Adventure activities",
      "Entry tickets",
      "Lunch",
      "Personal expenses",
    ],
  },
];
