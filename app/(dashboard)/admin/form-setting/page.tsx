import RoleGate from "@/components/auth/RoleGate";

export default function AdminFormSettingPage() {
  return (
    <RoleGate allowedRoles={["admin"]}>
      <div className="rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Form Setting</h1>
        <p className="mt-3 text-zinc-600">
          Configure admin-side form defaults, validation behavior, and submission preferences.
        </p>
      </div>
    </RoleGate>
  );
}
