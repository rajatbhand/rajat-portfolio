import type { Metadata } from 'next'
import { GOOGLE_FONTS_URL } from '@/lib/theme'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rajat Bhandari — Senior UX Designer',
  description: 'Senior UX Designer with 11+ years crafting digital products across fintech, insurance, media and real estate.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
