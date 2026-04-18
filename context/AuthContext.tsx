"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  firebaseConfigError,
  isFirebaseConfigured,
} from "@/firebase/config";
import { getFirebaseAuth } from "@/firebase/auth";
import { getFirestoreDb } from "@/firebase/firestore";
import { AccountType, UserProfile } from "@/lib/userProfiles";

const setRoleCookie = (accountType: AccountType) => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `userRole=${accountType}; Path=/; Max-Age=2592000; SameSite=Lax`;
};

const clearRoleCookie = () => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = "userRole=; Path=/; Max-Age=0; SameSite=Lax";
};

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      if (firebaseConfigError) {
        console.warn(firebaseConfigError);
      }
      return;
    }

    const auth = getFirebaseAuth();
    const db = getFirestoreDb();
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        clearRoleCookie();
        setLoading(false);
        return;
      }

      setLoading(true);

      const profileRef = doc(db, "users", currentUser.uid);
      unsubscribeProfile = onSnapshot(
        profileRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const userProfile = snapshot.data() as UserProfile;
            setProfile(userProfile);
            setRoleCookie(userProfile.accountType);
          } else {
            setProfile(null);
            clearRoleCookie();
          }
          setLoading(false);
        },
        () => {
          setProfile(null);
          clearRoleCookie();
          setLoading(false);
        },
      );
    });

    return () => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
      unsubscribeAuth();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      signOut: () => {
        if (!isFirebaseConfigured) {
          return Promise.resolve();
        }
        return firebaseSignOut(getFirebaseAuth());
      },
    }),
    [loading, profile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
