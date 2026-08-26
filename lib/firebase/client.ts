// lib/firebase/client.ts
// This file should only run in the browser, not during build/SSR

import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Safely handle initialization only on client side
let db: ReturnType<typeof getDatabase> | null = null

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}

// Only initialize on client side
if (typeof window !== 'undefined') {
  // Validate config has required fields
  if (!firebaseConfig.projectId || !firebaseConfig.databaseURL) {
    console.error('Firebase config missing projectId or databaseURL')
  } else {
    try {
      const app = initializeApp(firebaseConfig)
      db = getDatabase(app)
    } catch (error) {
      console.error('Failed to initialize Firebase:', error)
    }
  }
}

export { db }
