"use client"

import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, GithubAuthProvider, Auth } from "firebase/auth"
import { Firestore, getFirestore } from "firebase/firestore"
import { FirebaseStorage, getStorage } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase only on the client side
let app: FirebaseApp
let auth: Auth
let db: Firestore
let storage: FirebaseStorage
let googleProvider: GoogleAuthProvider
let githubProvider: GithubAuthProvider


// Check if we're in the browser environment
if (typeof window !== "undefined") {
  // Check if Firebase has already been initialized
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  // Initialize services
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)

  // Initialize providers
  googleProvider = new GoogleAuthProvider()
  githubProvider = new GithubAuthProvider()
}

// Export the initialized services
export { app, auth, db, storage, googleProvider, githubProvider }
