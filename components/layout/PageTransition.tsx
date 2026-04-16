"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    // Smoothly return to top after route changes for a softer navigation feel.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
