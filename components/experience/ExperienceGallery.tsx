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
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Media src={image.src} alt={image.alt} className="object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
