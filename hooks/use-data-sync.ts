"use client"

import { useState, useEffect } from "react"
import { getPendingOperations, removeCompletedOperation } from "@/lib/offline-db"
import { createDocument, updateDocument, deleteDocument, setDocument } from "@/lib/firestore"

/**
 * Hook for synchronizing offline data with Firestore when coming back online
 */
export function useDataSync() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [pendingOps, setPendingOps] = useState(0)

  // Check for online status and synchronize pending operations
  useEffect(() => {
    let isMounted = true

    // Handler for when app comes back online
    const handleOnline = () => {
      if (isMounted) {
        synchronizeData()
      }
    }

    // Check for pending operations initially
    checkPendingOperations()

    // Add event listener for online events
    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline)

      // If already online, check if we need to sync
      if (navigator.onLine) {
        checkPendingOperations().then((count) => {
          if (count > 0) {
            synchronizeData()
          }
        })
      }
    }

    // Cleanup
    return () => {
      isMounted = false
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline)
      }
    }
  }, [])

  // Check for pending operations
  const checkPendingOperations = async (): Promise<number> => {
    try {
      const result = await getPendingOperations()
      if (result.success && result.data) {
        const count = result.data.length
        setPendingOps(count)
        return count
      }
    } catch (error) {
      console.error("Error checking pending operations:", error)
    }

    setPendingOps(0)
    return 0
  }

  // Synchronize data with Firestore
  const synchronizeData = async () => {
    try {
      if (!navigator.onLine) {
        setSyncError("Cannot synchronize while offline")
        return
      }

      setIsSyncing(true)
      setSyncError(null)
      setSyncProgress(0)

      // Get all pending operations
      const pendingResult = await getPendingOperations()
      if (!pendingResult.success || !pendingResult.data || pendingResult.data.length === 0) {
        setIsSyncing(false)
        setPendingOps(0)
        return
      }

      const operations = pendingResult.data
      setPendingOps(operations.length)

      // Process each operation in sequence
      let completedCount = 0
      for (const op of operations) {
        try {
          let result

          // Execute the operation based on type
          switch (op.operation) {
            case "create":
              result = await createDocument(op.collection, op.data)
              break
            case "update":
              result = await updateDocument(op.collection, op.documentId, op.data)
              break
            case "delete":
              result = await deleteDocument(op.collection, op.documentId)
              break
            case "set":
              result = await setDocument(op.collection, op.documentId, op.data)
              break
          }

          // If operation succeeded, remove from queue
          if (result.success) {
            await removeCompletedOperation(op.id)
          } else {
            console.error(`Failed to sync operation:`, op, result.error)
          }
        } catch (error) {
          console.error(`Error processing operation ${op.id}:`, error)
        }

        // Update progress
        completedCount++
        const progressPercent = Math.round((completedCount / operations.length) * 100)
        setSyncProgress(progressPercent)
        setPendingOps(operations.length - completedCount)
      }

      // Final check for any operations that might still be pending
      await checkPendingOperations()
    } catch (error) {
      console.error("Error synchronizing data:", error)
      setSyncError(error instanceof Error ? error.message : "Unknown synchronization error")
    } finally {
      setIsSyncing(false)
    }
  }

  // Force a synchronization
  const forceSynchronize = () => {
    if (navigator.onLine) {
      synchronizeData()
    } else {
      setSyncError("Cannot synchronize while offline")
    }
  }

  return {
    isSyncing,
    syncProgress,
    syncError,
    pendingOperations: pendingOps,
    forceSynchronize,
    checkPendingOperations,
  }
}
