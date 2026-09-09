// components/experience/BookingBar/BookingSheet.tsx
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
import { Users, Loader2 } from 'lucide-react'

interface BookingSheetProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  price: number
  priceLabel: string
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
}

function formatDateToISO(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function parseBookingDate(value: string): Date | undefined {
  if (!value) return undefined
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return undefined
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
}

export function BookingSheet({
  open,
  setOpen,
  title,
  price,
  priceLabel,
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
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(formatDateToISO(date))
    }
  }

  const selectedDate = parseBookingDate(selectedDateValue)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bg-background/80 shadow-sm backdrop-blur-xl rounded-t-4xl max-h-[92svh] border-none overflow-y-auto"
        side="bottom"
      >
        <div className="shrink-0 px-5 pt-5 text-left sm:px-7">
          <SheetTitle className="text-xl tracking-tight">
            Book {title}
          </SheetTitle>
          <SheetDescription>
            Fill in your details to complete your booking.
          </SheetDescription>
        </div>
        <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-7">
          {/* Contact Information */}
          <div className="space-y-4 bg-white/60 rounded-2xl p-4">
            <h3 className="font-semibold text-sm">Your Details</h3>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                disabled={isLoading}
                className="bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                disabled={isLoading}
                className="bg-white"
                required
              />
            </div>
          </div>

          {/* Calendar */}
          <div className="overflow-hidden bg-white/60 rounded-2xl p-4">
            <h3 className="font-semibold text-sm mb-4">Select Date *</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={{ before: new Date() }}
              className="w-full"
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
                  <p className="text-sm font-medium">Guests *</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
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
            </div>
          </div>

          {/* Sticky footer */}
          <div className="shrink-0 bg-background/95 px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl sm:px-7 sm:pb-5 border-t">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">Total</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {guests} {guests === 1 ? 'guest' : 'guests'}
                  {selectedDateValue && <> · {selectedDateValue}</>}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <p className="text-2xl font-semibold tracking-tight">
                  {formatPrice(total)}
                </p>
                <Button
                  type="button"
                  disabled={
                    !selectedDateValue ||
                    !name.trim() ||
                    !phone.trim() ||
                    isLoading
                  }
                  onClick={onBook}
                  className="w-24"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    'Book'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
