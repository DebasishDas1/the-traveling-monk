'use client'

import { useCallback, useMemo, useState } from 'react'
import { CalendarDays, Minus, Plus, Users } from 'lucide-react'

import type { AvailableDateSlot } from '@/types/experience'

import { BookingCalendar } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'

interface BookingBarProps {
  title: string
  price: number
  priceLabel: string
  availableDates: AvailableDateSlot[] | null
  maxGuests: number
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function parseBookingDate(value: string): Date | null {
  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
}

function formatDisplayDate(value: string) {
  const date = parseBookingDate(value)

  return date ? dateFormatter.format(date) : value
}

export function BookingBar({
  title,
  price,
  priceLabel,
  availableDates,
  maxGuests,
}: BookingBarProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dates = availableDates ?? []
  const hasDates = dates.length > 0

  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)

  const selectedDateValue = useMemo(
    () =>
      dates.find(({ date }) => date === selectedDate)?.date ??
      dates[0]?.date ??
      '',
    [dates, selectedDate]
  )

  const total = price * guests

  const decreaseGuests = useCallback(() => {
    setGuests((current) => Math.max(1, current - 1))
  }, [])

  const increaseGuests = useCallback(() => {
    setGuests((current) => Math.min(maxGuests, current + 1))
  }, [maxGuests])

  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date)
  }, [])

  const handleBook = useCallback(() => {
    if (!selectedDateValue || !hasDates) return

    const booking = {
      date: selectedDateValue,
      guests,
      total,
    }

    console.log(booking)
  }, [guests, hasDates, selectedDateValue, total])

  return (
    <>
      {/* Desktop */}
      <div className="fixed inset-x-0 bottom-0 z-50 hidden px-4 pb-4 md:block">
        <Card className="mx-auto max-w-5xl rounded-2xl shadow-lg bg-white">
          <CardContent className="flex min-h-16 items-center gap-2 p-3">
            <div className="min-w-0 flex-1 px-3">
              <p className="truncate text-lg font-semibold">{title}</p>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <DesktopDatePicker
              dates={dates}
              value={selectedDateValue}
              onChange={handleDateChange}
            />

            <Separator orientation="vertical" className="h-8" />

            <GuestPicker
              value={guests}
              max={maxGuests}
              onDecrease={decreaseGuests}
              onIncrease={increaseGuests}
            />

            <Separator orientation="vertical" className="h-8" />

            <PriceBlock label={priceLabel} value={price} />

            <PriceBlock label="Total" value={total} />

            <Button
              type="button"
              className="h-10 shrink-0 rounded-xl px-5"
              disabled={!hasDates}
              onClick={handleBook}
            >
              Book now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-background/80 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-4 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">From</p>

            <p className="text-lg font-semibold tracking-tight">
              {formatPrice(price)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / person
              </span>
            </p>
          </div>

          <Button
            type="button"
            disabled={!hasDates}
            onClick={() => setSheetOpen(true)}
          >
            Book now
          </Button>
        </div>
      </div>

      {/* Mobile booking sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          className="bg-background/80 shadow-sm backdrop-blur-xl rounded-t-4xl max-h-[92svh] border-none"
          side="bottom"
        >
          <div className="shrink-0 px-5 pt-5 text-left sm:px-7">
            <SheetTitle className="text-xl tracking-tight">
              Book {title}
            </SheetTitle>

            <SheetDescription>
              Choose your departure date and number of guests.
            </SheetDescription>
          </div>

          {/* Scrollable content */}
          <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-7">
            <div className="overflow-hidden bg-white/60 rounded-2xl">
              <BookingCalendar
                dates={dates}
                value={selectedDateValue}
                onChange={handleDateChange}
              />
            </div>

            {/* Guests */}
            <div className="overflow-hidden bg-white/60 rounded-2xl">
              <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background">
                    <Users
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">Guests</p>

                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      Up to {maxGuests} guests
                    </p>
                  </div>
                </div>

                <GuestPicker
                  value={guests}
                  max={maxGuests}
                  onDecrease={decreaseGuests}
                  onIncrease={increaseGuests}
                />
              </div>
            </div>
          </div>

          {/* Sticky footer */}
          <div className="shrink-0 bg-background/95 px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl sm:px-7 sm:pb-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">Total</p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {guests} {guests === 1 ? 'guest' : 'guests'}
                  {selectedDateValue && (
                    <> · {formatDisplayDate(selectedDateValue)}</>
                  )}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <p className="text-2xl font-semibold tracking-tight">
                  {formatPrice(total)}
                </p>

                <Button
                  type="button"
                  disabled={!selectedDateValue}
                  onClick={handleBook}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

/* ============================================================
   PRICE
============================================================ */

interface PriceBlockProps {
  label: string
  value: number
}

function PriceBlock({ label, value }: PriceBlockProps) {
  return (
    <div className="shrink-0 px-3 text-right">
      <p className="text-[11px] text-muted-foreground">{label}</p>

      <p className="text-sm font-semibold">{formatPrice(value)}</p>
    </div>
  )
}

/* ============================================================
   DESKTOP DATE PICKER
============================================================ */

interface DesktopDatePickerProps {
  dates: AvailableDateSlot[]
  value: string
  onChange: (value: string) => void
}

function DesktopDatePicker({ dates, value, onChange }: DesktopDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        type="button"
        disabled={!dates.length}
        className="
          flex
          h-12
          shrink-0
          items-center
          gap-3
          rounded-xl
          px-3
          text-left
          outline-none
          transition-colors
          hover:bg-muted/50
          focus-visible:ring-2
          focus-visible:ring-primary
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        <CalendarDays
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />

        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Departure
          </p>

          <p className="text-sm font-medium">
            {value ? formatDisplayDate(value) : 'Select date'}
          </p>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        className="w-auto rounded-2xl p-2 bg-white"
      >
        <BookingCalendar dates={dates} value={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}

/* ============================================================
   GUEST PICKER
============================================================ */

interface GuestPickerProps {
  value: number
  max: number
  onDecrease: () => void
  onIncrease: () => void
}

function GuestPicker({ value, max, onDecrease, onIncrease }: GuestPickerProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        // variant="outline"
        size="icon"
        className="size-8 rounded-full"
        disabled={value <= 1}
        onClick={onDecrease}
        aria-label="Decrease guests"
      >
        <Minus className="size-3.5" />
      </Button>

      <span
        aria-live="polite"
        className="w-12 text-center text-sm font-medium tabular-nums"
      >
        {value}
      </span>

      <Button
        // variant="outline"
        size="icon"
        className="size-8 rounded-full"
        disabled={value >= max}
        onClick={onIncrease}
        aria-label="Increase guests"
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  )
}
