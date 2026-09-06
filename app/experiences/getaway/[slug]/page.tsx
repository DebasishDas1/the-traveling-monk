import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Check, Clock3, MapPin, Sparkles, Users, Utensils } from 'lucide-react'

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
import { ItineraryCard } from '@/components/experience/ItineraryCard'
import { PageGallery } from '@/components/experience/PageGallery'
import { Testimonials } from '@/components/experience/Testimonials'
import { TrekInclusions } from '@/components/experience/TrekInclusions'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
      value: `Up to ${getaway.maxGuests}`,
      icon: <Users className="size-4" />,
    },
    {
      label: 'Meals',
      value: getaway.meals,
      icon: <Utensils className="size-4" />,
    },
  ]

  const hasHighlights = getaway.highlights.length > 0
  const hasThingsToDo = Boolean(getaway.thingsToDo?.length)
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

      {/* INTRO */}

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:gap-20">
            <div>
              <Heading
                eyebrow="The stay"
                size="h2"
                title="Not a hotel. A place to belong for a while."
              />

              <Card className="mt-6">
                <CardHeader>
                  <CardDescription className="text-lg font-normal leading-relaxed">
                    {getaway.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="h-fit rounded-3xl border-0 bg-muted/50 shadow-none">
              <CardHeader>
                <Sparkles className="mb-2 size-5" />

                <CardTitle className="text-xl">
                  What makes this stay special?
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div>
                  <p className="mb-1 text-sm font-medium">The room</p>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {getaway.roomDescription}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium">The food</p>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {getaway.foodDescription}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium">The experience</p>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {getaway.experienceDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* HIGHLIGHTS */}

      {hasHighlights && (
        <Container>
          <Heading
            align="center"
            eyebrow="The experience"
            size="h2"
            title="Come for the mountains. Stay for everything else."
            description="Small moments that make this more than just a place to sleep."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {getaway.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-4" />
                </div>

                <p className="pt-1 text-sm leading-6">{highlight}</p>
              </div>
            ))}
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
                description={getaway.foodDescription}
              />

              <div className="mt-8 rounded-2xl border bg-background p-5">
                <div className="flex gap-4">
                  <Utensils className="mt-1 size-5 shrink-0" />

                  <div>
                    <p className="font-medium">Meals included</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {getaway.meals}
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

      {/* THINGS TO DO */}

      {hasThingsToDo && (
        <Container className="pb-24">
          <Heading
            align="center"
            eyebrow="Beyond the stay"
            size="h2"
            title="Explore at your own pace."
            description="A few ideas for making the most of your time here."
          />

          <div className="mx-auto mt-14 grid gap-4 sm:grid-cols-2">
            {getaway.thingsToDo?.map((thing) => (
              <div
                key={thing}
                className="flex items-center gap-4 rounded-2xl border bg-card p-5"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="size-4" />
                </div>

                <span className="text-sm font-medium">{thing}</span>
              </div>
            ))}
          </div>
        </Container>
      )}

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
                  <ItineraryCard
                    key={item.day}
                    day={item.day}
                    image={resolveImage(item.imageUrl, item.title)}
                    title={item.title}
                    description={item.description}
                    from={item.from}
                    to={item.to}
                  />
                ))}
              </div>
            </div>
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
        link="/bookings"
      />

      {/* BOOKING BAR */}

      <BookingBar
        title={getaway.name}
        price={getaway.priceFrom}
        priceLabel="per night"
        availableDates={getaway.availableDates}
        maxGuests={getaway.maxGuests}
      />
    </main>
  )
}
