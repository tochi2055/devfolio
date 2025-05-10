// components/ClientProviders.tsx
'use client'

import dynamic from "next/dynamic"
import { ReactNode, Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

// Dynamically import Firebase-related components (client-only)
const AuthProvider = dynamic(() =>
  import("@/components/auth-provider").then((mod) => mod.AuthProvider),
  { ssr: false }
)

const Analytics = dynamic(() =>
  import("@/lib/analytics").then((mod) => mod.Analytics),
  { ssr: false }
)

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Suspense fallback={null}>
        <AuthProvider>
          {children}
          <Analytics />
          <Toaster />
        </AuthProvider>
      </Suspense>
    </ThemeProvider>
  )
}
