// components/experience/BookingBar/BookingBar.tsx
'use client'

import { useCallback, useMemo, useState, memo } from 'react'
import type { AvailableDateSlot } from '@/types/experience'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { DesktopDatePicker } from '@/components/experience/BookingBar/DesktopDatePicker'
import { GuestPicker } from '@/components/experience/BookingBar/GuestPicker'
import { PriceBlock } from '@/components/experience/BookingBar/PriceBlock'
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

export function BookingBar({
  slug,
  title,
  price,
  priceLabel,
  availableDates,
  maxGuests,
}: BookingBarProps) {
  const priceFormatted = useMemo(() => formatPrice(price), [price])

  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogResponse, setDialogResponse] = useState<BookingResponse | null>(
    null
  )

  const total = useMemo(() => price * guests, [price, guests])

  const decreaseGuests = useCallback(() => {
    setGuests((current) => Math.max(1, current - 1))
  }, [])

  const increaseGuests = useCallback(() => {
    setGuests((current) => Math.min(maxGuests, current + 1))
  }, [maxGuests])

  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date)
  }, [])

  const handleDesktopBook = useCallback(() => {
    if (!selectedDate) return
    setDetailsDialogOpen(true)
  }, [selectedDate])

  const handleConfirmBooking = useCallback(async () => {
    if (!selectedDate || !name || !phone || isLoading) return

    const validationError = validateBookingPayload({
      slug,
      date: selectedDate,
      guests,
      total,
      name,
      phone,
    })

    if (validationError) {
      setDialogResponse({
        success: false,
        message: validationError,
      })
      setDialogOpen(true)
      setDetailsDialogOpen(false)
      return
    }

    setIsLoading(true)

    try {
      const response = await submitBooking({
        slug,
        date: selectedDate,
        guests,
        total,
        name,
        phone,
      })

      setDialogResponse(response)
      setDialogOpen(true)
      setDetailsDialogOpen(false)

      if (response.success) {
        setSelectedDate('')
        setGuests(1)
        setName('')
        setPhone('')
        setSheetOpen(false)
      }
    } catch (error) {
      console.error('Booking error:', error)
      setDialogResponse({
        success: false,
        message: 'Unable to complete booking. Please try again.',
      })
      setDialogOpen(true)
    } finally {
      setIsLoading(false)
    }
  }, [slug, selectedDate, guests, total, name, phone, isLoading])

  const isDesktopBookingDisabled = !selectedDate

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
              value={selectedDate}
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
              disabled={isDesktopBookingDisabled || isLoading}
              onClick={handleDesktopBook}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                'Book now'
              )}
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
              {priceFormatted}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / person
              </span>
            </p>
          </div>
          <Button type="button" onClick={() => setSheetOpen(true)}>
            Book now
          </Button>
        </div>
      </div>

      {/* Mobile booking sheet */}
      <BookingSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
        title={title}
        price={price}
        priceLabel={priceLabel}
        selectedDateValue={selectedDate}
        guests={guests}
        maxGuests={maxGuests}
        name={name}
        phone={phone}
        onDateChange={handleDateChange}
        onDecrease={decreaseGuests}
        onIncrease={increaseGuests}
        onNameChange={setName}
        onPhoneChange={setPhone}
        total={total}
        onBook={handleConfirmBooking}
        isLoading={isLoading}
      />

      {/* Desktop details dialog */}
      <BookingDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        name={name}
        phone={phone}
        onNameChange={setName}
        onPhoneChange={setPhone}
        onSubmit={handleConfirmBooking}
        isLoading={isLoading}
      />

      {/* Booking Result Dialog */}
      <BookingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        response={dialogResponse}
      />
    </>
  )
}

export default memo(BookingBar)
