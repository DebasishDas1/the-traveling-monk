import { cn } from '@/lib/utils'

interface FactProps {
  label: string
  value: string
  icon?: React.ReactNode
  className?: string
}

export function Fact({
  label,
  value,
  icon,
  className,
}: FactProps) {
  return (
    <div
      className={cn(
        'flex min-h-24 flex-col justify-center px-4 py-5',
        'sm:px-5 sm:py-6',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span
            className="
              flex size-8 shrink-0 items-center justify-center
              rounded-full
              bg-muted
              text-muted-foreground
            "
          >
            {icon}
          </span>
        )}

        <p className="text-lg font-semibold leading-tight tracking-[-0.025em] text-foreground sm:text-xl">
          {value}
        </p>
      </div>

      <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
    </div>
  )
}