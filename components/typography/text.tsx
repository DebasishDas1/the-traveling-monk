import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva(
  'font-sans',
  {
    variants: {
      size: {
        body: 'text-body leading-relaxed',
        small: 'text-small leading-relaxed',
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'body',
      variant: 'default',
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType
}

export function Text({ className, size, variant, as: Comp = 'p', ...props }: TextProps) {
  return (
    <Comp className={cn(textVariants({ size, variant, className }))} {...props} />
  )
}
