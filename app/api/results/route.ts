import { NextResponse } from "next/server"
import { unstable_noStore } from 'next/cache'
import clientPromise from "@/lib/mongodb"
import { CACHE_KEYS, getFromCache, setCache } from "@/lib/cache"

export async function GET(request: Request) {
  // Disable Next.js cache for this API route
  unstable_noStore()
  
  try {
    console.log("API Route: Starting request processing")
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    console.log("API Route: Date parameter:", date)

    // Check cache first
    if (date) {
      const cacheKey = CACHE_KEYS.RESULTS_BY_DATE(date)
      const cachedResults = getFromCache(cacheKey)
      
      if (cachedResults) {
        console.log(`API Route: Cache hit for results on date: ${date}`)
        return NextResponse.json(cachedResults)
      }
    } else {
      const cachedResults = getFromCache(CACHE_KEYS.ALL_RESULTS)
      
      if (cachedResults) {
        console.log("API Route: Cache hit for all results")
        return NextResponse.json(cachedResults)
      }
    }

    console.log("API Route: Cache miss, fetching from database")
    const client = await clientPromise
    console.log("API Route: MongoDB client connected")
    const db = client.db("lottery_db")
    console.log("API Route: Using database:", db.databaseName)

    let query = {}
    if (date) {
      // Filter results by date
      query = {
        "standard.drawDates": {
          $regex: `^${date}`,
        },
      }
    }
    console.log("API Route: Query:", JSON.stringify(query))

    // Get results from MongoDB
    const results = await db.collection("daily_million_results").find(query).sort({ "standard.drawDates": -1 }).toArray()
    console.log("API Route: Found results count:", results.length)
    console.log("API Route: First result sample:", JSON.stringify(results[0]))

    // Cache the results
    if (date) {
      setCache(CACHE_KEYS.RESULTS_BY_DATE(date), results)
    } else {
      setCache(CACHE_KEYS.ALL_RESULTS, results, 600) // 10 minute TTL for all results
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 })
  }
}
