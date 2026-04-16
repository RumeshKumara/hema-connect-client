import RoleGate from "@/components/auth/RoleGate";
import Link from "next/link";
import OrganizationWidgets from "@/components/dashboard/OrganizationWidgets";

export default function OrganizationDashboardPage() {
  return (
    <RoleGate allowedRoles={["organization"]}>
      <div className="rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Organization Dashboard</h1>
        <p className="mt-4 text-zinc-600">
          Welcome organization. Manage blood drives, requests, and donor engagement.
        </p>
        <div className="mt-6">
          <OrganizationWidgets />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/organization/campaigns" className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
            Campaigns
          </Link>
          <Link href="/organization/requests" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800">
            Requests
          </Link>
        </div>
      </div>
    </RoleGate>
  );
}
