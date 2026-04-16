export async function getOrganizationCampaigns(organizationId: string) {
  return Promise.resolve([
    { id: "cp-1", organizationId, title: "Spring Blood Drive", status: "active" },
    { id: "cp-2", organizationId, title: "Campus Outreach", status: "draft" },
  ]);
}
