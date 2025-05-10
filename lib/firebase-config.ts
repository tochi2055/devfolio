import { initializeApp, getApps } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase if it hasn't been initialized
export function initializeFirebase() {
  try {
    if (typeof window !== "undefined" && getApps().length === 0) {
      const app = initializeApp(firebaseConfig)

      const auth = getAuth(app)
      const firestore = getFirestore(app)
      const storage = getStorage(app)

      // Connect to emulators in development
      if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true") {
        // Use default ports for emulators
        connectAuthEmulator(auth, "http://localhost:9099")
        connectFirestoreEmulator(firestore, "localhost", 8080)
        connectStorageEmulator(storage, "localhost", 9199)
        console.log("Connected to Firebase emulators")
      }

      return { app, auth, firestore, storage }
    }

    return {
      app: getApps()[0],
      auth: getAuth(),
      firestore: getFirestore(),
      storage: getStorage(),
    }
  } catch (error) {
    console.error("Failed to initialize Firebase:", error)
    return null
  }
}

// Initialize Firebase on module load
let firebaseInstance: ReturnType<typeof initializeFirebase> | null = null

// Safely initialize Firebase
export function getFirebaseInstance() {
  if (typeof window !== "undefined" && !firebaseInstance) {
    firebaseInstance = initializeFirebase()
  }
  return firebaseInstance
}

// Export Firebase services for use throughout the app
export function getFirebaseAuth() {
  const instance = getFirebaseInstance()
  return instance?.auth || null
}

export function getFirebaseFirestore() {
  const instance = getFirebaseInstance()
  return instance?.firestore || null
}

export function getFirebaseStorage() {
  const instance = getFirebaseInstance()
  return instance?.storage || null
}
