import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rajat Bhandari — Senior UX Designer',
  description: 'Senior UX Designer with 11+ years crafting digital products across fintech, insurance, media and real estate.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
