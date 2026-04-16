"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import {
  ensureGoogleUserProfile,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await getUserProfile(credential.user.uid);

      if (!userProfile) {
        setErrorMessage("Your account profile is missing in Firestore.");
        setIsSubmitting(false);
        return;
      }

      router.replace(getDashboardRoute(userProfile.accountType));
    } catch {
      setErrorMessage("Unable to sign in. Please check your email and password.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userProfile = await ensureGoogleUserProfile(result.user);
      router.replace(getDashboardRoute(userProfile.accountType));
    } catch {
      setErrorMessage("Google sign-in failed. Please try again.");
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
        <form className="mt-8 space-y-5" onSubmit={handleEmailLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-zinc-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-zinc-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
            />
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

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">or</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span aria-hidden="true">G</span>
          Continue with Google
        </button>

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
