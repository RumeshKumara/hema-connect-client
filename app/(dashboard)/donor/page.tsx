import RoleGate from "@/components/auth/RoleGate";
import Link from "next/link";
import DonorWidgets from "@/components/dashboard/DonorWidgets";

export default function DonorDashboardPage() {
  return (
    <RoleGate allowedRoles={["donor"]}>
      <div className="rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Donor Dashboard</h1>
        <p className="mt-4 text-zinc-600">
          Welcome donor. Track your donation history, eligibility, and nearby campaigns.
        </p>
        <div className="mt-6">
          <DonorWidgets />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/donor/donations" className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
            My Donations
          </Link>
          <Link href="/donor/history" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800">
            History
          </Link>
        </div>
      </div>
    </RoleGate>
  );
}
