import { NextResponse } from "next/server"
import { clearCache, CACHE_KEYS, deleteFromCache } from "@/lib/cache"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const apiKey = searchParams.get("key")
    const specific = searchParams.get("specific")
    
    // Check API key for security
    if (apiKey !== process.env.CACHE_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    // Clear a specific cache or the entire cache
    if (specific === 'latest') {
      deleteFromCache(CACHE_KEYS.LATEST_RESULTS)
      return NextResponse.json({ success: true, message: "Latest results cache cleared" })
    } else if (specific === 'all_results') {
      deleteFromCache(CACHE_KEYS.ALL_RESULTS)
      return NextResponse.json({ success: true, message: "All results cache cleared" })
    } else {
      // Clear entire cache
      clearCache()
      return NextResponse.json({ success: true, message: "All caches cleared" })
    }
  } catch (error) {
    console.error("Error clearing cache:", error)
    return NextResponse.json({ error: "Failed to clear cache" }, { status: 500 })
  }
} 