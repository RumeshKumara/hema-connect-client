import { User } from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";

export type AccountType = "admin" | "donor" | "organization";

export type UserProfile = {
  uid: string;
  fullName: string;
  email: string;
  accountType: AccountType;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

const DASHBOARD_ROUTES: Record<AccountType, string> = {
  admin: "/admin",
  donor: "/donor",
  organization: "/organization",
};

export const getDashboardRoute = (accountType: AccountType) =>
  DASHBOARD_ROUTES[accountType];

export const getUserProfile = async (uid: string) => {
  const db = getFirestoreDb();
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    return null;
  }

  return userDoc.data() as UserProfile;
};

export const createUserProfile = async ({
  uid,
  fullName,
  email,
  accountType,
}: {
  uid: string;
  fullName: string;
  email: string;
  accountType: AccountType;
}) => {
  const db = getFirestoreDb();
  const userRef = doc(db, "users", uid);
  const existingProfile = await getDoc(userRef);

  await setDoc(userRef, {
    uid,
    fullName,
    email,
    accountType,
    updatedAt: serverTimestamp(),
    ...(existingProfile.exists() ? {} : { createdAt: serverTimestamp() }),
  }, { merge: true });
};

export const ensureGoogleUserProfile = async (user: User) => {
  const existing = await getUserProfile(user.uid);

  if (existing) {
    return existing;
  }

  const profile: Omit<UserProfile, "createdAt" | "updatedAt"> = {
    uid: user.uid,
    fullName: user.displayName || "Google User",
    email: user.email || "",
    accountType: "donor",
  };

  await createUserProfile(profile);

  return {
    ...profile,
  } as UserProfile;
};
