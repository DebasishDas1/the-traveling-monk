import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva(
  'font-sans tracking-tight text-foreground text-balance',
  {
    variants: {
      level: {
        display: 'text-display font-medium leading-[1.1]',
        h1: 'text-h1 font-medium leading-[1.1]',
        h2: 'text-h2 font-medium leading-[1.2]',
        h3: 'text-h3 font-medium leading-[1.2]',
      },
    },
    defaultVariants: {
      level: 'h2',
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({ className, level, as, ...props }: HeadingProps) {
  const Comp = as || (level === 'display' ? 'h1' : level || 'h2')
  
  return (
    <Comp className={cn(headingVariants({ level, className }))} {...props} />
  )
}
