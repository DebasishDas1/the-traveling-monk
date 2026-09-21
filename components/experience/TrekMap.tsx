'use client'

import { memo } from 'react'
import dynamic from 'next/dynamic'
import { Map, Route } from 'lucide-react'

import type { TrekCoordinate } from '@/types/experience'

interface TrekMapProps {
  title: string
  coordinates: TrekCoordinate[]
}

const TrekMapClient = dynamic(() => import('./TrekMapClient'), {
  ssr: false,
  loading: () => (
    <div className="relative flex min-h-105 w-full items-center justify-center overflow-hidden bg-muted/20 sm:min-h-125">
      {/* Subtle Apple-style grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-sm backdrop-blur-2xl">
            <Map className="size-6 text-foreground" strokeWidth={1.5} />
          </div>

          {/* Location pulse indicator */}
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-background" />
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Route className="size-3.5 text-muted-foreground" strokeWidth={1.7} />
          <p className="text-sm font-medium text-foreground">
            Preparing your route
          </p>
        </div>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Mapping the journey ahead
        </p>

        {/* Loading dots */}
        <div className="mt-3.5 flex items-center gap-1.5">
          <span className="size-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-foreground/40" />
        </div>
      </div>
    </div>
  ),
})

export const TrekMap = memo(function TrekMap({
  title,
  coordinates,
}: TrekMapProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[2rem]"
      aria-label={`${title} trek route map`}
    >
      <TrekMapClient title={title} coordinates={coordinates} />
    </div>
  )
})
