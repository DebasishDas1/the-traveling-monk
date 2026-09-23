import Link from 'next/link'

import {
  facebookLink,
  instagramLink,
  whatsappLink,
  youtubeLink,
} from '@/config/site'

import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from '@/components/myIcons'

const footerGroups = [
  {
    title: 'Explore',
    links: [
      { name: 'Experiences', href: '/experiences' },
      { name: 'Treks', href: '/experiences/trek' },
      { name: 'Getaways', href: '/experiences/getaway' },
      { name: 'International', href: '/experiences/international' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'Stories', href: '/stories' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
] as const

const socials = [
  {
    label: 'Instagram',
    href: instagramLink,
    icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    href: facebookLink,
    icon: FacebookIcon,
  },
  {
    label: 'YouTube',
    href: youtubeLink,
    icon: YouTubeIcon,
  },
  {
    label: 'WhatsApp',
    href: whatsappLink,
    icon: WhatsAppIcon,
  },
] as const

function FooterGroup({
  title,
  links,
}: {
  title: string
  links: readonly {
    name: string
    href: string
  }[]
}) {
  return (
    <div className="space-y-5">
      <h3 className="eyebrow text-primary">
        {title}
      </h3>

      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="group inline-flex text-sm text-foreground/65 transition-colors duration-200 hover:text-foreground"
            >
              <span className="relative">
                {link.name}

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-0
                    bg-accent
                    transition-[width]
                    duration-300
                    ease-out
                    group-hover:w-full
                  "
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="container-app">
        {/* Main footer */}
        <div className="grid gap-16 py-16 md:gap-20 md:py-20 lg:grid-cols-[2fr_1fr_1fr] lg:py-24">
          {/* Brand */}

          <div className="space-y-8">
            <div className="space-y-5">
              <Link
                href="/"
                className="
                  inline-block
                  text-3xl
                  font-semibold
                  tracking-[-0.03em]
                  text-foreground
                  transition-opacity
                  hover:opacity-75
                  md:text-4xl
                "
              >
                The Traveling Monk
              </Link>

              <p className="text-lg leading-8 text-muted-foreground">
                Travel with old friends.
                <br />
                Return renewed.
              </p>
            </div>

            {/* Socials */}

            <div className="flex gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    group
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-border
                    bg-background
                    transition-[background-color,border-color,transform]
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-primary
                    hover:bg-primary
                  "
                >
                  <Icon
                    className="
                      size-4.5
                      text-foreground/65
                      transition-colors
                      duration-200
                      group-hover:text-primary-foreground
                    "
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}

          {footerGroups.map((group) => (
            <FooterGroup
              key={group.title}
              title={group.title}
              links={group.links}
            />
          ))}
        </div>

        {/* Bottom */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-t
            border-border/60
            py-7
            text-sm
            text-muted-foreground
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span>© {year} The Traveling Monk</span>

            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>

          <p className="tracking-wide">
            Made with purpose in the Himalayas.
          </p>
        </div>
      </div>
    </footer>
  )
}