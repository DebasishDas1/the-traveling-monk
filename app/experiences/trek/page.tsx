import type { Metadata } from 'next'

import { TreksPageClient } from '@/components/experience/TreksPageClient'

export const metadata: Metadata = {
  title: 'Himalayan Treks',
  description:
    'Explore Himalayan treks for adventure, stillness, friendship, and a refreshing escape from everyday life.',
  alternates: {
    canonical: '/experiences/trek',
  },
  openGraph: {
    title: 'Himalayan Treks',
    description:
      'Explore Himalayan treks for adventure, stillness, friendship, and a refreshing escape from everyday life.',
    url: '/experiences/trek',
    type: 'website',
  },
}

export default function TreksPage() {
  return <TreksPageClient />
}