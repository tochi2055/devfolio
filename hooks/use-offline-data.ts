"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook for offline data caching and synchronization
 */
export function useOfflineData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: {
    ttl?: number // Time to live in milliseconds (default: 1 hour)
    retryOnOnline?: boolean // Whether to retry fetching when back online
  },
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [isOffline, setIsOffline] = useState<boolean>(false)

  // Default options
  const { ttl = 3600000, retryOnOnline = true } = options || {}

  // Load data from cache if available
  useEffect(() => {
    const loadFromCache = async () => {
      try {
        if (typeof window === "undefined" || !window.localStorage) {
          return false
        }

        const cachedData = localStorage.getItem(`cache_${key}`)
        if (!cachedData) {
          return false
        }

        const { data: parsedData, timestamp } = JSON.parse(cachedData)

        // Check if cache is expired
        const now = Date.now()
        if (now - timestamp > ttl) {
          // Cache expired
          localStorage.removeItem(`cache_${key}`)
          return false
        }

        // Use cached data
        setData(parsedData)
        setLoading(false)
        return true
      } catch (err) {
        console.error("Error loading from cache:", err)
        return false
      }
    }

    // Initial load
    loadFromCache().then((cacheLoaded) => {
      if (!cacheLoaded) {
        fetchData()
      }
    })
  }, [key, ttl])

  // Setup online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      if (retryOnOnline && error) {
        fetchData()
      }
    }

    const handleOffline = () => {
      setIsOffline(true)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)
      setIsOffline(!navigator.onLine)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [error, retryOnOnline])

  // Fetch data function
  const fetchData = async () => {
    if (isOffline) {
      setError(new Error("You are offline. Using cached data if available."))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetchFn()
      setData(result)

      // Save to cache
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(
          `cache_${key}`,
          JSON.stringify({
            data: result,
            timestamp: Date.now(),
          }),
        )
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      setError(err instanceof Error ? err : new Error\
      console.error("Error fetching data:", err)
      setError(err instanceof Error ? err : new Error("Failed to fetch data"))
    } finally {
      setLoading(false)
    }
  }

  // Refresh data function
  const refresh = () => {
    fetchData()
  }

  return { data, loading, error, isOffline, refresh }
}
