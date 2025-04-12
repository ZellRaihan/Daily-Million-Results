"use client"

import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type ServerDateSelectorProps = {
  currentDate: Date
  availableDates: string[]
  className?: string
}

export function ServerDateSelector({ currentDate, availableDates, className }: ServerDateSelectorProps) {
  const router = useRouter()
  
  // Sort dates in descending order (newest first)
  const sortedDates = [...availableDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  // Find previous and next dates
  const currentDateStr = currentDate.toISOString().split("T")[0]
  const currentIndex = sortedDates.indexOf(currentDateStr)

  const prevDate = currentIndex < sortedDates.length - 1 ? sortedDates[currentIndex + 1] : null
  const nextDate = currentIndex > 0 ? sortedDates[currentIndex - 1] : null
  
  // Handle navigation with loading state
  const handleNavigation = (date: string) => {
    // Trigger loading state
    const startEvent = new Event('navigationStart')
    document.dispatchEvent(startEvent)
    
    // Navigate to the date (append default time for consistency)
    router.push(`/results/${date}-9pm`)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {prevDate && (
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 text-xs"
          onClick={() => handleNavigation(prevDate)}
        >
          Previous
        </Button>
      )}

      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
        <CalendarIcon className="h-3 w-3" />
        <span>{formatDate(currentDate)}</span>
      </div>

      {nextDate && (
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 text-xs"
          onClick={() => handleNavigation(nextDate)}
        >
          Next
        </Button>
      )}
    </div>
  )
}
