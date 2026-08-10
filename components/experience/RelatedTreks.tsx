import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Trek } from '@/types/experience'

import { TrekCard } from './TrekCard'

interface RelatedTreksProps {
  currentTrek: Trek
  treks: Trek[]
}

export function RelatedTreks({ currentTrek, treks }: RelatedTreksProps) {
  const related = treks
    .filter((trek) => trek.slug !== currentTrek.slug && trek.active)
    .filter((trek) => {
      return (
        trek.difficulty === currentTrek.difficulty ||
        trek.location === currentTrek.location
      )
    })
    .slice(0, 3)

  if (!related.length) {
    return null
  }

  return (
    <section className="border-t border-border/60 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              Keep exploring
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tighter md:text-5xl">
              More ways to reset.
            </h2>
          </div>

          <Link
            href="/treks"
            className="
              hidden
              items-center
              gap-2
              text-sm
              font-medium
              md:inline-flex
            "
          >
            View all treks
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((trek) => (
            <div key={trek.slug} className="group">
              <TrekCard experience={trek} />
            </div>
          ))}
        </div>

        <Link
          href="/treks"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium md:hidden"
        >
          View all treks
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
