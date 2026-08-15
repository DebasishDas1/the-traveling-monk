import { Compass, Heart, Mountain } from 'lucide-react'

export const principles = [
  {
    number: '01',
    title: 'People before itineraries.',
    description:
      'The best journeys are remembered because of the people you shared them with. We create experiences where strangers can become friends.',
    icon: Heart,
  },
  {
    number: '02',
    title: 'Go slower.',
    description:
      'Not every moment needs to be optimized. We leave space for long conversations, quiet mornings, unexpected turns, and simply being there.',
    icon: Mountain,
  },
  {
    number: '03',
    title: 'Travel with intention.',
    description:
      'We care about where we take you, who you meet, how you travel, and what you bring home with you.',
    icon: Compass,
  },
]

export const categories = [
  {
    label: 'Treks',
    description: 'Walk a little farther from the noise.',
    href: '/treks',
    image: '/illustrations/trek.png',
  },
  {
    label: 'Homestays',
    description: 'Stay somewhere that feels like nowhere else.',
    href: '/homestays',
    image: '/illustrations/home-stay.png',
  },
  {
    label: 'International Trips',
    description: 'Go somewhere unfamiliar. Come back different.',
    href: '/international',
    image: '/illustrations/Around the world-amico.png',
  },
] as const

export const founders = [
  {
    name: 'Akash Mukherjee',
    role: 'Experience Lead',
    intro:
      'Started as a trekker dealing with burnout. After years in the Himalayas, now designs journeys that are simple, safe, and meaningful.',
    image: '/images/about/founder-1.png',
    exp: '10+ Years Experience',
    certs: 'IMF Certified',
    treks: '150+ Treks Led',
    responsibility: 'Designing your overall trek experience',
  },
  {
    name: 'Debasish Das',
    role: 'Operations & Routes',
    intro:
      'Plans routes and handles logistics so your trek runs smoothly. Focused on clarity, timing, and consistency.',
    image: '/images/about/founder-2.png',
    exp: '5+ Years Experience',
    certs: 'WFA Advanced',
    treks: '100+ Treks Led',
    responsibility: 'Planning routes and managing logistics',
  },
  {
    name: 'Subarna Banik',
    role: 'Wellbeing & Pace',
    intro:
      'Keeps the journey balanced. Helps you manage pace, breathing, and mental comfort during the trek.',
    image: '/images/about/founder-3.jpeg',
    exp: '8+ Years Experience',
    certs: 'NOLS, Yoga Alliance',
    treks: '120+ Treks Led',
    responsibility: 'Group comfort and mental well-being',
  },
  {
    name: 'Saikat Saha',
    role: 'Safety Lead',
    intro:
      '10+ years in high-altitude trekking. Handles safety, terrain decisions, and emergency response.',
    image: '/images/about/founder-4.jpeg',
    exp: '12+ Years Experience',
    certs: 'HMI Advanced, Rescue',
    treks: '200+ Treks Led',
    responsibility: 'On-ground safety and emergency decisions',
  },
]
