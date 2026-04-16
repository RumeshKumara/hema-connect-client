"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AccountType, getDashboardRoute } from "@/lib/userProfiles";

export default function RoleGate({
  allowedRoles,
  children,
}: Readonly<{
  allowedRoles: AccountType[];
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!profile) {
      return;
    }

    if (!allowedRoles.includes(profile.accountType)) {
      router.replace(getDashboardRoute(profile.accountType));
    }
  }, [allowedRoles, loading, profile, router, user]);

  if (loading) {
    return (
      <section className="flex min-h-[55vh] items-center justify-center px-6 py-20 text-zinc-700">
        <p className="rounded-2xl bg-white px-6 py-4 text-sm shadow">Loading dashboard...</p>
      </section>
    );
  }

  if (!user || !profile || !allowedRoles.includes(profile.accountType)) {
    return null;
  }

  return <>{children}</>;
}
