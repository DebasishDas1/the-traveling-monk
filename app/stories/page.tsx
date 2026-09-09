// app/stories/page.tsx
import type { Metadata } from 'next'
import { StoriesPageClient } from '@/components/experience/StoriesPageClient'
import { quoteList } from '@/lib/data/stories-page'

export const metadata: Metadata = {
  title: 'Travel Stories & Journals | The Traveling Monk',
  description: 'Read and share travel stories from our community of explorers.',
  alternates: {
    canonical: '/stories',
  },
}

export default function StoriesPage() {
  return <StoriesPageClient quoteList={quoteList} />
}
