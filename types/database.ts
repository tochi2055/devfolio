/**
 * Type definitions for database models
 */

// User profile
export interface UserProfile {
  id: string
  name: string
  username: string // URL slug/handle
  email: string
  title?: string
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  avatarUrl?: string
  createdAt: Date | number // Timestamp
  updatedAt: Date | number // Timestamp
  isPublic: boolean
}

// Project model
export interface Project {
  id: string
  userId: string
  title: string
  description: string
  techStack: string[] // Array of technology names
  githubLink?: string
  liveLink?: string
  imageUrl?: string
  featured: boolean
  order: number // For custom ordering
  createdAt: Date | number
  updatedAt: Date | number
}

// Work experience model
export interface Experience {
  id: string
  userId: string
  company: string
  position: string
  startDate: Date | number
  endDate?: Date | number
  current: boolean
  description: string
  responsibilities: string[]
  order: number // For custom ordering
  createdAt: Date | number
  updatedAt: Date | number
}

// Portfolio settings
export interface PortfolioSettings {
  userId: string
  template: "minimal" | "creative" | "professional"
  primaryColor?: string
  customDomain?: string
  seoTitle?: string
  seoDescription?: string
  customCss?: string
  updatedAt: Date | number
}

// Custom error type for Firebase operations
export interface FirestoreError extends Error {
  code?: string
  name: string
  customData?: Record<string, any>
}

// Result of a Firebase operation
export interface FirestoreResult<T> {
  success: boolean
  data?: T
  error?: FirestoreError
}
