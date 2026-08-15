'use client'

import { useState } from 'react'
import { CalendarDays, Minus, Plus, Users } from 'lucide-react'

import type { AvailableDateSlot } from '@/types/experience'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { BookingCalendar } from '@/components/common'

interface BookingBarProps {
  title: string
  price: number
  priceLabel: string
  availableDates: AvailableDateSlot[] | null
  maxGuests: number
}

export function BookingBar({
  title,
  price,
  priceLabel,
  availableDates,
  maxGuests,
}: BookingBarProps) {
  const dates = availableDates ?? []
  const hasDates = dates.length > 0

  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)

  const selectedDateValue =
    dates.find((item) => item.date === selectedDate)?.date ??
    dates[0]?.date ??
    ''

  const total = price * guests

  const decreaseGuests = () => {
    setGuests((current) => Math.max(1, current - 1))
  }

  const increaseGuests = () => {
    setGuests((current) => Math.min(maxGuests, current + 1))
  }

  const handleBook = () => {
    if (!selectedDateValue || !hasDates) return

    const booking = {
      date: selectedDateValue,
      guests,
      total,
    }

    console.log(booking)
  }

  return (
    <>
      {/* =====================================================
          DESKTOP BOOKING BAR
      ====================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-50 hidden px-4 pb-4 md:block">
        <div className="mx-auto max-w-5xl">
          <div className="flex min-h-16 items-center gap-2 rounded-2xl border bg-background px-3 shadow-lg">
            {/* Title */}
            <div className="min-w-0 flex-1 px-3">
              <p className="truncate text-lg font-semibold">{title}</p>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <DesktopDatePicker
              dates={dates}
              value={selectedDateValue}
              onChange={setSelectedDate}
            />

            <Separator orientation="vertical" className="h-8" />

            {/* Guests */}
            <GuestPicker
              value={guests}
              max={maxGuests}
              onDecrease={decreaseGuests}
              onIncrease={increaseGuests}
            />

            <Separator orientation="vertical" className="h-8" />

            {/* Price */}
            <PriceBlock label={priceLabel} value={price} />

            {/* Total */}
            <PriceBlock label="Total" value={total} />

            <Button
              className="h-10 shrink-0 rounded-xl px-5"
              disabled={!hasDates}
              onClick={handleBook}
            >
              Book now
            </Button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE BOOKING BAR
      ====================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-4 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">From</p>

            <p className="text-lg font-semibold tracking-tight">
              ₹{formatCurrency(price)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / person
              </span>
            </p>
          </div>

          <Button disabled={!hasDates} onClick={() => setSheetOpen(true)}>
            Book now
          </Button>
        </div>
      </div>

      {/* =====================================================
          MOBILE BOOKING SHEET
      ====================================================== */}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="
            flex
            max-h-[92svh]
            flex-col
            gap-0
            overflow-hidden
            rounded-t-3xl
            border-t
            bg-background
            p-0
            sm:max-h-[88svh]
          "
        >
          {/* Header */}
          <SheetHeader className="shrink-0 border-b px-5 py-5 sm:px-7 sm:py-6">
            <SheetTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              Book {title}
            </SheetTitle>

            <SheetDescription className="text-sm leading-6">
              Choose your departure date and number of guests.
            </SheetDescription>
          </SheetHeader>

          {/* Content */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-6 px-5 py-5 sm:px-7 sm:py-7">
              {/* Departure */}
              <section>
                <SectionLabel
                  icon={<CalendarDays />}
                  title="Departure"
                  description="Select an available date"
                />

                <div className="mt-3 overflow-hidden rounded-2xl border">
                  <BookingCalendar
                    dates={dates}
                    value={selectedDateValue}
                    onChange={setSelectedDate}
                  />
                </div>
              </section>

              {/* Guests */}
              <section>
                <div className="flex items-center justify-between rounded-2xl border p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Users
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium">Guests</p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
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
              </section>

              {/* Summary */}
              <section className="rounded-2xl bg-muted/50 p-4 sm:p-5">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Total</p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {guests} {guests === 1 ? 'guest' : 'guests'}
                      {selectedDateValue && (
                        <> · {formatDisplayDate(selectedDateValue)}</>
                      )}
                    </p>
                  </div>

                  <p className="shrink-0 text-xl font-semibold tracking-tight sm:text-2xl">
                    ₹{formatCurrency(total)}
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-7 sm:pb-5">
            <Button
              className="h-12 w-full rounded-xl"
              disabled={!selectedDateValue}
              onClick={handleBook}
            >
              Continue
            </Button>

            <p className="mt-2 text-center text-[11px] leading-5 text-muted-foreground">
              You&apos;ll confirm your booking before payment.
            </p>
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

      <p className="text-sm font-semibold">₹{formatCurrency(value)}</p>
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
          transition-none
          focus:bg-transparent
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
        className="w-auto rounded-2xl bg-background p-2"
      >
        <BookingCalendar dates={dates} value={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}

/* ============================================================
   SECTION LABEL
============================================================ */

interface SectionLabelProps {
  icon: React.ReactNode
  title: string
  description: string
}

function SectionLabel({ icon, title, description }: SectionLabelProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium">{title}</h3>

        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>

      <span
        className="size-4 text-muted-foreground [&>svg]:size-4"
        aria-hidden="true"
      >
        {icon}
      </span>
    </div>
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
    <div className="flex items-center gap-2">
      <GuestButton
        label="Remove guest"
        disabled={value <= 1}
        onClick={onDecrease}
      >
        <Minus />
      </GuestButton>

      <span aria-live="polite" className="w-6 text-center text-sm font-medium">
        {value}
      </span>

      <GuestButton
        label="Add guest"
        disabled={value >= max}
        onClick={onIncrease}
      >
        <Plus />
      </GuestButton>
    </div>
  )
}

/* ============================================================
   GUEST BUTTON
============================================================ */

interface GuestButtonProps {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}

function GuestButton({ label, disabled, onClick, children }: GuestButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="
        inline-flex
        size-9
        items-center
        justify-center
        rounded-full
        border
        outline-none
        transition-none
        focus:bg-transparent
        focus-visible:ring-2
        focus-visible:ring-primary
        disabled:pointer-events-none
        disabled:opacity-40
      "
    >
      <span className="size-3.5 [&>svg]:size-3.5" aria-hidden="true">
        {children}
      </span>
    </button>
  )
}

/* ============================================================
   DATE HELPERS
============================================================ */

/**
 * Parses dates such as:
 *
 * "Oct 18, 2026"
 * "Nov 07, 2026"
 *
 * Returns null for invalid values.
 */
function parseBookingDate(value: string): Date | null {
  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
}

function formatDisplayDate(value: string) {
  const date = parseBookingDate(value)

  if (!date) return value

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function formatCurrency(value: number) {
  return value.toLocaleString('en-IN')
}
