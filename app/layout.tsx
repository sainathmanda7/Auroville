import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
  adjustFontFallback: true,
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
  adjustFontFallback: true,
})

const geraldine = localFont({
  src: '../public/fonts/GERALDINE PERSONAL USE.ttf',
  variable: '--font-geraldine',
  display: 'swap',
})

const hiragenda = localFont({
  src: '../public/fonts/Hiragenda.ttf',
  variable: '--font-hiragenda',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://aurovillefarmstay.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Auroville Farmstay | Farmstay in Moinabad, Hyderabad',
  description:
    'A peaceful countryside farmstay in Moinabad near Hyderabad, offering comfortable rooms, private pool, open lawns, and relaxing experiences.',
  generator: 'v0.app',
  openGraph: {
    title: 'Auroville Farmstay | Farmstay in Moinabad, Hyderabad',
    description:
      'A peaceful countryside farmstay in Moinabad near Hyderabad, offering comfortable rooms, private pool, open lawns, and relaxing experiences.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Auroville Farmstay',
    images: [{ url: '/images/property.webp' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f1e8',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${geraldine.variable} ${hiragenda.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
