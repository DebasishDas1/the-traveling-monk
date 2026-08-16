import { Container, Heading, Media, Section } from '@/components/common'
import { getImage } from '@/lib/utils'
import type { MediaUrl } from '@/types/experience'

interface PageGalleryProps {
  images: Array<string | { src: string; alt?: string } | MediaUrl>;
  title: string;
}

export function PageGallery({ images, title }: PageGalleryProps) {
  return (
    <Section className="overflow-hidden">
      <Container>
        <Heading align="center" eyebrow="A glimpse" size="h1" title={title} />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image, index) => {
            let src: string;
            let alt: string;
            if (typeof image === 'string') {
              const resolved = getImage(image, `${title} photo ${index + 1}`);
              if (!resolved) return null;
              src = resolved.src;
              alt = resolved.alt;
            } else if ('url' in image) {
              // MediaUrl type
              src = image.url;
              alt = image.alt ?? `${title} photo ${index + 1}`;
            } else {
              // {src, alt} shape
              src = image.src;
              alt = image.alt ?? `${title} photo ${index + 1}`;
            }

            return (
              <div
                key={index}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl"
              >
                <Media src={src} alt={alt} ratio={index % 3 === 0 ? '4/5' : '4/3'} />
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  )
}
