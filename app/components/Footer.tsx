import Link from "next/link";

export default function Footer() {
  // Use the current year so copyright text stays up to date.
  const currentYear = new Date().getFullYear();

  return (
    // Footer with brand, copyright, and spacer for desktop alignment.
    <footer className=" border-t-1 border-red-500 bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
        {/* Brand block linking back to home page. */}
        <Link href="/" className="flex items-center gap-3 justify-self-start">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#efecec] text-red-500 shadow-[0_0_0_8px_rgba(255,255,255,0.1),0_0_34px_10px_rgba(255,255,255,0.18)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
            >
              <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
            </svg>
          </span>
          <span className="text-2xl font-semibold tracking-tight text-[#2b2b2f]">
            HemaFlow
          </span>
        </Link>

        {/* Centered legal and mission statement text. */}
        <p className="justify-self-end text-right text-sm font-medium leading-relaxed text-[#3b3b3f]">
          &copy; {currentYear} HemaFlow. All rights reserved. Saving lives through
          blood donation.
        </p>

        {/* Empty column keeps centered text aligned on desktop grid. */}
        <div className="hidden md:block" />
      </div>
    </footer>
  );
}
