'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

import { heroSlidesData } from '@/lib/data/hero-data'
import type { HeroNavigationProps, HeroSlideProps } from '@/types/hero.types'
import { Container, Heading } from '@/components/common'

const CAROUSEL_OPTIONS = {
  loop: true,
  align: 'center' as const,
}

const IMAGE_SIZES = '(max-width: 639px) 88vw, (max-width: 1023px) 78vw, 74vw'

export function HomepageHero() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const autoplay = React.useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  )

  React.useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    handleSelect()
    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  const handlePrevious = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const handleNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const total = heroSlidesData.length

  return (
    <section className="overflow-hidden pt-8 sm:pt-10 lg:pt-14">
      {/* Intro */}
      <Container>
        <div className="flex flex-col items-center text-center">
          <Heading
            eyebrow=""
            title="Go somewhere. Come back renewed."
            description="Trips for curious people who want more than another place to tick off a list."
            size="display"
            align="center"
          />

          <div className="mt-7 flex gap-2 w-full justify-center">
            <Link href="/experiences">
              <Button>Begin your reset</Button>
            </Link>

            <Link href="/experiences">
              <Button variant="outline">
                Explore
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Hero carousel */}
      <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16">
        <Carousel
          setApi={setApi}
          opts={CAROUSEL_OPTIONS}
          plugins={[autoplay]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-3">
            {heroSlidesData.map((slide, index) => (
              <CarouselItem
                key={slide.id}
                className="
                  basis-[88%] pl-2
                  sm:basis-[84%] sm:pl-3
                  md:basis-[78%]
                  lg:basis-[74%]
                "
              >
                <HeroSlide
                  slide={slide}
                  priority={index === 0}
                  current={current}
                  total={total}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile progress */}
        <MobileProgress current={current} total={total} />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero slide                                                                 */
/* -------------------------------------------------------------------------- */

interface HeroSlideWithNavigationProps extends HeroSlideProps {
  current: number
  total: number
  onPrevious: () => void
  onNext: () => void
}

function HeroSlide({
  slide,
  priority = false,
  current,
  total,
  onPrevious,
  onNext,
}: HeroSlideWithNavigationProps) {
  return (
    <article
      className="
        group relative
        h-[60vh]
        min-h-107.5
        max-h-180
        w-full
        overflow-hidden
        rounded-[28px]
        bg-primary
        sm:h-[62vh]
        sm:min-h-115
        sm:rounded-[32px]
        md:h-[64vh]
        lg:h-[66vh]
      "
    >
      {/* Image */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority={priority}
        quality={85}
        sizes={IMAGE_SIZES}
        className="
          object-cover
          transition-transform
          duration-1000
          ease-[cubic-bezier(0.22,0.61,0.36,1)]
          group-hover:scale-[1.02]
        "
      />

      {/* Readability overlay */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-linear-to-r
          from-black/75
          via-black/35
          to-transparent
          sm:from-black/70
          md:from-black/60
          md:via-black/25
        "
      />

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 h-3/4
          bg-linear-to-t
          from-black/60
          via-black/15
          to-transparent
          md:h-1/2
          md:from-black/35
        "
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div
          className="
            w-full
            px-5 pb-7
            sm:px-8 sm:pb-10
            md:px-12 md:pb-14
            lg:px-16 lg:pb-16
            xl:px-20
          "
        >
          <div className="space-y-4 sm:space-y-5">
            {/* Category */}
            <div className="flex items-center gap-3">
              <span
                className="h-px w-7 bg-white/60 sm:w-9"
                aria-hidden="true"
              />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/80
                  sm:text-[11px]
                "
              >
                {slide.category}
              </p>
            </div>

            {/* Title */}
            <h2
              className="
                text-[2.5rem]
                font-semibold
                leading-[0.94]
                tracking-[-0.045em]
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              {slide.title}
            </h2>

            {/* Description */}
            <p
              className="
                text-sm
                leading-6
                text-white/80
                sm:text-base
                sm:leading-7
                md:text-lg
              "
            >
              {slide.description}
            </p>

            {/* CTA */}
            <Link
              href={slide.href}
              className="
                inline-flex h-11 items-center justify-center gap-2
                rounded-full bg-white px-5
                text-sm font-medium text-primary
                shadow-sm
                transition-[background-color,box-shadow,transform]
                duration-200
                hover:bg-white/90 hover:shadow-md
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black/20
                sm:h-12 sm:px-6
              "
            >
              {slide.cta}

              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide navigation */}
      <div
        className="
          absolute bottom-5 right-5 z-20
          hidden md:block
          sm:bottom-6 sm:right-6
          lg:bottom-7 lg:right-7
        "
      >
        <HeroNavigation
          current={current}
          total={total}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>

      {/* Decorative label */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-5 top-5
          hidden
          select-none
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white/50
          sm:block
          md:left-8 md:top-8
        "
      >
        Explore
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero navigation                                                            */
/* -------------------------------------------------------------------------- */

function HeroNavigation({
  current,
  total,
  onPrevious,
  onNext,
}: HeroNavigationProps) {
  return (
    <nav
      aria-label="Hero carousel navigation"
      className="
        flex items-center gap-1
        rounded-full
        border border-white/20
        bg-black/25
        p-1
        text-white
        shadow-lg
        backdrop-blur-xl
      "
    >
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="
          size-8 rounded-full
          text-white
          hover:bg-white/10
          hover:text-white
        "
        onClick={onPrevious}
        aria-label="Previous slide"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
      </Button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="
          min-w-12
          px-1
          text-center
          text-[11px]
          font-medium
          tabular-nums
          text-white/80
        "
      >
        {String(current + 1).padStart(2, '0')}

        <span className="mx-1 text-white/30">/</span>

        {String(total).padStart(2, '0')}
      </span>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="
          size-8 rounded-full
          text-white
          hover:bg-white/10
          hover:text-white
        "
        onClick={onNext}
        aria-label="Next slide"
      >
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Button>
    </nav>
  )
}

/* -------------------------------------------------------------------------- */
/* Mobile progress                                                            */
/* -------------------------------------------------------------------------- */

interface MobileProgressProps {
  current: number
  total: number
}

function MobileProgress({ current, total }: MobileProgressProps) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0

  return (
    <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
      <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
        {String(current + 1).padStart(2, '0')}
      </span>

      <div
        className="
          h-px w-14 overflow-hidden
          bg-border
        "
        aria-hidden="true"
      >
        <div
          className="
            h-full bg-primary
            transition-[width]
            duration-500
            ease-out
          "
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
        {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}
