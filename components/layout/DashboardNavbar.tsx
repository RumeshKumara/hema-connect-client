"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type AccountType } from "@/lib/userProfiles";
import { useAuth } from "@/context/AuthContext";

const ROLE_NAV_LINKS: Record<AccountType, Array<{ href: string; label: string }>> = {
  admin: [
    { href: "/admin", label: "Overview" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/reports", label: "Reports" },
  ],
  donor: [
    { href: "/donor", label: "Overview" },
    { href: "/donor/donations", label: "My Donations" },
    { href: "/donor/history", label: "History" },
  ],
  organization: [
    { href: "/organization", label: "Overview" },
    { href: "/organization/campaigns", label: "Campaigns" },
    { href: "/organization/requests", label: "Requests" },
  ],
};

const ROLE_THEME: Record<
  AccountType,
  {
    borderClass: string;
    activeLinkClass: string;
    hoverLinkClass: string;
    menuBorderClass: string;
    roleBadgeClass: string;
    roleLabel: string;
  }
> = {
  admin: {
    borderClass: "border-rose-500",
    activeLinkClass: "bg-rose-100 text-rose-700",
    hoverLinkClass: "hover:bg-rose-100/70 hover:text-rose-700",
    menuBorderClass: "border-rose-100",
    roleBadgeClass: "bg-rose-100 text-rose-700",
    roleLabel: "Admin",
  },
  donor: {
    borderClass: "border-emerald-500",
    activeLinkClass: "bg-emerald-100 text-emerald-700",
    hoverLinkClass: "hover:bg-emerald-100/70 hover:text-emerald-700",
    menuBorderClass: "border-emerald-100",
    roleBadgeClass: "bg-emerald-100 text-emerald-700",
    roleLabel: "Donor",
  },
  organization: {
    borderClass: "border-indigo-500",
    activeLinkClass: "bg-indigo-100 text-indigo-700",
    hoverLinkClass: "hover:bg-indigo-100/70 hover:text-indigo-700",
    menuBorderClass: "border-indigo-100",
    roleBadgeClass: "bg-indigo-100 text-indigo-700",
    roleLabel: "Organization",
  },
};

const ROLE_DASHBOARD_META: Record<
  AccountType,
  {
    homeHref: string;
    brandLabel: string;
    subtitle: string;
    iconClass: string;
    surfaceClass: string;
    dividerClass: string;
  }
> = {
  admin: {
    homeHref: "/admin",
    brandLabel: "Admin Dashboard",
    subtitle: "Operations and platform oversight",
    iconClass: "bg-rose-100 text-rose-600",
    surfaceClass: "bg-rose-50/60",
    dividerClass: "bg-rose-100",
  },
  donor: {
    homeHref: "/donor",
    brandLabel: "Donor Dashboard",
    subtitle: "Track your impact and donations",
    iconClass: "bg-emerald-100 text-emerald-600",
    surfaceClass: "bg-emerald-50/60",
    dividerClass: "bg-emerald-100",
  },
  organization: {
    homeHref: "/organization",
    brandLabel: "Organization Dashboard",
    subtitle: "Campaigns and request management",
    iconClass: "bg-indigo-100 text-indigo-600",
    surfaceClass: "bg-indigo-50/60",
    dividerClass: "bg-indigo-100",
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

export default function DashboardNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const languageOptions = ["English", "Sinhala", "Tamil"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeRole = profile?.accountType ?? getRoleFromPath(pathname) ?? "donor";
  const links = ROLE_NAV_LINKS[activeRole];
  const theme = ROLE_THEME[activeRole];
  const dashboardMeta = ROLE_DASHBOARD_META[activeRole];
  const isLinkActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  const handleSignOut = async () => {
    closeMenus();
    await signOut();
    router.push("/login");
  };

  if (activeRole === "admin") {
    return (
      <header className="fixed left-0 right-0 top-0 z-30 px-4 pt-4 sm:px-6">
        <nav
          className={`mx-auto flex w-full items-center gap-3 rounded-full border-l-3 border-rose-500 bg-rose-50/60 px-4 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out sm:gap-4 sm:px-6 ${
            isScrolled ? "max-w-6xl" : "max-w-7xl"
          }`}
        >
          <Link
            href="/admin"
            className="flex min-w-0 shrink-0 items-center gap-3 rounded-full px-1 py-1"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-100 text-rose-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
              </svg>
            </span>
            <span className="hidden text-lg font-semibold tracking-tight text-zinc-900 sm:block">
              Admin Dashboard
            </span>
          </Link>

          <div className="mx-1 min-w-0 flex-1 sm:mx-3">
            <label htmlFor="admin-navbar-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-zinc-500">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                id="admin-navbar-search"
                type="search"
                placeholder="Search users, reports, campaigns..."
                className="h-10 w-full rounded-full border border-rose-200 bg-white pl-10 pr-3 text-sm text-zinc-800 placeholder:text-zinc-500 focus:border-rose-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
                {profile?.fullName?.slice(0, 1)?.toUpperCase() || "A"}
              </span>
              <div className="pr-1 sm:pr-2">
                <p className="max-w-24 truncate text-xs font-medium text-zinc-900 sm:max-w-32 sm:text-sm">
                  {profile?.fullName || "Admin User"}
                </p>
                <p className="text-[11px] text-zinc-500 sm:text-xs">Administrator</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex w-full items-center justify-between gap-3 rounded-full border-l-3 px-4 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out sm:px-8 ${dashboardMeta.surfaceClass} ${theme.borderClass} ${
          isScrolled ? "max-w-6xl" : "max-w-7xl"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${dashboardMeta.iconClass}`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
            >
              <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
            </svg>
          </span>
          <Link href={dashboardMeta.homeHref} onClick={closeMenus} className="min-w-0">
            <span className="block truncate text-xl font-semibold tracking-tight text-[#222]">
              {dashboardMeta.brandLabel}
            </span>
            <span className="hidden truncate text-xs text-zinc-600 lg:block">
              {dashboardMeta.subtitle}
            </span>
          </Link>
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-5 py-2.5 text-base leading-none font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffd8d8] ${
                  isActive
                    ? theme.activeLinkClass
                    : `text-[#232323] ${theme.hoverLinkClass}`
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 sm:gap-4 md:flex">
          {user && profile ? (
            <span className="hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 lg:inline-flex">
              {profile.fullName}
            </span>
          ) : null}

          <div ref={languageMenuRef} className="relative hidden md:block">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isLanguageMenuOpen}
              onClick={() => setIsLanguageMenuOpen((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#222] transition hover:bg-red-50/70"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
              {selectedLanguage}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={`h-4 w-4 transition-transform ${
                  isLanguageMenuOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isLanguageMenuOpen ? (
              <div
                role="menu"
                className={`absolute right-0 top-full z-40 mt-2 min-w-36 overflow-hidden rounded-2xl border bg-white py-1 shadow-[0_10px_25px_rgba(0,0,0,0.15)] ${theme.menuBorderClass}`}
              >
                {languageOptions.map((language) => {
                  const isSelected = selectedLanguage === language;

                  return (
                    <button
                      key={language}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition ${
                        isSelected
                          ? theme.activeLinkClass
                          : `text-[#222] ${theme.hoverLinkClass}`
                      }`}
                    >
                      {language}
                      {isSelected ? <span aria-hidden="true">✓</span> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${theme.roleBadgeClass}`}>
            {theme.roleLabel} View
          </span>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-dashboard-nav-menu"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-full text-[#222] transition hover:bg-red-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f4f4] md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {isMobileMenuOpen ? (
              <path d="M6 6l12 12M18 6l-12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen ? (
        <div
          id="mobile-dashboard-nav-menu"
          className={`mx-auto mt-2 w-full max-w-7xl overflow-hidden rounded-3xl border p-3 shadow-[0_10px_25px_rgba(0,0,0,0.16)] md:hidden ${dashboardMeta.surfaceClass} ${theme.menuBorderClass}`}
        >
          <div className="grid gap-1">
            {links.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f4f4] ${
                    isActive
                      ? theme.activeLinkClass
                      : `text-[#232323] ${theme.hoverLinkClass}`
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className={`my-3 h-px ${dashboardMeta.dividerClass}`} />

          {user && profile ? (
            <div className="mb-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
              Signed in as <span className="font-semibold text-zinc-900">{profile.fullName}</span>
            </div>
          ) : null}

          <div className="grid gap-2">
            {languageOptions.map((language) => {
              const isSelected = selectedLanguage === language;

              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => setSelectedLanguage(language)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? theme.activeLinkClass
                      : `text-[#222] ${theme.hoverLinkClass}`
                  }`}
                >
                  {language}
                  {isSelected ? <span aria-hidden="true">✓</span> : null}
                </button>
              );
            })}
          </div>

          <div className={`my-3 h-px ${dashboardMeta.dividerClass}`} />

          <div className="grid gap-2">
            <span className={`rounded-full px-4 py-2.5 text-center text-sm font-semibold ${theme.roleBadgeClass}`}>
              {theme.roleLabel} View
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
