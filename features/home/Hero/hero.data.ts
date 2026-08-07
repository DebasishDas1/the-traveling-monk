// features/home/Hero/hero.data.ts

import type { HeroSlide } from './hero.types'

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    category: 'TREK',
    title: 'Kedarkantha Trek',
    description:
      'Snow-covered trails, quiet forests and unforgettable sunrises in the Himalayas.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    href: '/experiences/kedarkantha',
    cta: 'Begin Your Reset',
  },
  {
    id: '2',
    category: 'HOMESTAY',
    title: 'Tirthan Valley',
    description: 'Wake up beside the river and rediscover slow mornings.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    href: '/experiences/tirthan-valley',
    cta: 'Begin Your Reset',
  },
  {
    id: '3',
    category: 'INTERNATIONAL',
    title: 'Bali Escape',
    description:
      'A journey through rice terraces, temples and peaceful coastlines.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    href: '/experiences/bali',
    cta: 'Begin Your Reset',
  },
]
