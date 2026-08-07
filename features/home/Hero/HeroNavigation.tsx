'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroNavigationProps {
  current: number
  total: number
  onPrevious: () => void
  onNext: () => void
  onSelect: (index: number) => void
}

export function HeroNavigation({
  current,
  total,
  onPrevious,
  onNext,
  onSelect,
}: HeroNavigationProps) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              current === index ? 'w-10 bg-foreground' : 'w-4 bg-muted'
            )}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-full border bg-background/80 p-1 backdrop-blur-xl">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={onPrevious}
        >
          <ArrowLeft className="size-4" />
        </Button>

        <span className="min-w-16 text-center text-sm font-medium">
          {String(current + 1).padStart(2, '0')} /{' '}
          {String(total).padStart(2, '0')}
        </span>

        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={onNext}
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
