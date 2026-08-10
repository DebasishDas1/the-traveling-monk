import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Clock3, Mountain, Users, Zap } from 'lucide-react'

import { trekData } from '@/lib/data/treks'
import { OfferingType, type Trek } from '@/types/experience'

import { Container, Fact, Section } from '@/components/common'

import { TrekGalleryHero } from '@/components/experience/TrekGalleryHero'
import { ItineraryCard } from '@/components/experience/ItineraryCard'
import { TrekGallery } from '@/components/experience/TrekGallery'
import { TrekInclusions } from '@/components/experience/TrekInclusions'
import { TrekTestimonials } from '@/components/experience/TrekTestimonials'
import { TrekBooking } from '@/components/experience/TrekBooking'
import { RelatedTreks } from '@/components/experience/RelatedTreks'

import { Card, CardDescription, CardHeader } from '@/components/ui/card'

interface TrekPageProps {
  params: Promise<{
    slug: string
  }>
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

function getTrek(slug: string): Trek | undefined {
  return trekData.find(
    (experience): experience is Trek =>
      experience.type === OfferingType.TREK &&
      experience.slug === slug &&
      experience.active
  )
}

function getImage(
  image: Trek['gallery'][number] | undefined,
  fallbackAlt: string
) {
  if (!image) return null

  if (typeof image === 'string') {
    return {
      src: image,
      alt: fallbackAlt,
    }
  }

  if (!image.url) return null

  return {
    src: image.url,
    alt: image.alt || fallbackAlt,
  }
}

/* ─────────────────────────────────────────────
   SEO
───────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: TrekPageProps): Promise<Metadata> {
  const { slug } = await params

  const trek = getTrek(slug)

  if (!trek) {
    return {}
  }

  const image = getImage(trek.gallery[0], trek.title)

  return {
    title: `${trek.title} | The Traveling Monk`,

    description: trek.description,

    openGraph: {
      title: `${trek.title} | The Traveling Monk`,
      description: trek.description,

      images: image
        ? [
            {
              url: image.src,
              alt: image.alt,
            },
          ]
        : undefined,
    },
  }
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default async function TrekPage({ params }: TrekPageProps) {
  const { slug } = await params

  const trek = getTrek(slug)

  if (!trek) {
    notFound()
  }

  const facts = [
    {
      label: 'Difficulty',
      value: trek.difficulty,
      icon: <Zap className="size-4" />,
    },
    {
      label: 'Altitude',
      value: `${trek.altitude.toLocaleString()} ft`,
      icon: <Mountain className="size-4" />,
    },
    {
      label: 'Duration',
      value: trek.duration,
      icon: <Clock3 className="size-4" />,
    },
    {
      label: 'Group size',
      value: `Up to ${trek.maxGroupSize}`,
      icon: <Users className="size-4" />,
    },
  ]

  const itinerary = trek.itinerary ?? []

  const images = trek.gallery
    .slice(0, 3)
    .map((image) => getImage(image, trek.title))
    .filter((image): image is NonNullable<typeof image> => Boolean(image))

  return (
    <main className="overflow-hidden">
      <section className="pt-4 md:pt-6">
        <TrekGalleryHero
          images={images}
          title={trek.title}
          length={trek.gallery.length}
        />
      </section>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 py-4 gap-4">
          {facts.map((fact) => (
            <Fact key={fact.label} {...fact} />
          ))}
        </div>
      </Container>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            {/* Left */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                The experience
              </p>

              <h2
                className="
                  mt-5
                  text-4xl
                  font-semibold
                  leading-[0.98]
                  md:text-5xl
                "
              >
                Come for the mountains.
                <div className="text-muted-foreground">
                  Stay for what they leave behind.
                </div>
              </h2>
            </div>

            {/* Right */}
            <div>
              <Card className="bg-white">
                <CardHeader>
                  <CardDescription className="font-normal leading-relaxed text-lg">
                    {trek.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </Container>
        {/* <Container>
          <Media src="/illustrations/Sunny-day-cuate.png" alt="" ratio="1/1" />
        </Container> */}
      </Section>

      {/* ─────────────────────────────────────
          HIGHLIGHTS
      ───────────────────────────────────── */}

      {trek.highlights.length > 0 && (
        <section className="bg-muted/40">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              {/* Intro */}
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                  Along the way
                </p>

                <h2
                  className="
                    mt-5
                    max-w-sm
                    text-4xl
                    font-semibold
                    leading-none
                    tracking-tighter
                    md:text-5xl
                  "
                >
                  The moments you&apos;ll remember.
                </h2>
              </div>
              {/* Highlight list */}
              <div className="divide-y divide-border/70">
                {trek.highlights.map((highlight, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 text-2xl py-4"
                    >
                      <span className="text-primary">{index + 1}</span>
                      {highlight}
                    </div>
                  )
                })}
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
              {/* Sticky intro */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                  The journey
                </p>

                <h2
                  className="
                    mt-5
                    text-4xl
                    font-semibold
                    leading-[0.98]
                    tracking-tighter
                    md:text-5xl
                  "
                >
                  Take it one day at a time.
                </h2>

                <p
                  className="
                    mt-5
                    text-base
                    leading-7
                    text-muted-foreground
                  "
                >
                  No rushing. No checklist. Just a trail, a few good people, and
                  enough time to notice where you are.
                </p>

                <div className="mt-8 hidden lg:block">
                  <div className="h-px w-12 bg-primary" />
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-6">
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

            <TrekGallery images={trek.gallery} title={trek.title} />

            <TrekInclusions
              inclusions={trek.inclusions}
              exclusions={trek.exclusions}
            />

            <TrekTestimonials testimonials={trek.testimonials} />

            <TrekBooking trek={trek} />

            <RelatedTreks
              currentTrek={trek}
              treks={trekData.filter(
                (experience): experience is Trek =>
                  experience.type === OfferingType.TREK
              )}
            />
          </Container>
        </Section>
      )}
    </main>
  )
}
