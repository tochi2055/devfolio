"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would normally initialize analytics
    // For now, we'll just log page views to the console
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    console.log(`Page view: ${url}`)

    // You can add your analytics initialization here when ready
  }, [pathname, searchParams])

  return null
}
