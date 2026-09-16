import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

import { siteConfig } from '@/config/site'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  sameAs: [
    'https://twitter.com/thetravelingmonk',
    'https://www.facebook.com/thetravelingmonk',
    'https://www.instagram.com/thetravelingmonk',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  keywords: ['travel', 'trek', 'adventure', 'getaway', 'the traveling monk'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
  },
  icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
        <body className={`${geist.variable} font-sans antialiased`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd),
            }}
          />
          <ThemeProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              <Navbar />

              <main className="flex-1">{children}</main>

              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
  )
}
