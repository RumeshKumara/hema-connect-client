import RoleGate from "@/components/auth/RoleGate";

export default function OrganizationRequestsPage() {
  return (
    <RoleGate allowedRoles={["organization"]}>
      <div className="rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Blood Requests</h1>
        <p className="mt-3 text-zinc-600">Monitor and respond to incoming blood requests quickly.</p>
      </div>
    </RoleGate>
  );
}
