"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";

type SiteChromeProps = {
  children: ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/register/");

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
