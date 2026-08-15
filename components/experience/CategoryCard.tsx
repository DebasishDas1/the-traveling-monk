import Link from 'next/link'

import { Media } from '@/components/common'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CategoryCardProps {
  label: string
  description: string
  href: string
  image: string
}

export function CategoryCard({
  label,
  description,
  href,
  image,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="
        group block rounded-xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
        focus-visible:ring-offset-2
      "
    >
      <Card
        className="
          h-full overflow-hidden
          bg-card text-center
          transition-all duration-300
          group-hover:-translate-y-1
          group-hover:shadow-lg
        "
      >
        <CardHeader>
          <CardTitle className="text-3xl! font-bold">{label}</CardTitle>

          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <Media
          src={image}
          alt=""
          aria-hidden="true"
          ratio="1/1"
          className="transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Card>
    </Link>
  )
}
