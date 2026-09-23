import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  Container,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'

import { feelings, destinations, gallery } from '@/lib/data/getaway-page'
import { getawaysData } from '@/lib/data/getaway-data'
import { GetawayCard } from '@/components/experience/GetawayCard'
import { PageGallery } from '@/components/experience/PageGallery'

/**
 * Maps are not part of the critical rendering path.
 * Load them separately so their JavaScript does not affect
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
        className="aspect-4/3 w-full animate-pulse rounded-3xl bg-muted"
        aria-hidden="true"
      />
    ),
  }
)

export const metadata: Metadata = {
  title: 'Himalayan Getaways | The Traveling Monk',
  description:
    'Stay with local hosts in the Himalayas. Discover peaceful getaways, local food, mountain culture, and slower journeys with The Traveling Monk.',

  alternates: {
    canonical: '/getaways',
  },

  openGraph: {
    title: 'Himalayan Getaways | The Traveling Monk',
    description:
      'Stay with local hosts in the Himalayas and experience the mountains at a slower pace.',
    type: 'website',
    url: '/getaways',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Himalayan Getaways | The Traveling Monk',
    description:
      'Stay with local hosts in the Himalayas and experience the mountains at a slower pace.',
  },
}

export default function GetawaysPage() {
  return (
    <main>
      {/* =====================================================
          HERO
      ====================================================== */}

      <Container>
        <MediaHeading
          eyebrow="Himalayan Getaways"
          title="Stay somewhere that feels lived in."
          description="Slower journeys that connect you to the landscape, the food, and the people."
          size="display"
          imagePosition="left"
          image={
            <Media
              src="/illustrations/Alone-cuate.png"
              alt="Traveller enjoying a quiet moment during a Himalayan getaway"
              ratio="1/1"
              radius="xl"
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          }
        />
      </Container>

      {/* =====================================================
          GETAWAYS
      ====================================================== */}

      <Section className="bg-surface-secondary">
        <Container>
          <Heading
            eyebrow="Choose your pace"
            title="Places worth slowing down for."
            description="Stay a little longer. Wake up without an alarm. Let the day figure itself out."
            size="h2"
          />

          <div className="mt-3 grid gap-5 md:grid-cols-2 lg:gap-6 lg:gap-y-8 ">
            {getawaysData.map((getaway) => (
              <GetawayCard key={getaway.id} experience={getaway} />
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          PHILOSOPHY
      ====================================================== */}

      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="lg:col-span-5">
              <Heading
                eyebrow="The difference"
                title="Don't just visit a place. Live in it for a while."
                description="The best travel memories rarely come from checking something off a list. They're found over tea, around a shared table, and in the quiet moments between plans."
                size="h2"
              />

              <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                <span className="h-px w-8 bg-accent" />
                <span>Take it slow</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Media
                src="/illustrations/Sunny-day-cuate.png"
                alt="Traveller relaxing during a peaceful mountain stay"
                ratio="16/9"
                radius="xl"
                sizes="(max-width: 1023px) 100vw, 58vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          STAY FOR THE FEELING
      ====================================================== */}

      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
                Stay for the feeling
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                A little less doing.
                <span className="block text-primary-foreground/55">
                  A little more being.
                </span>
              </h2>

              <p className="mt-5 text-base leading-7 text-primary-foreground/70">
                Because sometimes the best part of traveling is having nowhere
                else to be.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl bg-primary-foreground/10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
              {feelings.map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="
                      group
                      flex min-h-56 flex-col
                      justify-between
                      bg-primary
                      p-6
                      transition-colors
                      duration-300
                      hover:bg-primary-hover
                      sm:min-h-60
                    "
                  >
                    <div className="flex flex-col items-start justify-between">
                      <span className="text-3xl font-semibold tracking-tight text-primary-foreground/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="mt-5 text-primary-foreground/70 ">
                        <Icon aria-hidden="true" className="size-16" />
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-primary-foreground/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          DESTINATIONS
      ====================================================== */}

      <Section className="bg-surface-secondary">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Heading
                  eyebrow="Places we call home"
                  title="Go where the pace is different."
                  description="Discover stays across landscapes that invite you to slow down."
                  size="h2"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2">
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
          </div>
        </Container>
      </Section>

      {/* =====================================================
          HOST STORY
      ====================================================== */}

      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="lg:col-span-7">
              <Media
                src="/illustrations/women-talking.png"
                alt="Getaway host welcoming travellers"
                ratio="3/2"
                radius="xl"
                sizes="(max-width: 1023px) 100vw, 58vw"
              />
            </div>

            <div className="lg:col-span-5">
              <Heading
                eyebrow="The people behind the homes"
                title="Stay with people, not properties."
                description="Our hosts aren't just there to hand you a key. They're part of the place you're travelling to. They know the paths, the stories, the food, and where to find the quiet."
                size="h2"
              />

              <div className="mt-8 border-l-2 border-accent/40 pl-5">
                <blockquote className="text-lg leading-8 tracking-[-0.01em] text-foreground">
                  &quot;We&apos;ve lived here all our lives. Now we get to show
                  people why we never wanted to leave.&quot;
                </blockquote>

                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  A host from the Himalayas
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          GALLERY
      ====================================================== */}

      {gallery.length > 0 && (
        <Section className="bg-surface-secondary">
          <Container>
            <PageGallery
              images={gallery}
              title="Come for the mountains. Remember the moments."
            />
          </Container>
        </Section>
      )}
    </main>
  )
}
