'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, Check, Minus, Plus, Users } from 'lucide-react'

import type { Trek } from '@/types/experience'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

interface TrekBookingBarProps {
  trek: Trek
}

export function TrekBookingBar({ trek }: TrekBookingBarProps) {
  const dates = trek.availableDates ?? []

  const [selectedDate, setSelectedDate] = useState(
    dates[0]?.date ?? trek.nextDate ?? ''
  )

  const [guests, setGuests] = useState(1)
  const [open, setOpen] = useState(false)

  const total = useMemo(() => trek.priceFrom * guests, [trek.priceFrom, guests])

  const canDecrease = guests > 1
  const canIncrease = guests < trek.maxGroupSize

  const decrement = () => {
    if (canDecrease) {
      setGuests((value) => value - 1)
    }
  }

  const increment = () => {
    if (canIncrease) {
      setGuests((value) => value + 1)
    }
  }

  const handleBook = () => {
    // TODO: desktop booking flow
  }

  const handleMobileBook = () => {
    setOpen(true)
  }

  return (
    <>
      {/* DESKTOP */}
      <div className="fixed inset-x-0 bottom-0 z-50 hidden px-4 pb-4 md:block">
        <div className="mx-auto max-w-5xl">
          <div className="flex h-16 items-center gap-2 rounded-xl border bg-background px-3 shadow-lg">
            <div className="min-w-0 flex-1 px-3">
              <p className="truncate text-sm font-medium">{trek.title}</p>

              <p className="text-xs text-muted-foreground">
                {trek.duration} · {trek.difficulty}
              </p>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <DatePicker
              dates={dates}
              value={selectedDate}
              onChange={setSelectedDate}
            />

            <Separator orientation="vertical" className="h-8" />

            <GuestPicker
              value={guests}
              max={trek.maxGroupSize}
              onDecrease={decrement}
              onIncrease={increment}
            />

            <Separator orientation="vertical" className="h-8" />

            <div className="px-3 text-right">
              <p className="text-xs text-muted-foreground">Per person</p>

              <p className="text-sm font-semibold">
                ₹{formatCurrency(trek.priceFrom)}
              </p>
            </div>

            <div className="px-3 text-right">
              <p className="text-xs text-muted-foreground">Total</p>

              <p className="text-sm font-semibold">
                ₹{formatCurrency(total)}
              </p>
            </div>

            <Button className="h-10 rounded-lg px-5" onClick={handleBook}>
              Book now
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur md:hidden">
        <div className="flex items-center gap-4 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">From</p>

            <p className="text-lg font-semibold">
              ₹{formatCurrency(trek.priceFrom)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / person
              </span>
            </p>
          </div>

          <Button onClick={handleMobileBook}>
            Book now
          </Button>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          BOOKING SHEET
      ───────────────────────────────────────── */}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="
      flex
      max-h-[92svh]
      flex-col
      gap-0
      overflow-hidden
      rounded-t-2xl
      border-t
      bg-background
      p-0

      sm:max-h-[88svh]
      sm:rounded-t-3xl

      md:mx-auto
      md:rounded-t-3xl
    "
        >
          {/* Header */}
          <SheetHeader
            className="
        shrink-0
        border-b
        px-5
        py-5

        sm:px-7
        sm:py-6
      "
          >
            <SheetTitle
              className="
          text-xl
          font-semibold
          tracking-tight

          sm:text-2xl
        "
            >
              Book {trek.title}
            </SheetTitle>

            <SheetDescription
              className="
          text-sm
          leading-6
        "
            >
              Choose your departure date and number of guests.
            </SheetDescription>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div
              className="
          mx-auto
          w-full
          space-y-5
          px-5
          py-5

          sm:space-y-6
          sm:px-7
          sm:py-7
        "
            >
              {/* DATE */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Departure</h3>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Select an available date
                    </p>
                  </div>

                  <CalendarDays className="size-4 text-muted-foreground" />
                </div>

                <div className="rounded-xl border bg-card p-1">
                  <DateOptions
                    dates={dates}
                    selectedDate={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </div>
              </section>

              {/* GUESTS */}
              <section>
                <div
                  className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              bg-card
              p-4

              sm:p-5
            "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                  flex
                  size-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-muted
                "
                    >
                      <Users className="size-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">Guests</p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Up to {trek.maxGroupSize} guests
                      </p>
                    </div>
                  </div>

                  <GuestPicker
                    value={guests}
                    max={trek.maxGroupSize}
                    onDecrease={decrement}
                    onIncrease={increment}
                  />
                </div>
              </section>

              {/* SUMMARY */}
              <section
                className="
            rounded-xl
            bg-muted/50
            p-4

            sm:p-5
          "
              >
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Total</p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {guests} {guests === 1 ? 'guest' : 'guests'}
                      {selectedDate && (
                        <>
                          {' · '}
                          {formatDate(selectedDate)}
                        </>
                      )}
                    </p>
                  </div>

                  <p
                    className="
                shrink-0
                text-xl
                font-semibold
                tracking-tight

                sm:text-2xl
              "
                  >
                    ₹{formatCurrency(total)}
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Sticky footer */}
          <div
            className="
        shrink-0
        px-5
        pb-[calc(1rem+env(safe-area-inset-bottom))]

        sm:px-7
        sm:pb-5
      "
          >
            <div className="mx-auto w-full">
              <Button
                className="w-full"
                onClick={() => {
                  // TODO: connect booking flow
                }}
              >
                Continue
              </Button>

              <p className="mt-2 text-center text-[11px] leading-5 text-muted-foreground">
                You&apos;ll confirm your booking before payment.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

/* ─────────────────────────────────────────────
   DATE PICKER
───────────────────────────────────────────── */

interface DatePickerProps {
  dates: Trek['availableDates']
  value: string
  onChange: (value: string) => void
}

function DatePicker({ dates, value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-muted">
        <CalendarDays className="size-4 text-muted-foreground" />

        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Departure
          </p>

          <p className="text-sm font-medium">
            {value ? formatDate(value) : 'Select date'}
          </p>
        </div>
      </PopoverTrigger>

      <PopoverContent align="center" className="w-72 p-2">
        <DateOptions dates={dates} selectedDate={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  )
}

/* ─────────────────────────────────────────────
   DATE OPTIONS
───────────────────────────────────────────── */

interface DateOptionsProps {
  dates: Trek['availableDates']
  selectedDate: string
  onSelect: (date: string) => void
}

function DateOptions({ dates, selectedDate, onSelect }: DateOptionsProps) {
  if (!dates.length) {
    return (
      <p className="p-3 text-sm text-muted-foreground">
        No upcoming departures available.
      </p>
    )
  }

  return (
    <div className="space-y-1">
      {dates.map((date) => {
        const selected = date.date === selectedDate

        return (
          <button
            key={date.date}
            type="button"
            onClick={() => onSelect(date.date)}
            className="
              flex w-full items-center justify-between
              rounded-md px-3 py-2.5 text-left
              hover:bg-muted
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
            "
          >
            <div>
              <p className="text-sm font-medium">{formatDate(date.date)}</p>

              <p className="text-xs text-muted-foreground">
                {date.spots} spots left
              </p>
            </div>

            {selected && <Check className="size-4 text-primary" />}
          </button>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────
   GUEST PICKER
───────────────────────────────────────────── */

interface GuestPickerProps {
  value: number
  max: number
  onDecrease: () => void
  onIncrease: () => void
}

function GuestPicker({ value, max, onDecrease, onIncrease }: GuestPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Remove guest"
        disabled={value <= 1}
        onClick={onDecrease}
        className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <Minus className="size-3.5" />
      </button>

      <span aria-live="polite" className="w-5 text-center text-sm font-medium">
        {value}
      </span>

      <button
        type="button"
        aria-label="Add guest"
        disabled={value >= max}
        onClick={onIncrease}
        className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function formatCurrency(value: number) {
  return value.toLocaleString('en-IN')
}

function formatDate(value: string) {
  const [year, month, day] = value.slice(0, 10).split('-').map(Number)

  if (!year || !month || !day) {
    return value
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}
