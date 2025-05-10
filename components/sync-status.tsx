"use client"

import { useDataSync } from "@/hooks/use-data-sync"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cloud, CloudOff, RefreshCcw, AlertCircle } from "lucide-react"

export function SyncStatus() {
  const { isSyncing, syncProgress, syncError, pendingOperations, forceSynchronize } = useDataSync()

  // Don't render anything if there are no pending operations and no sync in progress
  if (pendingOperations === 0 && !isSyncing && !syncError) {
    return null
  }

  return (
    <div className="bg-muted p-3 rounded-lg shadow-sm relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {navigator.onLine ? (
            <Cloud className="h-5 w-5 text-primary mr-2" />
          ) : (
            <CloudOff className="h-5 w-5 text-muted-foreground mr-2" />
          )}
          <h3 className="font-medium text-sm">
            {isSyncing
              ? "Synchronizing your data..."
              : pendingOperations > 0
                ? `${pendingOperations} change${pendingOperations > 1 ? "s" : ""} pending`
                : "Data Synchronization"}
          </h3>
        </div>

        {pendingOperations > 0 && navigator.onLine && !isSyncing && (
          <Button variant="outline" size="sm" onClick={forceSynchronize} className="h-8">
            <RefreshCcw className="h-4 w-4 mr-1" />
            Sync Now
          </Button>
        )}
      </div>

      {isSyncing && (
        <div className="mb-2">
          <Progress value={syncProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{syncProgress}% complete</p>
        </div>
      )}

      {syncError && (
        <Alert variant="destructive" className="mt-2 py-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription className="text-xs">{syncError}</AlertDescription>
        </Alert>
      )}

      {!navigator.onLine && pendingOperations > 0 && (
        <Alert className="mt-2 py-2 bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-50">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription className="text-xs">
            You're currently offline. Changes will sync when you reconnect.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
