'use client'

import { useCallback, useMemo, useState, memo } from 'react'

import { toast } from 'sonner'

import type { AvailableDateSlot } from '@/types/experience'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'

import { DesktopDatePicker } from '@/components/experience/BookingBar/DesktopDatePicker'
import { GuestPicker } from '@/components/experience/BookingBar/GuestPicker'
import { PriceBlock } from '@/components/experience/BookingBar/PriceBlock'
import { BookingSheet } from '@/components/experience/BookingBar/BookingSheet'
import { submitBooking } from '@/utils/booking'

interface BookingBarProps {
  slug: string
  title: string
  price: number
  priceLabel: string
  availableDates: AvailableDateSlot[] | null
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
  const dates = useMemo(() => availableDates ?? [], [availableDates]);
  const hasDates = useMemo(() => dates.length > 0, [dates]);
  const priceFormatted = useMemo(() => formatPrice(price), [price]);


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

  const handleBook = useCallback(async () => {
    if (!selectedDateValue || !hasDates) return
    try {
      const payload = {
        slug,
        date: selectedDateValue,
        guests,
        total,
      }
      const response = await submitBooking(payload)
      if (response.success) {
        toast.success('Booking successful!')
      } else {
        toast.error(response.message || 'Booking failed')
      }
    } catch (error) {
      toast.error('Unable to complete booking')
    }
  }, [slug, selectedDateValue, guests, total, hasDates])

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
              {priceFormatted}
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
      <BookingSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
        title={title}
        price={price}
        priceLabel={priceLabel}
        dates={dates}
        selectedDateValue={selectedDateValue}
        guests={guests}
        maxGuests={maxGuests}
        onDateChange={handleDateChange}
        onDecrease={decreaseGuests}
        onIncrease={increaseGuests}
        total={total}
        onBook={handleBook}
      />
    </>
  )
}

export default memo(BookingBar);
