'use client'

import { memo, useCallback, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'

import type { AvailableDateSlot } from '@/types/experience'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

import { DesktopDatePicker } from '@/components/experience/BookingBar/DesktopDatePicker'
import { GuestPicker } from '@/components/experience/BookingBar/GuestPicker'
import { BookingSheet } from '@/components/experience/BookingBar/BookingSheet'
import { BookingDetailsDialog } from '@/components/experience/BookingBar/BookingDetailsDialog'
import { BookingDialog } from '@/components/experience/BookingBar/BookingDialog'

import {
  submitBooking,
  validateBookingPayload,
  type BookingResponse,
} from '@/utils/booking'

interface BookingBarProps {
  slug: string
  title: string
  price: number
  priceLabel: string
  availableDates?: AvailableDateSlot[] | null
  maxGuests: number
}

interface FormErrors {
  name?: string
  phone?: string
}

export function BookingBar({
  slug,
  title,
  price,
  availableDates,
  maxGuests,
}: BookingBarProps) {
  const priceFormatted = useMemo(() => formatPrice(price), [price])

  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const [sheetOpen, setSheetOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogResponse, setDialogResponse] = useState<BookingResponse | null>(
    null
  )

  const total = useMemo(() => price * guests, [price, guests])
  const isBookingDisabled = !selectedDate || isLoading

  // Real-time validation
  const validateField = useCallback(
    (field: 'name' | 'phone', value: string) => {
      const errors = { ...formErrors }

      if (field === 'name') {
        if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters'
        } else if (!/^[a-zA-Z\s\-']{2,}$/.test(value.trim())) {
          errors.name = 'Name contains invalid characters'
        } else {
          delete errors.name
        }
      }

      if (field === 'phone') {
        const digitsOnly = value.replace(/\D/g, '')
        if (digitsOnly.length < 7) {
          errors.phone = 'Phone number too short'
        } else if (digitsOnly.length > 15) {
          errors.phone = 'Phone number too long'
        } else if (!/^[\d\s\-\+\(\)]{7,20}$/.test(value)) {
          errors.phone = 'Phone number contains invalid characters'
        } else {
          delete errors.phone
        }
      }

      setFormErrors(errors)
      return Object.keys(errors).length === 0
    },
    [formErrors]
  )

  const decreaseGuests = useCallback(() => {
    setGuests((current) => Math.max(1, current - 1))
  }, [])

  const increaseGuests = useCallback(() => {
    setGuests((current) => Math.min(maxGuests, current + 1))
  }, [maxGuests])

  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date)
  }, [])

  const handleNameChange = useCallback(
    (value: string) => {
      setName(value)
      validateField('name', value)
    },
    [validateField]
  )

  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhone(value)
      validateField('phone', value)
    },
    [validateField]
  )

  const handleDesktopBook = useCallback(() => {
    if (!selectedDate) return
    setDetailsDialogOpen(true)
  }, [selectedDate])

  const handleConfirmBooking = useCallback(async () => {
    // Client-side validation
    if (!selectedDate || !name.trim() || !phone.trim()) {
      return
    }

    if (!validateField('name', name) || !validateField('phone', phone)) {
      return
    }

    const validationError = validateBookingPayload({
      slug,
      date: selectedDate,
      guests,
      total,
      name: name.trim(),
      phone,
    })

    if (validationError) {
      setDialogResponse({
        success: false,
        message: validationError,
      })
      setDialogOpen(true)
      return
    }

    setIsLoading(true)

    try {
      const response = await submitBooking({
        slug,
        date: selectedDate,
        guests,
        total,
        name: name.trim(),
        phone,
      })

      setDialogResponse(response)
      setDialogOpen(true)

      if (response.success) {
        // Wait for user to see success before clearing
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setSelectedDate('')
        setGuests(1)
        setName('')
        setPhone('')
        setFormErrors({})
        setSheetOpen(false)
        setDetailsDialogOpen(false)
      }
    } catch (error) {
      console.error('Booking error:', error)
      setDialogResponse({
        success: false,
        message:
          'Unable to complete booking. Please check your connection and try again.',
      })
      setDialogOpen(true)
    } finally {
      setIsLoading(false)
    }
  }, [slug, selectedDate, guests, total, name, phone, validateField])

  return (
    <>
      {/* Desktop booking dock */}
      <div className="fixed inset-x-0 bottom-0 z-50 hidden px-4 pb-4 md:block">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface/95 shadow-lg backdrop-blur-xl">
          <div className="flex min-h-19 items-center gap-4 p-3">
            <div className="min-w-0 flex-1 px-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Your next adventure
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-foreground">
                {title}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-muted px-3">
              <DesktopDatePicker
                value={selectedDate}
                onChange={handleDateChange}
                availableDates={availableDates}
              />
            </div>

            <GuestPicker
              value={guests}
              max={maxGuests}
              onDecrease={decreaseGuests}
              onIncrease={increaseGuests}
            />

            <div className="shrink-0 px-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                From
              </p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
                {priceFormatted}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  / person
                </span>
              </p>
            </div>

            <Button
              type="button"
              size="lg"
              className="h-12 shrink-0 rounded-2xl px-6"
              disabled={isBookingDisabled}
              onClick={handleDesktopBook}
            >
              {isLoading ? (
                <>
                  <Loader2
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                  Booking...
                </>
              ) : (
                'Book this'
              )}
            </Button>
          </div>

          {selectedDate && (
            <div className="border-t border-border bg-muted/50 px-6 py-2.5 text-right text-xs text-muted-foreground">
              {guests} {guests === 1 ? 'traveller' : 'travellers'}
              <span className="mx-2 text-border">•</span>
              Total {formatPrice(total)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile booking dock */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-4 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              From
            </p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
              {priceFormatted}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / person
              </span>
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            className="h-11 shrink-0 rounded-full px-5"
            onClick={() => setSheetOpen(true)}
          >
            Book this
          </Button>
        </div>
      </div>

      {/* Mobile booking sheet */}
      <BookingSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
        title={title}
        availableDates={availableDates}
        selectedDateValue={selectedDate}
        guests={guests}
        maxGuests={maxGuests}
        name={name}
        phone={phone}
        errors={formErrors}
        onDateChange={handleDateChange}
        onDecrease={decreaseGuests}
        onIncrease={increaseGuests}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        total={total}
        onBook={handleConfirmBooking}
        isLoading={isLoading}
      />

      {/* Desktop booking details */}
      <BookingDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        name={name}
        phone={phone}
        errors={formErrors}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        onSubmit={handleConfirmBooking}
        isLoading={isLoading}
      />

      {/* Booking result */}
      <BookingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        response={dialogResponse}
      />
    </>
  )
}

export default memo(BookingBar)
