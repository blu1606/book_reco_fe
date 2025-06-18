import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blue Book AI - Trợ lý gợi ý sách thông minh",
  description: "AI agent chuyên gợi ý sách dựa trên sở thích và nhu cầu của bạn",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "Blue Book AI - Trợ lý gợi ý sách thông minh",
    description: "AI agent chuyên gợi ý sách dựa trên sở thích và nhu cầu của bạn",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Blue Book AI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Book AI - Trợ lý gợi ý sách thông minh",
    description: "AI agent chuyên gợi ý sách dựa trên sở thích và nhu cầu của bạn",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
