import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container, Heading, Media, Section } from '@/components/common'
import { FaqSection } from '@/components/common/FaqSection'
import { CtaSection } from '@/components/common/CtaSection'
import { Button } from '@/components/ui/button'

import { expeditionsData } from '@/lib/data/expeditions'
import { faqs, reasons, travelStyles } from '@/lib/data/international-page'

import type { Expedition } from '@/types/experience'
import { getImage } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'International Journeys | The Traveling Monk',
  description:
    'Curated international journeys for curious travellers. Go somewhere new, experience it deeply, and return renewed.',
}

export default function InternationalPage() {
  const featuredTrips = expeditionsData.filter((trip) => trip.featured)

  const trips =
    featuredTrips.length > 0
      ? featuredTrips.slice(0, 3)
      : expeditionsData.slice(0, 3)

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <Section className="pt-8 md:pt-12 lg:pt-16">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 lg:pb-16">
              <Heading
                eyebrow="International Journeys"
                title="Go somewhere that changes your perspective."
                description="Curated journeys beyond the familiar. New streets, unfamiliar food, unexpected friendships, and stories you'll carry home."
                size="display"
              />

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/journeys">
                    Explore journeys
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/destinations">Where are we going?</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Media
                src="/illustrations/Globalization-pana.png"
                alt="Travellers exploring a new destination"
                ratio="4/5"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Philosophy */}
      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="Beyond the checklist"
            title="The world is bigger than its landmarks."
            description="We travel to notice things. The smell of a morning market. A conversation with someone we've just met. A road we didn't plan to take."
            size="display"
          />

          <div className="mx-auto mt-16 md:mt-24">
            <Media
              src="/illustrations/children-playing-in-the-pool.png"
              alt="Travellers walking through a local street"
              ratio="1/1"
            />
          </div>

          <p className="mx-auto mt-10 text-center text-lg leading-8 text-muted-foreground">
            The places matter. But the feeling you bring home matters more.
          </p>
        </Container>
      </Section>

      {/* Destinations */}
      <Section>
        <Container>
          <Heading
            eyebrow="Where we're going"
            title="Different places. Different rhythms."
            description="Our destinations change. The feeling we're looking for doesn't."
            size="h2"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <DestinationCard key={trip.id} trip={trip} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Why travel far */}
      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="Why travel far"
            title="Sometimes you need to leave the familiar to see yourself differently."
            size="h2"
          />

          <div className="mt-16 grid overflow-hidden rounded-[2rem] border bg-border gap-px lg:mt-24 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="flex flex-col bg-primary-hover p-7 text-center text-white"
              >
                <span className="text-7xl font-black md:text-8xl">
                  {reason.number}
                </span>

                <h3 className="mt-8 text-xl font-medium tracking-[-0.03em]">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/80">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How we travel */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-5">
              <Heading
                eyebrow="How we travel"
                title="Enough structure to explore. Enough space to breathe."
                description="We take care of the details without taking over the journey."
                size="h2"
              />
            </div>

            <div className="lg:col-span-7 divide-y">
              {travelStyles.map((style) => {
                const Icon = style.icon

                return (
                  <div
                    key={style.title}
                    className="grid gap-5 py-8 md:grid-cols-[auto_1fr] md:gap-8"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full border">
                      <Icon
                        aria-hidden="true"
                        className="size-4 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-medium tracking-[-0.03em]">
                        {style.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {style.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section>
        <Container>
          <div className="grid overflow-hidden rounded-[2rem] bg-muted md:grid-cols-2">
            <Media
              src="/illustrations/no-plan.png"
              alt="Friends sharing a moment while travelling"
              ratio="1/1"
              className="h-full"
            />

            <div className="flex items-center p-8 md:p-12 lg:p-20">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  From the road
                </p>

                <blockquote className="mt-8 text-3xl font-medium leading-tight tracking-[-0.04em] md:text-4xl">
                  “We stopped planning for a day and somehow found the best day
                  of the entire trip.”
                </blockquote>

                <p className="mt-8 text-sm font-medium">Ananya · Mumbai</p>

                <Link
                  href="/stories"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
                >
                  Read the story
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <FaqSection
        eyebrow="Good to know"
        title="Before you go."
        description="A few things worth knowing before you pack your bag."
        items={faqs}
      />

      {/* CTA */}
      <CtaSection
        eyebrow="Your next chapter"
        title="Go somewhere you've never been. Come back a little different."
        description="The world is waiting. You don't need to see all of it. Just start somewhere."
        buttonText="Begin Your Reset"
        link="/journeys"
      />
    </main>
  )
}

/* ============================================================
   COMPONENTS
============================================================ */

function DestinationCard({ trip }: { trip: Expedition }) {
  const image = getImage(trip.gallery[0], trip.name)

  return (
    <Link href={`/international/${trip.slug}`} className="group">
      <div className="overflow-hidden rounded-[1.75rem]">
        {image ? (
          <Media
            src={image.src}
            alt={image.alt}
            ratio="4/5"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden="true" className="aspect-4/5 bg-muted" />
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {trip.country}
        </p>

        <div className="mt-2 flex items-center justify-between gap-4">
          <h3 className="text-xl font-medium tracking-[-0.03em]">
            {trip.name}
          </h3>

          <ArrowRight
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {trip.tagline}
        </p>
      </div>
    </Link>
  )
}
