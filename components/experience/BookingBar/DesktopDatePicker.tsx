import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarDays } from 'lucide-react';
import { BookingCalendar } from '@/components/common';
import type { AvailableDateSlot } from '@/types/experience';

interface DesktopDatePickerProps {
  dates: AvailableDateSlot[];
  value: string;
  onChange: (value: string) => void;
}

export function DesktopDatePicker({ dates, value, onChange }: DesktopDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        type="button"
        disabled={!dates.length}
        className="flex h-12 shrink-0 items-center gap-3 rounded-xl px-3 text-left outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
      >
        <CalendarDays className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Departure</p>
          <p className="text-sm font-medium">{value ? formatDisplayDate(value) : 'Select date'}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-auto rounded-2xl p-2 bg-white">
        <BookingCalendar dates={dates} value={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}

function formatDisplayDate(value: string) {
  const date = parseBookingDate(value);
  return date ? dateFormatter.format(date) : value;
}

function parseBookingDate(value: string): Date | null {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
