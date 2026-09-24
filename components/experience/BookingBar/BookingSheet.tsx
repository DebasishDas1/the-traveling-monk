import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { GuestPicker } from './GuestPicker'
import { formatPrice } from '@/lib/utils'
import { Loader2, Users } from 'lucide-react'
import type { AvailableDateSlot } from '@/types/experience'

interface BookingSheetProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  availableDates?: AvailableDateSlot[] | null
  selectedDateValue: string
  guests: number
  maxGuests: number
  name: string
  phone: string
  onDateChange: (date: string) => void
  onDecrease: () => void
  onIncrease: () => void
  onNameChange: (name: string) => void
  onPhoneChange: (phone: string) => void
  total: number
  onBook: () => void
  isLoading?: boolean
  errors?: { name?: string; phone?: string }
}

function formatDateToISO(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function parseBookingDate(value: string): Date | undefined {
  if (!value) return undefined
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return undefined
  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export function BookingSheet({
  open,
  setOpen,
  title,
  selectedDateValue,
  guests,
  maxGuests,
  name,
  phone,
  onDateChange,
  onDecrease,
  onIncrease,
  onNameChange,
  onPhoneChange,
  total,
  onBook,
  isLoading = false,
}: BookingSheetProps) {
  const selectedDate = parseBookingDate(selectedDateValue)

  const canBook =
    !!selectedDateValue && !!name.trim() && !!phone.trim() && !isLoading

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return
    onDateChange(formatDateToISO(date))
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="
          flex max-h-[92svh] flex-col
          overflow-hidden
          rounded-t-[2rem]
          border-border
          bg-background
          p-0
        "
      >
        {/* Header */}
        <header className="shrink-0 border-b border-border px-5 py-5 sm:px-8 sm:py-6">
          <SheetTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
            Book {title}
          </SheetTitle>

          <SheetDescription className="mt-1 text-sm">
            Choose your date and tell us a little about yourself.
          </SheetDescription>
        </header>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full space-y-6 px-5 py-6 sm:space-y-8 sm:px-8 sm:py-8">
            {/* Date */}
            <section aria-labelledby="booking-date-heading">
              <h3
                id="booking-date-heading"
                className="mb-3 text-sm font-semibold"
              >
                Select date
              </h3>

              <div className="overflow-hidden rounded-2xl border border-border bg-surface p-3 sm:p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="mx-auto w-full bg-transparent"
                />
              </div>
            </section>

            {/* Guests */}
            <section
              aria-labelledby="booking-guests-heading"
              className="
                flex items-center justify-between gap-4
                rounded-2xl
                border border-border
                bg-surface
                p-4
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Users
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <h3
                    id="booking-guests-heading"
                    className="text-sm font-semibold"
                  >
                    Guests
                  </h3>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Up to {maxGuests} guests
                  </p>
                </div>
              </div>

              <GuestPicker
                value={guests}
                max={maxGuests}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
                disabled={isLoading}
              />
            </section>

            {/* Contact details */}
            <section aria-labelledby="booking-details-heading">
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="booking-name">Full name</Label>

                  <Input
                    id="booking-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => onNameChange(event.target.value)}
                    disabled={isLoading}
                    className="h-11 rounded-xl bg-surface"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="booking-phone">Phone number</Label>

                  <Input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(event) => onPhoneChange(event.target.value)}
                    disabled={isLoading}
                    className="h-11 rounded-xl bg-surface"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="
            shrink-0
            border-t border-border
            bg-background
            px-5 py-4
            pb-[calc(1rem+env(safe-area-inset-bottom))]
            sm:px-8 sm:py-5
          "
        >
          <div className="mx-auto flex w-full items-center justify-between gap-5">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Total</p>

              <p className="mt-0.5 text-xl font-semibold tracking-tight">
                {formatPrice(total)}
              </p>
            </div>

            <Button
              type="button"
              disabled={!canBook}
              onClick={onBook}
              className="h-11 rounded-full px-6 shadow-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span className="sr-only">Booking...</span>
                </>
              ) : (
                'Book now'
              )}
            </Button>
          </div>
        </footer>
      </SheetContent>
    </Sheet>
  )
}
