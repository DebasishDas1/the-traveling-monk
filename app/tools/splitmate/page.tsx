import type { Metadata } from 'next'
import { Wallet } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { Container, Heading } from '@/components/common'
import { CreateGroupDialog } from '@/components/splitmate/CreateGroupDialog'
import { SplitMateWorkspace } from '@/components/splitmate/SplitMateWorkspace'

export const metadata: Metadata = {
  title: `SplitMate – Tools – ${siteConfig.name}`,
  description:
    'Split travel expenses with friends without the spreadsheet headache.',
  openGraph: {
    title: `SplitMate – Tools – ${siteConfig.name}`,
    description:
      'Split travel expenses with friends without the spreadsheet headache.',
    url: `${siteConfig.url}/tools/splitmate`,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `SplitMate – Tools – ${siteConfig.name}`,
    description:
      'Split travel expenses with friends without the spreadsheet headache.',
    images: ['/og-image.jpg'],
  },
}

export default function SplitMatePage() {
  return (
    <main>
      <section className="section-sm">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            {/* Intro */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Wallet
                    className="size-4"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>

                <p className="eyebrow-accent">Travel tool</p>
              </div>

              <div className="mt-7">
                <Heading
                  eyebrow="SplitMate"
                  title="Split the bill. Keep the trip moving."
                  description="No spreadsheets. No awkward calculations. Add your travel expenses and let SplitMate handle the maths."
                  size="h1"
                  titleClassName="text-4xl sm:text-5xl lg:text-6xl"
                />
              </div>
            </div>

            {/* Action */}
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <CreateGroupDialog />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="rounded-[2rem] border border-border bg-surface p-5 shadow-sm sm:p-7 lg:p-8">
            <SplitMateWorkspace />
          </div>
        </Container>
      </section>
    </main>
  )
}
