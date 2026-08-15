import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  CalendarDays,
  Clock,
  FileCheck2,
  Globe2,
  Plane,
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

import { Card, CardContent } from '@/components/ui/card'

import { GalleryHero } from '@/components/experience/GalleryHero'
import { ItineraryCard } from '@/components/experience/ItineraryCard'

import { getImage } from '@/lib/utils'
import { TrekGallery } from '@/components/experience/TrekGallery'
import { TrekInclusions } from '@/components/experience/TrekInclusions'
import { Testimonials } from '@/components/experience/Testimonials'

interface InternationalPageProps {
  params: Promise<{
    slug: string
  }>
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function getGalleryImages(trip: International, limit = 3) {
  return trip.gallery
    .slice(0, limit)
    .map((image) => getImage(image, trip.name))
    .filter((image): image is NonNullable<typeof image> => image !== null)
}

/* ─────────────────────────────────────────────
   SEO
───────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: InternationalPageProps): Promise<Metadata> {
  const { slug } = await params
  const trip = getInternational(slug)

  if (!trip) {
    return {}
  }

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

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

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
      icon: <Globe2 className="size-4" />,
    },
    {
      label: 'Duration',
      value: trip.duration,
      icon: <Clock className="size-4" />,
    },
    {
      label: 'Group size',
      value: `Up to ${trip.maxGroupSize}`,
      icon: <Users className="size-4" />,
    },
    {
      label: 'Best season',
      value: trip.bestSeason,
      icon: <CalendarDays className="size-4" />,
    },
  ]

  const hasHighlights = trip.highlights.length > 0
  const hasTestimonials = testimonials.length > 0

  return (
    <main className="pb-32">
      {/* ─────────────────────────────────────
          HERO
      ───────────────────────────────────── */}

      <GalleryHero
        images={images}
        title={trip.name}
        length={trip.gallery.length}
      />

      {/* ─────────────────────────────────────
          QUICK FACTS
      ───────────────────────────────────── */}
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 py-4 gap-4">
          {facts.map((fact) => (
            <Fact key={fact.label} {...fact} />
          ))}
        </div>
      </Container>

      {/* ─────────────────────────────────────
          INTRO
      ───────────────────────────────────── */}

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:gap-24">
            <Heading
              eyebrow="The journey"
              title="Go somewhere that changes your perspective."
              size="h2"
            />

            <p className="text-lg leading-8 text-muted-foreground md:text-xl">
              {trip.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────
          HIGHLIGHTS
      ───────────────────────────────────── */}

      {hasHighlights && (
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
                {trip.highlights.map((highlight, index) => (
                  <div
                    key={`${highlight}-${index}`}
                    className="flex items-center gap-4 py-4 text-2xl"
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

      {/* ─────────────────────────────────────
          ITINERARY
      ───────────────────────────────────── */}

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
                  No rushing. No checklist. Just a trail, a few good people, and
                  enough time to notice where you are.
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

      {/* ─────────────────────────────────────
          GALLERY
      ───────────────────────────────────── */}

      {trip.gallery.length > 0 && (
        <Section>
          <Container>
            <TrekGallery images={trip.gallery} title={trip.name} />
          </Container>
        </Section>
      )}

      {/* ─────────────────────────────────────
          PRACTICAL INFORMATION
      ───────────────────────────────────── */}

      <Container>
        <div className="grid gap-6 md:grid-cols-2 text-white">
          <Card className="bg-primary">
            <CardContent className="p-7 md:p-9">
              <Plane className="size-6" />

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Best season
              </h3>

              <p className="mt-3 text-muted-foreground">{trip.bestSeason}</p>
            </CardContent>
          </Card>

          <Card className="bg-primary">
            <CardContent className="p-7 md:p-9">
              <FileCheck2 className="size-6" />

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Visa
              </h3>

              <p className="mt-3 text-muted-foreground">
                {trip.visaRequired
                  ? 'A visa is required for this journey.'
                  : 'No visa is required for this journey.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* ─────────────────────────────────────
                INCLUSIONS
            ───────────────────────────────────── */}

      <Section>
        <Container>
          <TrekInclusions
            inclusions={trip.inclusions}
            exclusions={trip.exclusions}
          />
        </Container>
      </Section>

      {/* ─────────────────────────────────────
          TESTIMONIALS
      ───────────────────────────────────── */}

      {hasTestimonials && (
        <Container>
          <Testimonials testimonials={testimonials} />
        </Container>
      )}

      {/* CTA */}
      <CtaSection
        eyebrow="Ready to see somewhere new?"
        title="Ready to see somewhere new?"
        description="Come travel with us."
        buttonText="Book Now"
        link="/experiences"
      />
    </main>
  )
}
