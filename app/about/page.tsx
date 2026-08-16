import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import {
  Container,
  CtaSection,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'

import { CategoryCard } from '@/components/experience/CategoryCard'
import { categories, principles, founders } from '@/lib/data/about-page'

export const metadata: Metadata = {
  title: 'About The Traveling Monk | Meaningful Travel & Himalayan Journeys',
  description:
    'Discover The Traveling Monk — journeys, Himalayan treks, homestays, and international experiences designed to slow down, reconnect, and return renewed.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About The Traveling Monk | Meaningful Travel',
    description:
      'We create thoughtful journeys, Himalayan treks, homestays, and international experiences for people who want to slow down and reconnect.',
    type: 'website',
    images: [
      {
        url: '/images/about/about-hero-2.png',
        width: 1600,
        height: 900,
        alt: 'Travellers walking through a mountain landscape',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Traveling Monk | Meaningful Travel',
    description:
      'Thoughtful journeys, Himalayan treks, homestays, and international experiences designed to help you slow down and reconnect.',
    images: ['/images/about/about-hero-2.png'],
  },
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* =====================================================
          HERO
      ====================================================== */}
      <Section className="pt-12 md:pt-20 lg:pt-28">
        <Container>
          <Heading
            eyebrow="About The Traveling Monk"
            title="Travel was never just about going somewhere."
            description="Sometimes you leave home because you need to find your way back to yourself."
            size="display"
            align="center"
          />

          <div className="mt-12 overflow-hidden rounded-[1.5rem] md:mt-20 md:rounded-[2rem]">
            <Media
              src="/images/about/about-hero-2.png"
              alt="Travellers walking through a mountain landscape"
              ratio="16/9"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </Container>
      </Section>

      {/* =====================================================
          FOUNDERS
      ====================================================== */}
      <Section>
        <Container>
          <Heading
            title="We started as trekkers."
            description="No experts. No gurus. Just people who kept returning to the mountains."
            size="h1"
            align="center"
          />

          <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
            {founders.map((founder, index) => {
              const reverse = index % 2 !== 0

              return (
                <article
                  key={founder.name}
                  className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
                >
                  {/* Image */}
                  <div className={reverse ? 'md:order-2' : 'md:order-1'}>
                    <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
                      <Media
                        src={founder.image}
                        alt={`${founder.name}, ${founder.role}`}
                        ratio="4/5"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={reverse ? 'md:order-1' : 'md:order-2'}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                      {founder.role}
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-primary md:text-5xl">
                      {founder.name}
                    </h2>

                    <p className="mt-6 text-sm leading-7 text-foreground/70 md:text-base md:leading-8">
                      {founder.intro}
                    </p>

                    <p className="mt-4 text-xs leading-5 text-muted-foreground">
                      <span className="font-medium text-foreground/70">
                        Responsible for
                      </span>{' '}
                      — {founder.responsibility}
                    </p>

                    <div
                      className="my-6 h-px w-10 bg-primary/25"
                      aria-hidden="true"
                    />

                    <ul
                      aria-label={`${founder.name} credentials`}
                      className="flex flex-wrap gap-2"
                    >
                      {[founder.exp, founder.certs, founder.treks].map(
                        (item) => (
                          <li
                            key={item}
                            className="rounded-full bg-primary/5 px-3 py-1.5 text-[10px] font-medium text-muted-foreground"
                          >
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          PHILOSOPHY
      ====================================================== */}
      <Section>
        <Container>
          <MediaHeading
            eyebrow="Why we exist"
            title="We believe travel should change something."
            description="Modern life is full of noise — notifications, deadlines, screens, routines, and an endless feeling of being somewhere else."
            imagePosition="right"
            image={
              <Media
                src="/illustrations/baby-birth.png"
                alt="Traveller sitting quietly in the mountains"
                ratio="1/1"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* =====================================================
          THE RESET
      ====================================================== */}
      <Section>
        <Container>
          <MediaHeading
            eyebrow="The Reset"
            title="Leave the noise. Find your rhythm again."
            description="We don't believe a journey needs to be packed with things to do. Sometimes the most meaningful part is having enough space to notice what is already around you."
            imagePosition="left"
            image={
              <Media
                src="/illustrations/children.png"
                alt="Traveller sitting quietly in the mountains"
                ratio="4/5"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* =====================================================
          PRINCIPLES
      ====================================================== */}
      <Section>
        <Container>
          <Heading
            eyebrow="How we travel"
            title="The journey matters as much as the destination."
            description="Three ideas guide every experience we create."
            size="h2"
          />

          <div className="mt-10 grid border-y md:grid-cols-3">
            {principles.map(({ number, title, description, icon: Icon }) => (
              <article
                key={number}
                className="
                    border-b
                    px-0
                    py-8
                    last:border-b-0
                    md:border-b-0
                    md:border-r
                    md:px-8
                    md:py-10
                    md:first:pl-0
                    md:last:border-r-0
                    md:last:pr-0
                  "
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-[0.2em] text-primary">
                    {number}
                  </span>

                  <Icon
                    aria-hidden="true"
                    className="size-5 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="mt-7 text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          EXPERIENCES
      ====================================================== */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Heading
              eyebrow="What we create"
              title="Different places. One philosophy."
              description="From Himalayan trails to quiet homes and unfamiliar cities, every experience begins with the same idea."
              size="h2"
            />

            <Link
              href="/experiences"
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                text-sm
                font-medium
                underline
                decoration-border
                underline-offset-8
                transition-colors
                hover:decoration-foreground
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-4
              "
            >
              Explore everything
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.href} {...category} />
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          COMMUNITY
      ====================================================== */}
      <Section>
        <Container>
          <MediaHeading
            eyebrow="More than a trip"
            title="Come for the mountains. Stay for the people."
            description="We care deeply about the people who join us. Small moments, shared meals, terrible jokes, tired legs, unexpected friendships. Those are the things that turn a trip into a memory."
            imagePosition="left"
            image={
              <Media
                src="/images/about/IMG_5470.png"
                alt="Travellers sharing a moment during a journey"
                ratio="1/1"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <CtaSection
        eyebrow="Your journey starts here"
        title="Maybe you don't need another holiday."
        description="Maybe you just need to get away for a while."
        buttonText="Begin Your Reset"
        link="/experiences"
      />
    </main>
  )
}
