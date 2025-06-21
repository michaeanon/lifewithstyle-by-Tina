import type { Metadata } from "next"
import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import BackToTop from "@/components/back-to-top"
import WelcomeBanner from "@/components/welcome-banner"
import IntroLoaderProvider from "@/components/intro-loader-provider"
import { ScrollToTopProvider } from "@/components/scroll-to-top-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Life with Style by Tina",
  description: "Where timeless elegance meets effortless living",
  metadataBase: new URL("https://lifewithstyle.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <IntroLoaderProvider>
            <ScrollToTopProvider>
              <div className="flex flex-col min-h-screen">
                <Navigation />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <WelcomeBanner />
              <CookieConsent />
              <BackToTop />
            </ScrollToTopProvider>
          </IntroLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
