'use client'

import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'

import type { AvailableDateSlot } from '@/types/experience'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'

interface BookingCalendarProps {
  dates: AvailableDateSlot[]
  value: string
  onChange: (value: string) => void
}

function parseBookingDate(value: string): Date | null {
  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
}

function sameDay(a: Date | null, b: Date) {
  return (
    !!a &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
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

export function BookingCalendar({
  dates,
  value,
  onChange,
}: BookingCalendarProps) {
  const availableDates = useMemo(
    () =>
      dates
        .map((item) => ({
          ...item,
          dateObject: parseBookingDate(item.date),
        }))
        .filter(
          (item): item is typeof item & { dateObject: Date } =>
            item.dateObject !== null
        ),
    [dates]
  )

  const availableDateObjects = useMemo(
    () => availableDates.map((item) => item.dateObject),
    [availableDates]
  )

  const selectedDate = useMemo(
    () => (value ? parseBookingDate(value) : null),
    [value]
  )

  const [month, setMonth] = useState<Date>(
    () => selectedDate ?? availableDateObjects[0] ?? new Date()
  )

  const isAvailable = (date: Date) =>
    availableDates.some((item) => sameDay(item.dateObject, date))

  const selectDate = (date: Date) => {
    const selected = availableDates.find((item) =>
      sameDay(item.dateObject, date)
    )

    if (!selected) return

    onChange(selected.date)

    // Always move calendar to the selected date's month.
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return

    selectDate(date)
  }

  const handleDepartureSelect = (date: string) => {
    const dateObject = parseBookingDate(date)

    if (!dateObject) return

    onChange(date)

    // Open the month containing the selected departure.
    setMonth(new Date(dateObject.getFullYear(), dateObject.getMonth(), 1))
  }

  return (
    <div>
      <Calendar
        mode="single"
        month={month}
        onMonthChange={setMonth}
        selected={selectedDate ?? undefined}
        onSelect={handleCalendarSelect}
        disabled={(date) => !isAvailable(date)}
        modifiers={{
          available: availableDateObjects,
        }}
        modifiersClassNames={{
          available:
            'bg-primary/10 text-primary font-semibold rounded-md hover:bg-primary/20',
        }}
        className="mx-auto"
      />

      <div className="border-t px-3 py-3">
        <p className="mb-2 text-xs text-muted-foreground">
          Available departures
        </p>

        <div className="space-y-1">
          {availableDates.map((item) => {
            const selected = item.date === value

            return (
              <button
                key={item.date}
                type="button"
                aria-pressed={selected}
                onClick={() => handleDepartureSelect(item.date)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left',
                  'outline-none transition-colors',
                  'hover:bg-muted',
                  'focus-visible:ring-2 focus-visible:ring-primary',
                  selected && 'bg-primary/10'
                )}
              >
                <div>
                  <p className="text-sm font-medium">
                    {formatDisplayDate(item.date)}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.spots} {item.spots === 1 ? 'spot' : 'spots'} left
                  </p>
                </div>

                {selected && (
                  <Check className="size-4 text-primary" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
