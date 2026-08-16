import type { Metadata } from 'next'

import {
  Container,
  CtaSection,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'
import { TrekGrid } from '@/components/experience/TrekGrid'
import { trekData } from '@/lib/data/trek-data'

export const metadata: Metadata = {
  title: 'Himalayan Treks',
  description:
    'Explore Himalayan treks for adventure, stillness, friendship, and a refreshing escape from everyday life.',
  alternates: {
    canonical: '/treks',
  },
  openGraph: {
    title: 'Himalayan Treks',
    description:
      'Explore Himalayan treks for adventure, stillness, friendship, and a refreshing escape from everyday life.',
    url: '/treks',
    type: 'website',
  },
}

export default function TreksPage() {
  return (
    <main>
      {/* LCP / Hero */}
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
                alt="Traveller beginning a journey through the Himalayan mountains"
                ratio="1/1"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* Trek collection */}
      <Container>
        <Heading
          as="h2"
          eyebrow="Explore"
          title="Choose your journey."
          description="Find a trek that matches your pace, experience, and sense of adventure."
          size="h2"
        />

        <div className="mt-10">
          <TrekGrid treks={trekData} />
        </div>
      </Container>

      {/* Philosophy */}
      <Section>
        <Container>
          <Heading
            as="h2"
            align="center"
            eyebrow="The Traveling Monk"
            title="Leave the noise behind."
            description="Step away from everyday distractions and into journeys that bring you closer to nature, people, and yourself."
            size="h2"
          />

          <div className="mt-10 md:mt-14">
            <Media
              src="/illustrations/on-the-way.png"
              alt="Traveller walking through the Himalayan mountains"
              ratio="1/1"
              sizes="(max-width: 768px) 100vw, 50vw"
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
