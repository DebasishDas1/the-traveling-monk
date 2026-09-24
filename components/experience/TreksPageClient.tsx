'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'

import {
  Container,
  CtaSection,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'
import { TrekCard } from '@/components/experience/TrekCard'
import { trekData } from '@/lib/data/trek-data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DifficultyLevel, type Trek } from '@/types/experience'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Easy', value: DifficultyLevel.EASY },
  { label: 'Easy to Moderate', value: DifficultyLevel.EASY_MODERATE },
  { label: 'Moderate', value: DifficultyLevel.MODERATE },
  {
    label: 'Moderate to Difficult',
    value: DifficultyLevel.MODERATE_DIFFICULT,
  },
  { label: 'Difficult', value: DifficultyLevel.DIFFICULT },
] as const

export function TreksPageClient() {
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    DifficultyLevel[]
  >([])

  const filteredTreks = useMemo(() => {
    if (selectedDifficulties.length === 0) {
      return trekData
    }

    return trekData.filter((trek) =>
      selectedDifficulties.includes(trek.difficulty)
    )
  }, [selectedDifficulties])

  function toggleDifficulty(value: DifficultyLevel) {
    setSelectedDifficulties((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    )
  }

  function clearFilters() {
    setSelectedDifficulties([])
  }

  return (
    <main>
      {/* Hero */}
      {/* <Section className="pt-10 sm:pt-12 md:pt-16 lg:pt-20"> */}
      <Container className="mt-6">
        <MediaHeading
          eyebrow="Himalayan Treks"
          title="Find your way into the mountains."
          description="Journeys that take you away from the noise and closer to what matters."
          size="display"
          image={
            <Media
              src="/illustrations/mountain-journey.png"
              alt="Traveller beginning a journey through the Himalayan mountains"
              ratio="1/1"
              radius="xl"
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          }
        />
      </Container>
      {/* </Section> */}

      {/* Treks + filters */}
      <Section className="bg-surface-secondary">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            {/* Sidebar filter */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="lg:sticky lg:top-24">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <SlidersHorizontal
                        aria-hidden="true"
                        className="size-4"
                      />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Filter treks
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Find your kind of trail
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 rounded-3xl border border-border bg-surface p-5 sm:p-6">
                  <div>
                    <p className="mb-4 text-sm font-semibold text-foreground">
                      Difficulty
                    </p>

                    <div className="space-y-3">
                      {FILTERS.filter((filter) => filter.value !== 'all').map(
                        (filter) => {
                          const difficulty = filter.value as DifficultyLevel

                          return (
                            <label
                              key={difficulty}
                              className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Checkbox
                                checked={selectedDifficulties.includes(
                                  difficulty
                                )}
                                onCheckedChange={() =>
                                  toggleDifficulty(difficulty)
                                }
                              />

                              <span>{filter.label}</span>
                            </label>
                          )
                        }
                      )}
                    </div>
                  </div>

                  {/* Result count */}
                  <div className="border-t border-border pt-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Showing
                        </p>

                        <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                          {filteredTreks.length}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {filteredTreks.length === 1 ? 'trek' : 'treks'}
                        </p>
                      </div>

                      {selectedDifficulties.length > 0 && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Trek collection */}
            <div className="lg:col-span-9">
              <div className="mb-8 sm:mb-10">
                <Heading
                  as="h2"
                  eyebrow="Explore"
                  title="Choose your journey."
                  description="Find a trek that matches your pace, experience, and sense of adventure."
                  size="h2"
                />
              </div>

              {/* Mobile / compact filters */}
              <div className="mb-8 lg:hidden">
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Filter treks by difficulty"
                >
                  {FILTERS.map((filter) => {
                    const isAll = filter.value === 'all'
                    const difficulty = isAll
                      ? null
                      : (filter.value as DifficultyLevel)

                    const isActive = isAll
                      ? selectedDifficulties.length === 0
                      : selectedDifficulties.includes(difficulty!)

                    return (
                      <Button
                        key={filter.value}
                        size="sm"
                        variant={isActive ? 'default' : 'outline'}
                        aria-pressed={isActive}
                        onClick={() => {
                          if (isAll) {
                            clearFilters()
                          } else {
                            toggleDifficulty(difficulty!)
                          }
                        }}
                      >
                        {filter.label}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <TrekGrid treks={filteredTreks} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Philosophy */}
      <Section>
        <Container>
          <div className="mx-auto">
            <Heading
              as="h2"
              align="center"
              eyebrow="The Traveling Monk"
              title="Leave the noise behind."
              description="Step away from everyday distractions and into journeys that bring you closer to nature, people, and yourself."
              size="h2"
            />
          </div>

          <div className="mt-10 sm:mt-12 md:mt-16">
            <Media
              src="/illustrations/on-the-way.png"
              alt="Traveller walking through the Himalayan mountains"
              ratio="16/9"
              radius="xl"
              sizes="(max-width: 1023px) 100vw, 90vw"
            />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CtaSection
        eyebrow="Ready?"
        title="Begin your reset."
        description="Your next story might be waiting in the mountains."
        buttonText="Explore experiences"
        link="/experiences"
      />
    </main>
  )
}

interface TrekGridProps {
  treks: Trek[]
}

function TrekGrid({ treks }: TrekGridProps) {
  return (
    <section aria-label="Himalayan treks">
      <div className="mb-6 flex min-h-5 items-center">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {treks.length} {treks.length === 1 ? 'trek' : 'treks'}
        </p>
      </div>

      {treks.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-10">
          {treks.map((trek) => (
            <TrekCard key={trek.id} experience={trek} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[30vh] items-center justify-center md:min-h-[40vh]">
          <p className="text-center text-4xl font-semibold tracking-tight text-muted-foreground md:text-6xl">
            Coming soon
          </p>
        </div>
      )}
    </section>
  )
}
