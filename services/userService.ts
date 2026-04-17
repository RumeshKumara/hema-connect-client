import { createUserProfile, getUserProfile } from "@/lib/userProfiles";
import { AccountType } from "@/lib/userProfiles";

export async function fetchUserProfile(uid: string) {
    return getUserProfile(uid);
}

export async function saveUserProfile(input: {
    uid: string;
    fullName: string;
    email: string;
    accountType: AccountType;
}) {
    return createUserProfile(input);
}
