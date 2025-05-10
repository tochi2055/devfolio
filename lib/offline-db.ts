/**
 * Offline database implementation using IndexedDB
 * This provides offline capabilities for Firestore operations
 */

import type { FirestoreResult } from "@/types/database"
import { createFirestoreError } from "@/lib/validation"

// Constants
const DB_NAME = "devfolio_offline_db"
const DB_VERSION = 1
const SYNC_STATUS_STORE = "syncStatus"

// Collection names
const COLLECTIONS = {
  USER_PROFILES: "userProfiles",
  PROJECTS: "projects",
  EXPERIENCES: "experiences",
  PORTFOLIO_SETTINGS: "portfolioSettings",
}

// Operation types for sync queue
type OperationType = "create" | "update" | "delete" | "set"

// Interface for pending operations
interface PendingOperation {
  id: string
  timestamp: number
  collection: string
  documentId: string
  operation: OperationType
  data?: any
}

/**
 * Initialize the offline database
 */
export async function initOfflineDB(): Promise<IDBDatabase | null> {
  if (typeof window === "undefined" || !window.indexedDB) {
    console.warn("IndexedDB not supported in this environment")
    return null
  }

  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = (event) => {
        console.error("Error opening IndexedDB:", event)
        reject(new Error("Failed to open offline database"))
      }

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        resolve(db)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create stores for each collection
        if (!db.objectStoreNames.contains(COLLECTIONS.USER_PROFILES)) {
          db.createObjectStore(COLLECTIONS.USER_PROFILES, { keyPath: "id" })
        }

        if (!db.objectStoreNames.contains(COLLECTIONS.PROJECTS)) {
          db.createObjectStore(COLLECTIONS.PROJECTS, { keyPath: "id" })
        }

        if (!db.objectStoreNames.contains(COLLECTIONS.EXPERIENCES)) {
          db.createObjectStore(COLLECTIONS.EXPERIENCES, { keyPath: "id" })
        }

        if (!db.objectStoreNames.contains(COLLECTIONS.PORTFOLIO_SETTINGS)) {
          db.createObjectStore(COLLECTIONS.PORTFOLIO_SETTINGS, { keyPath: "userId" })
        }

        // Create sync status store for tracking operations
        if (!db.objectStoreNames.contains(SYNC_STATUS_STORE)) {
          db.createObjectStore(SYNC_STATUS_STORE, { keyPath: "id", autoIncrement: true })
        }
      }
    } catch (error) {
      console.error("Error initializing IndexedDB:", error)
      reject(error)
    }
  })
}

/**
 * Store data in offline database
 */
export async function storeOfflineData<T>(collection: string, id: string, data: T): Promise<FirestoreResult<T>> {
  try {
    const db = await initOfflineDB()
    if (!db) {
      return {
        success: false,
        error: createFirestoreError("Offline database not available", "offline/db-unavailable"),
      }
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(collection, "readwrite")
      const store = transaction.objectStore(collection)

      // For portfolio settings, use userId as the key
      const docData = collection === COLLECTIONS.PORTFOLIO_SETTINGS ? { userId: id, ...data } : { id, ...data }

      const request = store.put(docData)

      request.onsuccess = () => {
        resolve({ success: true, data: docData as T })
      }

      request.onerror = (event) => {
        resolve({
          success: false,
          error: createFirestoreError(
            `Failed to store data offline: ${(event.target as IDBRequest).error?.message || "Unknown error"}`,
            "offline/store-failed",
          ),
        })
      }
    })
  } catch (error) {
    return {
      success: false,
      error: createFirestoreError(
        `Error storing data offline: ${error instanceof Error ? error.message : "Unknown error"}`,
        "offline/store-error",
        error,
      ),
    }
  }
}

/**
 * Retrieve data from offline database
 */
export async function getOfflineData<T>(collection: string, id: string): Promise<FirestoreResult<T>> {
  try {
    const db = await initOfflineDB()
    if (!db) {
      return {
        success: false,
        error: createFirestoreError("Offline database not available", "offline/db-unavailable"),
      }
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(collection, "readonly")
      const store = transaction.objectStore(collection)
      const request = store.get(id)

      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result
        if (result) {
          resolve({ success: true, data: result as T })
        } else {
          resolve({
            success: false,
            error: createFirestoreError(`Document not found offline: ${id}`, "offline/not-found"),
          })
        }
      }

      request.onerror = (event) => {
        resolve({
          success: false,
          error: createFirestoreError(
            `Failed to retrieve data offline: ${(event.target as IDBRequest).error?.message || "Unknown error"}`,
            "offline/get-failed",
          ),
        })
      }
    })
  } catch (error) {
    return {
      success: false,
      error: createFirestoreError(
        `Error retrieving data offline: ${error instanceof Error ? error.message : "Unknown error"}`,
        "offline/get-error",
        error,
      ),
    }
  }
}

/**
 * Query documents from offline database
 */
export async function queryOfflineData<T>(
  collection: string,
  filter?: (item: any) => boolean,
): Promise<FirestoreResult<T[]>> {
  try {
    const db = await initOfflineDB()
    if (!db) {
      return {
        success: false,
        error: createFirestoreError("Offline database not available", "offline/db-unavailable"),
      }
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(collection, "readonly")
      const store = transaction.objectStore(collection)
      const request = store.getAll()

      request.onsuccess = (event) => {
        let results = (event.target as IDBRequest).result as T[]

        // Apply filter if provided
        if (filter && typeof filter === "function") {
          results = results.filter(filter)
        }

        resolve({ success: true, data: results })
      }

      request.onerror = (event) => {
        resolve({
          success: false,
          error: createFirestoreError(
            `Failed to query data offline: ${(event.target as IDBRequest).error?.message || "Unknown error"}`,
            "offline/query-failed",
          ),
        })
      }
    })
  } catch (error) {
    return {
      success: false,
      error: createFirestoreError(
        `Error querying data offline: ${error instanceof Error ? error.message : "Unknown error"}`,
        "offline/query-error",
        error,
      ),
    }
  }
}

/**
 * Delete data from offline database
 */
export async function deleteOfflineData(collection: string, id: string): Promise<FirestoreResult<void>> {
  try {
    const db = await initOfflineDB()
    if (!db) {
      return {
        success: false,
        error: createFirestoreError("Offline database not available", "offline/db-unavailable"),
      }
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(collection, "readwrite")
      const store = transaction.objectStore(collection)
      const request = store.delete(id)

      request.onsuccess = () => {
        resolve({ success: true })
      }

      request.onerror = (event) => {
        resolve({
          success: false,
          error: createFirestoreError(
            `Failed to delete data offline: ${(event.target as IDBRequest).error?.message || "Unknown error"}`,
            "offline/delete-failed",
          ),
        })
      }
    })
  } catch (error) {
    return {
      success: false,
      error: createFirestoreError(
        `Error deleting data offline: ${error instanceof Error ? error.message : "Unknown error"}`,
        "offline/delete-error",
        error,
      ),
    }
  }
}

/**
 * Queue an operation for synchronization when online
 */
export async function queueSyncOperation(
  operation: OperationType,
  collection: string,
  documentId: string,
  data?: any,
): Promise<FirestoreResult<string>> {
  try {
    const db = await initOfflineDB()
    if (!db) {
      return {
        success: false,
        error: createFirestoreError("Offline database not available", "offline/db-unavailable"),
      }
    }

    const pendingOperation: Omit<PendingOperation, "id"> = {
      timestamp: Date.now(),
      collection,
      documentId,
      operation,
      data,
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(SYNC_STATUS_STORE, "readwrite")
      const store = transaction.objectStore(SYNC_STATUS_STORE)
      const request = store.add(pendingOperation)

      request.onsuccess = (event) => {
        const id = (event.target as IDBRequest).result.toString()
        resolve({ success: true, data: id })
      }

      request.onerror = (event) => {
        resolve({
          success: false,
          error: createFirestoreError(
            `Failed to queue sync operation: ${(event.target as IDBRequest).error?.message || "Unknown error"}`,
            "offline/queue-failed",
          ),
        })
      }
    })
  } catch (error) {
    return {
      success: false,
      error: createFirestoreError(
        `Error queueing sync operation: ${error instanceof Error ? error.message : "Unknown error"}`,
        "offline/queue-error",
        error,
      ),
    }
  }
}

/**
 * Get pending operations to sync
 */
export async function getPendingOperations(): Promise<FirestoreResult<PendingOperation[]>> {
  try {
    const db = await initOfflineDB()
    if (!db) {
      return {
        success: false,
        error: createFirestoreError("Offline database not available", "offline/db-unavailable"),
      }
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(SYNC_STATUS_STORE, "readonly")
      const store = transaction.objectStore(SYNC_STATUS_STORE)
      const request = store.getAll()

      request.onsuccess = (event) => {
        const operations = (event.target as IDBRequest).result
        // Sort by timestamp to ensure operations are processed in order
        operations.sort((a, b) => a.timestamp - b.timestamp)

        resolve({ success: true, data: operations })
      }

      request.onerror = (event) => {
        resolve({
          success: false,
          error: createFirestoreError(
            `Failed to get pending operations: ${(event.target as IDBRequest).error?.message || "Unknown error"}`,
            "offline/get-pending-failed",
          ),
        })
      }
    })
  } catch (error) {
    return {
      success: false,
      error: createFirestoreError(
        `Error getting pending operations: ${error instanceof Error ? error.message : "Unknown error"}`,
        "offline/get-pending-error",
        error,
      ),
    }
  }
}

/**
 * Remove a completed operation from the sync queue
 */
export async function removeCompletedOperation(operationId: string): Promise<FirestoreResult<void>> {
  try {
    const db = await initOfflineDB()
    if (!db) {
      return {
        success: false,
        error: createFirestoreError("Offline database not available", "offline/db-unavailable"),
      }
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(SYNC_STATUS_STORE, "readwrite")
      const store = transaction.objectStore(SYNC_STATUS_STORE)
      const request = store.delete(operationId)

      request.onsuccess = () => {
        resolve({ success: true })
      }

      request.onerror = (event) => {
        resolve({
          success: false,
          error: createFirestoreError(
            `Failed to remove completed operation: ${(event.target as IDBRequest).error?.message || "Unknown error"}`,
            "offline/remove-operation-failed",
          ),
        })
      }
    })
  } catch (error) {
    return {
      success: false,
      error: createFirestoreError(
        `Error removing completed operation: ${error instanceof Error ? error.message : "Unknown error"}`,
        "offline/remove-operation-error",
        error,
      ),
    }
  }
}
