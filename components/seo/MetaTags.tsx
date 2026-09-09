import Head from 'next/head'
import { siteConfig } from '@/config/site'


interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
}

/**
 * Reusable SEO meta tags component.
 * Injects title, description, keywords, canonical link and JSON‑LD for the organization.
 */
export default function MetaTags({
  title = siteConfig.name,
  description = siteConfig.description,
  keywords = ['travel', 'trek', 'adventure', 'getaway', 'the traveling monk'],
  canonical,
}: MetaTagsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      'https://twitter.com/thetravelingmonk',
      'https://www.facebook.com/thetravelingmonk',
      'https://www.instagram.com/thetravelingmonk',
    ],
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {canonical && <link rel="canonical" href={canonical} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}
