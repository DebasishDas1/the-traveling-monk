import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Heading } from './Heading'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: {
    label: string
    href: string
  }
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-8',
        'md:flex-row md:items-end md:justify-between',
        centered && 'items-center text-center md:flex-col md:items-center',
        className
      )}
    >
      <Heading
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
      />

      {action && (
        <Link
          href={action.href}
          className={cn(
            'group inline-flex h-11 shrink-0 items-center justify-center',
            'gap-2 rounded-full px-5',
            'border border-border',
            'bg-transparent text-sm font-medium',
            'text-foreground',
            'transition-[background-color,color,border-color,transform]',
            'duration-200 ease-out',
            'hover:border-input hover:bg-muted',
            'active:scale-[0.98]',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-ring',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-offset-background'
          )}
        >
          {action.label}

          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  )
}