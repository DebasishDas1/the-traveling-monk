import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { Clock3, Mountain, Users, Zap } from 'lucide-react'

import { trekData } from '@/lib/data/trek-data'
import { OfferingType, type Trek } from '@/types/experience'
import { getImage } from '@/lib/utils'

import { Container, Fact, Section } from '@/components/common'
import { GalleryHero } from '@/components/experience/GalleryHero'
import { ItineraryCard } from '@/components/experience/ItineraryCard'
import { TrekInclusions } from '@/components/experience/TrekInclusions'
import { RelatedTreks } from '@/components/experience/RelatedTreks'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'

/*
 * Non-critical components.
 *
 * These are good candidates for deferred loading if they contain
 * client-side JavaScript / maps / animations.
 */
const PageGallery = dynamic(() =>
  import('@/components/experience/PageGallery').then((m) => m.PageGallery)
)

const Testimonials = dynamic(() =>
  import('@/components/experience/Testimonials').then((m) => m.Testimonials)
)

const LocationMap = dynamic(
  () =>
    import('@/components/experience/LocationMap').then((m) => m.LocationMap),
  {
    loading: () => (
      <div className="aspect-16/7 w-full animate-pulse rounded-2xl bg-muted" />
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
      canonical: `/treks/${trek.slug}`,
    },

    openGraph: {
      type: 'article',
      title: trek.title,
      description: trek.description,
      url: `/treks/${trek.slug}`,
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

  /*
   * JSON-LD helps search engines understand this page
   * as a travel experience.
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trek.title,
    description: trek.description,
    url: `https://thetravelingmonk.com/treks/${trek.slug}`,
    image: heroImages.map((image) => image.src),
    touristType: 'Adventure travelers',
    offers: {
      '@type': 'Offer',
      price: trek.priceFrom,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://thetravelingmonk.com/treks/${trek.slug}`,
    },
  }

  return (
    <>
      <main>
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Hero */}
        <GalleryHero
          images={heroImages}
          title={trek.title}
          length={trek.gallery.length}
        />

        {/* Facts */}
        <Container>
          <div className="grid grid-cols-2 gap-4 py-4 md:grid-cols-4">
            {facts.map((fact) => (
              <Fact key={fact.label} {...fact} />
            ))}
          </div>
        </Container>

        {/* Introduction */}
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                  The experience
                </p>

                <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-tighter md:text-5xl">
                  Come for the mountains.
                  <span className="block text-muted-foreground">
                    Stay for what they leave behind.
                  </span>
                </h2>
              </div>

              <Card className="border-0 bg-white shadow-none">
                <CardHeader className="p-0">
                  <CardDescription className="text-lg font-normal leading-relaxed p-4">
                    {trek.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Highlights */}
        {trek.highlights.length > 0 && (
          <section className="bg-muted/40">
            <Container>
              <div className="grid gap-12 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                    Along the way
                  </p>

                  <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-none tracking-tighter md:text-5xl">
                    The moments you&apos;ll remember.
                  </h2>
                </div>

                <div className="divide-y divide-border/70">
                  {trek.highlights.map((highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="flex items-center gap-4 py-4 text-xl md:text-2xl"
                    >
                      <span className="text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Itinerary */}
        {itinerary.length > 0 && (
          <Section>
            <Container>
              <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                    The journey
                  </p>

                  <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-tighter md:text-5xl">
                    Take it one day at a time.
                  </h2>

                  <p className="mt-5 text-base leading-7 text-muted-foreground">
                    No rushing. No checklist. Just a trail, a few good people,
                    and enough time to notice where you are.
                  </p>

                  <div className="mt-8 hidden lg:block">
                    <div className="h-px w-12 bg-primary" />
                  </div>
                </div>

                <div className="space-y-8">
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
            </Container>
          </Section>
        )}

        {/* Gallery */}
        {trek.gallery.length > 0 && (
          <Section>
            <Container>
              <PageGallery images={trek.gallery} title={trek.title} />
            </Container>
          </Section>
        )}

        {/* Inclusions */}
        <Section>
          <Container>
            <TrekInclusions
              inclusions={trek.inclusions}
              exclusions={trek.exclusions}
            />
          </Container>
        </Section>

        {/* Testimonials */}
        {trek.testimonials?.length ? (
          <Section>
            <Container>
              <Testimonials testimonials={trek.testimonials} />
            </Container>
          </Section>
        ) : null}

        {/* Location */}
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

        {/* Related */}
        {relatedTreks.length > 0 && (
          <Section>
            <Container>
              <RelatedTreks currentTrek={trek} treks={relatedTreks} />
            </Container>
          </Section>
        )}
      </main>

      {/* Reviews */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                Social proof
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-tighter md:text-5xl">
                What travelers say.
              </h2>
            </div>
            <ReviewsSection trekId={trek.id} />
          </div>
        </Container>
      </Section>

      {/* Booking */}
      <BookingBar
        title={trek.title}
        price={trek.priceFrom}
        priceLabel="per person"
        availableDates={trek.availableDates}
        maxGuests={trek.maxGroupSize}
      />
    </>
  )
}
