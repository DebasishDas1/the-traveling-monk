import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  ArrowUpRight,
  Check,
  Clock3,
  MapPin,
  Users,
  Utensils,
} from 'lucide-react'

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

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* SEO                                                                        */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

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
      icon: <MapPin className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Stay',
      value: getaway.duration,
      icon: <Clock3 className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Guests',
      value: 'Up to 30',
      icon: <Users className="size-4" aria-hidden="true" />,
    },
    {
      label: 'Meals',
      value: 'Included',
      icon: <Utensils className="size-4" aria-hidden="true" />,
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
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <GalleryHero images={gallery} title={getaway.name} />

      {/* ------------------------------------------------------------------ */}
      {/* QUICK FACTS                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Container>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {facts.map((fact) => (
            <Fact key={fact.label} {...fact} />
          ))}
        </div>
      </Container>

      {/* ------------------------------------------------------------------ */}
      {/* INTRODUCTION                                                       */}
      {/* ------------------------------------------------------------------ */}

      <Section>
        <Container>
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow-accent">The experience</p>

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
                  Slow mornings.
                  <span className="block text-muted-foreground">
                    Nowhere to rush.
                  </span>
                </h2>

                <div className="mt-6 hidden lg:block">
                  <div className="accent-line" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div
                className="
                  text-lg
                  leading-8
                  text-muted-foreground
                  sm:text-xl
                  sm:leading-9
                "
              >
                {getaway.description}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* ITINERARY                                                          */}
      {/* ------------------------------------------------------------------ */}

      {itinerary.length > 0 && (
        <Section className="bg-surface-secondary">
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
                    A thoughtfully paced journey with enough room to explore,
                    pause, and enjoy where you are.
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
                  <GetawayItineraryCard
                    key={`${item.day}-${item.title}-${index}`}
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

      {/* ------------------------------------------------------------------ */}
      {/* HIGHLIGHTS                                                         */}
      {/* ------------------------------------------------------------------ */}

      {hasHighlights && (
        <Section>
          <Container>
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="eyebrow-accent">Worth knowing</p>

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
                    A little peek at what awaits.
                  </h2>

                  <p className="mt-5 text-sm leading-6 text-muted-foreground">
                    The good stuff, without the brochure-speak.
                  </p>

                  <div className="mt-8 hidden lg:block">
                    <Media
                      src="/illustrations/todo.png"
                      alt="Traveller preparing for a journey"
                      ratio="1/1"
                      sizes="320px"
                      radius="lg"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
                  {getaway.highlights.map((highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="
                        group
                        relative
                        flex
                        min-h-40
                        flex-col
                        justify-between
                        bg-surface
                        p-5
                        transition-colors
                        duration-300
                        hover:bg-surface-secondary
                        sm:min-h-48
                        sm:p-7
                      "
                    >
                      <span
                        className="
                          text-5xl
                          font-semibold
                          leading-none
                          tracking-[-0.06em]
                          text-border
                          transition-colors
                          duration-300
                          group-hover:text-accent/30
                        "
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="flex items-end justify-between gap-4">
                        <p className="text-base font-medium leading-6 text-foreground sm:text-lg">
                          {highlight}
                        </p>

                        <span
                          className="
                            flex size-8 shrink-0
                            items-center justify-center
                            rounded-full
                            bg-muted
                            text-muted-foreground
                            transition-colors
                            duration-300
                            group-hover:bg-primary
                            group-hover:text-primary-foreground
                          "
                        >
                          <Check className="size-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* FOOD                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section className="bg-surface-secondary">
        <Container>
          <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <Heading
                eyebrow="Around the table"
                size="h2"
                title="Food that tastes like the place you're in."
                description="Good food is part of a good trip. Expect simple, satisfying meals made with whatever is fresh and local."
              />

              <div
                className="
                  mt-7
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  border
                  border-border
                  bg-surface
                  p-5
                  shadow-sm
                  sm:mt-8
                "
              >
                <span
                  className="
                    flex size-10 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-muted
                    text-muted-foreground
                  "
                >
                  <Utensils className="size-4" aria-hidden="true" />
                </span>

                <div>
                  <p className="font-medium text-foreground">Meals included</p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Fresh, simple and part of the experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-7">
              {primaryImage && (
                <Media
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  ratio="3/2"
                  radius="lg"
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="
                    transition-transform
                    duration-700
                    ease-[cubic-bezier(0.22,0.61,0.36,1)]
                    hover:scale-[1.01]
                  "
                />
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* INCLUSIONS / EXCLUSIONS                                           */}
      {/* ------------------------------------------------------------------ */}

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

      {/* ------------------------------------------------------------------ */}
      {/* GALLERY                                                            */}
      {/* ------------------------------------------------------------------ */}

      {hasGallery && (
        <Section className="bg-surface-secondary">
          <Container>
            <PageGallery images={getaway.gallery} title={getaway.name} />
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TESTIMONIALS                                                       */}
      {/* ------------------------------------------------------------------ */}

      {hasTestimonials && (
        <Section>
          <Container>
            <Testimonials testimonials={getaway.testimonials!} />
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                */}
      {/* ------------------------------------------------------------------ */}

      <CtaSection
        eyebrow="Your next chapter"
        title="Maybe this is exactly what you needed."
        description="Come for a few nights. Leave with a little more space in your head."
        buttonText="Start planning"
        link="/experiences"
      />

      {/* ------------------------------------------------------------------ */}
      {/* BOOKING BAR                                                        */}
      {/* ------------------------------------------------------------------ */}

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
