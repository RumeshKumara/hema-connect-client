import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function logout() {
  return signOut(getFirebaseAuth());
}
