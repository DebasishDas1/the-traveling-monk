'use client'

import { useMemo, useState } from 'react'
import { MapPin, Route } from 'lucide-react'

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

  const coordinates = trek?.route?.coordinates ?? []

  return (
    <main>
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Content */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
              MonkPath
              <Route className="size-8" />
            </div>

            <Heading
              eyebrow="Know the way"
              title="Your route, at a glance."
              description="Explore your trek route before you head into the mountains."
              size="h1"
              titleClassName="mt-6 text-4xl sm:text-5xl lg:text-6xl"
            />

            {/* Trek selector */}
            <div className="mt-8">
              <Select
                value={selectedTrekId}
                onValueChange={(value) => {
                  if (value) setSelectedTrekId(value)
                }}
              >
                <SelectTrigger className="h-16 mt-2 min-h-16 w-full rounded-full border-0 bg-primary/10 px-5 text-base shadow-none outline-none focus:border-0 focus:ring-0 focus-visible:border-0 focus-visible:ring-0">
                  <MapPin className="size-4" />{' '}
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
                      className="rounded-xl px-3 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="size-4 text-muted-foreground" />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {title}
                          </p>

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
          </div>

          {/* Map */}
          <div className="lg:col-span-8">
            {trek && coordinates.length > 0 ? (
              <div
                className="
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-border
                  bg-surface
                  shadow-sm
                "
              >
                <TrekMap title={trek.title} coordinates={coordinates} />
              </div>
            ) : (
              <div
                className="
                  flex min-h-105
                  items-center justify-center
                  rounded-[2rem]
                  border border-dashed border-border
                  bg-muted/30
                  px-6
                "
              >
                <div className="text-center">
                  <MapPin className="mx-auto size-6 text-muted-foreground" />

                  <p className="mt-4 font-medium">Route coming soon</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose another trek to explore its route.
                  </p>
                </div>
              </div>
            )}

            {trek && coordinates.length > 0 && (
              <div className="mt-3 flex items-center justify-between px-1 text-xs text-muted-foreground">
                <span>{trek.title}</span>
                <span>{coordinates.length} points</span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}
