import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MoveLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-6 py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-saffron/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-forest/5 rounded-full blur-[100px]" />

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full border border-forest/10 flex items-center justify-center animate-pulse">
              <Compass className="w-10 h-10 text-saffron" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-display  text-forest leading-tight">
            The path is not outside. <br />
            <span className="text-saffron">It never was.</span>
          </h1>
          <p className="text-xl text-forest/60 font-sans font-light max-w-lg mx-auto">
            You&apos;ve reached a trail that doesn&apos;t exist yet. Perhaps the
            journey you&apos;re looking for is elsewhere.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/">
            <Button
              // variant="outline"
              size="lg"
              className="rounded-full px-10 h-14 text-lg font-bold uppercase tracking-widest group shadow-xl shadow-saffron/20 hover:shadow-saffron/30 transition-all duration-500"
            >
              <MoveLeft className="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-2" />
              Return to Basecamp
            </Button>
          </Link>
          <Link href="/treks">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-10 h-14 text-lg border-forest text-forest hover:bg-forest hover:text-parchment transition-all duration-500 font-bold uppercase tracking-widest"
            >
              Explore New Paths
            </Button>
          </Link>
        </div>

        <div className="pt-16">
          <p className="text-xs text-forest/30 uppercase tracking-[0.4em] font-medium">
            404 — JOURNEY_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  )
}
