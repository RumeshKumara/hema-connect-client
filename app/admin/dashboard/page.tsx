import RoleGate from "@/app/components/RoleGate";

export default function AdminDashboardPage() {
  return (
    <RoleGate allowedRoles={["admin"]}>
      <section className="min-h-screen bg-[#ededee] px-6 pb-24 pt-32 sm:px-10">
        <div className="mx-auto w-full max-w-6xl rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Admin Dashboard</h1>
          <p className="mt-4 text-zinc-600">
            Welcome admin. You can manage campaigns, users, and system-wide settings here.
          </p>
        </div>
      </section>
    </RoleGate>
  );
}
