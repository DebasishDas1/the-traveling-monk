import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import {
  Container,
  CtaSection,
  Heading,
  Media,
  MediaHeading,
  Page,
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
    label: 'International',
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

interface ExploreLinkProps {
  href: string
  children: React.ReactNode
}

function ExploreLink({ href, children }: ExploreLinkProps) {
  return (
    <Link
      href={href}
      className="
        group
        inline-flex
        w-fit
        items-center
        gap-2
        text-sm
        font-medium
        text-foreground
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
        focus-visible:ring-offset-4
      "
    >
      <span className="underline decoration-border underline-offset-8 transition-colors group-hover:decoration-foreground">
        {children}
      </span>

      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  )
}

export default function ExperiencesPage() {
  return (
    <Page>
      {/* Hero */}
      <Container className="mt-6">
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
              radius="xl"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          }
        />
      </Container>

      {/* Categories */}
      <Section className="pt-4 sm:pt-8 lg:pt-0">
        <Container>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <Heading
              eyebrow="Find your reset"
              title="Three ways to get away."
              description="Different kinds of journeys. The same reason for going."
              size="h2"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.href} {...category} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Treks */}
      {featuredTreks.length > 0 && (
        <Section className="bg-surface-secondary">
          <Container>
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              {/* Intro */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <Heading
                    eyebrow="01 / Treks"
                    title="Start somewhere beautiful."
                    description="Walk deeper into the mountains and a little farther from the noise."
                    size="h2"
                  />

                  <div className="mt-6 sm:mt-8">
                    <ExploreLink href="/experiences/trek">
                      Explore treks
                    </ExploreLink>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="grid gap-5 sm:gap-6 lg:col-span-8">
                {featuredTreks.map((experience) => (
                  <TrekCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Getaways */}
      {featuredGetaways.length > 0 && (
        <Section>
          <Container>
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              {/* Intro */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <Heading
                    eyebrow="02 / Getaways"
                    title="Stay somewhere that feels lived in."
                    description="Slow down, share a meal, and experience a place through the people who call it home."
                    size="h2"
                  />

                  <div className="mt-6 sm:mt-8">
                    <ExploreLink href="/experiences/getaway">
                      Explore getaways
                    </ExploreLink>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="grid gap-5 sm:gap-6 lg:col-span-8">
                {featuredGetaways.map((experience) => (
                  <GetawayCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* International */}
      {featuredInternational.length > 0 && (
        <Section className="bg-surface-secondary">
          <Container>
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              {/* Intro */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <Heading
                    eyebrow="03 / International"
                    title="Go somewhere unfamiliar."
                    description="Curated journeys beyond the familiar, designed to give you a different perspective."
                    size="h2"
                  />

                  <div className="mt-6 sm:mt-8">
                    <ExploreLink href="/experiences/international">
                      Explore international
                    </ExploreLink>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="grid gap-5 sm:gap-6 lg:col-span-8">
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

      {/* The Reset */}
      <Section>
        <Container>
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
                radius="xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* CTA */}
      <CtaSection
        eyebrow="Ready?"
        title="Begin your reset."
        description="The mountains, quiet homes, and unfamiliar places are closer than you think."
        buttonText="Explore experiences"
        link="/experiences"
      />
    </Page>
  )
}
