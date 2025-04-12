"use client"

import { useState, useEffect } from "react"
import { getCurrentIrishDate } from "@/lib/utils"

type CountdownTimerProps = {
  drawTime: "2pm" | "9pm"
  className?: string
}

export function CountdownTimer({ drawTime, className }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("Calculating...")

  useEffect(() => {
    // Set target time in Irish timezone
    const now = getCurrentIrishDate()
    const targetHour = drawTime === "2pm" ? 14 : 21

    // Create target date in Irish time
    const targetDate = new Date(now)
    targetDate.setHours(targetHour, 0, 0, 0)

    // If target time has already passed today, set it for tomorrow
    if (now.getTime() > targetDate.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1)
    }

    const calculateTimeRemaining = () => {
      const currentTime = getCurrentIrishDate()
      const diff = targetDate.getTime() - currentTime.getTime()

      if (diff <= 0) {
        setTimeRemaining("Results expected soon")
        return
      }

      // Calculate hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }

    // Calculate immediately and then set interval
    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [drawTime])

  return (
    <div className={`text-center ${className}`}>
      <div className="text-base font-mono font-semibold text-amber-700">{timeRemaining}</div>
    </div>
  )
}
