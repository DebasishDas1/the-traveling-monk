import type { Metadata } from 'next'

import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'

import { ExperienceCard } from '@/components/experience/TrekCard'
import { ExperienceGrid } from '@/components/experience/ExperienceGrid'

import { trekData } from '@/lib/data/treks'
import { getFeaturedTrek, getTreks } from '@/lib/experiences'

export const metadata: Metadata = {
  title: 'Himalayan Treks | The Traveling Monk',
  description:
    'Himalayan treks designed for adventure, stillness, friendship, and a reset from modern life.',
}

export default function TreksPage() {
  const treks = getTreks(trekData)
  const featuredTrek = getFeaturedTrek(trekData)

  const remainingTreks = featuredTrek
    ? treks.filter((trek) => trek.id !== featuredTrek.id)
    : treks

  return (
    <main>
      {/* Hero */}
      <section className="py-24 md:py-32 lg:py-40">
        <Container>
          <div className="max-w-4xl">
            <Heading
              eyebrow="Himalayan Treks"
              title="Find your way into the mountains."
              description="Journeys for people who need a little less noise and a little more sky."
              size="display"
            />
          </div>
        </Container>
      </section>

      {/* Featured */}
      {featuredTrek && (
        <Section>
          <Container>
            <div className="space-y-12">
              <Heading
                eyebrow="Start here"
                title="Your next reset."
                size="h2"
              />

              <div className="mx-auto max-w-6xl">
                <ExperienceCard experience={featuredTrek} />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* All treks */}
      <Section>
        <Container>
          <div className="space-y-12">
            <Heading
              eyebrow="Explore"
              title="Choose your trail."
              description="From gentle escapes to demanding Himalayan adventures."
              size="h2"
            />

            <ExperienceGrid>
              {remainingTreks.map((trek) => (
                <ExperienceCard key={trek.id} experience={trek} />
              ))}
            </ExperienceGrid>
          </div>
        </Container>
      </Section>
    </main>
  )
}
