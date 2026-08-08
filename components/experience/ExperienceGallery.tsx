import { Container, Media, Section } from '@/components/common'

import { Experience } from '@/types/experience'

interface ExperienceGalleryProps {
  images: Experience['gallery']
}

export function ExperienceGallery({ images }: ExperienceGalleryProps) {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {images.map((image, i) => {
            const isString = typeof image === 'string'
            const src = isString ? image : image.src
            const alt = isString ? 'Experience Image' : image.alt
            const id = isString ? i : image.id

            return (
              <div
                key={id}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Media src={src} alt={alt} className="object-cover" />
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
