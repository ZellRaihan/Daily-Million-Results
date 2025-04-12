import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"

type ServerDateSelectorProps = {
  currentDate: Date
  availableDates: string[]
  className?: string
}

export function ServerDateSelector({ currentDate, availableDates, className }: ServerDateSelectorProps) {
  // Sort dates in descending order (newest first)
  const sortedDates = [...availableDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  // Find previous and next dates
  const currentDateStr = currentDate.toISOString().split("T")[0]
  const currentIndex = sortedDates.indexOf(currentDateStr)

  const prevDate = currentIndex < sortedDates.length - 1 ? sortedDates[currentIndex + 1] : null
  const nextDate = currentIndex > 0 ? sortedDates[currentIndex - 1] : null

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {prevDate && (
        <Link href={`/results/${prevDate}`}>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Previous
          </Button>
        </Link>
      )}

      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
        <CalendarIcon className="h-3 w-3" />
        <span>{formatDate(currentDate)}</span>
      </div>

      {nextDate && (
        <Link href={`/results/${nextDate}`}>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Next
          </Button>
        </Link>
      )}
    </div>
  )
}
