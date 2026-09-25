export const siteConfig = {
  name: 'The Traveling Monk',

  description: 'Travel with old friends. Return renewed.',

  url: 'https://thetravelingmonk.in',

  navLinks: [
    {
      label: 'Experiences',
      href: '/experiences',
      subLinks: [
        {
          label: 'All Experiences',
          href: '/experiences',
        },
        {
          label: 'Trek',
          href: '/experiences/trek',
        },
        {
          label: 'Getaway',
          href: '/experiences/getaway',
        },
        {
          label: 'International',
          href: '/experiences/international',
        },
      ],
    },
    {
      label: 'Tools',
      href: '/tools',
      subLinks: [
        {
          label: 'All Tools',
          href: '/tools',
        },
        // {
        //   label: 'Monk Money',
        //   href: '/tools/monkmoney',
        // },
      ],
    },
    {
      label: 'Stories',
      href: '/stories',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
    {
      label: 'FAQ',
      href: '/faq',
    },
  ],

  cta: {
    label: 'Begin Your Reset',
    href: '/experiences',
  },
} as const

// -----------------------------------------------------------------------------
// WhatsApp
// -----------------------------------------------------------------------------

export const whatsappNumber = '7003564123'

export const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Hi, I have a question about your treks'
)}`

// -----------------------------------------------------------------------------
// Social
// -----------------------------------------------------------------------------

export const facebookLink =
  'https://www.facebook.com/profile.php?id=61589167761191'

export const instagramLink = 'https://www.instagram.com/thetravelingmonk.in'

export const youtubeLink = 'https://www.youtube.com/@travelwiththemonk'

export const twitterLink = 'https://twitter.com/thetravelingmonk'

export const linkedinLink = 'https://www.linkedin.com/company/thetravelingmonk'

export const telegramLink = 'https://t.me/thetravelingmonk'

export const threadsLink = 'https://www.threads.net/@thetravelingmonk'

export const tiktokLink = 'https://www.tiktok.com/@thetravelingmonk'

export const xLink = 'https://x.com/thetravelingmonk'
