import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "JetrPay - Powering the Next Generation of Borderless Payments",
  description:
    "JetrPay is a seamless fiat-to-stablecoin payment platform built on the Flow blockchain, enabling instant, secure, and affordable cross-border payments with USDC.",
  generator: "v0.app",
  keywords: ["stablecoin", "payments", "blockchain", "Flow", "USDC", "cross-border", "fintech", "Africa"],
  authors: [{ name: "JetrPay" }],
  openGraph: {
    title: "JetrPay - Borderless Stablecoin Payments",
    description: "Seamless fiat-to-stablecoin payments on Flow blockchain",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
