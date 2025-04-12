import { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Contact Us | Daily Millions Results",
  description: "Get in touch with the Daily Millions Results team. Send us your questions, feedback, or suggestions.",
  keywords: "contact, feedback, support, Daily Millions, lottery results",
  openGraph: {
    title: "Contact Us | Daily Millions Results",
    description: "Get in touch with the Daily Millions Results team. Send us your questions, feedback, or suggestions.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/contact-us`,
    images: [
      {
        url: "/DailyMillions-OG.webp",
        width: 1200,
        height: 630,
        alt: "Daily Millions Results"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Daily Millions Results",
    description: "Get in touch with our team. We'd love to hear from you!",
    images: ["/DailyMillions-OG.webp"]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/contact-us`
  }
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 