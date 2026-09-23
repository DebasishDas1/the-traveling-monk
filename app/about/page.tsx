import type { Metadata } from 'next'
import {
  Container,
  CtaSection,
  Heading,
  Media,
  MediaHeading,
  Page,
  Section,
  SectionHeader,
} from '@/components/common'

import { CategoryCard } from '@/components/experience/CategoryCard'
import { categories, principles, founders } from '@/lib/data/about-page'

export const metadata: Metadata = {
  title: 'About The Traveling Monk | Meaningful Travel & Himalayan Journeys',
  description:
    'Discover The Traveling Monk, journeys, Himalayan treks, getaways, and international experiences designed to slow down, reconnect, and return renewed.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About The Traveling Monk | Meaningful Travel',
    description:
      'We create thoughtful journeys, Himalayan treks, getaways, and international experiences for people who want to slow down and reconnect.',
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
      'Thoughtful journeys, Himalayan treks, getaways, and international experiences designed to help you slow down and reconnect.',
    images: ['/images/about/about-hero-2.png'],
  },
}

export default function AboutPage() {
  return (
    <Page>
      {/* Hero */}
        <Container className="pt-12 md:pt-16">
          <Heading
            eyebrow="About The Traveling Monk"
            title="Travel was never just about going somewhere."
            description="Sometimes you leave home because you need to find your way back to yourself."
            size="display"
            align="center"
            className="mx-auto max-w-5xl"
          />

          <div className="mt-10 md:mt-14">
            <Media
              src="/images/about/about-hero-2.png"
              alt="Travellers walking through a mountain landscape"
              ratio="16/9"
              radius="xl"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </Container>

      {/* Founders */}
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
                  <div
                    className={reverse ? 'md:order-2' : 'md:order-1'}
                  >
                    <Media
                      src={founder.image}
                      alt={`${founder.name}, ${founder.role}`}
                      ratio="4/5"
                      radius="xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div
                    className={reverse ? 'md:order-1' : 'md:order-2'}
                  >
                    <p className="eyebrow">
                      {founder.role}
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground md:text-5xl">
                      {founder.name}
                    </h2>

                    <p className="mt-6 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                      {founder.intro}
                    </p>

                    <p className="mt-5 text-sm leading-6 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Responsible for
                      </span>{' '}
                      {founder.responsibility}
                    </p>

                    <div
                      className="my-7 h-px w-10 bg-accent"
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
                            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground"
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

      {/* Philosophy */}
      <Section className="bg-surface-secondary">
        <Container>
          <MediaHeading
            eyebrow="Why we exist"
            title="We believe travel should change something."
            description="Modern life is full of noise, notifications, deadlines, screens, routines, and an endless feeling of being somewhere else."
            imagePosition="right"
            image={
              <Media
                src="/illustrations/baby-birth.png"
                alt="Traveller sitting quietly in the mountains"
                ratio="1/1"
                radius="xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* The Reset */}
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
                radius="xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* Principles */}
      <Section>
        <Container>
          <Heading
            eyebrow="How we travel"
            title="The journey matters as much as the destination."
            description="Three ideas guide every experience we create."
            size="h2"
          />

          <div className="mt-12 grid border-y border-border md:grid-cols-3">
            {principles.map(
              ({ number, title, description, icon: Icon }) => (
                <article
                  key={number}
                  className="
                    border-b border-border
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
                    <span className="text-xs font-semibold tracking-[0.2em] text-accent">
                      {number}
                    </span>

                    <Icon
                      aria-hidden="true"
                      className="size-5 text-muted-foreground"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="mt-7 text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">
                    {title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground md:text-base">
                    {description}
                  </p>
                </article>
              )
            )}
          </div>
        </Container>
      </Section>

      {/* Experiences */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="What we create"
            title="Different places. One philosophy."
            description="From Himalayan trails to quiet homes and unfamiliar cities, every experience begins with the same idea."
            action={{
              label: 'Explore everything',
              href: '/experiences',
            }}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.href}
                {...category}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Community */}
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
                radius="xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* CTA */}
      <CtaSection
        eyebrow="Your journey starts here"
        title="Maybe you don't need another holiday."
        description="Maybe you just need to get away for a while."
        buttonText="Begin Your Reset"
        link="/experiences"
      />
    </Page>
  )
}