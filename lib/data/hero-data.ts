import type { HeroSlide } from '@/types/hero.types'
import { convertGoogleDriveLink } from '@/lib/media-utils'

export const heroSlidesData: HeroSlide[] = [
  {
    id: '1',
    category: 'TREK',
    title: 'Kedarkantha Trek',
    description:
      'Snow-covered trails, quiet forests and unforgettable sunrises in the Himalayas.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    href: '/treks/kheerganga-trek',
    cta: 'Begin Your Reset',
  },
  {
    id: '2',
    category: 'HOMESTAY',
    title: 'Kasol Mountain Homestay',
    description: 'Wake up beside the river and rediscover slow mornings.',
    image: convertGoogleDriveLink(
      'https://drive.google.com/file/d/1hhrLuila_DgtMz38JsyKUrnIFhWBQ9u-/view?usp=drive_link'
    ),
    href: '/homestays/kasol-manali',
    cta: 'Begin Your Reset',
  },
  {
    id: '3',
    category: 'INTERNATIONAL',
    title: 'Bhutan Cultural Adventure',
    description:
      'A journey through rice terraces, temples and peaceful coastlines.',
    image: convertGoogleDriveLink(
      'https://drive.google.com/file/d/1UUjhYRQIF8sAtEy3lpeWR6Fi7Hfiyetu/view?usp=drive_link'
    ),
    href: '/international/bhutan-cultural-adventure',
    cta: 'Begin Your Reset',
  },
]
