"use client"

import { useState, useEffect } from "react"
import type { FirestoreResult } from "@/types/database"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface DbResultProps<T> {
  result: FirestoreResult<T> | null
  loading: boolean
  onRetry?: () => void
  successMessage?: string
  errorPrefix?: string
  className?: string
}

export function DbResult<T>({
  result,
  loading,
  onRetry,
  successMessage = "Operation completed successfully",
  errorPrefix = "Operation failed",
  className = "",
}: DbResultProps<T>) {
  const [visible, setVisible] = useState(true)

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (result?.success) {
      timeout = setTimeout(() => {
        setVisible(false)
      }, 5000)
    } else {
      setVisible(true)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [result])

  if (!visible) {
    return null
  }

  if (loading) {
    return (
      <Alert className={`flex items-center bg-muted text-muted-foreground ${className}`}>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <AlertDescription>Processing your request...</AlertDescription>
      </Alert>
    )
  }

  if (!result) {
    return null
  }

  if (result.success) {
    return (
      <Alert className={`bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50 ${className}`}>
        <CheckCircle2 className="h-4 w-4 mr-2" />
        <AlertDescription>{successMessage}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className={`bg-destructive text-destructive-foreground ${className}`}>
      <XCircle className="h-4 w-4 mr-2" />
      <div className="flex-1">
        <AlertDescription>
          {errorPrefix}: {result.error?.message || "An unknown error occurred"}
        </AlertDescription>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-2 bg-background/20 hover:bg-background/40"
          >
            Try Again
          </Button>
        )}
      </div>
    </Alert>
  )
}
