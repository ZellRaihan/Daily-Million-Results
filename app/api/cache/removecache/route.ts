import { NextResponse } from "next/server"
import { clearCache } from "@/lib/cache"

// Simple GET endpoint for cache clearing without authentication
export async function GET(request: Request) {
  try {
    // Clear all cache
    clearCache()
    
    return NextResponse.json({ 
      success: true,
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error clearing cache:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to clear cache',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 