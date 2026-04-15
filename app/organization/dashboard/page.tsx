import RoleGate from "@/app/components/RoleGate";

export default function OrganizationDashboardPage() {
  return (
    <RoleGate allowedRoles={["organization"]}>
      <section className="min-h-screen bg-[#ededee] px-6 pb-24 pt-32 sm:px-10">
        <div className="mx-auto w-full max-w-6xl rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Organization Dashboard</h1>
          <p className="mt-4 text-zinc-600">
            Welcome organization. Manage blood drives, requests, and donor engagement.
          </p>
        </div>
      </section>
    </RoleGate>
  );
}
