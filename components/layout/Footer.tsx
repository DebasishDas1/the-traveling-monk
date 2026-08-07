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
      { name: 'Treks', href: '/treks' },
      { name: 'Homestays', href: '/homestays' },
      { name: 'International', href: '/international' },
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
    <div className="space-y-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {title}
      </h3>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="group inline-flex text-small text-foreground/65 transition-colors hover:text-foreground"
            >
              <span className="relative">
                {link.name}

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
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
    <footer className="border-t border-border/40 bg-background">
      <div className="container-app">
        <div className="grid gap-24 py-24 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}

          <div className="space-y-10">
            <div className="space-y-6">
              <Link
                href="/"
                className="inline-block text-4xl font-medium tracking-tight"
              >
                The Traveling Monk
              </Link>
              <div className="text-xl leading-relaxed text-foreground/65">
                Travel with old friends.
                <br />
                Return renewed.
              </div>
            </div>

            <div className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    flex
                    size-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-border
                    transition-all
                    duration-300
                    hover:border-primary
                    hover:bg-primary/5
                  "
                >
                  <Icon className="size-5 text-foreground/70" />
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

        <div className="flex flex-col gap-6 border-t border-border/40 py-8 text-sm text-foreground/55 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-6">
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

          <p className="tracking-wide">Made with purpose in the Himalayas.</p>
        </div>
      </div>
    </footer>
  )
}
