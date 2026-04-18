"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import DashboardNavbar from "./DashboardNavbar";
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
  const isDashboardRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/donor") ||
    pathname.startsWith("/organization");

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {isDashboardRoute ? <DashboardNavbar /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
}
