import RoleGate from "@/components/auth/RoleGate";
import Link from "next/link";
import AdminWidgets from "@/components/dashboard/AdminWidgets";

export default function AdminDashboardPage() {
  return (
    <RoleGate allowedRoles={["admin"]}>
      <div className="rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Admin Dashboard</h1>
        <p className="mt-4 text-zinc-600">
          Welcome admin. You can manage campaigns, users, and system-wide settings here.
        </p>
        <div className="mt-6">
          <AdminWidgets />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/users" className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
            Manage Users
          </Link>
          <Link href="/admin/reports" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800">
            View Reports
          </Link>
        </div>
      </div>
    </RoleGate>
  );
}
