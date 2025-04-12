"use server"

import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import { CACHE_KEYS, getFromCache, setCache } from "@/lib/cache"

export async function navigateToDate(formData: FormData) {
  const date = formData.get("date") as string
  if (date) {
    redirect(`/results/${date}`)
  }
}

export async function getResultsByDate(date: string): Promise<any[]> {
  try {
    // Check if results are in cache
    const cacheKey = CACHE_KEYS.RESULTS_BY_DATE(date)
    const cachedResults = getFromCache<any[]>(cacheKey)
    
    if (cachedResults) {
      console.log(`Cache hit for results on date: ${date}`)
      return cachedResults
    }
    
    console.log(`Cache miss for results on date: ${date}, fetching from database`)
    const client = await clientPromise
    const db = client.db("lottery_db")

    // Find results where the draw date matches the requested date in Irish timezone
    const results = await db
      .collection("daily_million_results")
      .find({
        "standard.drawDates": {
          $regex: `^${date}`,
        },
      })
      .toArray()
    
    // Store in cache for future requests
    setCache(cacheKey, results)
    
    return results
  } catch (error) {
    console.error("Error fetching results by date:", error)
    return []
  }
}

export async function getLatestResults(): Promise<any[]> {
  try {
    // Check if latest results are in cache
    const cachedResults = getFromCache<any[]>(CACHE_KEYS.LATEST_RESULTS)
    
    if (cachedResults) {
      console.log('Cache hit for latest results')
      return cachedResults
    }
    
    console.log('Cache miss for latest results, fetching from database')
    const client = await clientPromise
    const db = client.db("lottery_db")

    // Get all results sorted by draw date (newest first)
    const results = await db.collection("daily_million_results").find({}).sort({ "standard.drawDates": -1 }).toArray()
    
    // Store in cache for future requests (10 minute TTL for latest results)
    setCache(CACHE_KEYS.LATEST_RESULTS, results, 600)
    
    return results
  } catch (error) {
    console.error("Error fetching latest results:", error)
    return []
  }
}

export async function groupResultsByDate(results: any[]): Promise<Record<string, any[]>> {
  if (!results || !Array.isArray(results) || results.length === 0) {
    console.log("No results to group")
    return {}
  }

  try {
    return results.reduce((acc: Record<string, any[]>, result: any) => {
      if (!result || !result.standard || !result.standard.drawDates || !result.standard.drawDates[0]) {
        console.log("Invalid result item:", result)
        return acc
      }

      const drawDate = new Date(result.standard.drawDates[0])
      // Format date in Irish timezone
      const dublinDate = new Date(drawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
      const year = dublinDate.getFullYear()
      const month = String(dublinDate.getMonth() + 1).padStart(2, "0")
      const day = String(dublinDate.getDate()).padStart(2, "0")
      const dateString = `${year}-${month}-${day}`

      if (!acc[dateString]) {
        acc[dateString] = []
      }

      acc[dateString].push(result)

      // Sort by time (latest first)
      acc[dateString].sort((a: any, b: any) => {
        const timeA = new Date(a.standard.drawDates[0]).getTime()
        const timeB = new Date(b.standard.drawDates[0]).getTime()
        return timeB - timeA
      })

      return acc
    }, {})
  } catch (error) {
    console.error("Error grouping results by date:", error)
    return {}
  }
}
