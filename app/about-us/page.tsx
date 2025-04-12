import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "About Us | Daily Millions Results",
  description:
    "Learn more about Daily Millions Results website and our mission to provide accurate, timely lottery information for Daily Millions and Daily Millions Plus draws.",
  keywords: "Daily Millions, lottery results, Irish lottery, about us, lottery information, Daily Millions Plus",
  openGraph: {
    title: "About Us | Daily Millions Results",
    description: "Learn more about Daily Millions Results website and our mission to provide accurate lottery information.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/about-us`,
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
    title: "About Us | Daily Millions Results",
    description: "Learn more about Daily Millions Results website and our mission to provide accurate lottery information.",
    images: ["/DailyMillions-OG.webp"]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/about-us`
  }
}

export default function AboutUsPage() {
  return (
    <div className="py-6">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About Daily Millions Results",
              "description": "Information about the Daily Millions Results website and team.",
              "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/about-us`,
              "mainEntity": {
                "@type": "Organization",
                "name": "Daily Millions Results",
                "url": process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie",
                "description": "A website dedicated to providing accurate and timely information about Daily Millions lottery results.",
                "foundingDate": "2023"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About Us",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/about-us`
                }
              ]
            }
          ])
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About Us", isCurrentPage: true },
        ]}
      />

      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
        <h1 className="text-2xl font-bold mb-6 pb-2 border-b">About Us</h1>

        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
          <p className="mb-4">
            At Daily Millions Results, our mission is to provide lottery players with accurate, timely, and
            comprehensive information about Daily Millions lottery draws. We believe in making lottery information
            accessible and easy to understand for everyone.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Who We Are</h2>
          <p className="mb-4">
            Daily Millions Results was founded in 2023 by a team of lottery enthusiasts who saw a need for a dedicated
            resource focused specifically on the Daily Millions games. Our team consists of data specialists, web
            developers, and lottery experts who work together to bring you the most reliable lottery information
            possible.
          </p>
          <p className="mb-4">
            While we are not affiliated with the official National Lottery, we take pride in our commitment to accuracy
            and reliability. Our team meticulously verifies all results and information before publishing to ensure you
            get the most accurate data.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">What We Offer</h2>
          <p className="mb-4">Our website provides a range of services to lottery players:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Up-to-date results for Daily Millions and Daily Millions Plus draws</li>
            <li>Comprehensive archive of past results</li>
            <li>Prize breakdown information for each draw</li>
            <li>Educational content about how to play Daily Millions</li>
            <li>Statistics and analysis to help players make informed choices</li>
            <li>Mobile-friendly design for checking results on the go</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">Our Values</h2>
          <p className="mb-4">At Daily Millions Results, we are guided by the following core values:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Accuracy:</strong> We are committed to providing verified and accurate lottery information.
            </li>
            <li>
              <strong>Accessibility:</strong> We believe lottery information should be easy to access and understand for
              all players.
            </li>
            <li>
              <strong>Transparency:</strong> We are clear about who we are and the services we provide.
            </li>
            <li>
              <strong>Responsible Gaming:</strong> We promote responsible lottery play and provide resources for those
              who may need support.
            </li>
            <li>
              <strong>User-Focused:</strong> We continuously improve our website based on user feedback to better serve
              our community.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">Our Commitment to Responsible Gaming</h2>
          <p className="mb-4">
            We believe that lottery games should be played for entertainment purposes only. We encourage responsible
            gaming practices and provide information about responsible gaming resources. We never suggest that lottery
            games are a way to make money or solve financial problems.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Looking Forward</h2>
          <p className="mb-4">
            As we continue to grow, we are committed to expanding our services while maintaining the high standards our
            users have come to expect. We plan to introduce new features and tools to enhance your experience with Daily
            Millions Results.
          </p>
          <p className="mb-4">
            We value your feedback and suggestions. If you have ideas about how we can improve our service or if you
            notice any issues with our website, please don't hesitate to contact us.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
          <p className="mb-4">
            We'd love to hear from you! If you have questions, suggestions, or feedback, please visit our{" "}
            <Link href="/contact-us" className="text-blue-600 hover:underline">
              Contact Us
            </Link>{" "}
            page.
          </p>
          <p className="mb-4">
            Thank you for choosing Daily Millions Results as your source for lottery information. We appreciate your
            trust and support.
          </p>
        </div>
      </div>
    </div>
  )
}
