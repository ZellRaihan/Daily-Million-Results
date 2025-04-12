"use client"

import { useState, useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Separate component to use searchParams
function ProgressBarWithParams() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let intervalId: NodeJS.Timeout
    
    const handleStart = () => {
      // Reset and show progress bar
      setProgress(0)
      setIsVisible(true)
      
      // Simulate progress incrementing
      let currentProgress = 0
      intervalId = setInterval(() => {
        // Gradually slow down as we approach 90%
        if (currentProgress < 90) {
          const increment = Math.max(1, 10 - Math.floor(currentProgress / 10))
          currentProgress = Math.min(90, currentProgress + increment)
          setProgress(currentProgress)
        }
      }, 200)
    }

    const handleComplete = () => {
      // Quickly finish the progress bar
      clearInterval(intervalId)
      setProgress(100)
      
      // Hide the progress bar after completed
      timeoutId = setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }

    document.addEventListener("navigationStart", handleStart)
    document.addEventListener("navigationComplete", handleComplete)

    return () => {
      document.removeEventListener("navigationStart", handleStart)
      document.removeEventListener("navigationComplete", handleComplete)
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [])

  // Reset when route changes
  useEffect(() => {
    setProgress(0)
    setIsVisible(false)
  }, [pathname, searchParams])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100]">
      <div 
        className="h-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 transition-all duration-200 ease-out rounded-r-full"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 0 8px rgba(59, 130, 246, 0.7)'
        }}
      />
    </div>
  )
}

// Wrap the component that uses searchParams in Suspense
export function ProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarWithParams />
    </Suspense>
  )
} 