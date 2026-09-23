// app/stories/page.tsx
import type { Metadata } from 'next'

import { StoriesPageClient } from '@/components/experience/StoriesPageClient'
import { quoteList } from '@/lib/data/stories-page'

export const metadata: Metadata = {
  title: 'Travel Stories & Journals',
  description:
    'Stories, moments, and journals from people who travelled with The Traveling Monk.',
  alternates: {
    canonical: '/stories',
  },
  openGraph: {
    title: 'Travel Stories & Journals | The Traveling Monk',
    description:
      'Stories, moments, and journals from people who travelled with The Traveling Monk.',
    type: 'website',
    images: [
      {
        url: '/images/stories/stories-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel stories from The Traveling Monk community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Stories & Journals | The Traveling Monk',
    description:
      'Stories, moments, and journals from people who travelled with The Traveling Monk.',
    images: ['/images/stories/stories-og.jpg'],
  },
}

export default function StoriesPage() {
  return <StoriesPageClient quoteList={quoteList} />
}