export default function OrganizationWidgets() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Running Campaigns</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">5</p>
      </article>
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Open Requests</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">18</p>
      </article>
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Donors Reached</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">2,840</p>
      </article>
    </div>
  );
}
