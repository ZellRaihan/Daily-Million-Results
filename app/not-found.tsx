"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mountain, Search, Home, ArrowLeft, History } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 text-center">
      {/* Error Code and Icon */}
      <div className="mb-6 flex flex-col items-center">
        <div className="bg-blue-50 p-4 rounded-full mb-4">
          <Search className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-7xl font-bold text-blue-600 mb-2">404</h1>
        <div className="flex items-center gap-2 text-gray-500">
          <Mountain className="h-5 w-5" />
          <span className="text-sm">Daily Millions Results</span>
        </div>
      </div>

      {/* Error Message */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>

      {/* Suggestions */}
      <div className="bg-white rounded-lg border p-6 max-w-md mb-8 w-full">
        <h3 className="font-semibold text-gray-800 mb-4">You might be looking for:</h3>
        <ul className="space-y-3">
          <li>
            <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <Home className="h-4 w-4" />
              <span>Latest Daily Millions Results</span>
            </Link>
          </li>
          <li>
            <Link
              href="/results/history"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <History className="h-4 w-4" />
              <span>Complete Results History</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <Button className="gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
            <Home className="h-4 w-4" />
            Go to Homepage
          </Button>
        </Link>
        <Button variant="outline" className="gap-2 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-200" onClick={handleGoBack}>
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>

      {/* Additional Help */}
      <p className="text-sm text-gray-500 mt-8">
        If you believe this is an error, please{" "}
        <Link href="/contact-us" className="text-blue-600 hover:underline">
          contact us
        </Link>
        .
      </p>
    </div>
  )
}
