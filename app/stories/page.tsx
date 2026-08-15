import type { Metadata } from 'next'

import { Container, CtaSection, Heading, Section } from '@/components/common'
import { stories, quoteList } from '@/lib/data/stories-page'
import { StoryCard } from '@/components/experience/StoryCard'

export const metadata: Metadata = {
  title: 'Stories | The Traveling Monk',
  description:
    'Stories from the mountains, the road, and the people we meet along the way.',
}

const feelings = ['All', 'Adventure', 'People', 'Perspective', 'Slow Travel']

export default function StoriesPage() {
  const latestStories = stories.filter((story) => !story.featured)

  return (
    <main className="overflow-hidden">
      <Section>
        <Container>
          <Heading
            eyebrow="Stories from the road"
            title="The places we go. The people we meet. The things that stay with us."
            description="Stories about travel, friendship, stillness, adventure, and finding your way back to yourself."
            size="display"
            align="center"
          />
        </Container>
      </Section>

      <Container>
        <div className="flex flex-col gap-8 border-b pb-8 md:flex-row md:items-end md:justify-between">
          <Heading eyebrow="The journal" title="More stories" size="h2" />

          <nav
            aria-label="Story categories"
            className="
                flex
                gap-2
                overflow-x-auto
                pb-1
                scrollbar-none
              "
          >
            {feelings.map((feeling, index) => (
              <button
                key={feeling}
                type="button"
                className={`
                    shrink-0
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-xs
                    font-medium
                    transition-colors
                    ${
                      index === 0
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:bg-muted'
                    }
                  `}
              >
                {feeling}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {latestStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </Container>

      {/* =====================================================
          TRAVELER VOICES
      ====================================================== */}

      <Section className="py-24 md:py-32 lg:py-40">
        <Container>
          <Heading
            eyebrow="Traveler voices"
            title="The best stories aren't always ours to tell."
            description="Every journey leaves something different with the people who take it."
            size="h2"
            align="center"
          />

          <div className="mt-16 grid overflow-hidden rounded-[2rem] border bg-border gap-px lg:mt-24 lg:grid-cols-3">
            {quoteList.map((q) => (
              <figure
                key={q.quote}
                className="flex flex-col bg-primary-hover p-7 text-center text-white"
              >
                <blockquote className="text-2xl font-black">
                  “{q.quote}”
                </blockquote>

                <figcaption className="mt-4">
                  <p className="text-sm font-medium">{q.name}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {q.location}
                  </p>
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
        buttonText="Begin Your Reset"
        link="/experiences"
      />
    </main>
  )
}
