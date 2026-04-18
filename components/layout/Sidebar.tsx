"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { AccountType } from "@/lib/userProfiles";

const ROLE_SIDEBAR_CONFIG: Record<
  AccountType,
  {
    title: string;
    accentClass: string;
    links: Array<{ href: string; label: string }>;
  }
> = {
  admin: {
    title: "Admin Panel",
    accentClass: "text-rose-600",
    links: [
      { href: "/admin", label: "Overview" },
      { href: "/admin/users", label: "Users" },
      { href: "/admin/reports", label: "Reports" },
    ],
  },
  donor: {
    title: "Donor Hub",
    accentClass: "text-emerald-600",
    links: [
      { href: "/donor", label: "Overview" },
      { href: "/donor/donations", label: "My Donations" },
      { href: "/donor/history", label: "History" },
    ],
  },
  organization: {
    title: "Organization Hub",
    accentClass: "text-indigo-600",
    links: [
      { href: "/organization", label: "Overview" },
      { href: "/organization/campaigns", label: "Campaigns" },
      { href: "/organization/requests", label: "Requests" },
    ],
  },
};

const getRoleFromPath = (pathname: string): AccountType | null => {
  if (pathname.startsWith("/admin")) {
    return "admin";
  }

  if (pathname.startsWith("/donor")) {
    return "donor";
  }

  if (pathname.startsWith("/organization")) {
    return "organization";
  }

  return null;
};

export default function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();

  const role = profile?.accountType ?? getRoleFromPath(pathname) ?? "donor";
  const config = ROLE_SIDEBAR_CONFIG[role];

  return (
    <aside className="w-full rounded-3xl border border-zinc-200 bg-white p-4 lg:w-64">
      <h2
        className={`mb-3 px-2 text-sm font-semibold uppercase tracking-wide ${config.accentClass}`}
      >
        {config.title}
      </h2>
      <nav className="space-y-1">
        {config.links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== `/${role}` && pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
