import Link from "next/link";

const dashboardLinks = [
  { href: "/admin", label: "Admin" },
  { href: "/donor", label: "Donor" },
  { href: "/organization", label: "Organization" },
];

export default function Sidebar() {
  return (
    <aside className="w-full rounded-3xl border border-zinc-200 bg-white p-4 lg:w-64">
      <h2 className="mb-3 px-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Dashboard
      </h2>
      <nav className="space-y-1">
        {dashboardLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
