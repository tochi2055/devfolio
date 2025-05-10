"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Create context
const AuthContext = createContext<{
  user: User | null
  loading: boolean
}>({
  user: null,
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Skip on server
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    // Dynamically import auth to ensure it's only loaded on the client
    const initAuth = async () => {
      try {
        // Import the auth object from our firebase.ts file
        const { auth } = await import("@/lib/firebase")

        if (!auth) {
          console.error("Auth is undefined after import")
          setLoading(false)
          return
        }

        // Set up auth state listener
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
          setUser(authUser)
          setLoading(false)
        })

        // Return unsubscribe function for cleanup
        return unsubscribe
      } catch (error) {
        console.error("Error initializing auth:", error)
        setLoading(false)
      }
    }

    // Initialize auth and store unsubscribe function
    const unsubscribePromise = initAuth()

    // Clean up on unmount
    return () => {
      unsubscribePromise.then((unsubscribe) => {
        if (unsubscribe) unsubscribe()
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
