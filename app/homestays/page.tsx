import type { Metadata } from 'next'

import {
  Container,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'

import { feelings, destinations, gallery } from '@/lib/data/home-stays-page'
import { LocationMap } from '@/components/experience/LocationMap'
import { homestaysData } from '@/lib/data/homestays-data'
import { HomestayCard } from '@/components/experience/HomestayCard'

export const metadata: Metadata = {
  title: 'Himalayan Homestays | The Traveling Monk',
  description:
    'Himalayan homestays for adventure, stillness, friendship, and a reset from modern life.',
}

export default function HomeStaysPage() {
  return (
    <main className="overflow-hidden">
      {/* =====================================================
          HERO
      ====================================================== */}

      <Section>
        <Container>
          <MediaHeading
            eyebrow="Homestays"
            title="Stay somewhere that feels lived in."
            description="Slower journeys that connect you to the landscape, the food, and the people."
            size="display"
            imagePosition="left"
            image={
              <Media
                src="/illustrations/Alone-cuate.png"
                alt="Person sitting by the sea"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      <Container>
        {homestaysData.map((homestay) => (
          <HomestayCard key={homestay.id} experience={homestay} />
        ))}
      </Container>

      {/* =====================================================
          PHILOSOPHY
      ====================================================== */}

      <Section>
        <Container>
          <div className="mx-auto max-w-5xl">
            <Heading
              align="center"
              eyebrow="The difference"
              title="Don't just visit a place. Live in it for a while."
              description="The best travel memories rarely come from checking something off a list. They're found over tea, around a shared table, and in the quiet moments between plans."
              size="h2"
            />
          </div>

          <Media
            src="/illustrations/Sunny-day-cuate.png"
            alt="Person sitting quietly by the sea"
            ratio="16/9"
            className="mt-14 rounded-[2rem] md:mt-20"
          />
        </Container>
      </Section>

      {/* =====================================================
          STAY FOR THE FEELING
      ====================================================== */}

      <Section className="py-24 md:py-32 lg:py-40">
        <Container>
          <Heading
            align="center"
            eyebrow="Stay for the feeling"
            title="A little less doing. A little more being."
            description="Because sometimes the best part of travelling is having nowhere else to be."
            size="h2"
          />

          <div className="mt-16 grid overflow-hidden rounded-[1.75rem] bg-border gap-px md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {feelings.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="
                    flex
                    min-h-64
                    flex-col
                    items-center
                    justify-center
                    bg-primary-hover
                    p-7
                    text-center
                    text-white
                    md:min-h-72
                    md:p-8
                    lg:p-9
                  "
                >
                  <Icon aria-hidden="true" className="size-20 md:size-24" />

                  <h3 className="mt-8 text-xl font-medium tracking-[-0.03em]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/80">
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

          <div className="mt-14 grid gap-5 md:grid-cols-3">
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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <Media
              src="/illustrations/women-talking.png"
              alt="A homestay host welcoming guests"
              ratio="3/2"
              className="rounded-[1.75rem]"
            />

            <div>
              <Heading
                eyebrow="The people behind the homes"
                title="Stay with people, not properties."
                description="Our hosts aren't just there to hand you a key. They're part of the place you're travelling to. They know the paths, the stories, the food, and where to find the quiet."
                size="h2"
              />

              <blockquote className="mt-10 border-l border-primary/30 pl-5 text-lg leading-8 text-muted-foreground">
                &quot;We&apos;ve lived here all our lives. Now we get to show
                people why we never wanted to leave.&quot;
              </blockquote>

              <p className="mt-4 text-sm font-medium">
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

          <div
            className="
              mt-14
              grid
              gap-4
              md:h-170
              md:grid-cols-12
              md:grid-rows-2
            "
          >
            {/* Large image */}

            <div className="md:col-span-5 md:row-span-2">
              <Media
                src={gallery[0].src}
                alt={gallery[0].alt}
                ratio="4/5"
                className="h-full rounded-[1.75rem]"
              />
            </div>

            {/* Wide image */}

            <div className="md:col-span-7 md:row-span-1">
              <Media
                src={gallery[1].src}
                alt={gallery[1].alt}
                ratio="16/9"
                className="h-full rounded-[1.75rem]"
              />
            </div>

            {/* Two smaller images */}

            <div className="grid grid-cols-2 gap-4 md:col-span-7">
              {gallery.slice(2, 4).map((image) => (
                <Media
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  ratio="1/1"
                  className="h-full rounded-[1.75rem]"
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
