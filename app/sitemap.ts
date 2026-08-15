import type { MetadataRoute } from 'next'

import { trekData } from '@/lib/data/treks'
import { homestaysData } from '@/lib/data/homestays-data'
import { internationalData } from '@/lib/data/international-data'

const SITE_URL = 'https://thetravelingmonk.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/experiences`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/treks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/homestays`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/international`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const trekRoutes = trekData
    .filter((trek) => trek.active)
    .map((trek) => ({
      url: `${SITE_URL}/treks/${trek.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  const homestayRoutes = homestaysData
    .filter((stay) => stay.active)
    .map((stay) => ({
      url: `${SITE_URL}/homestays/${stay.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  const internationalRoutes = internationalData
    .filter((trip) => trip.active)
    .map((trip) => ({
      url: `${SITE_URL}/international/${trip.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  return [
    ...staticRoutes,
    ...trekRoutes,
    ...homestayRoutes,
    ...internationalRoutes,
  ]
}
