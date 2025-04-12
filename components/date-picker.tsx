"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface DatePickerProps {
  initialDate?: Date
  className?: string
  showIcon?: boolean
}

export function DatePicker({ initialDate, className, showIcon = false }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Handle date selection - always using Irish date
  const handleSelect = async (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setIsOpen(false)

    if (selectedDate) {
      // Format the date as YYYY-MM-DD for the URL
      // We use the exact date selected in the calendar without any timezone adjustments
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const day = String(selectedDate.getDate()).padStart(2, "0")
      const formattedDate = `${year}-${month}-${day}`

      // Default to 9pm (evening draw) for better user experience
      const formattedDateWithTime = `${formattedDate}-9pm`

      router.push(`/results/${formattedDateWithTime}`)
    }
  }

  // Format the display date in Irish format
  const formatDisplayDate = (date: Date) => {
    return format(date, "PPP")
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal text-sm",
            !date && "text-muted-foreground",
            "hover:bg-blue-50 hover:text-blue-700 border-blue-200",
            className,
          )}
        >
          {showIcon && <CalendarIcon className="mr-2 h-4 w-4" />}
          {date ? formatDisplayDate(date) : <span>Select date to view results</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="center" 
        sideOffset={8}
        alignOffset={0}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          className="border rounded-md shadow-md"
        />
      </PopoverContent>
    </Popover>
  )
}
