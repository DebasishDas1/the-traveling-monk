import type { Metadata } from 'next'

import { Container, CtaSection, Heading, Section } from '@/components/common'

import { StoryCard } from '@/components/experience/StoryCard'
import { stories, quoteList } from '@/lib/data/stories-page'

export const metadata: Metadata = {
  title: 'Travel Stories & Journals | The Traveling Monk',
  description:
    'Travel stories from the mountains, the road, and the people we meet along the way. Discover stories about adventure, friendship, slow travel, and perspective.',
  alternates: {
    canonical: '/stories',
  },
  openGraph: {
    title: 'Travel Stories & Journals | The Traveling Monk',
    description:
      'Stories about adventure, friendship, slow travel, and the people we meet along the way.',
    type: 'website',
  },
}

const categories = [
  'All',
  'Adventure',
  'People',
  'Perspective',
  'Slow Travel',
] as const

export default function StoriesPage() {
  const latestStories = stories.filter((story) => !story.featured)

  return (
    <main>
      {/* Hero */}
      <Section className="pt-8 md:pt-12 lg:pt-16">
        <Container>
          <div className="mx-auto max-w-5xl">
            <Heading
              eyebrow="Stories from the road"
              title="The places we go. The people we meet. The things that stay with us."
              description="Stories about travel, friendship, stillness, adventure, and finding your way back to yourself."
              size="display"
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* Journal */}
      <Container>
        <div className="border-b pb-6 md:pb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Heading eyebrow="The journal" title="More stories" size="h2" />

            <nav
              aria-label="Story categories"
              className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-none"
            >
              {categories.map((category, index) => (
                <span
                  key={category}
                  aria-current={index === 0 ? 'page' : undefined}
                  className={`
                      shrink-0 rounded-full border px-4 py-2 text-xs
                      font-medium
                      ${
                        index === 0
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground'
                      }
                    `}
                >
                  {category}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {latestStories.length > 0 ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {latestStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">
            More stories coming soon.
          </p>
        )}
      </Container>

      {/* Traveler voices */}
      <Section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto">
            <Heading
              eyebrow="Traveler voices"
              title="The best stories aren't always ours to tell."
              description="Every journey leaves something different with the people who take it."
              size="h2"
              align="center"
            />
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {quoteList.map((quote) => (
              <figure
                key={`${quote.name}-${quote.quote}`}
                className="flex min-h-52 flex-col justify-between bg-primary-hover p-6 text-center text-white md:p-7"
              >
                <blockquote className="text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  “{quote.quote}”
                </blockquote>

                <figcaption className="mt-8">
                  <p className="text-sm font-medium">{quote.name}</p>

                  <p className="mt-1 text-xs text-white/60">{quote.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CtaSection
        eyebrow="Your story could be next"
        title="Sometimes you have to leave home to find your way back to yourself."
        description="Come travel with us."
        buttonText="Begin your reset"
        link="/experiences"
      />
    </main>
  )
}
