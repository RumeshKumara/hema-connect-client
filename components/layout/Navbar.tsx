"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
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

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  return (
    // Fixed site header with brand, nav links, and action buttons.
    <header className="fixed left-0 right-0 top-0 z-30 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex w-full items-center justify-between gap-3 rounded-full border-l-3 border-red-500 bg-[#f4f4f4] px-4 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out sm:px-8 ${
          isScrolled ? "max-w-6xl" : "max-w-7xl"
        }`}
      >
        {/* Brand area with logo icon and home link. */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e8e8e8] text-red-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
            >
              <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
            </svg>
          </span>
          <Link
            href="/"
            onClick={closeMenus}
            className="truncate text-xl font-semibold tracking-tight text-[#222]"
          >
            HemaFlow
          </Link>
        </div>

        {/* Desktop navigation links with active state styling. */}
        <div className="ml-auto hidden items-center gap-2 md:flex">
          {PUBLIC_LINKS.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-5 py-2.5 text-base leading-none font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffd8d8] ${
                  isActive
                    ? "bg-red-50 text-red-700"
                    : "text-[#232323] hover:bg-red-50/70 hover:text-red-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop utility actions: language switch and auth buttons. */}
        <div className="hidden items-center gap-3 sm:gap-4 md:flex">
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
                className="absolute right-0 top-full z-40 mt-2 min-w-36 overflow-hidden rounded-2xl border border-red-100 bg-white py-1 shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
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
                          ? "bg-red-50 text-red-700"
                          : "text-[#222] hover:bg-red-50/70 hover:text-red-600"
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

          <Link
            href="/login"
            onClick={closeMenus}
            className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu toggle shown on smaller screens. */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
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

      {/* Mobile collapsible menu with navigation and auth actions. */}
      {isMobileMenuOpen ? (
        <div
          id="mobile-nav-menu"
          className="mx-auto mt-2 w-full max-w-7xl overflow-hidden rounded-3xl border border-red-100 bg-[#f8f8f8] p-3 shadow-[0_10px_25px_rgba(0,0,0,0.16)] md:hidden"
        >
          <div className="grid gap-1">
            {PUBLIC_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f4f4] ${
                    isActive
                      ? "bg-red-50 text-red-700"
                      : "text-[#232323] hover:bg-red-50/70 hover:text-red-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="my-3 h-px bg-red-100" />

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
                      ? "bg-red-50 text-red-700"
                      : "text-[#222] hover:bg-red-50/70 hover:text-red-600"
                  }`}
                >
                  {language}
                  {isSelected ? <span aria-hidden="true">✓</span> : null}
                </button>
              );
            })}
          </div>

          <div className="my-3 h-px bg-red-100" />

          <div className="grid gap-2">
            <Link
              href="/login"
              onClick={closeMenus}
              className="rounded-full bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-red-600"
            >
              Login
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
