import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Clock3, Mountain, Users, Zap } from 'lucide-react'

import { trekData } from '@/lib/data/trek-data'
import { OfferingType, type Trek } from '@/types/experience'
import { getImage } from '@/lib/utils'

import { Container, CtaSection, Fact, Section } from '@/components/common'
import { GalleryHero } from '@/components/experience/GalleryHero'
import { ItineraryCard } from '@/components/experience/ItineraryCard'
import { TrekInclusions } from '@/components/experience/TrekInclusions'
import { RelatedTreks } from '@/components/experience/RelatedTreks'

/*
 * Non-critical components.
 *
 * These are good candidates for deferred loading because
 * they contain client-side JavaScript, maps, galleries,
 * reviews or booking interactions.
 */
const PageGallery = dynamic(() =>
  import('@/components/experience/PageGallery').then((m) => m.PageGallery)
)

const LocationMap = dynamic(
  () =>
    import('@/components/experience/LocationMap').then((m) => m.LocationMap),
  {
    loading: () => (
      <div
        className="aspect-16/7 w-full animate-pulse rounded-3xl bg-muted"
        aria-label="Loading map"
      />
    ),
  }
)

const BookingBar = dynamic(() =>
  import('@/components/experience/BookingBar').then((m) => m.BookingBar)
)

const ReviewsSection = dynamic(() =>
  import('@/components/experience/ReviewsSection').then((m) => m.ReviewsSection)
)

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

function getTrek(slug: string): Trek | undefined {
  return trekData.find(
    (trek): trek is Trek =>
      trek.type === OfferingType.TREK && trek.active && trek.slug === slug
  )
}

function getRelatedTreks(currentTrek: Trek): Trek[] {
  return trekData
    .filter(
      (trek): trek is Trek =>
        trek.type === OfferingType.TREK &&
        trek.active &&
        trek.slug !== currentTrek.slug
    )
    .slice(0, 3)
}

/* -------------------------------------------------------------------------- */
/* Static generation                                                          */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return trekData
    .filter(
      (trek): trek is Trek => trek.type === OfferingType.TREK && trek.active
    )
    .map((trek) => ({
      slug: trek.slug,
    }))
}

export const dynamicParams = false

/* -------------------------------------------------------------------------- */
/* SEO                                                                        */
/* -------------------------------------------------------------------------- */

interface TrekPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: TrekPageProps): Promise<Metadata> {
  const { slug } = await params
  const trek = getTrek(slug)

  if (!trek) {
    return {
      title: 'Trek not found',
    }
  }

  const image = getImage(trek.gallery[0], trek.title)

  return {
    title: trek.title,
    description: trek.description,

    alternates: {
      canonical: `/experiences/trek/${trek.slug}`,
    },

    openGraph: {
      type: 'article',
      title: trek.title,
      description: trek.description,
      url: `/experiences/trek/${trek.slug}`,
      ...(image && {
        images: [
          {
            url: image.src,
            alt: image.alt,
            width: 1200,
            height: 630,
          },
        ],
      }),
    },

    twitter: {
      card: 'summary_large_image',
      title: trek.title,
      description: trek.description,
      ...(image && {
        images: [image.src],
      }),
    },
  }
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function TrekPage({ params }: TrekPageProps) {
  const { slug } = await params

  const trek = getTrek(slug)

  if (!trek) {
    notFound()
  }

  const itinerary = trek.itinerary ?? []
  const relatedTreks = getRelatedTreks(trek)

  const heroImages = trek.gallery
    .slice(0, 3)
    .map((image) => getImage(image, trek.title))
    .filter((image): image is NonNullable<typeof image> => Boolean(image))

  const facts = [
    {
      label: 'Difficulty',
      value: trek.difficulty,
      icon: <Zap className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Altitude',
      value: `${trek.altitude.toLocaleString()} ft`,
      icon: <Mountain className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Duration',
      value: trek.duration,
      icon: <Clock3 className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Group size',
      value: `Up to ${trek.maxGroupSize}`,
      icon: <Users className="size-4" aria-hidden="true" />,
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trek.title,
    description: trek.description,
    url: `https://thetravelingmonk.com/experiences/trek/${trek.slug}`,
    image: heroImages.map((image) => image.src),
    touristType: 'Adventure travelers',
    offers: {
      '@type': 'Offer',
      price: trek.priceFrom,
      priceCurrency: 'INR',
      url: `https://thetravelingmonk.com/experiences/trek/${trek.slug}`,
    },
  }

  return (
    <>
      <main>
        {/* ---------------------------------------------------------------- */}
        {/* Structured data                                                  */}
        {/* ---------------------------------------------------------------- */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}

        <GalleryHero images={heroImages} title={trek.title} />

        {/* ---------------------------------------------------------------- */}
        {/* Quick stats                                                      */}
        {/* ---------------------------------------------------------------- */}

        <Container>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {facts.map((fact) => (
              <Fact key={fact.label} {...fact} />
            ))}
          </div>
        </Container>

        {/* ---------------------------------------------------------------- */}
        {/* Introduction                                                     */}
        {/* ---------------------------------------------------------------- */}

        <Section>
          <Container>
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="eyebrow-accent">Okay, here&apos;s the deal</p>

                  <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                    Come for the mountains.
                    <span className="mt-1 block text-muted-foreground">
                      Stay for what they do to your brain.
                    </span>
                  </h2>

                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="accent-dot" />
                    <span>Worth the early wake-up.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <p className="text-xl leading-9 text-muted-foreground sm:text-2xl sm:leading-10">
                  {trek.description}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Highlights                                                       */}
        {/* ---------------------------------------------------------------- */}

        {trek.highlights.length > 0 && (
          <Section className="bg-surface-secondary">
            <Container>
              <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
                <div className="lg:col-span-4">
                  <p className="eyebrow-accent">The good stuff</p>

                  <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                    Things you&apos;ll probably talk about later.
                  </h2>

                  <p className="mt-5 text-sm leading-6 text-muted-foreground">
                    The views, the random conversations, the tiny moments that
                    somehow become the whole point of the trip.
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <div className="divide-y divide-border">
                    {trek.highlights.map((highlight, index) => (
                      <div
                        key={`${highlight}-${index}`}
                        className="
                          group
                          flex items-center gap-5
                          py-5
                          sm:py-6
                        "
                      >
                        <span
                          className="
                            flex size-9 shrink-0 items-center justify-center
                            rounded-full
                            bg-primary
                            text-xs font-medium
                            text-primary-foreground
                            transition-transform
                            duration-300
                            group-hover:scale-110
                          "
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className="flex-1 text-xl font-medium leading-tight tracking-[-0.02em] sm:text-2xl">
                          {highlight}
                        </span>

                        <ArrowUpRight
                          className="
                            size-5 shrink-0
                            text-muted-foreground
                            opacity-0
                            transition-[opacity,transform]
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                            group-hover:opacity-100
                          "
                          aria-hidden="true"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Itinerary                                                        */}
        {/* ---------------------------------------------------------------- */}

        {itinerary.length > 0 && (
          <Section>
            <Container>
              <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p className="eyebrow-accent">How this thing goes</p>

                    <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                      One day at a time.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-muted-foreground">
                      No speed-running the mountains. No checking boxes just
                      because they&apos;re there.
                    </p>

                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                      Just a trail, good people, questionable amounts of chai,
                      and enough time to actually be there.
                    </p>

                    <div className="mt-8 hidden items-center gap-3 lg:flex">
                      <span className="h-px w-10 bg-accent" />
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Take your time
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="space-y-5 sm:space-y-6">
                    {itinerary.map((item, index) => (
                      <ItineraryCard
                        key={`${item.day}-${item.title}-${index}`}
                        day={item.day}
                        image={getImage(item.imageUrl, item.title)}
                        title={item.title}
                        description={item.description}
                        altitude={item.altitude}
                        time={item.duration}
                        from={item.from}
                        to={item.to}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Gallery                                                          */}
        {/* ---------------------------------------------------------------- */}

        {trek.gallery.length > 0 && (
          <Container>
            <PageGallery images={trek.gallery} title={trek.title} />
          </Container>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Inclusions                                                       */}
        {/* ---------------------------------------------------------------- */}

        <Section className="bg-surface-secondary">
          <Container>
            <TrekInclusions
              inclusions={trek.inclusions}
              exclusions={trek.exclusions}
            />
          </Container>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Location                                                         */}
        {/* ---------------------------------------------------------------- */}

        {trek.geoLocation && (
          <Section>
            <Container>
              <LocationMap
                geoLocation={trek.geoLocation}
                name={`${trek.title} | Location`}
                mapTop
              />
            </Container>
          </Section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Reviews                                                          */}
        {/* ---------------------------------------------------------------- */}

        <Section className="bg-surface-secondary">
          <Container>
            <ReviewsSection
              experienceId={trek.id}
              eyebrow="From the trail"
              title="People who actually went."
              description="Real experiences from people who have walked this trail."
            />
          </Container>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Related treks                                                    */}
        {/* ---------------------------------------------------------------- */}

        {relatedTreks.length > 0 && (
          <Section>
            <Container>
              <RelatedTreks currentTrek={trek} treks={relatedTreks} />
            </Container>
          </Section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Completion                                                       */}
        {/* ---------------------------------------------------------------- */}

        <Section>
          <Container>
            <CtaSection
              eyebrow="After the trek"
              title="You made it. Now make it a memory."
              description="Share your trek completion with the community and keep the journey going."
              buttonText="Share your completion"
              link={`/completion/${trek.slug}`}
            />
          </Container>
        </Section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Booking                                                            */}
      {/* ------------------------------------------------------------------ */}

      <BookingBar
        slug={trek.slug}
        title={trek.title}
        price={trek.priceFrom}
        priceLabel="per person"
        availableDates={trek.availableDates}
        maxGuests={trek.maxGroupSize}
      />
    </>
  )
}
