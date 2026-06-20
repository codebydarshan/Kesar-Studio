import type { Metadata } from "next";
import { getLeads } from "@/app/actions/leads";
import { LiveLeadsTable } from "@/components/admin/live-leads-table";
import type { SerializedLead } from "@/hooks/use-live-leads";

export const metadata: Metadata = {
  title: "Leads",
};

export const dynamic = "force-dynamic";

function serializeLeads(
  leads: Awaited<ReturnType<typeof getLeads>>
): SerializedLead[] {
  return leads.map((lead) => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
  }));
}

export default async function AdminLeadsPage() {
  const initialLeads = serializeLeads(await getLeads());

  return <LiveLeadsTable initialLeads={initialLeads} />;
}
