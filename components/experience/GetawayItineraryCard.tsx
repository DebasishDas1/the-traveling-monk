import Image from 'next/image'
import { Check } from 'lucide-react'

import { Card } from '@/components/ui/card'

interface ItineraryCardProps {
  day?: number
  image?: {
    src: string
    alt: string
  } | null
  title: string
  description: string
  pointers?: string[]
}

export function GetawayItineraryCard({
  day,
  image,
  title,
  description,
  pointers = [],
}: ItineraryCardProps) {
  return (
    <Card className="group overflow-hidden rounded-[28px] border-border/60 bg-card p-0 shadow-sm">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        {image?.src && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        {/* Day */}
        {day !== undefined && (
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-background/95 px-3.5 py-2 text-foreground shadow-sm backdrop-blur">
            <span className="text-base font-semibold tabular-nums">
              {String(day).padStart(2, '0')}
            </span>

            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Day
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-7">
        <div>
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Pointers */}
        {pointers.length > 0 && (
          <ul className="mt-6 space-y-3 border-t border-border/60 pt-5">
            {pointers.map((pointer) => (
              <li
                key={pointer}
                className="flex items-start gap-3 text-sm leading-5 text-foreground/80"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={2.5}
                  />
                </span>

                <span>{pointer}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
