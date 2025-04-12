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
  title: "Terms & Conditions | Daily Millions Results",
  description: "Terms and Conditions for using the Daily Millions Results website.",
}

export default function TermsConditionsPage() {
  return (
    <div className="py-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions", isCurrentPage: true },
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
        <h1 className="text-2xl font-bold mb-6 pb-2 border-b">Terms and Conditions</h1>

        <div className="prose prose-sm max-w-none">
          <p className="mb-4">
            <strong>Last Updated:</strong> April 11, 2025
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Introduction</h2>
          <p className="mb-4">
            These terms and conditions outline the rules and regulations for the use of Daily Millions Results website.
          </p>
          <p className="mb-4">
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use Daily
            Millions Results if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">License</h2>
          <p className="mb-4">
            Unless otherwise stated, Daily Millions Results and/or its licensors own the intellectual property rights
            for all material on Daily Millions Results. All intellectual property rights are reserved. You may access
            this from Daily Millions Results for your own personal use subjected to restrictions set in these terms and
            conditions.
          </p>
          <p className="mb-4">You must not:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Republish material from Daily Millions Results</li>
            <li>Sell, rent or sub-license material from Daily Millions Results</li>
            <li>Reproduce, duplicate or copy material from Daily Millions Results</li>
            <li>Redistribute content from Daily Millions Results</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">User Comments</h2>
          <p className="mb-4">
            Parts of this website may offer an opportunity for users to post and exchange opinions and information.
            Daily Millions Results does not filter, edit, publish or review Comments prior to their presence on the
            website. Comments do not reflect the views and opinions of Daily Millions Results, its agents and/or
            affiliates. Comments reflect the views and opinions of the person who post their views and opinions.
          </p>
          <p className="mb-4">
            Daily Millions Results reserves the right to monitor all Comments and to remove any Comments which can be
            considered inappropriate, offensive or causes breach of these Terms and Conditions.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Hyperlinking to our Content</h2>
          <p className="mb-4">The following organizations may link to our Website without prior written approval:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>
              Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites
              of other listed businesses; and
            </li>
            <li>
              System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and
              charity fundraising groups which may not hyperlink to our Web site.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">Content Liability</h2>
          <p className="mb-4">
            We shall not be hold responsible for any content that appears on your Website. You agree to protect and
            defend us against all claims that is rising on your Website. No link(s) should appear on any Website that
            may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates
            the infringement or other violation of, any third party rights.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Reservation of Rights</h2>
          <p className="mb-4">
            We reserve the right to request that you remove all links or any particular link to our Website. You approve
            to immediately remove all links to our Website upon request. We also reserve the right to amend these terms
            and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be
            bound to and follow these linking terms and conditions.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Disclaimer</h2>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions
            relating to our website and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          <p className="mb-4">
            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are
            subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including
            liabilities arising in contract, in tort and for breach of statutory duty.
          </p>
          <p className="mb-4">
            As long as the website and the information and services on the website are provided free of charge, we will
            not be liable for any loss or damage of any nature.
          </p>
        </div>
      </div>
    </div>
  )
}
