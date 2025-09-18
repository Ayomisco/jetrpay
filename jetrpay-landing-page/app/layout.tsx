import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JetrPay — Stablecoin-first Crypto Payments',
  description: 'JetrPay is a stablecoin-first, blockchain-agnostic crypto payment and fiat on/off-ramp platform for Africa and beyond. Buy, sell, accept, and swap USDC and other digital assets using local fiat payment methods.',
  generator: 'JetrPay',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-gray-950 text-gray-100`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
