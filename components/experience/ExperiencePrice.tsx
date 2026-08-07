import { ExperiencePricing as Pricing } from '@/types/experience'

interface ExperiencePricingProps {
  pricing: Pricing
}

export function ExperiencePricing({ pricing }: ExperiencePricingProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">Starting from</p>

      <div className="flex items-end gap-2">
        <span className="text-3xl font-semibold tracking-tight">
          ₹{pricing.amount.toLocaleString('en-IN')}
        </span>

        <span className="pb-1 text-sm text-muted-foreground">/ person</span>
      </div>
    </div>
  )
}
