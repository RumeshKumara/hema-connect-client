import { createUserProfile, getUserProfile } from "@/lib/userProfiles";

export async function fetchUserProfile(uid: string) {
  return getUserProfile(uid);
}

export async function saveUserProfile(input: {
  uid: string;
  fullName: string;
  email: string;
  accountType: "admin" | "donor" | "organization";
}) {
  return createUserProfile(input);
}
