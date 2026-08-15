import { Container, Heading, Media, Section } from '@/components/common'
import { getImage } from '@/lib/utils'

interface TrekGalleryProps {
  images: Array<string | { url: string; alt?: string }>
  title: string
}

export function TrekGallery({ images, title }: TrekGalleryProps) {
  return (
    <Section className="overflow-hidden">
      <Container>
        <Heading align="center" eyebrow="A glimpse" size="h2" title={title} />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image, index) => {
            const item = getImage(image, `${title} photo ${index + 1}`)

            if (!item) return null

            return (
              <div
                key={index}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl"
              >
                <Media
                  src={item.src}
                  alt={item.alt}
                  ratio={index % 3 === 0 ? '4/5' : '4/3'}
                />
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
