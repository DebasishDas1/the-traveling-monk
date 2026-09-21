'use client'

import { useMemo, useState } from 'react'
import { MapPin, Route, Waypoints } from 'lucide-react'

import { Container, Heading } from '@/components/common'
import { TrekMap } from '@/components/experience/TrekMap'
import { trekPathData } from '@/lib/data/trek-path-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ToolsPage() {
  const [selectedTrekId, setSelectedTrekId] = useState(
    String(trekPathData[0]?.id ?? '')
  )

  const trek = useMemo(
    () => trekPathData.find(({ id }) => String(id) === selectedTrekId),
    [selectedTrekId]
  )

  const coordinates = useMemo(() => trek?.route?.coordinates ?? [], [trek])

  return (
    <main>
      <Container className="flex justify-center py-12 md:py-16 lg:py-20">
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <div className="flex w-full flex-col gap-6 lg:col-span-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Waypoints className="size-4" />
              <span>MonkPath</span>
            </div>
            <div className="mt-5">
              <Heading
                title="Your route, at a glance."
                size="h1"
                className="text-4xl tracking-tight sm:text-5xl lg:text-6xl"
              />
              <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
                Explore your trek route and get a feel for the journey before
                you head into the mountains.
              </p>
            </div>
            <Select
              value={selectedTrekId}
              onValueChange={(v) => {
                if (v) setSelectedTrekId(v)
              }}
            >
              <SelectTrigger className="h-16 mt-2 min-h-16 w-full rounded-full border-0 bg-primary/10 px-5 text-base shadow-none outline-none focus:border-0 focus:ring-0 focus-visible:border-0 focus-visible:ring-0">
                <MapPin className="size-4" />
                <span className="truncate">
                  {trek ? (
                    trek.title
                  ) : (
                    <SelectValue placeholder="Choose a trek" />
                  )}
                </span>
              </SelectTrigger>

              <SelectContent className="rounded-2xl p-1.5">
                {trekPathData.map(({ id, title, route }) => (
                  <SelectItem
                    key={id}
                    value={String(id)}
                    className="rounded-xl py-3"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="size-4 text-muted-foreground" />
                      <div>
                        <p>{title}</p>
                        <p className="text-xs text-muted-foreground">
                          {route.coordinates.length} points
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right Column: Minimal Apple-style Flat Map Container */}
          <div className="w-full lg:col-span-8">
            {trek && coordinates.length > 0 ? (
              <section aria-label="Trek Map Viewer">
                <div className="relative isolate z-0 overflow-hidden rounded-[2rem] border border-border/60 bg-muted/10">
                  <TrekMap title={trek.title} coordinates={coordinates} />
                  {/* Floating Title Tag */}
                  <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6 z-10">
                    <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/80 px-3.5 py-2.5 shadow-sm backdrop-blur-2xl sm:px-4 sm:py-3">
                      <div className="flex size-8 items-center justify-center rounded-xl bg-muted/80">
                        <Route className="size-3.5 text-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Trek route
                        </p>
                        <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                          {trek.title}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Interaction Hint Pill */}
                  <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden rounded-full border border-border/50 bg-background/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-2xl sm:flex sm:items-center sm:gap-2">
                    <Waypoints className="size-3.5" />
                    <span>Drag · Zoom · Explore</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between px-2 text-xs text-muted-foreground">
                  <span className="flex min-w-0 items-center gap-2 font-medium">
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="truncate">{trek.title}</span>
                  </span>
                  <span className="hidden sm:block">
                    {coordinates.length} points mapped
                  </span>
                </div>
              </section>
            ) : (
              <section
                aria-label="Route Unavailable"
                className="flex min-h-105 items-center justify-center rounded-[2rem] border border-border/60 bg-muted/10 sm:min-h-125"
              >
                <div className="text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
                    <MapPin className="size-5 text-muted-foreground" />
                  </div>
                  <p className="mt-4 font-medium text-foreground">
                    Route unavailable
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This trek doesn&apos;t have a mapped route yet.
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}
