import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Disclaimer | Daily Millions Results",
  description: "Important disclaimer information for the Daily Millions Results website including limitations of liability, external links policy, and responsible gambling guidelines.",
  keywords: "disclaimer, lottery disclaimer, Daily Millions, responsible gambling, lottery information",
  openGraph: {
    title: "Disclaimer | Daily Millions Results",
    description: "Important disclaimer information for the Daily Millions Results website including limitations of liability and responsible gambling guidelines.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/disclaimer`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/DailyMillions-OG.webp`,
        width: 1200,
        height: 630,
        alt: "Daily Millions Results Disclaimer"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer | Daily Millions Results",
    description: "Important disclaimer information for the Daily Millions Results website including limitations of liability and responsible gambling guidelines.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/DailyMillions-OG.webp`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/disclaimer`,
  },
}

export default function DisclaimerPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie";
  
  return (
    <div className="py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Disclaimer | Daily Millions Results",
            "description": "Important disclaimer information for the Daily Millions Results website",
            "url": `${siteUrl}/disclaimer`,
            "mainEntity": {
              "@type": "WebContent",
              "headline": "Disclaimer",
              "about": {
                "@type": "Thing",
                "name": "Lottery Disclaimer Information"
              },
              "datePublished": "2025-04-11T00:00:00+00:00",
              "dateModified": "2025-04-11T00:00:00+00:00"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": siteUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Disclaimer",
                  "item": `${siteUrl}/disclaimer`
                }
              ]
            }
          })
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Disclaimer", isCurrentPage: true },
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
        <h1 className="text-2xl font-bold mb-6 pb-2 border-b">Disclaimer</h1>

        <div className="prose prose-sm max-w-none">
          <p className="mb-4">
            <strong>Last Updated:</strong> April 11, 2025
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Website Disclaimer</h2>
          <p className="mb-4">
            The information provided by Daily Millions Results ("we," "us," or "our") on dailymillionsresults.com (the
            "Site") is for general informational purposes only. All information on the Site is provided in good faith,
            however we make no representation or warranty of any kind, express or implied, regarding the accuracy,
            adequacy, validity, reliability, availability, or completeness of any information on the Site.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Not Official Lottery Site</h2>
          <p className="mb-4">
            Daily Millions Results is not affiliated with, endorsed by, or in any way officially connected with any
            official lottery organization or the National Lottery. This is an independent website that provides
            information about lottery results as a service to the public.
          </p>
          <p className="mb-4">
            For official lottery information, please visit the official National Lottery website or contact your local
            lottery retailer. The official source should always be consulted for the most accurate and up-to-date
            information regarding lottery draws, prizes, and rules.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">External Links Disclaimer</h2>
          <p className="mb-4">
            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to
            or originating from third parties or links to websites and features in banners or other advertising. Such
            external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability,
            availability, or completeness by us.
          </p>
          <p className="mb-4">
            We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any
            information offered by third-party websites linked through the Site or any website or feature linked in any
            banner or other advertising. We will not be a party to or in any way be responsible for monitoring any
            transaction between you and third-party providers of products or services.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Professional Disclaimer</h2>
          <p className="mb-4">
            The Site cannot and does not contain gambling advice. The gambling information is provided for general
            informational and educational purposes only and is not a substitute for professional advice. Accordingly,
            before taking any actions based upon such information, we encourage you to consult with the appropriate
            professionals.
          </p>
          <p className="mb-4">
            We do not provide any kind of gambling advice. The use or reliance of any information contained on the Site
            is solely at your own risk.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Errors and Omissions Disclaimer</h2>
          <p className="mb-4">
            While we have made every attempt to ensure that the information contained in this site has been obtained
            from reliable sources, Daily Millions Results is not responsible for any errors or omissions, or for the
            results obtained from the use of this information.
          </p>
          <p className="mb-4">
            All information in this site is provided "as is," with no guarantee of completeness, accuracy, timeliness or
            of the results obtained from the use of this information, and without warranty of any kind, express or
            implied, including, but not limited to warranties of performance, merchantability, and fitness for a
            particular purpose.
          </p>
          <p className="mb-4">
            In no event will Daily Millions Results, its related partnerships or corporations, or the partners, agents
            or employees thereof be liable to you or anyone else for any decision made or action taken in reliance on
            the information in this Site or for any consequential, special or similar damages, even if advised of the
            possibility of such damages.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Fair Use Disclaimer</h2>
          <p className="mb-4">
            This site may contain copyrighted material the use of which has not always been specifically authorized by
            the copyright owner. We are making such material available in our efforts to provide information about
            lottery results and related topics. We believe this constitutes a "fair use" of any such copyrighted
            material as provided for in section 107 of the US Copyright Law.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Responsible Gambling</h2>
          <p className="mb-4">
            We promote responsible gambling. Gambling should be seen as a form of entertainment, not as a way to make
            money. Never gamble more than you can afford to lose. If you think you may have a gambling problem, please
            seek help from appropriate support services.
          </p>
        </div>
      </div>
    </div>
  )
}
