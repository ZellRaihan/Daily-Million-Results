import { NextResponse } from "next/server"
import { clearCache, getFromCache, deleteFromCache, getCacheStats, CACHE_KEYS } from "@/lib/cache"

// Set API key in .env.local for security
const API_KEY = process.env.CACHE_API_KEY || 'default-dev-key'

// Helper function to check API key
function validateApiKey(request: Request): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const providedKey = authHeader.substring(7)
  return providedKey === API_KEY
}

// GET cache statistics
export async function GET(request: Request) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const stats = getCacheStats()
  return NextResponse.json({ stats })
}

// DELETE to clear cache
export async function DELETE(request: Request) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  
  try {
    // If key is provided, clear specific key
    if (key) {
      // Handle special cases for dynamic keys
      if (key.startsWith('results_by_date_')) {
        const date = key.replace('results_by_date_', '')
        const cacheKey = CACHE_KEYS.RESULTS_BY_DATE(date)
        const deleted = deleteFromCache(cacheKey)
        return NextResponse.json({ 
          message: `Cache key deleted: ${cacheKey}`,
          deleted: deleted > 0
        })
      }
      
      // Handle standard keys
      const deleted = deleteFromCache(key)
      return NextResponse.json({ 
        message: `Cache key deleted: ${key}`,
        deleted: deleted > 0
      })
    }
    
    // Clear all cache
    clearCache()
    return NextResponse.json({ 
      message: 'All cache cleared successfully' 
    })
  } catch (error) {
    console.error('Error clearing cache:', error)
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 })
  }
} 