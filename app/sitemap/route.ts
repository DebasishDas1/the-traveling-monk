import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

/**
 * Dynamic sitemap.xml route for SEO.
 * Lists the main static pages of the site.
 */
export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/*$/, ''); // ensure no trailing slash
  const pages = [
    '',
    'about',
    'contact',
    'experiences',
    'experiences/trek',
    'experiences/getaway',
    'experiences/international',
  ];

  const urlEntries = pages
    .map(
      (p) => `  <url>\n    <loc>${baseUrl}/${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
    },
  });
}
