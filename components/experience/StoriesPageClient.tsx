// components/experience/StoriesPageClient.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  CtaSection,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'
import { Button } from '@/components/ui/button'
import { StoryCard } from '@/components/experience/StoryCard'
import { StorySubmissionDialog } from '@/components/experience/StorySubmissionDialog'
import type { UserStory } from '@/types/story'

const CATEGORIES = [
  'All',
  'Adventure',
  'People',
  'Perspective',
  'Slow Travel',
] as const

type Category = (typeof CATEGORIES)[number]

interface StoriesPageClientProps {
  quoteList: Array<{
    quote: string
    name: string
    location: string
  }>
}

export function StoriesPageClient({ quoteList }: StoriesPageClientProps) {
  const [stories, setStories] = useState<UserStory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories')
        const data = await response.json()

        if (data.success) {
          setStories(data.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStories()
  }, [])

  const filteredStories = stories.filter(
    (story) => selectedCategory === 'All' || story.category === selectedCategory
  )

  return (
    <main className="bg-background">
      {/* ============================================================
          JOURNAL
      ============================================================ */}
      <Container>
        <MediaHeading
          eyebrow="Stories from the road"
          title="The places we go. The people we meet. The things that stay with us."
          description="Stories about travel, friendship, stillness, adventure, and finding your way back to yourself."
          size="display"
          image={
            <Media
              src="/illustrations/group-discussion.png"
              alt="Travellers discussing their journey"
              ratio="1/1"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          }
        />
      </Container>

      <Container>
        <div className="border-b pb-6 md:pb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Heading eyebrow="The journal" title="More stories" size="h2" />

            <nav
              aria-label="Story categories"
              className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-none"
            >
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category

                return (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={isActive ? 'default' : 'secondary'}
                  >
                    {category}
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Stories */}
        {isLoading ? (
          <div className="flex min-h-80 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-foreground/50" />
              <span>Loading stories</span>
            </div>
          </div>
        ) : filteredStories.length > 0 ? (
          <div className="grid gap-x-7 gap-y-14 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-20">
            {filteredStories.map((story) => (
              <div key={story.id} className="group">
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-90 flex-col items-center justify-center py-20 text-center">
            <div>
              <p className="text-lg font-medium tracking-tight">
                Nothing here yet.
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This chapter is still waiting to be written.
              </p>

              <Button
                onClick={() => setDialogOpen(true)}
                className="mt-7 rounded-full px-6"
              >
                Be the first to share
              </Button>
            </div>
          </div>
        )}
      </Container>

      {/* ============================================================
          TRAVELER VOICES
      ============================================================ */}
      <Section className="py-24 md:py-32 lg:py-40">
        <Container>
          <div className="mx-auto text-center">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Traveler voices
            </p>

            <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              The best stories
              <br className="hidden sm:block" />
              aren&apos;t always ours to tell.
            </h2>

            <p className="mx-auto mt-6 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Every journey leaves something different with the people who take
              it.
            </p>
          </div>

          <div className="mt-16 grid overflow-hidden rounded-3xl border border-border/60 bg-border/50 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {quoteList.map((quote, index) => (
              <figure
                key={`${quote.name}-${quote.quote}`}
                className={[
                  'group relative flex min-h-75 flex-col',
                  'justify-between bg-background p-7',
                  'transition-colors duration-500',
                  'hover:bg-muted/40',
                  'md:min-h-85 md:p-9',
                  index < quoteList.length - 1
                    ? 'border-b border-border/50 md:border-r'
                    : '',
                  'lg:border-b-0',
                  index % 3 !== 2 ? 'lg:border-r' : '',
                ].join(' ')}
              >
                {/* Quote mark */}
                <span
                  aria-hidden="true"
                  className="text-4xl font-serif leading-none text-muted-foreground/30"
                >
                  “
                </span>

                <blockquote className="mt-auto text-left text-xl font-medium leading-tight tracking-[-0.02em] text-foreground md:text-2xl">
                  {quote.quote}
                </blockquote>

                <figcaption className="mt-10 border-t border-border/50 pt-5">
                  <p className="text-sm font-medium text-foreground">
                    {quote.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {quote.location}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================
          CTA
      ============================================================ */}
      <CtaSection
        eyebrow="Your story could be next"
        title="Sometimes you have to leave home to find your way back to yourself."
        description="Come travel with us."
        buttonText="Begin your reset"
        link="/experiences"
      />

      {/* ============================================================
          SUBMISSION DIALOG
      ============================================================ */}
      <StorySubmissionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </main>
  )
}
