import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-app flex min-h-screen flex-col items-center justify-center gap-8">
        <Button>Begin Your Reset</Button>

        <Button variant="secondary">Explore Journeys</Button>

        <Button variant="outline">Learn More</Button>

        <Button variant="ghost">Stories</Button>

        <Button size="lg">
          Begin Your Journey
          <ArrowRight />
        </Button>
      </div>
    </main>
  )
}
