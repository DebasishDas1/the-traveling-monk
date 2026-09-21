import { initializeApp, getApp, FirebaseApp } from 'firebase/app'
import { getDatabase, Database, goOffline, goOnline } from 'firebase/database'
import { getAuth, signInAnonymously, Auth } from 'firebase/auth'

let app: FirebaseApp | null = null
let db: Database | null = null
let auth: Auth | null = null
let authReady: Promise<void> | null = null

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || '',
}

export function initializeFirebase() {
  if (typeof window === 'undefined') return { app: null, db: null, auth: null }

  try {
    try {
      app = getApp()
    } catch {
      if (!firebaseConfig.projectId || !firebaseConfig.databaseURL) {
        throw new Error(
          'Firebase config incomplete - missing projectId or databaseURL'
        )
      }
      app = initializeApp(firebaseConfig)
    }

    db = getDatabase(app)
    auth = getAuth(app)

    // Enable persistence
    goOffline(db)
    goOnline(db)

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Firebase initialized')
    }

    return { app, db, auth }
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error)
    return { app: null, db: null, auth: null }
  }
}

export function getFirebaseDb(): Database {
  if (!db) {
    const { db: initializedDb } = initializeFirebase()
    db = initializedDb
  }
  if (!db) throw new Error('Firebase Database not initialized')
  return db
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    const { auth: initializedAuth } = initializeFirebase()
    auth = initializedAuth
  }
  if (!auth) throw new Error('Firebase Auth not initialized')
  return auth
}

export async function ensureFirebaseAuth(): Promise<Auth> {
  const firebaseAuth = getFirebaseAuth()

  if (firebaseAuth.currentUser) return firebaseAuth

  authReady ??= signInAnonymously(firebaseAuth).then(() => undefined)
  await authReady

  return firebaseAuth
}

export { app, db, auth }
