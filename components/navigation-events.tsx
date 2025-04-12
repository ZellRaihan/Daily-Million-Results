'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Separate component to use searchParams
function NavigationEventsWithParams() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    
    // Create and dispatch custom events for navigation
    const startEvent = new Event('navigationStart')
    document.dispatchEvent(startEvent)
    
    // Use a small timeout to simulate the loading state
    // This minimum delay ensures the loader is visible even for fast connections
    // giving a consistent feel and preventing flashes
    const minLoadingTime = Math.random() * 300 + 700 // Random time between 700-1000ms
    
    const timeoutId = setTimeout(() => {
      const completeEvent = new Event('navigationComplete')
      document.dispatchEvent(completeEvent)
    }, minLoadingTime)
    
    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  return null
}

// Wrap the component that uses searchParams in Suspense
export function NavigationEvents() {
  return (
    <Suspense fallback={null}>
      <NavigationEventsWithParams />
    </Suspense>
  )
} 