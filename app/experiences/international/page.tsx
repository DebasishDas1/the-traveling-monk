import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

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
      {/* =====================================================
          HERO
      ====================================================== */}

      {/* <Section className="pt-10 sm:pt-12 lg:pt-16"> */}
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-6">
            <Heading
              eyebrow="International Journeys"
              title="Go somewhere that changes your perspective."
              description="Curated journeys beyond the familiar. New streets, unfamiliar food, unexpected friendships, and stories you'll carry home."
              size="display"
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="h-11 rounded-full px-5">
                <Link
                  href="/experiences"
                  className="inline-flex items-center gap-2"
                >
                  Explore
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>

              <Button
                // asChild
                variant="outline"
                className="h-11 rounded-full px-5"
              >
                <Link
                  href="/stories"
                  className="inline-flex items-center gap-2"
                >
                  Stories from the road
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Media
              src="/illustrations/Globalization-pana.png"
              alt="Travellers exploring an international destination"
              ratio="4/5"
              radius="xl"
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
      {/* </Section> */}

      {/* =====================================================
          FEATURED JOURNEYS
      ====================================================== */}

      {trips.length > 0 && (
        <Section className="bg-surface-secondary">
          <Container>
            <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
              <Heading
                eyebrow="Featured journeys"
                title="Go a little farther."
                description="New places, unfamiliar rhythms, and enough room for the unexpected."
                size="h2"
              />

              <Link
                href="/experiences"
                className="
                  group
                  inline-flex shrink-0 items-center gap-2
                  text-sm font-medium
                  text-foreground
                  transition-colors
                  hover:text-muted-foreground
                "
              >
                View all
                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4
                    transition-transform duration-200
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {trips.map((trip) => (
                <InternationalTripCard key={trip.id} experience={trip} />
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Button
                // asChild
                variant="outline"
                className="h-11 w-full rounded-full"
              >
                <Link
                  href="/experiences"
                  className="inline-flex items-center justify-center gap-2"
                >
                  View all journeys
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* =====================================================
          PHILOSOPHY
      ====================================================== */}

      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="lg:col-span-5">
              <Heading
                eyebrow="Beyond the checklist"
                title="The world is bigger than its landmarks."
                description="We travel to notice things. The smell of a morning market. A conversation with someone we've just met. A road we didn't plan to take."
                size="h2"
              />

              <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                <span className="h-px w-8 bg-accent" />
                <span>Leave room for the unexpected</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Media
                src="/illustrations/children-playing-in-the-pool.png"
                alt="Travellers enjoying a local experience"
                ratio="16/9"
                radius="xl"
                sizes="(max-width: 1023px) 100vw, 58vw"
              />

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                The places matter. But the feeling you bring home matters more.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          WHY TRAVEL FAR
      ====================================================== */}

      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
                Why travel far
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                Leave the familiar.
                <span className="block text-primary-foreground/50">
                  See what happens.
                </span>
              </h2>

              <p className="mt-5 text-base leading-7 text-primary-foreground/70">
                Sometimes a different place gives you enough distance to notice
                something new about your own.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl bg-primary-foreground/10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
              {reasons.map((reason) => (
                <article
                  key={reason.title}
                  className="
                    group
                    flex min-h-56 flex-col
                    justify-between
                    bg-primary
                    p-6
                    transition-colors duration-300
                    hover:bg-primary-hover
                    sm:min-h-60
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      text-5xl font-semibold
                      tracking-[-0.04em]
                      text-primary-foreground/20
                      transition-colors
                      duration-300
                      group-hover:text-primary-foreground/35
                    "
                  >
                    {reason.number}
                  </span>

                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {reason.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-primary-foreground/60">
                      {reason.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          HOW WE TRAVEL
      ====================================================== */}

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Heading
                  eyebrow="How we travel"
                  title="Enough structure to explore. Enough space to breathe."
                  description="We take care of the details without taking over the journey."
                  size="h2"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-border border-y border-border">
                {travelStyles.map((style, index) => {
                  const Icon = style.icon

                  return (
                    <article
                      key={style.title}
                      className="
                        group
                        grid gap-5 py-6
                        md:grid-cols-[auto_1fr]
                        md:gap-6
                        md:py-7
                      "
                    >
                      <div className="flex items-start justify-between md:block">
                        <span
                          className="
                            flex size-10 items-center justify-center
                            rounded-full
                            bg-muted
                            text-muted-foreground
                            transition-colors
                            duration-300
                            group-hover:bg-primary
                            group-hover:text-primary-foreground
                          "
                        >
                          <Icon
                            className="size-4"
                            strokeWidth={1.7}
                            aria-hidden="true"
                          />
                        </span>

                        <span className="text-xs font-medium tracking-[0.12em] text-muted-foreground md:hidden">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold tracking-tight">
                            {style.title}
                          </h3>

                          <span className="hidden text-xs font-medium tracking-[0.12em] text-muted-foreground md:inline">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                          {style.description}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          STORY
      ====================================================== */}

      <Section className="bg-surface-secondary">
        <Container>
          <article className="grid overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-2">
            <Media
              src="/illustrations/no-plan.png"
              alt="Friends sharing a moment while travelling"
              ratio="1/1"
              radius="none"
              sizes="(max-width: 767px) 100vw, 50vw"
            />

            <div className="flex items-center p-7 sm:p-10 lg:p-14">
              <div>
                <p className="eyebrow-accent">From the road</p>

                <blockquote className="mt-5 text-2xl font-semibold leading-[1.1] tracking-[-0.03em] text-foreground md:text-3xl">
                  “We stopped planning for a day and somehow found the best day
                  of the entire trip.”
                </blockquote>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Ananya · Mumbai
                </p>

                <Link
                  href="/stories"
                  className="
                    group
                    mt-7
                    inline-flex items-center gap-2
                    text-sm font-medium
                    text-foreground
                    transition-colors
                    hover:text-muted-foreground
                  "
                >
                  Read the story
                  <ArrowUpRight
                    aria-hidden="true"
                    className="
                      size-4
                      transition-transform duration-200
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </Link>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <FaqSection
        eyebrow="Good to know"
        title="Before you go."
        description="A few things worth knowing before you pack your bag."
        items={faqs}
      />

      {/* =====================================================
          CTA
      ====================================================== */}

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
