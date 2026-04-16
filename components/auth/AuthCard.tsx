import Link from "next/link";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  maxWidthClassName?: string;
};

export default function AuthCard({
  title,
  subtitle,
  children,
  maxWidthClassName = "max-w-md",
}: AuthCardProps) {
  return (
    <div className={`mx-auto w-full ${maxWidthClassName} rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10`}>
      <Link href="/" className="mb-6 inline-flex w-full flex-col items-center gap-1 text-center">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e8e8e8] text-red-500">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
          </svg>
        </span>
        <span className="text-base font-semibold tracking-tight text-[#222]">HemaFlow</span>
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{title}</h1>
      <p className="mt-2 text-sm text-zinc-600">{subtitle}</p>
      {children}
    </div>
  );
}
