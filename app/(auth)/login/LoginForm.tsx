"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
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

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);

      const userProfile = await getUserProfile(credential.user.uid);

      if (!userProfile) {
        setErrorMessage("Your account profile is missing. Please register first.");
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-zinc-600">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#4285F4"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isSubmitting ? "Signing in..." : "Sign in with Google"}
            </div>
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
