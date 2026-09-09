import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Check, Clock3, MapPin, Users, Utensils } from 'lucide-react'

import { getawaysData } from '@/lib/data/getaway-data'
import { isGetaway, type Getaway } from '@/types/experience'

import {
  Container,
  CtaSection,
  Fact,
  Heading,
  Media,
  Section,
} from '@/components/common'

import { BookingBar } from '@/components/experience/BookingBar'
import { GalleryHero } from '@/components/experience/GalleryHero'
import { PageGallery } from '@/components/experience/PageGallery'
import { Testimonials } from '@/components/experience/Testimonials'
import { TrekInclusions } from '@/components/experience/TrekInclusions'
import { GetawayItineraryCard } from '@/components/experience/GetawayItineraryCard'

interface GetawayPageProps {
  params: Promise<{
    slug: string
  }>
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

function getGetaway(slug: string): Getaway | undefined {
  return getawaysData.find(
    (experience) =>
      isGetaway(experience) && experience.slug === slug && experience.active
  )
}

export function generateStaticParams() {
  return getawaysData
    .filter((experience) => isGetaway(experience) && experience.active)
    .map(({ slug }) => ({ slug }))
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

type GalleryImage = Getaway['gallery'][number]

interface ResolvedImage {
  src: string
  alt: string
}

function resolveImage(
  image: GalleryImage | undefined,
  fallbackAlt: string
): ResolvedImage | null {
  if (!image) return null

  if (typeof image === 'string') {
    return {
      src: image,
      alt: fallbackAlt,
    }
  }

  if ('url' in image) {
    return {
      src: image.url,
      alt: image.alt || fallbackAlt,
    }
  }

  return {
    src: image.src,
    alt: image.alt || fallbackAlt,
  }
}

function getHeroGallery(getaway: Getaway): ResolvedImage[] {
  return getaway.gallery
    .slice(0, 3)
    .map((image) => resolveImage(image, getaway.name))
    .filter((image): image is ResolvedImage => Boolean(image))
}

/* ─────────────────────────────────────────────
   SEO
───────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: GetawayPageProps): Promise<Metadata> {
  const { slug } = await params
  const getaway = getGetaway(slug)

  if (!getaway) return {}

  const title = `${getaway.name} | The Traveling Monk`
  const image = resolveImage(getaway.gallery[0], getaway.name)

  return {
    title,
    description: getaway.description,

    openGraph: {
      title,
      description: getaway.description,
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
  }
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default async function GetawayPage({ params }: GetawayPageProps) {
  const { slug } = await params
  const getaway = getGetaway(slug)

  if (!getaway) {
    notFound()
  }

  const gallery = getHeroGallery(getaway)
  const primaryImage = gallery[0]

  const facts = [
    {
      label: 'Location',
      value: getaway.location,
      icon: <MapPin className="size-4" />,
    },
    {
      label: 'Stay',
      value: getaway.duration,
      icon: <Clock3 className="size-4" />,
    },
    {
      label: 'Guests',
      value: `Up to 30`,
      icon: <Users className="size-4" />,
    },
    {
      label: 'Meals',
      value: 'Included',
      icon: <Utensils className="size-4" />,
    },
  ]

  const hasHighlights = getaway.highlights.length > 0
  const hasInclusions =
    Boolean(getaway.inclusions?.length) || Boolean(getaway.exclusions?.length)
  const hasGallery = getaway.gallery.length > 3
  const hasTestimonials = Boolean(getaway.testimonials?.length)
  const itinerary = getaway.itinerary ?? []

  return (
    <main className="pb-28">
      {/* HERO */}
      <GalleryHero
        images={gallery}
        title={getaway.name}
        length={getaway.gallery.length}
      />

      {/* QUICK FACTS */}
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
                Slow mornings.
                <span className="block text-muted-foreground">
                  Nowhere to rush.
                </span>
              </h2>
            </div>
            <div className="text-lg">{getaway.description}</div>
          </div>
        </Container>
      </Section>

      {/* ITINERARY */}
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
                  A thoughtfully paced journey with enough room to explore,
                  pause, and enjoy where you are.
                </p>

                <div className="mt-8 hidden lg:block">
                  <div className="h-px w-12 bg-primary" />
                </div>
              </div>

              <div className="space-y-8">
                {itinerary.map((item) => (
                  <GetawayItineraryCard
                    key={`${item.day}-${item.title}`}
                    day={item.day}
                    image={resolveImage(item.imageUrl, item.title)}
                    title={item.title}
                    description={item.description}
                    pointers={item.pointers}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
      {/* HIGHLIGHTS */}
      {hasHighlights && (
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Heading title="A little peek at what awaits" size="h2" />
              <Media
                src="/illustrations/todo.png"
                alt="Traveller beginning a journey through the Himalayan mountains"
                ratio="1/1"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="mx-auto grid gap-3 grid-cols-2 lg:grid-cols-4">
              {getaway.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-4 flex-col items-center justify-center p-6 rounded-lg text-center bg-primary text-white"
                >
                  <Check className="size-8" />
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      )}

      {/* FOOD */}
      <Section className="bg-muted/30">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <Heading
                eyebrow="Around the table"
                size="h2"
                title="Food that tastes like the place you're in."
                description="We believe that good food is a big part of a good trip. That's why we make sure you're well-fed with simple, tasty food made from whatever's fresh and local."
              />

              <div className="mt-8 rounded-2xl border bg-background p-5">
                <div className="flex gap-4">
                  <Utensils className="mt-1 size-5 shrink-0" />

                  <div>
                    <p className="font-medium">Meals included</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Included
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 overflow-hidden rounded-3xl lg:order-2">
              {primaryImage && (
                <Media
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  ratio="4/3"
                />
              )}
            </div>
          </div>
        </Container>
      </Section>
      {/* INCLUSIONS / EXCLUSIONS */}
      {hasInclusions && (
        <Section>
          <Container>
            <TrekInclusions
              inclusions={getaway.inclusions}
              exclusions={getaway.exclusions}
            />
          </Container>
        </Section>
      )}
      {/* GALLERY */}
      {hasGallery && (
        <Container>
          <PageGallery images={getaway.gallery} title={getaway.name} />
        </Container>
      )}
      {/* TESTIMONIALS */}
      {hasTestimonials && (
        <Container>
          <Testimonials testimonials={getaway.testimonials!} />
        </Container>
      )}
      {/* CTA */}
      <CtaSection
        eyebrow="Your next chapter"
        title="Maybe this is exactly what you needed."
        description="Come for a few nights. Leave with a little more space in your head."
        buttonText="Start planning"
        link="/experiences"
      />
      {/* BOOKING BAR */}
      <BookingBar
        slug={slug}
        title={getaway.name}
        price={getaway.priceFrom}
        priceLabel="per night"
        availableDates={getaway.availableDates}
        maxGuests={30}
      />
    </main>
  )
}
