import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'

import type { HeroSlide as HeroSlideType } from './hero.types'

interface HeroSlideProps {
  slide: HeroSlideType
  priority?: boolean
}

export function HeroSlide({ slide, priority = false }: HeroSlideProps) {
  return (
    <div className="relative h-[65vh] min-h-120 max-h-200 w-full overflow-hidden rounded-3xl md:h-[75vh] md:min-h-150 md:rounded-[48px] xl:h-[85vh]">
      {/* Background Image */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority={priority}
        quality={95}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 82vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-linear-to-t from-black/60 to-transparent" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center"
      >
        <div className="max-w-155 px-8 md:px-16 xl:px-24">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                The Traveling Monk
              </p>

              <p className="text-sm uppercase tracking-[0.25em] text-white/80">
                {slide.category}
              </p>
            </div>

            <h1 className="max-w-[10ch] text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-6xl xl:text-7xl 2xl:text-8xl">
              {slide.title}
            </h1>

            <p className="max-w-[44ch] text-lg leading-8 text-white/80 md:text-xl">
              {slide.description}
            </p>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-6 text-sm sm:h-14 sm:px-8 sm:text-base"
              >
                <Link href={slide.href}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
