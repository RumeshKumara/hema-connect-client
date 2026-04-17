import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "@/firebase/config";

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}
