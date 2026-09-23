'use client'

import dynamic from 'next/dynamic'
import { Map } from 'lucide-react'

import type { TrekCoordinate } from '@/types/experience'

interface TrekMapProps {
  title: string
  coordinates: TrekCoordinate[]
}

const TrekMapClient = dynamic(() => import('./TrekMapClient'), {
  ssr: false,
  loading: () => (
    <div
      className="
        flex h-105 w-full
        items-center justify-center
        bg-surface
        sm:h-130
        lg:h-155
      "
      aria-label="Loading trek map"
      role="status"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="
            flex size-12 items-center justify-center
            rounded-2xl
            bg-muted
            text-muted-foreground
          "
        >
          <Map
            className="size-5 animate-pulse"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        <p className="mt-4 text-sm font-medium text-foreground">Loading map</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Preparing the route
        </p>
      </div>
    </div>
  ),
})

export function TrekMap({ title, coordinates }: TrekMapProps) {
  return (
    <div
      className="
        relative z-0
        isolate
        w-full
        overflow-hidden
      "
      aria-label={`${title} trek route map`}
    >
      <TrekMapClient title={title} coordinates={coordinates} />
    </div>
  )
}
