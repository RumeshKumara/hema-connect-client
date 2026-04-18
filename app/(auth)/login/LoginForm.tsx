"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirebaseAuth } from "@/firebase/auth";
import {
  isPredefinedAdminCredentials,
  PREDEFINED_ADMIN_EMAIL,
  PREDEFINED_ADMIN_PASSWORD,
} from "@/lib/constants";
import {
  createUserProfile,
  getDashboardRoute,
  getUserProfile,
} from "@/lib/userProfiles";
import { useAuth } from "@/context/AuthContext";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginForm() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setRoleCookie = (role: "admin" | "donor" | "organization") => {
    document.cookie = `userRole=${role}; Path=/; Max-Age=2592000; SameSite=Lax`;
  };

  const getFirebaseErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unknown Firebase error.";
  };

  useEffect(() => {
    if (!loading && user && profile) {
      router.replace(getDashboardRoute(profile.accountType));
    }
  }, [loading, profile, router, user]);

  const handleEmailLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const auth = getFirebaseAuth();
      const isAdminLogin = isPredefinedAdminCredentials(email, password);

      let credential;

      if (isAdminLogin) {
        try {
          credential = await signInWithEmailAndPassword(
            auth,
            PREDEFINED_ADMIN_EMAIL,
            PREDEFINED_ADMIN_PASSWORD,
          );
        } catch (error) {
          const methods = await fetchSignInMethodsForEmail(auth, PREDEFINED_ADMIN_EMAIL);

          if (methods.length > 0) {
            throw new Error(
              `Admin account exists but login failed: ${getFirebaseErrorMessage(error)}`,
            );
          }

          credential = await createUserWithEmailAndPassword(
            auth,
            PREDEFINED_ADMIN_EMAIL,
            PREDEFINED_ADMIN_PASSWORD,
          );
        }

        try {
          await createUserProfile({
            uid: credential.user.uid,
            fullName: "System Admin",
            email: PREDEFINED_ADMIN_EMAIL,
            accountType: "admin",
          });
        } catch (error) {
          throw new Error(`Admin profile save failed: ${getFirebaseErrorMessage(error)}`);
        }

        setRoleCookie("admin");
        router.replace(getDashboardRoute("admin"));
        return;
      }

      credential = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await getUserProfile(credential.user.uid);

      if (!userProfile) {
        setErrorMessage("Your account profile is missing in Firestore.");
        setIsSubmitting(false);
        return;
      }

      setRoleCookie(userProfile.accountType);
      router.replace(getDashboardRoute(userProfile.accountType));
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#ededee] px-6 pb-20 pt-10 sm:px-10 sm:pt-12">
      <div className="mx-auto mb-5 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>
      </div>

      <AuthCard title="Login" subtitle="Sign in with your account credentials." maxWidthClassName="max-w-md">
        <form className="mt-8 space-y-5" onSubmit={handleEmailLogin} autoComplete="off">
          <input
            type="text"
            name="fake-username"
            autoComplete="username"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          />
          <input
            type="password"
            name="fake-password"
            autoComplete="new-password"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          />

          <div>
            <label htmlFor="email" className="text-sm font-semibold text-zinc-700">
              Email Address
            </label>
            <input
              id="email"
              name="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="off"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-zinc-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                name="login-password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="new-password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 pr-12 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((current) => !current)}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-zinc-500 transition hover:text-zinc-700"
              >
                {isPasswordVisible ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M10.48 10.47a2 2 0 0 0 2.83 2.83"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.88 5.09A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8-1.02 2.88-3.16 5.2-5.88 6.41"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.61 6.61C4.62 8.07 3.06 9.94 2 12c1.73 4.89 6 8 10 8 1.38 0 2.72-.3 3.96-.86"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M2 12s3.64-8 10-8 10 8 10 8-3.64 8-10 8-10-8-10-8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {errorMessage ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-zinc-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-red-600 hover:text-red-500">
            Register here
          </Link>
        </p>
      </AuthCard>
    </section>
  );
}
