import { Wallet } from 'lucide-react'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `SplitMate – Tools – ${siteConfig.name}`,
  description: 'Split bills with friends during trips using SplitMate tool.',
  openGraph: {
    title: `SplitMate – Tools – ${siteConfig.name}`,
    description: 'Split bills with friends during trips using SplitMate tool.',
    url: `${siteConfig.url}/tools/splitmate`,
    siteName: siteConfig.name,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: siteConfig.name }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `SplitMate – Tools – ${siteConfig.name}`,
    description: 'Split bills with friends during trips using SplitMate tool.',
    images: ['/og-image.jpg'],
  },
}

import { Container, Heading } from '@/components/common'
import { CreateGroupDialog } from '@/components/splitmate/CreateGroupDialog'
import { SplitMateWorkspace } from '@/components/splitmate/SplitMateWorkspace'

export default function SplitMatePage() {
  return (
    <main>
      <Container className="pt-10">
        <div className="flex items-center">
          <Wallet className="size-16 pr-4" strokeWidth={1.7} />

          <Heading title="SplitMate" size="h1" />
        </div>

        <p className="text-lg text-muted-foreground">
          Split the bill. Keep the trip moving.
        </p>

        <div className="mt-10">
          <CreateGroupDialog />
        </div>

        <SplitMateWorkspace />
      </Container>
    </main>
  )
}
