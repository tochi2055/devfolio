import type { FirestoreResult, UserProfile, Project, Experience, PortfolioSettings } from "@/types/database"
import { createFirestoreError, extractFirebaseErrorMessage } from "@/lib/validation"

// Firestore retry configuration
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // ms

/**
 * Type guard to check if Firebase is initialized
 */
function isFirebaseInitialized(): boolean {
  if (typeof window === "undefined" || !window.firebase || typeof window.firebase.firestore !== "function") {
    return false
  }
  return true
}

/**
 * Get a reference to Firestore database with error handling
 */
function getFirestore() {
  try {
    if (!isFirebaseInitialized()) {
      console.warn("Firebase is not initialized")
      return null
    }
    return window.firebase.firestore()
  } catch (error) {
    console.error("Error accessing Firestore:", error)
    return null
  }
}

/**
 * Create a document with retry mechanism
 */
export async function createDocument<T>(
  collection: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
  retries = MAX_RETRIES,
): Promise<FirestoreResult<T>> {
  try {
    const firestore = getFirestore()
    if (!firestore) {
      throw createFirestoreError("Firestore is not initialized", "firestore/not-initialized")
    }

    // Add timestamps
    const timestamp = new Date()
    const documentData = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    // Perform create operation
    const docRef = await firestore.collection(collection).add(documentData)

    // Get the newly created document
    const newDoc = await docRef.get()
    const createdData = { id: docRef.id, ...newDoc.data() } as T

    return { success: true, data: createdData }
  } catch (error) {
    console.error(`Error creating document in ${collection}:`, error)

    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return createDocument(collection, data, retries - 1)
    }

    return {
      success: false,
      error: createFirestoreError(
        extractFirebaseErrorMessage(error) || `Failed to create document in ${collection}`,
        "firestore/create-failed",
        error,
      ),
    }
  }
}

/**
 * Read a document with retry mechanism
 */
export async function readDocument<T>(
  collection: string,
  id: string,
  retries = MAX_RETRIES,
): Promise<FirestoreResult<T>> {
  try {
    const firestore = getFirestore()
    if (!firestore) {
      throw createFirestoreError("Firestore is not initialized", "firestore/not-initialized")
    }

    // Perform read operation
    const docSnapshot = await firestore.collection(collection).doc(id).get()

    if (!docSnapshot.exists) {
      return {
        success: false,
        error: createFirestoreError(`Document not found in ${collection}`, "firestore/not-found"),
      }
    }

    const documentData = { id: docSnapshot.id, ...docSnapshot.data() } as T
    return { success: true, data: documentData }
  } catch (error) {
    console.error(`Error reading document from ${collection}:`, error)

    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return readDocument(collection, id, retries - 1)
    }

    return {
      success: false,
      error: createFirestoreError(
        extractFirebaseErrorMessage(error) || `Failed to read document from ${collection}`,
        "firestore/read-failed",
        error,
      ),
    }
  }
}

/**
 * Update a document with retry mechanism
 */
export async function updateDocument<T>(
  collection: string,
  id: string,
  data: Partial<T>,
  retries = MAX_RETRIES,
): Promise<FirestoreResult<T>> {
  try {
    const firestore = getFirestore()
    if (!firestore) {
      throw createFirestoreError("Firestore is not initialized", "firestore/not-initialized")
    }

    // Add updated timestamp
    const documentData = {
      ...data,
      updatedAt: new Date(),
    }

    // Perform update operation
    await firestore.collection(collection).doc(id).update(documentData)

    // Read the updated document
    const result = await readDocument<T>(collection, id)
    return result
  } catch (error) {
    console.error(`Error updating document in ${collection}:`, error)

    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return updateDocument(collection, id, data, retries - 1)
    }

    return {
      success: false,
      error: createFirestoreError(
        extractFirebaseErrorMessage(error) || `Failed to update document in ${collection}`,
        "firestore/update-failed",
        error,
      ),
    }
  }
}

/**
 * Delete a document with retry mechanism
 */
export async function deleteDocument(
  collection: string,
  id: string,
  retries = MAX_RETRIES,
): Promise<FirestoreResult<void>> {
  try {
    const firestore = getFirestore()
    if (!firestore) {
      throw createFirestoreError("Firestore is not initialized", "firestore/not-initialized")
    }

    // Perform delete operation
    await firestore.collection(collection).doc(id).delete()

    return { success: true }
  } catch (error) {
    console.error(`Error deleting document from ${collection}:`, error)

    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return deleteDocument(collection, id, retries - 1)
    }

    return {
      success: false,
      error: createFirestoreError(
        extractFirebaseErrorMessage(error) || `Failed to delete document from ${collection}`,
        "firestore/delete-failed",
        error,
      ),
    }
  }
}

/**
 * Query documents with retry mechanism
 */
export async function queryDocuments<T>(
  collection: string,
  queries: { field: string; operator: string; value: any }[],
  orderBy?: { field: string; direction: "asc" | "desc" },
  limit?: number,
  retries = MAX_RETRIES,
): Promise<FirestoreResult<T[]>> {
  try {
    const firestore = getFirestore()
    if (!firestore) {
      throw createFirestoreError("Firestore is not initialized", "firestore/not-initialized")
    }

    // Start with collection reference
    let queryRef = firestore.collection(collection)

    // Add query conditions
    for (const query of queries) {
      queryRef = queryRef.where(query.field, query.operator, query.value)
    }

    // Add ordering if provided
    if (orderBy) {
      queryRef = queryRef.orderBy(orderBy.field, orderBy.direction)
    }

    // Add limit if provided
    if (limit && limit > 0) {
      queryRef = queryRef.limit(limit)
    }

    // Execute query
    const querySnapshot = await queryRef.get()

    // Extract documents
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[]

    return { success: true, data: documents }
  } catch (error) {
    console.error(`Error querying documents from ${collection}:`, error)

    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return queryDocuments(collection, queries, orderBy, limit, retries - 1)
    }

    return {
      success: false,
      error: createFirestoreError(
        extractFirebaseErrorMessage(error) || `Failed to query documents from ${collection}`,
        "firestore/query-failed",
        error,
      ),
    }
  }
}

/**
 * Create or update a document with a known ID
 */
export async function setDocument<T>(
  collection: string,
  id: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
  merge = true,
  retries = MAX_RETRIES,
): Promise<FirestoreResult<T>> {
  try {
    const firestore = getFirestore()
    if (!firestore) {
      throw createFirestoreError("Firestore is not initialized", "firestore/not-initialized")
    }

    // Check if document exists
    const docRef = firestore.collection(collection).doc(id)
    const docSnapshot = await docRef.get()

    const timestamp = new Date()
    let documentData

    if (docSnapshot.exists) {
      // Update existing document
      documentData = {
        ...data,
        updatedAt: timestamp,
      }
    } else {
      // Create new document
      documentData = {
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp,
      }
    }

    // Set the document
    await docRef.set(documentData, { merge })

    // Read the document
    const result = await readDocument<T>(collection, id)
    return result
  } catch (error) {
    console.error(`Error setting document in ${collection}:`, error)

    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return setDocument(collection, id, data, merge, retries - 1)
    }

    return {
      success: false,
      error: createFirestoreError(
        extractFirebaseErrorMessage(error) || `Failed to set document in ${collection}`,
        "firestore/set-failed",
        error,
      ),
    }
  }
}

// BATCH OPERATIONS

/**
 * Perform batch write operations
 */
export async function batchOperation(
  operations: {
    type: "create" | "update" | "delete" | "set"
    collection: string
    id?: string
    data?: any
    merge?: boolean
  }[],
  retries = MAX_RETRIES,
): Promise<FirestoreResult<void>> {
  try {
    const firestore = getFirestore()
    if (!firestore) {
      throw createFirestoreError("Firestore is not initialized", "firestore/not-initialized")
    }

    const batch = firestore.batch()
    const timestamp = new Date()

    operations.forEach((op) => {
      if (op.type === "delete" && op.id) {
        const docRef = firestore.collection(op.collection).doc(op.id)
        batch.delete(docRef)
      } else if (op.type === "update" && op.id && op.data) {
        const docRef = firestore.collection(op.collection).doc(op.id)
        batch.update(docRef, { ...op.data, updatedAt: timestamp })
      } else if (op.type === "set" && op.id && op.data) {
        const docRef = firestore.collection(op.collection).doc(op.id)
        const merge = op.merge !== undefined ? op.merge : true

        const docData = {
          ...op.data,
          updatedAt: timestamp,
        }

        batch.set(docRef, docData, { merge })
      } else if (op.type === "create" && op.data) {
        const docRef = op.id
          ? firestore.collection(op.collection).doc(op.id)
          : firestore.collection(op.collection).doc()

        batch.set(docRef, {
          ...op.data,
          createdAt: timestamp,
          updatedAt: timestamp,
        })
      }
    })

    await batch.commit()
    return { success: true }
  } catch (error) {
    console.error(`Error executing batch operation:`, error)

    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return batchOperation(operations, retries - 1)
    }

    return {
      success: false,
      error: createFirestoreError(
        extractFirebaseErrorMessage(error) || `Failed to execute batch operation`,
        "firestore/batch-failed",
        error,
      ),
    }
  }
}

// COLLECTION-SPECIFIC OPERATIONS

/**
 * User profile operations
 */
export const userProfileAPI = {
  async createProfile(userId: string, data: Partial<UserProfile>): Promise<FirestoreResult<UserProfile>> {
    // Validate required fields
    if (!data.name || !data.email || !data.username) {
      return {
        success: false,
        error: createFirestoreError("Name, email, and username are required", "validation/required-fields"),
      }
    }

    // Set defaults for required fields
    const profileData: Omit<UserProfile, "id" | "createdAt" | "updatedAt"> = {
      name: data.name,
      email: data.email,
      username: data.username,
      isPublic: data.isPublic !== undefined ? data.isPublic : true,
      ...data,
    }

    return setDocument<UserProfile>("userProfiles", userId, profileData)
  },

  async getProfileById(userId: string): Promise<FirestoreResult<UserProfile>> {
    return readDocument<UserProfile>("userProfiles", userId)
  },

  async getProfileByUsername(username: string): Promise<FirestoreResult<UserProfile>> {
    const result = await queryDocuments<UserProfile>(
      "userProfiles",
      [{ field: "username", operator: "==", value: username }],
      undefined,
      1,
    )

    if (result.success && result.data && result.data.length > 0) {
      return { success: true, data: result.data[0] }
    }

    return {
      success: false,
      error: result.error || createFirestoreError("User profile not found", "firestore/not-found"),
    }
  },

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<FirestoreResult<UserProfile>> {
    return updateDocument<UserProfile>("userProfiles", userId, data)
  },

  async deleteProfile(userId: string): Promise<FirestoreResult<void>> {
    return deleteDocument("userProfiles", userId)
  },

  async checkUsernameAvailability(username: string): Promise<FirestoreResult<boolean>> {
    try {
      const result = await queryDocuments<UserProfile>(
        "userProfiles",
        [{ field: "username", operator: "==", value: username }],
        undefined,
        1,
      )

      return {
        success: true,
        data: !(result.success && result.data && result.data.length > 0),
      }
    } catch (error) {
      return {
        success: false,
        error: createFirestoreError("Failed to check username availability", "firestore/query-failed", error),
      }
    }
  },
}

/**
 * Project operations
 */
export const projectAPI = {
  async createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<FirestoreResult<Project>> {
    // Validate required fields
    if (!data.userId || !data.title || !data.description) {
      return {
        success: false,
        error: createFirestoreError("userId, title, and description are required", "validation/required-fields"),
      }
    }

    // Set defaults
    const projectData: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
      ...data,
      techStack: data.techStack || [],
      featured: data.featured !== undefined ? data.featured : false,
      order: data.order !== undefined ? data.order : 0,
    }

    return createDocument<Project>("projects", projectData)
  },

  async getProjectById(projectId: string): Promise<FirestoreResult<Project>> {
    return readDocument<Project>("projects", projectId)
  },

  async getUserProjects(userId: string): Promise<FirestoreResult<Project[]>> {
    return queryDocuments<Project>("projects", [{ field: "userId", operator: "==", value: userId }], {
      field: "order",
      direction: "asc",
    })
  },

  async getFeaturedProjects(userId: string): Promise<FirestoreResult<Project[]>> {
    return queryDocuments<Project>(
      "projects",
      [
        { field: "userId", operator: "==", value: userId },
        { field: "featured", operator: "==", value: true },
      ],
      { field: "order", direction: "asc" },
    )
  },

  async updateProject(projectId: string, data: Partial<Project>): Promise<FirestoreResult<Project>> {
    return updateDocument<Project>("projects", projectId, data)
  },

  async deleteProject(projectId: string): Promise<FirestoreResult<void>> {
    return deleteDocument("projects", projectId)
  },

  async reorderProjects(projects: { id: string; order: number }[]): Promise<FirestoreResult<void>> {
    const operations = projects.map((project) => ({
      type: "update" as const,
      collection: "projects",
      id: project.id,
      data: { order: project.order },
    }))

    return batchOperation(operations)
  },
}

/**
 * Experience operations
 */
export const experienceAPI = {
  async createExperience(
    data: Omit<Experience, "id" | "createdAt" | "updatedAt">,
  ): Promise<FirestoreResult<Experience>> {
    // Validate required fields
    if (!data.userId || !data.company || !data.position || !data.startDate) {
      return {
        success: false,
        error: createFirestoreError(
          "userId, company, position, and startDate are required",
          "validation/required-fields",
        ),
      }
    }

    // Set defaults
    const experienceData: Omit<Experience, "id" | "createdAt" | "updatedAt"> = {
      ...data,
      responsibilities: data.responsibilities || [],
      current: data.current !== undefined ? data.current : false,
      order: data.order !== undefined ? data.order : 0,
    }

    return createDocument<Experience>("experiences", experienceData)
  },

  async getExperienceById(experienceId: string): Promise<FirestoreResult<Experience>> {
    return readDocument<Experience>("experiences", experienceId)
  },

  async getUserExperiences(userId: string): Promise<FirestoreResult<Experience[]>> {
    return queryDocuments<Experience>("experiences", [{ field: "userId", operator: "==", value: userId }], {
      field: "order",
      direction: "asc",
    })
  },

  async updateExperience(experienceId: string, data: Partial<Experience>): Promise<FirestoreResult<Experience>> {
    return updateDocument<Experience>("experiences", experienceId, data)
  },

  async deleteExperience(experienceId: string): Promise<FirestoreResult<void>> {
    return deleteDocument("experiences", experienceId)
  },

  async reorderExperiences(experiences: { id: string; order: number }[]): Promise<FirestoreResult<void>> {
    const operations = experiences.map((exp) => ({
      type: "update" as const,
      collection: "experiences",
      id: exp.id,
      data: { order: exp.order },
    }))

    return batchOperation(operations)
  },
}

/**
 * Portfolio settings operations
 */
export const portfolioSettingsAPI = {
  async getSettings(userId: string): Promise<FirestoreResult<PortfolioSettings>> {
    return readDocument<PortfolioSettings>("portfolioSettings", userId)
  },

  async updateSettings(userId: string, data: Partial<PortfolioSettings>): Promise<FirestoreResult<PortfolioSettings>> {
    // Set defaults if creating for the first time
    const settingsData: Partial<PortfolioSettings> = {
      template: data.template || "minimal",
      ...data,
    }

    return setDocument<PortfolioSettings>("portfolioSettings", userId, {
      userId,
      ...settingsData,
    } as any)
  },
}
