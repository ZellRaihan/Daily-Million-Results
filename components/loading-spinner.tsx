"use client"

import { useState, useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"

// Separate component to use searchParams
function LoadingSpinnerWithParams() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleComplete = () => {
      setIsLoading(false)
    }

    // Add event listeners for page transitions
    document.addEventListener("navigationStart", handleStart)
    document.addEventListener("navigationComplete", handleComplete)
    
    // Capture link clicks to show loading state
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && link.href && link.href.startsWith(window.location.origin) && !link.hasAttribute('data-no-loading')) {
        setIsLoading(true)
      }
    }
    
    document.addEventListener("click", handleLinkClick)

    return () => {
      document.removeEventListener("navigationStart", handleStart)
      document.removeEventListener("navigationComplete", handleComplete)
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  // Also track pathname and searchParams changes to reset loading state
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/60 transition-all duration-300">
      <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-white shadow-2xl border border-blue-100 max-w-sm mx-auto">
        <div className="relative h-16 w-16 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/Daily-Millions-Logo.png"
              alt="Daily Millions Logo"
              width={40}
              height={40}
              className="h-10 w-auto z-10"
            />
          </div>
          <div className="absolute inset-0 animate-spin">
            <div className="h-full w-full rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-blue-700 mb-1">Loading Results</h3>
        <p className="text-center text-sm text-gray-600">
          Please wait while we fetch the latest lottery data...
        </p>
        <div className="mt-4 flex gap-1">
          <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}

// Wrap the component that uses searchParams in Suspense
export function LoadingSpinner() {
  return (
    <Suspense fallback={null}>
      <LoadingSpinnerWithParams />
    </Suspense>
  )
} 