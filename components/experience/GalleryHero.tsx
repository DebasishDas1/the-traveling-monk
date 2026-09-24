'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Camera, Images, X } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Container, Heading } from '@/components/common'

interface GalleryHeroProps {
  images: {
    src: string
    alt: string
  }[]
  title: string
  parentHref?: string
  parentLabel?: string
}

export function GalleryHero({
  images,
  title,
  parentHref = '/experiences',
  parentLabel = 'Experiences',
}: GalleryHeroProps) {
  const [heroImage, secondaryImage, tertiaryImage] = images

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    handleSelect()
    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  if (!images.length) return null

  const openGallery = (index: number) => {
    setActiveIndex(index)
    setOpen(true)

    // Useful when the carousel is already mounted.
    requestAnimationFrame(() => {
      api?.scrollTo(index)
    })
  }

  return (
    <>
      <section className="pt-6 sm:pt-8">
        <Container>
          {/* Breadcrumb */}
          <Breadcrumb className="mb-5 sm:mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={parentHref}>{parentLabel}</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Heading */}
          <Heading title={title} size="h1" />

          {/* Editorial gallery */}
          <div
            className="
              relative
              mt-4
              grid
              h-[58svh]
              min-h-104
              max-h-180
              gap-1.5
              overflow-hidden
              rounded-[28px]
              bg-muted
              sm:mt-8
              sm:rounded-[32px]
              md:grid-cols-12
            "
          >
            {/* Main image */}
            {heroImage && (
              <GalleryImage
                image={heroImage}
                priority
                sizes="(max-width: 767px) 100vw, 66vw"
                className="md:col-span-8"
                onClick={() => openGallery(0)}
              >
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/45 to-transparent" />

                <GalleryOverlay count={images.length} />
              </GalleryImage>
            )}

            {/* Secondary images */}
            {(secondaryImage || tertiaryImage) && (
              <div className="hidden min-h-0 gap-1.5 md:col-span-4 md:grid md:grid-rows-2">
                {secondaryImage && (
                  <GalleryImage
                    image={secondaryImage}
                    sizes="33vw"
                    onClick={() => openGallery(1)}
                  />
                )}

                {tertiaryImage && (
                  <GalleryImage
                    image={tertiaryImage}
                    sizes="33vw"
                    onClick={() => openGallery(2)}
                  />
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Fullscreen gallery */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            h-dvh
            w-screen
            max-w-none
            rounded-none
            border-0
            bg-black
            p-0
            text-white
            shadow-none
            [&>button]:hidden
          "
        >
          <DialogTitle className="sr-only">{title} photo gallery</DialogTitle>

          <div className="relative flex h-full w-full flex-col">
            {/* Header */}
            <header
              className="
                absolute
                inset-x-0
                top-0
                z-20
                flex
                items-center
                justify-between
                px-5
                py-5
                sm:px-8
                sm:py-6
              "
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {title}
                </p>

                <p className="mt-0.5 text-xs text-white/45">
                  {activeIndex + 1} of {images.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close gallery"
                className="
                  flex
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  backdrop-blur-xl
                  transition
                  hover:bg-white/20
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                "
              >
                <X className="size-5" />
              </button>
            </header>

            {/* Carousel */}
            <div
              className="
                flex
                min-h-0
                flex-1
                items-center
                justify-center
                px-3
                py-20
                sm:px-14
              "
            >
              <Carousel
                setApi={setApi}
                opts={{
                  startIndex: activeIndex,
                  loop: true,
                }}
                className="w-full max-w-7xl"
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem
                      key={`${image.src}-${index}`}
                      className="
                        flex
                        h-[calc(100dvh-10rem)]
                        items-center
                        justify-center
                      "
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="100vw"
                          priority={index === activeIndex}
                          className="object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {images.length > 1 && (
                  <>
                    <CarouselPrevious
                      className="
    left-3
    size-11
    border-0
    bg-white/95
    text-black
    shadow-xl
    backdrop-blur-none
    hover:bg-white
    hover:text-black
    sm:left-5
  "
                    />

                    <CarouselNext
                      className="
    right-3
    size-11
    border-0
    bg-white/95
    text-black
    shadow-xl
    backdrop-blur-none
    hover:bg-white
    hover:text-black
    sm:right-5
  "
                    />
                  </>
                )}
              </Carousel>
            </div>

            {/* Pagination */}
            {images.length > 1 && (
              <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-5 pb-6">
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 backdrop-blur-xl">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => api?.scrollTo(index)}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={activeIndex === index}
                      className={`
                        h-1.5
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          activeIndex === index
                            ? 'w-6 bg-white'
                            : 'w-1.5 bg-white/35 hover:bg-white/60'
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Gallery image                                                               */
/* -------------------------------------------------------------------------- */

interface GalleryImageProps {
  image: {
    src: string
    alt: string
  }
  onClick: () => void
  className?: string
  sizes?: string
  priority?: boolean
  children?: React.ReactNode
}

function GalleryImage({
  image,
  onClick,
  className = '',
  sizes = '100vw',
  priority = false,
  children,
}: GalleryImageProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${image.alt}`}
      className={`
        group
        relative
        min-h-0
        overflow-hidden
        bg-muted
        text-left
        outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
        focus-visible:ring-inset
        ${className}
      `}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="
          object-cover
          object-center
          transition-transform
          duration-700
          ease-[cubic-bezier(0.2,0.65,0.3,0.9)]
          group-hover:scale-[1.025]
        "
      />

      {children}
    </button>
  )
}
/* -------------------------------------------------------------------------- */
/* Hero overlay                                                               */
/* -------------------------------------------------------------------------- */

function GalleryOverlay({ count }: { count: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
      <span
        className="
          flex
          items-center
          gap-2
          rounded-full
          bg-black/35
          px-3
          py-2
          text-xs
          font-medium
          text-white
          backdrop-blur-xl
        "
      >
        <Camera className="size-3.5" />
        {count} {count === 1 ? 'photo' : 'photos'}
      </span>

      <span
        className="
          flex
          size-10
          items-center
          justify-center
          rounded-full
          bg-white/15
          text-white
          backdrop-blur-xl
          transition
          group-hover:bg-white/25
        "
        aria-hidden="true"
      >
        <Images className="size-4" />
      </span>
    </div>
  )
}
