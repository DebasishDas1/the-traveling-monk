import { NextResponse } from 'next/server'

import { siteConfig } from '@/config/site'
import { trekData } from '@/lib/data/trek-data'
import { getawaysData } from '@/lib/data/getaway-data'
import { internationalData } from '@/lib/data/international-data'
import { OfferingType } from '@/types/experience'

type SitemapEntry = {
  path: string
  priority: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  lastmod?: string
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function normalizePath(path: string) {
  return path.replace(/^\/+|\/+$/g, '')
}

function createUrlEntry({ path, priority, changefreq, lastmod }: SitemapEntry) {
  const normalizedPath = normalizePath(path)
  const loc = normalizedPath
    ? `${siteConfig.url}/${normalizedPath}`
    : siteConfig.url

  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n')
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  /*
   * Core site pages.
   *
   * Higher priority is reserved for pages that represent
   * important search / discovery entry points.
   */
  const staticPages: SitemapEntry[] = [
    {
      path: '',
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: today,
    },
    {
      path: 'experiences',
      changefreq: 'weekly',
      priority: '0.95',
      lastmod: today,
    },
    {
      path: 'experiences/trek',
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: today,
    },
    {
      path: 'experiences/getaway',
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: today,
    },
    {
      path: 'experiences/international',
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: today,
    },
    {
      path: 'about',
      changefreq: 'monthly',
      priority: '0.7',
    },
    {
      path: 'contact',
      changefreq: 'monthly',
      priority: '0.6',
    },
    {
      path: 'tools',
      changefreq: 'monthly',
      priority: '0.5',
    },
    {
      path: 'tools/splitmate',
      changefreq: 'monthly',
      priority: '0.5',
    },
  ]

  /*
   * Active trek pages.
   */
  const trekPages: SitemapEntry[] = trekData
    .filter(
      (trek) =>
        trek.type === OfferingType.TREK && trek.active && Boolean(trek.slug)
    )
    .map((trek) => ({
      path: `experiences/trek/${trek.slug}`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: today,
    }))

  /*
   * Getaway pages.
   */
  const getawayPages: SitemapEntry[] = getawaysData
    .filter((getaway) => Boolean(getaway.slug))
    .map((getaway) => ({
      path: `experiences/getaway/${getaway.slug}`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: today,
    }))

  /*
   * International experience pages.
   */
  const internationalPages: SitemapEntry[] = internationalData
    .filter((experience) => Boolean(experience.slug))
    .map((experience) => ({
      path: `experiences/international/${experience.slug}`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: today,
    }))

  /*
   * Combine all pages.
   */
  const allPages = [
    ...staticPages,
    ...trekPages,
    ...getawayPages,
    ...internationalPages,
  ]

  /*
   * Remove duplicate URLs.
   */
  const uniquePages = Array.from(
    new Map(allPages.map((page) => [normalizePath(page.path), page])).values()
  )

  const urlEntries = uniquePages.map(createUrlEntry).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urlEntries}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
