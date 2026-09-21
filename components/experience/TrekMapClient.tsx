'use client'

import { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

import type { TrekCoordinate } from '@/types/experience'

interface TrekMapClientProps {
  title: string
  coordinates: TrekCoordinate[]
}

function createMarkerIcon(type: 'start' | 'finish') {
  const svg =
    type === 'start'
      ? `
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 22V4" />
          <path d="M5 4c4-3 8 3 14 0v10c-6 3-10-3-14 0" />
        </svg>
      `
      : `
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m8 21 4-7 4 7" />
          <path d="m16 21 3-5 2 5" />
          <path d="M4 21h17" />
          <path d="m3 21 5-12 4 5 3-8 6 15" />
        </svg>
      `

  return L.divIcon({
    className: '',
    html: `
      <div class="monkpath-marker monkpath-marker-${type}">
        <div class="monkpath-marker-inner">
          ${svg}
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  })
}

const startIcon = createMarkerIcon('start')
const finishIcon = createMarkerIcon('finish')

function FitRoute({ positions }: { positions: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    if (positions.length < 2) return

    map.fitBounds(L.latLngBounds(positions), {
      padding: [60, 60],
    })
  }, [map, positions])

  return null
}

export default function TrekMapClient({
  title,
  coordinates,
}: TrekMapClientProps) {
  if (!coordinates.length) {
    return (
      <div className="flex min-h-105 items-center justify-center bg-muted/20">
        <p className="text-sm font-medium text-muted-foreground">
          Route unavailable
        </p>
      </div>
    )
  }

  const positions: [number, number][] = coordinates.map(
    ({ latitude, longitude }) => [latitude, longitude]
  )

  const start = positions[0]
  const end = positions[positions.length - 1]

  return (
    <>
      <MapContainer
        center={start}
        zoom={13}
        scrollWheelZoom={false}
        className="h-105 w-full sm:h-120 lg:h-135"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          maxZoom={17}
        />

        <FitRoute positions={positions} />

        {positions.length > 1 && (
          <>
            {/* White outer halo for crisp high-contrast separation */}
            <Polyline
              positions={positions}
              pathOptions={{
                color: '#ffffff',
                weight: 9,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Vibrant wider blue main trail */}
            <Polyline
              positions={positions}
              pathOptions={{
                color: '#0066cc',
                weight: 6,
                opacity: 1,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          </>
        )}

        <Marker position={start} icon={startIcon}>
          <Popup className="apple-popup">
            <div className="py-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Start
              </p>
              <p className="mt-0.5 text-xs font-semibold text-foreground">
                {title}
              </p>
            </div>
          </Popup>
        </Marker>

        {positions.length > 1 && (
          <Marker position={end} icon={finishIcon}>
            <Popup className="apple-popup">
              <div className="py-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Finish
                </p>
                <p className="mt-0.5 text-xs font-semibold text-foreground">
                  {title}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <style jsx global>{`
        .monkpath-marker {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow:
            0 10px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .monkpath-marker-inner {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          color: #111111;
          background: #f1f1f3;
        }

        .monkpath-marker-start .monkpath-marker-inner {
          color: #ffffff;
          background: #0066cc;
        }

        .monkpath-marker-finish .monkpath-marker-inner {
          color: #0066cc;
          background: #ffffff;
        }

        /* Apple Popover Style */
        .leaflet-popup-content-wrapper {
          border-radius: 1.25rem !important;
          background: rgba(255, 255, 255, 0.92) !important;
          backdrop-filter: blur(25px) !important;
          -webkit-backdrop-filter: blur(25px) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15) !important;
          padding: 2px 4px !important;
        }

        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.92) !important;
          border: 1px solid rgba(0, 0, 0, 0.06) !important;
          box-shadow: none !important;
        }

        .leaflet-popup-content {
          margin: 10px 14px !important;
          line-height: 1.4 !important;
        }
      `}</style>
    </>
  )
}
