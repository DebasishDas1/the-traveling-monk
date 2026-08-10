import type { Metadata } from 'next'

import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'

import { trekData } from '@/lib/data/treks'
import { Media, MediaHeading } from '@/components/common'
import { TrekGrid } from '@/components/experience/TrekGrid'

export const metadata: Metadata = {
  title: 'Himalayan Treks | The Traveling Monk',
  description:
    'Himalayan treks for adventure, stillness, friendship, and a reset from modern life.',
}

export default function TreksPage() {
  return (
    <main>
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
                alt="Person sitting by the sea"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      <Container>
        <TrekGrid treks={trekData} />
      </Container>

      {/* ─────────────────────────────
          PHILOSOPHY
      ───────────────────────────── */}

      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="The Traveling Monk"
            title="Leave the noise behind."
            description="Journeys that take you away from the noise and closer to what matters."
            size="h2"
          />
          <Media
            src="/illustrations/on-the-way.png"
            alt="Person sitting by the sea"
            ratio="1/1"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="text-center">
            <Heading
              eyebrow="Ready?"
              title="Begin your reset."
              description="Your next story might be waiting in the mountains."
              size="h2"
              align="center"
            />

            <div className="mt-10">
              <a
                href="/experiences"
                className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore experiences
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
