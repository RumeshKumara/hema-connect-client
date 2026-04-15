import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageTransition from "./components/PageTransition";
import SiteChrome from "./components/SiteChrome";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hema Connect",
  description: "Home, About, and Contact pages for Hema Connect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <AuthProvider>
          <SiteChrome>
            <main className="flex flex-1 flex-col">
              <PageTransition>{children}</PageTransition>
            </main>
          </SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
