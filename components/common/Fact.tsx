import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FactProps {
  label: string
  value: string
  icon?: React.ReactNode
  className?: string
}

export function Fact({ label, value, icon }: FactProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon && <span className="size-4">{icon}</span>}
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}
