import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  Container,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'

import { feelings, destinations, gallery } from '@/lib/data/home-stays-page'

import { homestaysData } from '@/lib/data/homestays-data'
import { HomeStayCard } from '@/components/experience/HomeStayCard'

/**
 * Maps are not part of the critical rendering path.
 * Load them separately so their JavaScript doesn't affect
 * the initial page load.
 */
const LocationMap = dynamic(
  () =>
    import('@/components/experience/LocationMap').then(
      (module) => module.LocationMap
    ),
  {
    loading: () => (
      <div
        className="aspect-4/3 w-full animate-pulse rounded-xl bg-muted"
        aria-hidden="true"
      />
    ),
  }
)

export const metadata: Metadata = {
  title: 'Himalayan Homestays | The Traveling Monk',
  description:
    'Stay with local hosts in the Himalayas. Discover peaceful homestays, local food, mountain culture, and slower journeys with The Traveling Monk.',

  alternates: {
    canonical: '/homestays',
  },

  openGraph: {
    title: 'Himalayan Homestays | The Traveling Monk',
    description:
      'Stay with local hosts in the Himalayas and experience the mountains at a slower pace.',
    type: 'website',
    url: '/homestays',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Himalayan Homestays | The Traveling Monk',
    description:
      'Stay with local hosts in the Himalayas and experience the mountains at a slower pace.',
  },
}

export default function HomeStaysPage() {
  return (
    <main>
      {/* =====================================================
          HERO
      ====================================================== */}

      <Section>
        <Container>
          <MediaHeading
            eyebrow="Himalayan Homestays"
            title="Stay somewhere that feels lived in."
            description="Slower journeys that connect you to the landscape, the food, and the people."
            size="display"
            imagePosition="left"
            image={
              <Media
                src="/illustrations/Alone-cuate.png"
                alt="Traveller enjoying a quiet moment during a Himalayan homestay"
                ratio="1/1"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* =====================================================
          HOMESTAYS
      ====================================================== */}

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 grid-cols-1">
            {homestaysData.map((homestay) => (
              <HomeStayCard key={homestay.id} experience={homestay} />
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          PHILOSOPHY
      ====================================================== */}

      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="The difference"
            title="Don't just visit a place. Live in it for a while."
            description="The best travel memories rarely come from checking something off a list. They're found over tea, around a shared table, and in the quiet moments between plans."
            size="h2"
          />

          <Media
            src="/illustrations/Sunny-day-cuate.png"
            alt="Traveller relaxing during a peaceful mountain stay"
            ratio="16/9"
            className="mt-12 md:mt-16"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </Container>
      </Section>

      {/* =====================================================
          STAY FOR THE FEELING
      ====================================================== */}

      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="Stay for the feeling"
            title="A little less doing. A little more being."
            description="Because sometimes the best part of travelling is having nowhere else to be."
            size="h2"
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {feelings.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="
                    flex min-h-60 flex-col items-center justify-center
                    bg-primary-hover p-7 text-center text-white
                    md:min-h-64
                  "
                >
                  <Icon aria-hidden="true" className="size-16 md:size-20" />

                  <h3 className="mt-6 text-xl font-medium tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/80">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          DESTINATIONS
      ====================================================== */}

      <Section>
        <Container>
          <Heading
            eyebrow="Places we call home"
            title="Go where the pace is different."
            description="Discover stays across landscapes that invite you to slow down."
            size="h2"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {destinations.map((destination) => (
              <LocationMap
                key={destination.name}
                geoLocation={destination.geoLocation}
                name={destination.name}
                description={destination.description}
                size="h3"
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          HOST STORY
      ====================================================== */}

      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Media
              src="/illustrations/women-talking.png"
              alt="Homestay host welcoming travellers"
              ratio="3/2"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div>
              <Heading
                eyebrow="The people behind the homes"
                title="Stay with people, not properties."
                description="Our hosts aren't just there to hand you a key. They're part of the place you're travelling to. They know the paths, the stories, the food, and where to find the quiet."
                size="h2"
              />

              <blockquote className="mt-8 border-l border-primary/30 pl-5 text-lg leading-8 text-muted-foreground">
                &quot;We&apos;ve lived here all our lives. Now we get to show
                people why we never wanted to leave.&quot;
              </blockquote>

              <p className="mt-3 text-sm font-medium">
                A host from the Himalayas
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          GALLERY
      ====================================================== */}

      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="The feeling"
            title="Come for the mountains. Remember the moments."
            size="h2"
          />

          <div className="mt-12 grid gap-3 md:h-168 md:grid-cols-12 md:grid-rows-2">
            {/* Large */}
            <div className="md:col-span-5 md:row-span-2">
              <Media
                src={gallery[0].src}
                alt={gallery[0].alt}
                ratio="4/5"
                className="h-full"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>

            {/* Wide */}
            <div className="md:col-span-7">
              <Media
                src={gallery[1].src}
                alt={gallery[1].alt}
                ratio="16/9"
                className="h-full"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>

            {/* Small */}
            <div className="grid grid-cols-2 gap-3 md:col-span-7">
              {gallery.slice(2, 4).map((image) => (
                <Media
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  ratio="1/1"
                  className="h-full"
                  sizes="(max-width: 768px) 50vw, 29vw"
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
