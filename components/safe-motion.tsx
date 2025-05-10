"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { HTMLMotionProps } from "framer-motion"

// Define types for our safe motion components
type SafeMotionComponent = React.FC<HTMLMotionProps<any> & { children?: React.ReactNode }>
type MotionLibrary = {
  motion?: {
    div?: any
    [key: string]: any
  }
}

/**
 * Custom hook to safely load and use Framer Motion
 * Handles errors gracefully and provides fallbacks
 */
export function useSafeMotion() {
  const [motionLib, setMotionLib] = useState<MotionLibrary | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    // Dynamically import Framer Motion with error handling
    const loadMotion = async () => {
      try {
        // Dynamic import with error handling
        const framerMotionModule = await import("framer-motion").catch((err) => {
          console.error("Failed to load framer-motion:", err)
          return null
        })

        // Check if component is still mounted
        if (!isMounted) return

        // Validate the imported module
        if (
          framerMotionModule &&
          typeof framerMotionModule === "object" &&
          framerMotionModule.motion &&
          typeof framerMotionModule.motion === "object"
        ) {
          setMotionLib(framerMotionModule)
          setIsLoaded(true)
        } else {
          console.error("Framer Motion loaded but motion object is not available")
          setHasError(true)
        }
      } catch (error) {
        // Handle any unexpected errors
        if (isMounted) {
          console.error("Error loading Framer Motion:", error)
          setHasError(true)
        }
      }
    }

    loadMotion()

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false
    }
  }, [])

  /**
   * Creates a safe motion div component that falls back to a regular div if motion isn't available
   */
  const SafeMotionDiv: SafeMotionComponent = (props) => {
    if (!isLoaded || hasError || !motionLib || !motionLib.motion || typeof motionLib.motion.div !== "function") {
      // Fallback to regular div if motion isn't available
      // Extract animation props that aren't valid for regular divs
      const {
        initial,
        animate,
        exit,
        transition,
        variants,
        whileHover,
        whileTap,
        whileFocus,
        whileDrag,
        whileInView,
        ...validDivProps
      } = props

      return <div {...validDivProps} />
    }

    // Use motion.div if available
    try {
      const MotionDiv = motionLib.motion.div
      return <MotionDiv {...props} />
    } catch (error) {
      console.error("Error rendering motion div:", error)
      // Extract animation props for fallback
      const {
        initial,
        animate,
        exit,
        transition,
        variants,
        whileHover,
        whileTap,
        whileFocus,
        whileDrag,
        whileInView,
        ...validDivProps
      } = props
      return <div {...validDivProps} />
    }
  }

  return {
    isLoaded,
    hasError,
    SafeMotionDiv,
  }
}

/**
 * A safe motion div component that can be used as a drop-in replacement for motion.div
 * Falls back to a regular div if Framer Motion is unavailable
 */
export function SafeMotionDiv(props: HTMLMotionProps<"div"> & { children?: React.ReactNode }) {
  const { SafeMotionDiv: MotionDiv } = useSafeMotion()
  return <MotionDiv {...props} />
}

/**
 * Export a safe version of the motion object
 * This provides a type-safe way to access motion components
 */
export const safeMotion = {
  div: SafeMotionDiv,
}
