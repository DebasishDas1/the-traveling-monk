import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Heading } from './Heading'
import { Stack } from './Stack'
import { Button } from '@/components/ui/button'
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
        'flex flex-col gap-8 md:flex-row md:items-end md:justify-between',
        centered && 'items-center text-center md:flex-col',
        className
      )}
    >
      <Stack gap="md">
        <Heading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={align}
        />
      </Stack>

      {action && (
        <Button asChild variant="ghost" className="group">
          <Link href={action.href}>
            {action.label}
            <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
    </div>
  )
}
