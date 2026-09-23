// components/experience/BookingBar/DesktopDatePicker.tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { CalendarDays } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import type { AvailableDateSlot } from '@/types/experience'

interface DesktopDatePickerProps {
  value: string
  onChange: (value: string) => void
  availableDates?: AvailableDateSlot[] | null
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function parseBookingDate(value: string): Date | undefined {
  if (!value) return undefined
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return undefined
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
}

function formatDisplayDate(value: string): string {
  const date = parseBookingDate(value)
  return date ? dateFormatter.format(date) : 'Select date'
}

function formatDateToISO(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function DesktopDatePicker({
  value,
  onChange,
  // availableDates,
}: DesktopDatePickerProps) {
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange(formatDateToISO(date))
    }
  }

  const selectedDate = parseBookingDate(value)

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        className="flex h-12 shrink-0 items-center gap-3 rounded-xl px-3 text-left outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary"
      >
        <CalendarDays
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Departure
          </p>
          <p className="text-sm font-medium">{formatDisplayDate(value)}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="w-auto rounded-2xl p-2 bg-white"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          // disabled={(date) => {
          //   if (date < new Date()) return true
          //   if (!availableDates?.length) return false

          //   const dateValue = formatDateToISO(date)
          //   return !availableDates.some(
          //     (slot) => slot.date === dateValue && slot.spots > 0
          //   )
          // }}
          // initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
