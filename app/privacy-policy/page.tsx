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
  title: "Privacy Policy | Daily Millions Results",
  description: "Privacy Policy and Personal Data information for Daily Millions Results website.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", isCurrentPage: true },
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
        <h1 className="text-2xl font-bold mb-6 pb-2 border-b">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none">
          <p className="mb-4">
            <strong>Last Updated:</strong> April 11, 2025
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Introduction</h2>
          <p className="mb-4">
            Welcome to Daily Millions Results. We respect your privacy and are committed to protecting your personal
            data. This privacy policy will inform you about how we look after your personal data when you visit our
            website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">The Data We Collect About You</h2>
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped
            together as follows:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time
              zone setting and location, browser plug-in types and versions, operating system and platform, and other
              technology on the devices you use to access this website.
            </li>
            <li>
              <strong>Usage Data</strong> includes information about how you use our website and services.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Personal Data</h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
            in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To provide and maintain our service, including to monitor the usage of our website.</li>
            <li>To manage your requests: To attend and manage your requests to us.</li>
            <li>
              For business transfers: We may use your information to evaluate or conduct a merger, divestiture,
              restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets.
            </li>
            <li>
              To improve our website: We may use your information to improve our website and ensure that content is
              presented in the most effective manner for you and for your device.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track the activity on our service and store certain
            information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p className="mb-4">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our service.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Data Security</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally
            lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your
            personal data to those employees, agents, contractors and other third parties who have a business need to
            know.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Your Legal Rights</h2>
          <p className="mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data,
            including the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
          </p>
          <p className="mb-4">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, you can contact us at:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>By email: privacy@dailymillionsresults.com</li>
            <li>By visiting the Contact Us page on our website</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
