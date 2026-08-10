'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { TrekCard } from './TrekCard'

import { Button } from '@/components/ui/button'

import { DifficultyLevel, type Trek } from '@/types/experience'

interface TrekGridProps {
  treks: Trek[]
}

const FILTERS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Easy',
    value: DifficultyLevel.EASY,
  },
  {
    label: 'Easy to Moderate',
    value: DifficultyLevel.EASY_MODERATE,
  },
  {
    label: 'Moderate',
    value: DifficultyLevel.MODERATE,
  },
  {
    label: 'Moderate to Difficult',
    value: DifficultyLevel.MODERATE_DIFFICULT,
  },
  {
    label: 'Difficult',
    value: DifficultyLevel.DIFFICULT,
  },
] as const

export function TrekGrid({ treks }: TrekGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filteredTreks = useMemo(() => {
    if (activeFilter === 'all') {
      return treks
    }

    return treks.filter((trek) => trek.difficulty === activeFilter)
  }, [treks, activeFilter])

  return (
    <section className="w-full">
      <div className="mb-10">
        <div
          className={cn(
            'flex w-full gap-2 overflow-x-auto flex-wrap',
            'pb-2 scrollbar-none',
            'md:flex-wrap md:overflow-visible'
          )}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value

            return (
              <Button
                key={filter.value}
                type="button"
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  'shrink-0 rounded-full',
                  'px-4 md:px-5',
                  'text-xs font-bold',
                  'transition-all duration-200',
                  isActive &&
                    'bg-foreground text-background hover:bg-foreground/90'
                )}
                aria-pressed={isActive}
              >
                {filter.label}
              </Button>
            )
          })}
        </div>

        {/* Result count */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredTreks.length}{' '}
            {filteredTreks.length === 1 ? 'trek' : 'treks'}
          </p>

          {activeFilter !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {filteredTreks.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2"
          >
            {filteredTreks.map((trek) => (
              <motion.div
                key={trek.id}
                layout
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 16,
                }}
                transition={{
                  duration: 0.25,
                  ease: 'easeOut',
                }}
              >
                <TrekCard experience={trek} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div>
            <section className="flex items-center justify-center h-[3₹0vh] md:h-[50vh]">
              <h1 className="font-display  text-6xl md:text-8xl text-monk-brown-deep">
                Coming Soon ...
              </h1>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
