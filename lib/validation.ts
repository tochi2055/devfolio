import type { FirestoreError } from "@/types/database"

/**
 * Validates an email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a URL format (optional protocol)
 */
export function isValidUrl(url: string): boolean {
  try {
    // If no protocol is specified, prepend https:// for validation
    const urlToValidate = url.match(/^https?:\/\//) ? url : `https://${url}`
    new URL(urlToValidate)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Validates username/slug format
 * Rules: Only letters, numbers, underscores, hyphens, 3-30 characters
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/
  return usernameRegex.test(username)
}

/**
 * Creates a consistent error object for Firestore operations
 */
export function createFirestoreError(message: string, code?: string, originalError?: unknown): FirestoreError {
  const error: FirestoreError = new Error(message) as FirestoreError
  error.name = "FirestoreError"
  if (code) error.code = code

  // Add original error details if available
  if (originalError && originalError instanceof Error) {
    error.customData = {
      originalMessage: originalError.message,
      originalName: originalError.name,
      originalStack: originalError.stack,
    }
  }

  return error
}

/**
 * Extract error message from Firebase error
 */
export function extractFirebaseErrorMessage(error: unknown): string {
  if (!error) return "An unknown error occurred"

  // Firebase errors often have a message property
  if (error instanceof Error) {
    // Parse Firebase error messages which often contain descriptive text
    const message = error.message

    // Common Firebase error messages to make user-friendly
    if (message.includes("auth/wrong-password") || message.includes("auth/user-not-found")) {
      return "Invalid email or password"
    }
    if (message.includes("auth/email-already-in-use")) {
      return "This email is already in use"
    }
    if (message.includes("auth/weak-password")) {
      return "Password is too weak"
    }
    if (message.includes("auth/popup-closed-by-user")) {
      return "Sign in was cancelled"
    }

    return error.message
  }

  // If it's a string, return it directly
  if (typeof error === "string") {
    return error
  }

  // Fallback for unexpected error formats
  return "An unknown error occurred"
}
