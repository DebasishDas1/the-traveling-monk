import * as React from 'react'
import { cn } from '@/lib/utils'

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType
}

export function Eyebrow({ className, as: Comp = 'span', ...props }: EyebrowProps) {
  return (
    <Comp
      className={cn(
        'font-sans text-small font-semibold uppercase tracking-wider text-primary',
        className
      )}
      {...props}
    />
  )
}
