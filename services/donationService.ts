export async function getDonationsByUser(userId: string) {
  return Promise.resolve([
    { id: "dn-1", userId, date: "2026-04-01", status: "completed" },
    { id: "dn-2", userId, date: "2026-05-10", status: "scheduled" },
  ]);
}
