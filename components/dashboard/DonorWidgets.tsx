export default function DonorWidgets() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Lifetime Donations</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">9</p>
      </article>
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Last Donation</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">14 days</p>
      </article>
      <article className="rounded-2xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-500">Upcoming Slots</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">3</p>
      </article>
    </div>
  );
}
