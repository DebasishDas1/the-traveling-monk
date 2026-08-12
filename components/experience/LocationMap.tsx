'use client'

import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Heading, HeadingSize } from '../common'

interface LocationMapProps {
  geoLocation: string
  name: string
  description?: string
  size?: HeadingSize
  mapTop?: boolean
}

interface Coordinates {
  latitude: number
  longitude: number
}

function tryParseUrl(url: string) {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

function canResolveLocationUrl(url: URL) {
  const host = url.host.toLowerCase()

  if (host === 'maps.app.goo.gl' || host === 'goo.gl' || host === 'g.page') {
    return true
  }

  if (host.endsWith('.google.com')) {
    return (
      url.pathname.startsWith('/maps') ||
      url.pathname.startsWith('/search') ||
      url.searchParams.has('q') ||
      url.searchParams.has('ll') ||
      url.searchParams.has('query')
    )
  }

  return false
}

function extractCoordinates(url: string): Coordinates | null {
  const parsedUrl = tryParseUrl(url)

  if (!parsedUrl) {
    return null
  }

  const normalized = parsedUrl.href

  const placeMatch = normalized.match(
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/
  )

  if (placeMatch) {
    return {
      latitude: Number(placeMatch[1]),
      longitude: Number(placeMatch[2]),
    }
  }

  const altMatch = normalized.match(/!2d(-?\d+(?:\.\d+)?)!3d(-?\d+(?:\.\d+)?)/)

  if (altMatch) {
    return {
      latitude: Number(altMatch[2]),
      longitude: Number(altMatch[1]),
    }
  }

  const viewportMatch = normalized.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)

  if (viewportMatch) {
    return {
      latitude: Number(viewportMatch[1]),
      longitude: Number(viewportMatch[2]),
    }
  }

  const searchCandidates = [
    parsedUrl.searchParams.get('q') || '',
    parsedUrl.searchParams.get('ll') || '',
    parsedUrl.searchParams.get('query') || '',
  ].filter(Boolean)

  for (const candidate of searchCandidates) {
    const candidateMatch = candidate.match(
      /(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/
    )

    if (candidateMatch) {
      return {
        latitude: Number(candidateMatch[1]),
        longitude: Number(candidateMatch[2]),
      }
    }
  }

  return null
}

export function LocationMap({
  geoLocation,
  name,
  description,
  size = 'h2',
  mapTop = false,
}: LocationMapProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function resolveLocation() {
      setLoading(true)
      setCoordinates(null)

      const parsedUrl = tryParseUrl(geoLocation)

      if (!parsedUrl) {
        console.error('Invalid location URL:', geoLocation)
        setLoading(false)
        return
      }

      const directCoords = extractCoordinates(geoLocation)

      if (directCoords) {
        setCoordinates(directCoords)
        setLoading(false)
        return
      }

      if (!canResolveLocationUrl(parsedUrl)) {
        console.error('Unsupported location URL:', geoLocation)
        setLoading(false)
        return
      }

      try {
        const params = new URLSearchParams({
          url: geoLocation,
        })

        const response = await fetch(
          `/api/resolve-location?${params.toString()}`,
          {
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error(`Failed to resolve location: ${response.status}`)
        }

        const data: { url?: string } = await response.json()

        if (!data.url) {
          throw new Error('No resolved Google Maps URL')
        }

        const result = extractCoordinates(data.url)

        if (!result) {
          throw new Error('Could not extract coordinates')
        }

        setCoordinates(result)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        console.error('Failed to resolve location:', error)
        setCoordinates(null)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    resolveLocation()

    return () => controller.abort()
  }, [geoLocation])

const mapSrc = coordinates
  ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&z=7&t=p&output=embed`
  : null

  const heading = <Heading title={name} size={size} />

  return (
    <section className="space-y-3">
      {mapTop && heading}

      <div className="mt-2 overflow-hidden rounded-lg border">
        {mapSrc ? (
          <iframe
            src={mapSrc}
            className="h-87.5 w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title={`${name} location`}
          />
        ) : (
          <div className="flex h-87.5 items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              {loading ? 'Loading location...' : 'Location unavailable'}
            </div>
          </div>
        )}
      </div>

      {!mapTop && heading}

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <a
        href={geoLocation}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 hover:underline"
      >
        <MapPin className="h-4 w-4" />
        Open in Google Maps
      </a>
    </section>
  )
}
