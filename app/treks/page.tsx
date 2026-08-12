import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import {
  Container,
  CtaSection,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'

import { TrekGrid } from '@/components/experience/TrekGrid'
import { trekData } from '@/lib/data/treks'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Himalayan Treks | The Traveling Monk',
  description:
    'Himalayan treks for adventure, stillness, friendship, and a reset from modern life.',
}

export default function TreksPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <Section>
        <Container>
          <MediaHeading
            eyebrow="Himalayan Treks"
            title="Find your way into the mountains."
            description="Journeys that take you away from the noise and closer to what matters."
            size="display"
            image={
              <Media
                src="/illustrations/mountain-journey.png"
                alt="Traveller beginning a journey through the mountains"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      {/* Treks */}
      <Section>
        <Container>
          <TrekGrid treks={trekData} />
        </Container>
      </Section>

      {/* Philosophy */}
      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="The Traveling Monk"
            title="Leave the noise behind."
            description="Journeys that take you away from the noise and closer to what matters."
            size="h2"
          />

          <div className="mt-12 md:mt-16">
            <Media
              src="/illustrations/on-the-way.png"
              alt="Traveller walking through the mountains"
              ratio="1/1"
            />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CtaSection
        eyebrow="Ready?"
        title="Begin your reset."
        description="Your next story might be waiting in the mountains."
        buttonText="Explore experiences"
        link="/experiences"
      />
    </main>
  )
}
