'use client'

import { useCallback, useMemo, useState } from 'react'
import { Check } from 'lucide-react'

import type { AvailableDateSlot } from '@/types/experience'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '../ui/button'

interface BookingCalendarProps {
  dates: AvailableDateSlot[]
  value: string
  onChange: (value: string) => void
}

function parseBookingDate(value: string): Date | null {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function getDayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function formatDisplayDate(date: Date, fallback: string) {
  return Number.isNaN(date.getTime()) ? fallback : dateFormatter.format(date)
}

export function BookingCalendar({
  dates,
  value,
  onChange,
}: BookingCalendarProps) {
  const availableDates = useMemo(() => {
    return dates.flatMap((item) => {
      const dateObject = parseBookingDate(item.date)

      if (!dateObject) return []

      return [
        {
          item,
          date: dateObject,
          dayKey: getDayKey(dateObject),
        },
      ]
    })
  }, [dates])

  const availableDateKeys = useMemo(
    () => new Set(availableDates.map(({ dayKey }) => dayKey)),
    [availableDates]
  )

  const availableDateObjects = useMemo(
    () => availableDates.map(({ date }) => date),
    [availableDates]
  )

  const selectedDate = useMemo(
    () => (value ? parseBookingDate(value) : null),
    [value]
  )

  const [month, setMonth] = useState(() =>
    getMonthStart(selectedDate ?? availableDateObjects[0] ?? new Date())
  )

  const selectDate = useCallback(
    (date: Date) => {
      const selected = availableDates.find(
        (item) => item.dayKey === getDayKey(date)
      )

      if (!selected) return

      onChange(selected.item.date)
      setMonth(getMonthStart(date))
    },
    [availableDates, onChange]
  )

  const handleCalendarSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        selectDate(date)
      }
    },
    [selectDate]
  )

  const handleDepartureSelect = useCallback(
    (date: string) => {
      const dateObject = parseBookingDate(date)

      if (!dateObject) return

      onChange(date)
      setMonth(getMonthStart(dateObject))
    },
    [onChange]
  )

  const isAvailable = useCallback(
    (date: Date) => availableDateKeys.has(getDayKey(date)),
    [availableDateKeys]
  )

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_130px] items-start md:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0 p-1 md:p-3">
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
          className="mx-auto w-full"
        />
      </div>

      <div className="min-w-0 px-2 py-2 md:px-3 md:py-3">
        <p className="mb-2 text-center text-[10px] font-medium text-muted-foreground md:text-xs">
          Departures
        </p>

        <div className="space-y-1">
          {availableDates.map(({ item, date }) => {
            const selected = item.date === value

            return (
              <Button
                key={item.date}
                type="button"
                variant={selected ? 'secondary' : 'ghost'}
                aria-pressed={selected}
                onClick={() => handleDepartureSelect(item.date)}
                className={cn(
                  'h-auto w-full justify-between gap-1 px-2 py-2 text-left',
                  selected && 'bg-primary/10 text-primary'
                )}
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium md:text-sm">
                    {formatDisplayDate(date, item.date)}
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground md:text-xs">
                    {item.spots} {item.spots === 1 ? 'spot' : 'spots'}
                  </p>
                </div>

                {selected && (
                  <Check
                    className="size-3 shrink-0 md:size-4"
                    aria-hidden="true"
                  />
                )}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
