"use client"

import Link from "next/link"
import { Mountain, AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 text-center bg-slate-50">
          {/* Error Icon */}
          <div className="mb-6 flex flex-col items-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Mountain className="h-5 w-5" />
              <span className="text-sm">Daily Millions Results</span>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Something Went Wrong</h1>
          <p className="text-gray-600 max-w-md mb-8">
            We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={reset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md max-w-md mx-auto text-left">
              <p className="text-xs font-mono text-gray-700">{error.message}</p>
              {error.stack && (
                <pre className="mt-2 text-xs font-mono text-gray-600 overflow-auto max-h-40">{error.stack}</pre>
              )}
            </div>
          )}

          {/* Additional Help */}
          <p className="text-sm text-gray-500 mt-8">
            If the problem persists, please{" "}
            <Link href="/contact-us" className="text-red-600 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </body>
    </html>
  )
}
