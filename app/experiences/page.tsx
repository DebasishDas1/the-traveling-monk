import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import {
  Container,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'
import { TrekCard } from '@/components/experience/TrekCard'
import { Button } from '@/components/ui/button'

import { trekData } from '@/lib/data/treks'
import { isTrek } from '@/types/experience'
import { CategoryCard } from '@/components/experience/CategoryCard'

export const metadata: Metadata = {
  title: 'Experiences | The Traveling Monk',
  description:
    'Treks, homestays, and international journeys designed to help you slow down, reconnect, and return renewed.',
}

const categories = [
  {
    label: 'Treks',
    description: 'Walk a little farther from the noise.',
    href: '/treks',
    image: '/illustrations/trek.png',
  },
  {
    label: 'Homestays',
    description: 'Stay somewhere that feels like nowhere else.',
    href: '/homestays',
    image: '/illustrations/home-stay.png',
  },
  {
    label: 'International Trips',
    description: 'Go somewhere unfamiliar. Come back different.',
    href: '/international',
    image: '/illustrations/Around the world-amico.png',
  },
] as const

export default function ExperiencesPage() {
  const featuredExperiences = trekData
    .filter(isTrek)
    .filter(({ featured }) => featured)
    .slice(0, 3)

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <Section>
        <Container>
          <MediaHeading
            eyebrow="Experiences"
            title="Choose your way out of the ordinary."
            description="Treks, stays, and journeys designed to slow you down, bring you closer to people, and leave you feeling renewed."
            size="display"
            image={
              <Media
                src="/illustrations/choose.png"
                alt="Person sitting by the sea"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      {/* Categories */}
      <Section>
        <Container>
          <div className="space-y-12">
            <Heading
              eyebrow="Find your reset"
              title="Where do you want to go?"
              size="h2"
            />

            <div className="grid gap-6 md:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.href} {...category} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured */}
      {featuredExperiences.length > 0 && (
        <Section>
          <Container>
            <div className="space-y-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <Heading
                  eyebrow="Featured"
                  title="Start somewhere beautiful."
                  description="A few journeys we'd choose first."
                  size="h2"
                />

                <Link
                  href="/treks"
                  className="
                    inline-flex shrink-0 items-center gap-2
                    text-sm font-medium
                    underline decoration-border underline-offset-8
                    transition-colors
                    hover:decoration-foreground
                  "
                >
                  Explore all experiences
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredExperiences.map((experience) => (
                  <TrekCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* The Reset */}
      <Section className="bg-muted/30">
        <Container className="max-w-5xl">
          <MediaHeading
            eyebrow="The Reset"
            title="You don't need another vacation."
            description="You need a reset."
            imagePosition="left"
            image={
              <Media
                src="/illustrations/not-vacation.png"
                alt="Traveller taking a quiet moment"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="Ready?"
            title="Begin your reset."
            description="The mountains are closer than you think."
            size="h2"
          />

          <div className="flex justify-center pt-6">
            <Button asChild>
              <Link href="/treks">
                Explore experiences
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
