'use client'

import { useState, useEffect, useCallback } from 'react'

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)
  
  // Function to trigger loading state manually
  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])
  
  // Function to stop loading state manually
  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])
  
  useEffect(() => {
    // Listen for navigation events
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)
    
    document.addEventListener('navigationStart', handleStart)
    document.addEventListener('navigationComplete', handleComplete)
    
    return () => {
      document.removeEventListener('navigationStart', handleStart)
      document.removeEventListener('navigationComplete', handleComplete)
    }
  }, [])
  
  return {
    isLoading,
    startLoading,
    stopLoading
  }
} 