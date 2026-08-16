import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Check, Clock3, MapPin, Sparkles, Users, Utensils } from 'lucide-react'

import { homestaysData } from '@/lib/data/homestays-data'
import { OfferingType, type Homestay } from '@/types/experience'

import {
  Container,
  CtaSection,
  Fact,
  Heading,
  Media,
  Section,
} from '@/components/common'

import { GalleryHero } from '@/components/experience/GalleryHero'
import { BookingBar } from '@/components/experience/BookingBar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Testimonials } from '@/components/experience/Testimonials'
import { PageGallery } from '@/components/experience/PageGallery'
import { TrekInclusions } from '@/components/experience/TrekInclusions'

interface HomestayPageProps {
  params: Promise<{
    slug: string
  }>
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

function getHomestay(slug: string): Homestay | undefined {
  return homestaysData.find(
    (experience): experience is Homestay =>
      experience.type === OfferingType.HOMESTAY &&
      experience.slug === slug &&
      experience.active
  )
}

export function generateStaticParams() {
  return homestaysData
    .filter(
      (experience) =>
        experience.type === OfferingType.HOMESTAY && experience.active
    )
    .map(({ slug }) => ({
      slug,
    }))
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

type GalleryImage = Homestay['gallery'][number]

interface ResolvedImage {
  src: string
  alt: string
}

function getImage(
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

  if (!image.url) return null

  return {
    src: image.url,
    alt: image.alt || fallbackAlt,
  }
}

function getGallery(homestay: Homestay): ResolvedImage[] {
  return homestay.gallery
    .slice(0, 3)
    .map((image) => getImage(image, homestay.name))
    .filter((image): image is ResolvedImage => image !== null)
}

/* ─────────────────────────────────────────────
   SEO
───────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: HomestayPageProps): Promise<Metadata> {
  const { slug } = await params
  const homestay = getHomestay(slug)

  if (!homestay) {
    return {}
  }

  const title = `${homestay.name} | The Traveling Monk`
  const image = getImage(homestay.gallery[0], homestay.name)

  return {
    title,
    description: homestay.description,

    openGraph: {
      title,
      description: homestay.description,
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

export default async function HomestayPage({ params }: HomestayPageProps) {
  const { slug } = await params
  const homestay = getHomestay(slug)

  if (!homestay) {
    notFound()
  }

  const gallery = getGallery(homestay)
  const primaryImage = gallery[2]

  const facts = [
    {
      label: 'Location',
      value: homestay.location,
      icon: <MapPin className="size-4" />,
    },
    {
      label: 'Stay',
      value: homestay.duration,
      icon: <Clock3 className="size-4" />,
    },
    {
      label: 'Guests',
      value: `Up to ${homestay.maxGuests}`,
      icon: <Users className="size-4" />,
    },
    {
      label: 'Meals',
      value: homestay.meals,
      icon: <Utensils className="size-4" />,
    },
  ]

  const hasHighlights = homestay.highlights.length > 0
  const hasThingsToDo = Boolean(homestay.thingsToDo?.length)
  const hasAmenities = Boolean(homestay.amenities?.length)
  const hasInclusions =
    Boolean(homestay.inclusions?.length) || Boolean(homestay.exclusions?.length)
  const hasGallery = homestay.gallery.length > 3
  const hasTestimonials = Boolean(homestay.testimonials)

  return (
    <main className="pb-28">
      {/* ─────────────────────────────────────
          HERO
      ───────────────────────────────────── */}

      <GalleryHero
        images={gallery}
        title={homestay.name}
        length={homestay.gallery.length}
      />

      {/* ─────────────────────────────────────
          QUICK FACTS
      ───────────────────────────────────── */}

      <Container>
        <div className="grid grid-cols-2 gap-4 py-4 md:grid-cols-4">
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
                    {homestay.description}
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
                    {homestay.roomDescription}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium">The food</p>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {homestay.foodDescription}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium">The experience</p>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {homestay.experienceDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────
          HIGHLIGHTS
      ───────────────────────────────────── */}

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
            {homestay.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-4" />
                </div>

                <p className="pt-1 text-sm leading-6 text-foreground">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* ─────────────────────────────────────
          FOOD
      ───────────────────────────────────── */}

      <Section className="bg-muted/30">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <Heading
                eyebrow="Around the table"
                size="h2"
                title="Food that tastes like the place you're in."
                description={homestay.foodDescription}
              />

              <div className="mt-8 rounded-2xl border bg-background p-5">
                <div className="flex gap-4">
                  <Utensils className="mt-1 size-5 shrink-0" />

                  <div>
                    <p className="font-medium">Meals included</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {homestay.meals}
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

      {/* ─────────────────────────────────────
          THINGS TO DO
      ───────────────────────────────────── */}

      {hasThingsToDo && (
        <Container className="pb-24">
          <Heading
            align="center"
            eyebrow="Beyond the stay"
            size="h2"
            title="There's no itinerary. That's the point."
            description="Explore at your own pace, or simply do absolutely nothing."
          />

          <div className="mx-auto mt-14 grid gap-4 sm:grid-cols-2">
            {homestay.thingsToDo!.map((thing) => (
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

      {/* ─────────────────────────────────────
          AMENITIES
      ───────────────────────────────────── */}

      {hasAmenities && (
        <Container>
          <Heading
            align="center"
            eyebrow="Good to have"
            size="h2"
            title="Everything you need. Nothing you don't."
          />

          <div className="mx-auto mt-12 flex flex-wrap justify-center gap-3">
            {homestay.amenities!.map((amenity) => (
              <Badge key={amenity} className="px-15 py-5 text-lg">
                {amenity}
              </Badge>
            ))}
          </div>
        </Container>
      )}

      {/* ─────────────────────────────────────
          INCLUSIONS / EXCLUSIONS
      ───────────────────────────────────── */}

      {hasInclusions && (
        <Section>
          <Container>
            <TrekInclusions
              inclusions={homestay.inclusions}
              exclusions={homestay.exclusions}
            />
          </Container>
        </Section>
      )}

      {/* ─────────────────────────────────────
          GALLERY
      ───────────────────────────────────── */}

      {hasGallery && (
        <PageGallery images={homestay.gallery} title={homestay.name} />
      )}

      {/* ─────────────────────────────────────
          TESTIMONIALS
      ───────────────────────────────────── */}

      {hasTestimonials && (
        <Container>
          <Testimonials testimonials={homestay.testimonials!} />
        </Container>
      )}

      {/* ─────────────────────────────────────
          CTA
      ───────────────────────────────────── */}

      <CtaSection
        eyebrow="Your next chapter"
        title="Maybe this is exactly what you needed."
        description="Come for a few nights. Leave with a little more space in your head."
        buttonText="Start planning"
        link="/bookings"
      />

      {/* ─────────────────────────────────────
          BOOKING BAR
      ───────────────────────────────────── */}

      <BookingBar
        title={homestay.name}
        price={homestay.priceFrom}
        priceLabel="per night"
        availableDates={homestay.availableDates}
        maxGuests={homestay.maxGuests}
      />
    </main>
  )
}
