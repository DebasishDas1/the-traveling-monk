import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Container, Heading, Media } from '@/components/common'
import Link from 'next/link'

interface TrekGalleryHeroProps {
  images: {
    src: string
    alt: string
  }[]
  title: string
  length: number
}

export const TrekGalleryHero = ({
  images,
  title,
  length,
}: TrekGalleryHeroProps) => {
  const [heroImage, secondaryImage, tertiaryImage] = images
  return (
    <div className="pt-20 md:pt-28">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/treks" />}>
                Treks
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Heading title={title} size="h1" />

        <div className="mt-6 overflow-hidden rounded-[18px]">
          <div className="grid h-85 grid-cols-1 gap-1 md:h-125 md:grid-cols-12">
            {/* Main Image */}
            <div className="relative min-h-0 overflow-hidden md:col-span-8">
              {heroImage && (
                <Media
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="h-full w-full object-cover"
                  radius="none"
                />
              )}

              {/* Gallery Count */}
              {length > 0 && (
                <div
                  className="
            absolute
            bottom-6
            right-6
            flex
            items-center
            gap-2
            rounded-full
            bg-black/80
            px-5
            py-3
            text-sm
            font-medium
            text-white
            backdrop-blur-md
          "
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <rect width="18" height="14" x="3" y="5" rx="2" />
                    <circle cx="8.5" cy="10.5" r="1.5" />
                    <path d="m21 15-5-5L5 19" />
                  </svg>

                  <span>{length.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Right Side */}
            <div className="grid min-h-0 grid-cols-2 gap-1 md:col-span-4 md:grid-cols-1 md:grid-rows-2">
              {/* Top Right */}
              {secondaryImage && (
                <div className="relative min-h-0 overflow-hidden">
                  <Media
                    src={secondaryImage.src}
                    alt={secondaryImage.alt}
                    className="h-full w-full object-cover"
                    radius="none"
                  />
                </div>
              )}

              {/* Bottom Right */}
              {tertiaryImage && (
                <div className="relative min-h-0 overflow-hidden">
                  <Media
                    src={tertiaryImage.src}
                    alt={tertiaryImage.alt}
                    className="h-full w-full object-cover"
                    radius="none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
