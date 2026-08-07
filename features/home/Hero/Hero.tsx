'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import type { CarouselApi } from '@/components/ui/carousel'
import { Container } from '@/components/common/Container'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { heroSlides } from './hero.data'
import { HeroNavigation } from './HeroNavigation'
import { HeroSlide } from './HeroSlide'

export function Hero() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const autoplay = React.useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: false }),
    []
  )

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    onSelect()

    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="pt-20">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: 'center',
        }}
        plugins={[autoplay]}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-6">
          {heroSlides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className="basis-[90%] pl-4 sm:basis-[85%] sm:pl-6 lg:basis-[82%]"
            >
              <HeroSlide slide={slide} priority={index === 0} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Container className="hidden md:block">
        <HeroNavigation
          current={current}
          total={heroSlides.length}
          onPrevious={() => api?.scrollPrev()}
          onNext={() => api?.scrollNext()}
          onSelect={(index) => api?.scrollTo(index)}
        />
      </Container>
    </div>
  )
}
