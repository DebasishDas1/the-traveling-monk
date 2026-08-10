import { ArrowUpRight, Clock3, Mountain } from 'lucide-react'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ItineraryCardProps {
  day?: number
  image?: {
    src: string
    alt: string
  } | null
  title: string
  description: string
  altitude?: string
  time?: string
  from?: string
  to?: string
  className?: string
}

export function ItineraryCard({
  day,
  image,
  title,
  description,
  altitude,
  time,
  from,
  to,
  className,
}: ItineraryCardProps) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden rounded-[28px]',
        'border-border/60 bg-card p-0',
        'shadow-none',
        'transition-all duration-500',
        'hover:-translate-y-1 hover:border-border',
        'bg-white',
        className
      )}
    >
      {/* ─────────────────────────────
          IMAGE
      ───────────────────────────── */}

      <div className="relative overflow-hidden">
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={500}
            className="aspect-4/3 w-full object-cover"
          />
        ) : (
          <div className="aspect-4/3 bg-muted" />
        )}

        {/* Image overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
        />

        {/* Day number */}
        {day !== undefined && (
          <div className="absolute left-5 top-5 flex items-center justify-center rounded-full border border-black bg-white p-2 font-black text-2xl">
            {String(day).padStart(2, '0')}{' '}
            <span className="pl-1 text-sm">Day</span>
          </div>
        )}

        {/* Location */}
        {(from || to) && (
          <div className="absolute bottom-5 left-5 right-5">
            <div className="flex items-center gap-2">
              {from && (
                <Badge className="rounded-full border border-black bg-white text-black text-md p-3">
                  {from}
                </Badge>
              )}

              {from && to && (
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 text-white/80"
                />
              )}

              {to && (
                <Badge className="rounded-full border border-black bg-white text-black text-md p-3">
                  {to}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────
          CONTENT
      ───────────────────────────── */}

      <CardContent className="py-6 pb-0">
        <h3 className="text-2xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-3xl">
          {title}
        </h3>

        <p className="mt-4 text-sm text-muted-foreground">{description}</p>
      </CardContent>

      {/* ─────────────────────────────
          META
      ───────────────────────────── */}

      {(altitude || time) && (
        <CardFooter className="mt-6 grid grid-cols-2 gap-0 border-t border-border/60 p-0">
          {altitude && (
            <ItineraryMeta
              label="Altitude"
              value={altitude}
              icon={<Mountain className="size-4" />}
            />
          )}

          {time && (
            <ItineraryMeta
              label="Walking time"
              value={time}
              icon={<Clock3 className="size-4" />}
              bordered={Boolean(altitude)}
            />
          )}
        </CardFooter>
      )}
    </Card>
  )
}

/* ─────────────────────────────────────────────
   META
───────────────────────────────────────────── */

interface ItineraryMetaProps {
  label: string
  value: string
  icon: React.ReactNode
  bordered?: boolean
}

function ItineraryMeta({
  label,
  value,
  icon,
  bordered = false,
}: ItineraryMetaProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 px-6 py-5 md:px-7',
        bordered && 'border-l border-border/60'
      )}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <span className="text-[10px] font-medium uppercase tracking-[0.16em]">
          {label}
        </span>
      </div>

      <span className="text-sm font-medium tracking-[-0.01em]">{value}</span>
    </div>
  )
}
