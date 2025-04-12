import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import Image from "next/image"
import { MobileMenu } from "@/components/mobile-menu"
import { LoadingSpinner } from "@/components/loading-spinner"
import { NavigationEvents } from "@/components/navigation-events"
import { ProgressBar } from "@/components/progress-bar"
import type { Metadata, Viewport } from "next"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.ico"
      }
    ]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default"
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/DailyMillions-OG.webp`,
        width: 1200,
        height: 630,
        alt: "Daily Millions Results"
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingSpinner />
          <NavigationEvents />
          <ProgressBar />
          <div className="flex min-h-screen flex-col bg-white">
            <header className="sticky top-0 z-10 bg-white shadow-sm">
              <div className="mx-auto max-w-[1200px] px-4 flex h-14 items-center">
                <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
                  <Image
                    src="/Daily-Millions-Logo.png"
                    alt="Daily Millions Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                  <span>Daily Millions</span>
                </Link>
                {/* Desktop Navigation */}
                <nav className="ml-auto hidden md:flex gap-6">
                  <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                    Home
                  </Link>
                  <Link href="/results/history" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                    History
                  </Link>
                  <Link href="/about-us" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                    About
                  </Link>
                  <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                    FAQ
                  </Link>
                </nav>
                {/* Mobile Menu */}
                <MobileMenu />
              </div>
            </header>
            <main className="flex-1 py-4 bg-white text-gray-900">
              <div className="mx-auto max-w-[1200px] px-4">{children}</div>
            </main>
            <footer className="bg-gray-50 border-t py-8">
              <div className="mx-auto max-w-[1200px] px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center">
                  <div className="flex flex-col items-center">
                    <h3 className="font-semibold mb-3 text-gray-900">Daily Millions Results</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Your source for the latest Daily Millions lottery results and information.
                    </p>
                    <div className="flex items-center">
                      <Link href="/" className="flex items-center gap-2">
                        <Image
                          src="/Daily-Millions-Logo.png"
                          alt="Daily Millions Logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto"
                          loading="lazy"
                        />
                        <span className="font-semibold text-gray-900">Daily Millions</span>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">Quick Links</h3>
                    <ul className="space-y-2 text-sm flex flex-col items-center">
                      <li>
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/results/history" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Results History
                        </Link>
                      </li>
                      <li>
                        <Link href="/about-us" className="text-gray-700 hover:text-blue-600 transition-colors">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact-us" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">Legal</h3>
                    <ul className="space-y-2 text-sm flex flex-col items-center">
                      <li>
                        <Link href="/privacy-policy" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-conditions" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <Link href="/disclaimer" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Disclaimer
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t text-center">
                  <p className="text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} Daily Million Results. All rights reserved.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    This is a results website. Not affiliated with the official lottery.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}