import Link from 'next/link'
import { ArrowRight, CalendarDays, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import type { Trek } from '@/types/experience'

interface TrekBookingProps {
  trek: Trek
}

export function TrekBooking({ trek }: TrekBookingProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border
            border-border/60
            bg-card
          "
        >
          <div className="grid lg:grid-cols-[1fr_360px]">
            <div className="p-7 md:p-10 lg:p-12">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em]"
              >
                Ready when you are
              </Badge>

              <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.98] tracking-tighter md:text-5xl">
                Your reset has a date.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                Pick a departure, bring a little curiosity, and we&apos;ll take
                care of the rest.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <BookingDetail
                  icon={<CalendarDays className="size-4" />}
                  label="Next departure"
                  value={trek.nextDate}
                />

                <BookingDetail
                  icon={<Users className="size-4" />}
                  label="Spots remaining"
                  value={`${trek.spotsLeft} spots`}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between bg-muted/50 p-7 md:p-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Starting from
                </p>

                <p className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
                  ₹{trek.priceFrom.toLocaleString('en-IN')}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">per person</p>
              </div>

              <Button asChild size="lg" className="mt-10 w-full rounded-full">
                <Link href={`/treks/${trek.slug}/book`}>
                  Begin Your Reset
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BookingDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-border/60 p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <span className="text-[10px] uppercase tracking-[0.16em]">{label}</span>
      </div>

      <p className="mt-3 text-sm font-medium">{value}</p>
    </div>
  )
}
