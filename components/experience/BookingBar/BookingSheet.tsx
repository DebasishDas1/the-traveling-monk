import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BookingCalendar } from '@/components/common';
import { GuestPicker } from './GuestPicker';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { Users } from 'lucide-react';
import type { AvailableDateSlot } from '@/types/experience';

interface BookingSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  price: number;
  priceLabel: string;
  dates: AvailableDateSlot[];
  selectedDateValue: string;
  guests: number;
  maxGuests: number;
  onDateChange: (date: string) => void;
  onDecrease: () => void;
  onIncrease: () => void;
  total: number;
  onBook: () => void;
}

export function BookingSheet({
  open,
  setOpen,
  title,
  price,
  priceLabel,
  dates,
  selectedDateValue,
  guests,
  maxGuests,
  onDateChange,
  onDecrease,
  onIncrease,
  total,
  onBook,
}: BookingSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bg-background/80 shadow-sm backdrop-blur-xl rounded-t-4xl max-h-[92svh] border-none"
        side="bottom"
      >
        <div className="shrink-0 px-5 pt-5 text-left sm:px-7">
          <SheetTitle className="text-xl tracking-tight">Book {title}</SheetTitle>
          <SheetDescription>Choose your departure date and number of guests.</SheetDescription>
        </div>
        <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-7">
          {/* Calendar */}
          <div className="overflow-hidden bg-white/60 rounded-2xl">
            <BookingCalendar dates={dates} value={selectedDateValue} onChange={onDateChange} />
          </div>
          {/* Guests */}
          <div className="overflow-hidden bg-white/60 rounded-2xl">
            <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background">
                  <Users className="size-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">Guests</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    Up to {maxGuests} guests
                  </p>
                </div>
              </div>
              <GuestPicker value={guests} max={maxGuests} onDecrease={onDecrease} onIncrease={onIncrease} />
            </div>
          </div>
          {/* Sticky footer */}
          <div className="shrink-0 bg-background/95 px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl sm:px-7 sm:pb-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">Total</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {guests} {guests === 1 ? 'guest' : 'guests'}{selectedDateValue && (<> · {selectedDateValue}</>)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <p className="text-2xl font-semibold tracking-tight">{formatPrice(total)}</p>
                <Button type="button" disabled={!selectedDateValue} onClick={onBook}>Continue</Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
