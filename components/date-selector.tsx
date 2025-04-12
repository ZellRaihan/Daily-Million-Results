"use client"

import * as React from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateSelectorProps {
  className?: string
  initialDate?: Date
}

export function DateSelector({ className, initialDate }: DateSelectorProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate || undefined)
  const router = useRouter()

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      // Format the date as YYYY-MM-DD for the URL
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      router.push(`/results/${formattedDate}`)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal text-sm relative",
            !date && "text-muted-foreground",
            className,
          )}
        >
          {date ? format(date, "PPP") : <span>Select date to view results</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50" align="start">
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
