'use client'

import { MapPin } from 'lucide-react'
import { Heading } from '../common'
import { useEffect, useState } from 'react'

interface LocationMapProps {
  geoLocation: string
  name: string
}

interface Coordinates {
  latitude: number
  longitude: number
}

function extractCoordinates(url: string): Coordinates | null {
  // 1. Prefer actual Google Maps place coordinates:
  //    !3d<latitude>!4d<longitude>
  const placeMatch = url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/)

  if (placeMatch) {
    return {
      latitude: Number(placeMatch[1]),
      longitude: Number(placeMatch[2]),
    }
  }

  // 2. Fallback to viewport coordinates:
  //    @<latitude>,<longitude>
  const viewportMatch = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)

  if (viewportMatch) {
    return {
      latitude: Number(viewportMatch[1]),
      longitude: Number(viewportMatch[2]),
    }
  }

  return null
}

export function LocationMap({ geoLocation, name }: LocationMapProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function resolveLocation() {
      try {
        setLoading(true)

        const response = await fetch(
          `/api/resolve-location?url=${encodeURIComponent(geoLocation)}`
        )

        if (!response.ok) {
          throw new Error(`Failed to resolve location: ${response.status}`)
        }

        const data = await response.json()

        if (!data.url) {
          throw new Error('No resolved Google Maps URL')
        }

        // IMPORTANT:
        // Use extractCoordinates() instead of directly
        // extracting @lat,lng.
        const result = extractCoordinates(data.url)

        if (!result || cancelled) {
          return
        }

        setCoordinates(result)
      } catch (error) {
        console.error('Failed to resolve location:', error)

        if (!cancelled) {
          setCoordinates(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    resolveLocation()

    return () => {
      cancelled = true
    }
  }, [geoLocation])

  const mapSrc = coordinates
    ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&z=14&t=k&output=embed`
    : null

  return (
    <section className="space-y-3">
      <Heading title={`${name} | Location`} size="h2" />

      <div className="overflow-hidden rounded-lg border mt-2">
        {mapSrc ? (
          <iframe
            src={mapSrc}
            width="100%"
            height="350"
            style={{ border: 0 }}
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
