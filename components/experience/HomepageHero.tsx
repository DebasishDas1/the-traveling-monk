'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { heroSlidesData } from '@/lib/data/hero-data'
import type { HeroNavigationProps, HeroSlideProps } from '@/types/hero.types'
import { Container, Heading } from '@/components/common'

const CAROUSEL_OPTIONS = {
  loop: true,
  align: 'center' as const,
}

const IMAGE_SIZES = '(max-width: 640px) 78vw, (max-width: 1024px) 76vw, 74vw'

export function HomepageHero() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const autoplay = React.useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
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

  return (
    <section className="pt-24">
      {/* Section header */}
      <Container className="my-6 md:my-10 flex flex-col items-center gap-6">
        <Heading title="Walk until you find yourself." align="center" />

        <Button asChild variant="outline">
          <Link href="/experiences">View All</Link>
        </Button>
      </Container>

      {/* Hero carousel */}
      <div className="relative">
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
                  basis-[78%]
                  pl-2
                  sm:basis-[76%]
                  sm:pl-3
                  lg:basis-[74%]
                "
              >
                <HeroSlide slide={slide} priority={index === 0} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation aligned with active slide */}
        <div
          className="
            absolute
            bottom-4
            right-[11%]
            z-20
            sm:bottom-5
            sm:right-[12%]
            lg:right-[14%]
            hidden
            md:block
          "
        >
          <HeroNavigation
            current={current}
            total={heroSlidesData.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </section>
  )
}

function HeroSlide({ slide, priority = false }: HeroSlideProps) {
  return (
    <article
      className="
        relative
        h-[52vh]
        min-h-100
        max-h-170
        w-full
        overflow-hidden
        rounded-xl
        md:h-[62vh]
        md:min-h-125
        md:rounded-2xl
      "
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority={priority}
        quality={80}
        sizes={IMAGE_SIZES}
        className="object-cover"
      />

      {/* Image overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/30" />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          h-2/3
          bg-linear-to-t
          from-black/70
          via-black/20
          to-transparent
        "
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div
          className="
            w-full
            max-w-155
            px-7
            pb-9
            sm:px-8
            md:px-14
            md:pb-14
            xl:px-20
            xl:pb-16
          "
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                The Traveling Monk
              </p>

              <p className="text-xs uppercase tracking-[0.2em] text-white/75 sm:text-sm">
                {slide.category}
              </p>
            </div>

            <h2
              className="
                max-w-[10ch]
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-tight
                text-white
                sm:text-5xl
                md:text-6xl
                xl:text-7xl
              "
            >
              {slide.title}
            </h2>

            <p
              className="
                max-w-[44ch]
                text-sm
                leading-6
                text-white/75
                sm:text-base
                md:text-lg
                md:leading-7
              "
            >
              {slide.description}
            </p>

            <Button asChild size="lg" className="h-11 rounded-full px-6">
              <Link href={slide.href}>{slide.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

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
        flex
        items-center
        gap-1
        rounded-full
        border
        bg-white
        p-1
        shadow-sm
      "
    >
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-8 rounded-full"
        onClick={onPrevious}
        aria-label="Previous slide"
      >
        <ArrowLeft className="size-3.5" />
      </Button>

      <span className="min-w-12 text-center text-[11px] tabular-nums text-muted-foreground">
        {String(current + 1).padStart(2, '0')} /{' '}
        {String(total).padStart(2, '0')}
      </span>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-8 rounded-full"
        onClick={onNext}
        aria-label="Next slide"
      >
        <ArrowRight className="size-3.5" />
      </Button>
    </nav>
  )
}
