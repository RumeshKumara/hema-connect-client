export default function AdminWidgets() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Total Users</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">1,240</p>
      </article>
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Active Campaigns</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">86</p>
      </article>
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Pending Reports</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">12</p>
      </article>
    </div>
  );
}
