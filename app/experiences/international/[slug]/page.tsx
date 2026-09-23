import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  ArrowUpRight,
  CalendarDays,
  Check,
  FileCheck2,
  Globe2,
  // Plane,
  Clock,
  Users,
} from 'lucide-react'

import { internationalData } from '@/lib/data/international-data'
import { OfferingType, type International } from '@/types/experience'

import {
  Container,
  CtaSection,
  Fact,
  Heading,
  Section,
} from '@/components/common'

import { GalleryHero } from '@/components/experience/GalleryHero'
import { ItineraryCard } from '@/components/experience/ItineraryCard'
import { PageGallery } from '@/components/experience/PageGallery'
import { TrekInclusions } from '@/components/experience/TrekInclusions'
import { Testimonials } from '@/components/experience/Testimonials'

import { getImage } from '@/lib/utils'

interface InternationalPageProps {
  params: Promise<{
    slug: string
  }>
}

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

function getInternational(slug: string): International | undefined {
  return internationalData.find(
    (experience): experience is International =>
      experience.type === OfferingType.INTERNATIONAL &&
      experience.slug === slug &&
      experience.active
  )
}

export function generateStaticParams() {
  return internationalData
    .filter(
      (experience): experience is International =>
        experience.type === OfferingType.INTERNATIONAL && experience.active
    )
    .map(({ slug }) => ({
      slug,
    }))
}

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function getGalleryImages(trip: International, limit = 3) {
  return trip.gallery
    .slice(0, limit)
    .map((image) => getImage(image, trip.name))
    .filter((image): image is NonNullable<typeof image> => image !== null)
}

/* -------------------------------------------------------------------------- */
/* SEO                                                                        */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: InternationalPageProps): Promise<Metadata> {
  const { slug } = await params
  const trip = getInternational(slug)

  if (!trip) return {}

  const title = `${trip.name} | The Traveling Monk`
  const image = getImage(trip.gallery[0], trip.name)

  return {
    title,
    description: trip.description,

    alternates: {
      canonical: `/international/${trip.slug}`,
    },

    openGraph: {
      title,
      description: trip.description,
      type: 'website',

      images: image
        ? [
            {
              url: image.src,
              alt: image.alt,
            },
          ]
        : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description: trip.description,
      images: image ? [image.src] : undefined,
    },
  }
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default async function InternationalPage({
  params,
}: InternationalPageProps) {
  const { slug } = await params

  const trip = getInternational(slug)

  if (!trip) {
    notFound()
  }

  const images = getGalleryImages(trip)
  const itinerary = trip.itinerary ?? []
  const testimonials = trip.testimonials ?? []

  const facts = [
    {
      label: 'Destination',
      value: trip.country,
      icon: <Globe2 className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Duration',
      value: trip.duration,
      icon: <Clock className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Group size',
      value: `Up to ${trip.maxGroupSize}`,
      icon: <Users className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Best season',
      value: trip.bestSeason,
      icon: <CalendarDays className="size-4" aria-hidden="true" />,
    },
  ]

  const hasHighlights = trip.highlights.length > 0
  const hasInclusions =
    Boolean(trip.inclusions?.length) || Boolean(trip.exclusions?.length)
  const hasGallery = trip.gallery.length > 0
  const hasTestimonials = testimonials.length > 0

  return (
    <main className="pb-28">
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <GalleryHero
        images={images}
        title={trip.name}
        length={trip.gallery.length}
      />

      {/* ------------------------------------------------------------------ */}
      {/* QUICK FACTS                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Container>
        <div
          className="
              grid grid-cols-2
              divide-x divide-y divide-border
              border-x border-border
              md:grid-cols-4
              md:divide-y-0
            "
        >
          {facts.map((fact) => (
            <Fact key={fact.label} {...fact} />
          ))}
        </div>
      </Container>

      {/* ------------------------------------------------------------------ */}
      {/* INTRO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section>
        <Container>
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="lg:col-span-7">
              <Heading
                eyebrow="The journey"
                title="Go somewhere that changes your perspective."
                size="h2"
              />
            </div>

            <div className="lg:col-span-5 lg:flex lg:items-end">
              <p
                className="
                  text-lg
                  leading-8
                  text-muted-foreground
                  sm:text-xl
                  sm:leading-9
                "
              >
                {trip.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* HIGHLIGHTS                                                          */}
      {/* ------------------------------------------------------------------ */}

      {hasHighlights && (
        <Section className="bg-surface-secondary">
          <Container>
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="eyebrow-accent">Along the way</p>

                  <h2
                    className="
                      mt-4
                      max-w-md
                      text-4xl
                      font-semibold
                      leading-[1.02]
                      tracking-[-0.04em]
                      sm:text-5xl
                    "
                  >
                    The moments
                    <span className="block text-muted-foreground">
                      you&apos;ll remember.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-6 text-muted-foreground">
                    Not just places on a map. These are the bits that make the
                    journey worth taking.
                  </p>

                  <div className="mt-8 hidden lg:flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    <span>Worth the detour</span>
                    <ArrowUpRight
                      className="size-3.5 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-3xl border border-border bg-surface">
                  {trip.highlights.map((highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="
                        group
                        flex
                        items-center
                        gap-4
                        border-b
                        border-border
                        px-5
                        py-5
                        last:border-b-0
                        transition-colors
                        duration-300
                        hover:bg-muted/60
                        sm:px-7
                        sm:py-7
                      "
                    >
                      <span
                        className="
                          w-8
                          shrink-0
                          text-xs
                          font-semibold
                          tabular-nums
                          text-accent
                        "
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span
                        className="
                        flex-1
                        text-base
                        font-medium
                        leading-6
                        text-foreground
                        sm:text-lg
                      "
                      >
                        {highlight}
                      </span>

                      <span
                        className="
                          flex
                          size-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-muted
                          text-muted-foreground
                          transition-all
                          duration-300
                          group-hover:bg-primary
                          group-hover:text-primary-foreground
                        "
                      >
                        <Check className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* ITINERARY                                                           */}
      {/* ------------------------------------------------------------------ */}

      {itinerary.length > 0 && (
        <Section>
          <Container>
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="eyebrow-accent">The journey</p>

                  <h2
                    className="
                      mt-4
                      text-4xl
                      font-semibold
                      leading-[1.02]
                      tracking-[-0.04em]
                      sm:text-5xl
                    "
                  >
                    Take it one day at a time.
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                    No rushing. No checklist. Just a trail, a few good people,
                    and enough time to notice where you are.
                  </p>

                  <div className="mt-8 hidden lg:block">
                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      <span>One day at a time</span>
                      <ArrowUpRight
                        className="size-3.5 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6 lg:col-span-8">
                {itinerary.map((item, index) => (
                  <ItineraryCard
                    key={`${item.day}-${item.title}-${index}`}
                    day={item.day}
                    image={getImage(item.imageUrl, item.title)}
                    title={item.title}
                    description={item.description}
                    time={item.duration}
                    from={item.from}
                    to={item.to}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* GALLERY                                                             */}
      {/* ------------------------------------------------------------------ */}

      {hasGallery && (
        <Section className="bg-surface-secondary">
          <Container>
            <PageGallery images={trip.gallery} title={trip.name} />
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PRACTICAL INFORMATION                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section>
        <Container>
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow-accent">Good to know</p>

                <h2
                  className="
                    mt-4
                    text-4xl
                    font-semibold
                    leading-[1.02]
                    tracking-[-0.04em]
                    sm:text-5xl
                  "
                >
                  Before you
                  <span className="block text-muted-foreground">take off.</span>
                </h2>

                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  A couple of practical details before your passport gets
                  involved.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid overflow-hidden rounded-3xl border border-border bg-surface sm:grid-cols-2">
                {/* Season */}
                <div
                  className="
                    border-b border-border
                    p-6
                    sm:border-r
                    sm:p-8
                  "
                >
                  <span
                    className="
                      flex size-10
                      items-center justify-center
                      rounded-full
                      bg-muted
                      text-muted-foreground
                    "
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                  </span>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Best season
                  </p>

                  <p className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {trip.bestSeason}
                  </p>
                </div>

                {/* Visa */}
                <div className="p-6 sm:p-8">
                  <span
                    className="
                      flex size-10
                      items-center justify-center
                      rounded-full
                      bg-muted
                      text-muted-foreground
                    "
                  >
                    <FileCheck2 className="size-4" aria-hidden="true" />
                  </span>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Visa
                  </p>

                  <p className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {trip.visaRequired ? 'Visa required' : 'No visa required'}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {trip.visaRequired
                      ? 'Make sure your travel documents are arranged before departure.'
                      : 'One less thing to worry about before the trip.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* INCLUSIONS / EXCLUSIONS                                             */}
      {/* ------------------------------------------------------------------ */}

      {hasInclusions && (
        <Section className="bg-surface-secondary">
          <Container>
            <TrekInclusions
              inclusions={trip.inclusions}
              exclusions={trip.exclusions}
            />
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TESTIMONIALS                                                        */}
      {/* ------------------------------------------------------------------ */}

      {hasTestimonials && (
        <Section>
          <Container>
            <Testimonials testimonials={testimonials} />
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                 */}
      {/* ------------------------------------------------------------------ */}

      <CtaSection
        eyebrow="Ready to see somewhere new?"
        title="Ready to see somewhere new?"
        description="Come travel with us."
        buttonText="Explore journeys"
        link="/experiences"
      />
    </main>
  )
}
