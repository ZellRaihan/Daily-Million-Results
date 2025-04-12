import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Always use Irish timezone for all date formatting
export function formatDate(date: Date): string {
  // Format date using Irish locale and timezone
  return date.toLocaleDateString("en-IE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Dublin",
  })
}

export function formatShortDate(date: Date): string {
  // Format short date using Irish locale and timezone
  return date.toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Dublin",
  })
}

export function getDrawType(date: Date): "Afternoon" | "Evening" {
  // Get hours in Irish time
  const dublinDate = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
  return dublinDate.getHours() < 18 ? "Afternoon" : "Evening"
}

export function getAvailableDates(data: any[]): string[] {
  const uniqueDates = new Set<string>()

  data.forEach((item) => {
    const date = new Date(item.standard.drawDates[0])
    // Format date in Irish timezone
    const dublinDate = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
    uniqueDates.add(dublinDate.toISOString().split("T")[0])
  })

  return Array.from(uniqueDates)
}

export function formatTimeForUrl(date: Date): string {
  // Get time in Irish timezone
  const dublinDate = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
  const hour = dublinDate.getHours()
  const ampm = hour >= 12 ? "pm" : "am"
  const hour12 = hour % 12 || 12 // Convert 0 to 12 for 12am
  return `${hour12}${ampm}`
}

export function formatDateWithTimeForUrl(date: Date): string {
  // Get date in Irish timezone
  const dublinDate = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
  const year = dublinDate.getFullYear()
  const month = String(dublinDate.getMonth() + 1).padStart(2, "0")
  const day = String(dublinDate.getDate()).padStart(2, "0")
  const dateStr = `${year}-${month}-${day}`
  const timeStr = formatTimeForUrl(date)
  return `${dateStr}-${timeStr}`
}

// Helper function to get Irish time representation
export function getIrishTime(date: Date): string {
  return date.toLocaleTimeString("en-IE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Dublin",
  })
}

// Convert any date to Irish date (Dublin timezone)
export function getIrishDate(date: Date): Date {
  const irishTimeString = date.toLocaleString("en-US", { timeZone: "Europe/Dublin" })
  return new Date(irishTimeString)
}

// Get current date and time in Irish timezone
export function getCurrentIrishDate(): Date {
  const now = new Date()
  return getIrishDate(now)
}

// Check if a specific draw time has passed for today in Irish time
export function hasDrawTimePassed(drawHour: number): boolean {
  const now = getCurrentIrishDate()
  const currentHour = now.getHours()
  return currentHour >= drawHour
}

// Check if today's 2pm draw has passed
export function hasAfternoonDrawPassed(): boolean {
  return hasDrawTimePassed(14) // 14 = 2pm in 24-hour format
}

// Check if today's 9pm draw has passed
export function hasEveningDrawPassed(): boolean {
  return hasDrawTimePassed(21) // 21 = 9pm in 24-hour format
}

// Format date as YYYY-MM-DD in Irish timezone
export function formatIrishDateForApi(date: Date): string {
  const dublinDate = getIrishDate(date)
  const year = dublinDate.getFullYear()
  const month = String(dublinDate.getMonth() + 1).padStart(2, "0")
  const day = String(dublinDate.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// For testing purposes - force the "Coming Soon" state
export function forceComingSoonState(): boolean {
  // Set to false in production
  return false
}
