import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ExperienceCategory } from '@/types/experience'

interface ExperienceBadgeProps {
  category: ExperienceCategory
  className?: string
}

const labels: Record<ExperienceCategory, string> = {
  trek: 'Trek',
  homestay: 'Homestay',
  international: 'International',
}

export function ExperienceBadge({ category, className }: ExperienceBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'rounded-full px-3 py-1 text-xs font-medium capitalize',
        className
      )}
    >
      {labels[category]}
    </Badge>
  )
}
