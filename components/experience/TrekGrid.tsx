'use client'

import { useState } from 'react'

import { TrekCard } from './TrekCard'
import { Button } from '@/components/ui/button'
import { DifficultyLevel, type Trek } from '@/types/experience'
import { cn } from '@/lib/utils'

interface TrekGridProps {
  treks: Trek[]
}

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

export function TrekGrid({ treks }: TrekGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filteredTreks =
    activeFilter === 'all'
      ? treks
      : treks.filter((trek) => trek.difficulty === activeFilter)

  return (
    <section aria-label="Himalayan treks">
      {/* Filters */}
      <div className="mb-8">
        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap md:overflow-visible"
          role="group"
          aria-label="Filter treks by difficulty"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value

            return (
              <Button
                key={filter.value}
                type="button"
                size="sm"
                variant={isActive ? 'primary' : 'outline'}
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={isActive}
                className={cn(
                  'shrink-0 rounded-full px-4 text-xs',
                  isActive && 'bg-foreground text-background'
                )}
              >
                {filter.label}
              </Button>
            )
          })}
        </div>

        {/* Result count */}
        <div className="mt-4 flex min-h-5 items-center justify-between">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {filteredTreks.length}{' '}
            {filteredTreks.length === 1 ? 'trek' : 'treks'}
          </p>

          {activeFilter !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredTreks.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-2 lg:gap-10">
          {filteredTreks.map((trek) => (
            <TrekCard key={trek.id} experience={trek} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[30vh] items-center justify-center md:min-h-[40vh]">
          <p className="text-4xl font-semibold tracking-tight text-muted-foreground md:text-6xl">
            Coming soon
          </p>
        </div>
      )}
    </section>
  )
}
