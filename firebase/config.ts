import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredConfig = [
  {
    key: "NEXT_PUBLIC_FIREBASE_API_KEY",
    value: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  },
  {
    key: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    value: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  },
  {
    key: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    value: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  },
  {
    key: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    value: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  },
  {
    key: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    value: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  },
  {
    key: "NEXT_PUBLIC_FIREBASE_APP_ID",
    value: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
] as const;

const missingConfig = requiredConfig
  .filter((entry) => !entry.value)
  .map((entry) => entry.key);

export const firebaseConfigError =
  missingConfig.length > 0
    ? `Missing Firebase environment variables: ${missingConfig.join(", ")}`
    : null;

export const isFirebaseConfigured = firebaseConfigError === null;

let app: FirebaseApp | null = null;

export function getFirebaseApp() {
  if (firebaseConfigError) {
    throw new Error(firebaseConfigError);
  }

  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }

  return app;
}
