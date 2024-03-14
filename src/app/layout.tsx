import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import './globals.css'

import { ListingProvider } from './listing-context'
import Header from './ui/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Listings App',
  description: 'Simple app for listings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          <ListingProvider>
            {children}
          </ListingProvider>
        </main>
        <GoogleAnalytics gaId="G-B6WC7YZMKP" />
      </body>
    </html>
  )
}
