import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container, Heading, Media, Section } from '@/components/common'
import { FaqSection } from '@/components/common/FaqSection'
import { CtaSection } from '@/components/common/CtaSection'
import { Button } from '@/components/ui/button'

import { internationalData } from '@/lib/data/international-data'
import { faqs, reasons, travelStyles } from '@/lib/data/international-page'
import { InternationalTripCard } from '@/components/experience/InternationalTripCard'

export const metadata: Metadata = {
  title: 'International Journeys | The Traveling Monk',
  description:
    'Curated international journeys for curious travellers. Discover new places, local experiences, meaningful connections, and journeys designed to leave you renewed.',
  alternates: {
    canonical: '/international',
  },
  openGraph: {
    title: 'International Journeys | The Traveling Monk',
    description:
      'Curated international journeys for curious travellers. Discover new places, local experiences, and meaningful connections.',
    type: 'website',
  },
}

export default function InternationalPage() {
  const featuredTrips = internationalData
    .filter((trip) => trip.featured)
    .slice(0, 3)

  const trips =
    featuredTrips.length > 0 ? featuredTrips : internationalData.slice(0, 3)

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <Section className="pt-8 md:pt-12 lg:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Heading
                eyebrow="International Journeys"
                title="Go somewhere that changes your perspective."
                description="Curated journeys beyond the familiar. New streets, unfamiliar food, unexpected friendships, and stories you'll carry home."
                size="display"
              />

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/experiences">
                    Explore journeys
                    <ArrowRight aria-hidden="true" className="size-4" />
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
                alt="Travellers exploring an international destination"
                ratio="4/5"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured journeys */}
      {trips.length > 0 && (
        <Container>
          <div className="mb-8 flex items-end justify-between gap-6">
            <Heading
              eyebrow="Featured journeys"
              title="Go a little farther."
              size="h2"
            />

            <Link
              href="/experiences"
              className="hidden shrink-0 items-center gap-2 text-sm font-medium md:inline-flex"
            >
              View all
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {trips.map((trip) => (
              <InternationalTripCard key={trip.id} experience={trip} />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/experiences">
                View all journeys
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      )}

      {/* Philosophy */}
      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="Beyond the checklist"
            title="The world is bigger than its landmarks."
            description="We travel to notice things. The smell of a morning market. A conversation with someone we've just met. A road we didn't plan to take."
            size="h2"
          />

          <div className="mx-auto mt-12 max-w-5xl md:mt-16">
            <Media
              src="/illustrations/children-playing-in-the-pool.png"
              alt="Travellers enjoying a local experience"
              ratio="16/9"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <p className="mx-auto mt-8 text-center text-base leading-7 text-muted-foreground md:text-lg">
            The places matter. But the feeling you bring home matters more.
          </p>
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

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="flex min-h-56 flex-col bg-primary-hover p-6 text-center text-white md:min-h-64 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="text-6xl font-black tracking-tight md:text-7xl"
                >
                  {reason.number}
                </span>

                <h3 className="mt-6 text-lg font-medium tracking-tight">
                  {reason.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/75">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* How we travel */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Heading
                eyebrow="How we travel"
                title="Enough structure to explore. Enough space to breathe."
                description="We take care of the details without taking over the journey."
                size="h2"
              />
            </div>

            <div className="divide-y lg:col-span-7">
              {travelStyles.map((style) => {
                const Icon = style.icon

                return (
                  <article
                    key={style.title}
                    className="grid gap-4 py-6 md:grid-cols-[auto_1fr] md:gap-6"
                  >
                    <div
                      className="flex size-9 items-center justify-center rounded-full border"
                      aria-hidden="true"
                    >
                      <Icon className="size-4 text-primary" strokeWidth={1.5} />
                    </div>

                    <div>
                      <h3 className="text-lg font-medium tracking-tight">
                        {style.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {style.description}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section>
        <Container>
          <article className="grid overflow-hidden rounded-2xl bg-muted md:grid-cols-2">
            <Media
              src="/illustrations/no-plan.png"
              alt="Friends sharing a moment while travelling"
              ratio="1/1"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="flex items-center p-7 md:p-10 lg:p-14">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  From the road
                </p>

                <blockquote className="mt-6 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                  “We stopped planning for a day and somehow found the best day
                  of the entire trip.”
                </blockquote>

                <p className="mt-6 text-sm font-medium">Ananya · Mumbai</p>

                <Link
                  href="/stories"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
                >
                  Read the story
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </article>
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
        buttonText="Begin your reset"
        link="/experiences"
      />
    </main>
  )
}
