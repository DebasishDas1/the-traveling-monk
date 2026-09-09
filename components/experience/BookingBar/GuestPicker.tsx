import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

interface GuestPickerProps {
  value: number
  max: number
  onDecrease: () => void
  onIncrease: () => void
  disabled?: boolean
}

export function GuestPicker({
  value,
  max,
  onDecrease,
  onIncrease,
  disabled,
}: GuestPickerProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        size="icon"
        className="size-8 rounded-full"
        disabled={disabled || value <= 1}
        onClick={onDecrease}
        aria-label="Decrease guests"
      >
        <Minus className="size-3.5" />
      </Button>

      <span
        aria-live="polite"
        className="w-12 text-center text-sm font-medium tabular-nums"
      >
        {value}
      </span>

      <Button
        size="icon"
        className="size-8 rounded-full"
        disabled={disabled || value >= max}
        onClick={onIncrease}
        aria-label="Increase guests"
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  )
}
