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

import { TrekCard } from '@/components/experience/TrekCard'
import { GetawayCard } from '@/components/experience/GetawayCard'
import { InternationalTripCard } from '@/components/experience/InternationalTripCard'
import { CategoryCard } from '@/components/experience/CategoryCard'

import { trekData } from '@/lib/data/trek-data'
import { getawaysData } from '@/lib/data/getaway-data'
import { internationalData } from '@/lib/data/international-data'
import { isTrek } from '@/types/experience'

export const metadata: Metadata = {
  title: 'Experiences | The Traveling Monk',
  description:
    'Explore treks, getaways, and international journeys designed to help you slow down, reconnect, and return renewed.',
  alternates: {
    canonical: '/experiences',
  },
  openGraph: {
    title: 'Experiences | The Traveling Monk',
    description:
      'Explore treks, getaways, and international journeys designed to help you slow down, reconnect, and return renewed.',
    type: 'website',
    url: '/experiences',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const categories = [
  {
    label: 'Treks',
    description: 'Walk a little farther from the noise.',
    href: '/experiences/trek',
    image: '/illustrations/trek.png',
  },
  {
    label: 'Getaways',
    description: 'Stay somewhere that feels like nowhere else.',
    href: '/experiences/getaway',
    image: '/illustrations/country-side.svg',
  },
  {
    label: 'International Trips',
    description: 'Go somewhere unfamiliar. Come back different.',
    href: '/experiences/international',
    image: '/illustrations/Around the world-amico.png',
  },
] as const

const featuredTreks = trekData
  .filter(isTrek)
  .filter((experience) => experience.featured)
  .slice(0, 2)

const featuredGetaways = getawaysData
  .filter((experience) => experience.featured)
  .slice(0, 2)

const featuredInternational = internationalData
  .filter((experience) => experience.featured)
  .slice(0, 2)

export default function ExperiencesPage() {
  return (
    <main className="overflow-hidden">
      {/* =====================================================
          HERO
      ====================================================== */}

      <Container>
        <MediaHeading
          eyebrow="Experiences"
          title="Choose your way out of the ordinary."
          description="Treks, stays, and journeys designed to slow you down, bring you closer to people, and leave you feeling renewed."
          size="display"
          image={
            <Media
              src="/illustrations/choose.png"
              alt="Traveller sitting beside the sea"
              ratio="1/1"
              priority
            />
          }
        />
      </Container>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <Section aria-labelledby="experience-categories">
        <Container>
          <div className="space-y-10">
            <Heading
              eyebrow="Find your reset"
              title="Where do you want to go?"
              size="h2"
            />

            <div className="grid gap-5 md:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.href} {...category} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          FEATURED TREKS
      ====================================================== */}

      {featuredTreks.length > 0 && (
        <Section aria-labelledby="featured-treks">
          <Container>
            <div className="space-y-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <Heading
                  eyebrow="Treks"
                  title="Start somewhere beautiful."
                  description="Walk deeper into the mountains and a little farther from the noise."
                  size="h2"
                />

                <Link
                  href="/experiences/trek"
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground"
                >
                  Explore treks
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {featuredTreks.map((experience) => (
                  <TrekCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* =====================================================
          FEATURED GETAWAYS
      ====================================================== */}

      {featuredGetaways.length > 0 && (
        <Section aria-labelledby="featured-getaways">
          <Container>
            <div className="space-y-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <Heading
                  eyebrow="Getaways"
                  title="Stay somewhere that feels lived in."
                  description="Slow down, share a meal, and experience a place through the people who call it home."
                  size="h2"
                />

                <Link
                  href="/getaways"
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground"
                >
                  Explore getaways
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {featuredGetaways.map((experience) => (
                  <GetawayCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* =====================================================
          INTERNATIONAL
      ====================================================== */}

      {featuredInternational.length > 0 && (
        <Section aria-labelledby="featured-international">
          <Container>
            <div className="space-y-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <Heading
                  eyebrow="International"
                  title="Go somewhere unfamiliar."
                  description="Curated journeys beyond the familiar, designed to give you a different perspective."
                  size="h2"
                />

                <Link
                  href="/international"
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground"
                >
                  Explore international
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {featuredInternational.map((experience) => (
                  <InternationalTripCard
                    key={experience.id}
                    experience={experience}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* =====================================================
          THE RESET
      ====================================================== */}

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

      <CtaSection
        eyebrow="Ready?"
        title="Begin your reset."
        description="The mountains, quiet homes, and unfamiliar places are closer than you think."
        buttonText="Explore experiences"
        link="/experiences"
      />
    </main>
  )
}
