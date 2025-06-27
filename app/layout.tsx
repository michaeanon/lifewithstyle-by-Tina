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
  description:
    "Where timeless elegance meets effortless living - Your personal style destination for fashion inspiration, wardrobe guidance, and lifestyle content.",
  metadataBase: new URL("https://lifewithstyle.vercel.app"),
  keywords: ["fashion", "style", "lifestyle", "wardrobe", "personal styling", "fashion inspiration", "Tina"],
  authors: [{ name: "Tina" }],
  creator: "Tina",
  publisher: "Life with Style by Tina",
  icons: {
    icon: [
      { url: "/logo.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logo.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: "/logo.jpg",
    shortcut: "/logo.jpg",
  },
  openGraph: {
    title: "Life with Style by Tina",
    description: "Where timeless elegance meets effortless living",
    url: "https://lifewithstyle.vercel.app",
    siteName: "Life with Style by Tina",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Life with Style by Tina Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life with Style by Tina",
    description: "Where timeless elegance meets effortless living",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" sizes="32x32" type="image/jpeg" />
        <link rel="icon" href="/logo.jpg" sizes="16x16" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <link rel="shortcut icon" href="/logo.jpg" />
        <meta name="theme-color" content="#D4AF37" />
        <meta name="msapplication-TileColor" content="#D4AF37" />
        <meta name="msapplication-TileImage" content="/logo.jpg" />
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
