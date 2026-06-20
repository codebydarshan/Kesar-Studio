"use client";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteLead } from "@/app/actions/leads";
import { DeleteButton } from "@/components/admin/delete-button";
import { LeadStatusSelect } from "@/components/admin/lead-status-select";
import { EmptyState } from "@/components/shared/empty-state";
import { Inbox } from "lucide-react";
import { useLiveLeads, type SerializedLead } from "@/hooks/use-live-leads";
import { AdminTableSkeleton } from "@/components/shared/page-skeletons";

interface LiveLeadsTableProps {
  initialLeads: SerializedLead[];
}

export function LiveLeadsTable({ initialLeads }: LiveLeadsTableProps) {
  const { leads, isLoading, isValidating } = useLiveLeads(initialLeads);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage contact form inquiries from potential clients.
          </p>
        </div>
        {isValidating && !isLoading && (
          <Loader2
            className="h-4 w-4 shrink-0 animate-spin text-muted-foreground mt-2"
            aria-label="Refreshing leads"
          />
        )}
      </div>

      {isLoading ? (
        <AdminTableSkeleton rows={6} />
      ) : leads.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No leads yet"
          description="Contact form submissions will appear here when visitors reach out through the website."
        />
      ) : (
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-primary hover:underline"
                    >
                      {lead.email}
                    </a>
                  </TableCell>
                  <TableCell>{lead.phone || "—"}</TableCell>
                  <TableCell>{lead.company || "—"}</TableCell>
                  <TableCell>{lead.budget || "—"}</TableCell>
                  <TableCell>{lead.projectType || "—"}</TableCell>
                  <TableCell className="max-w-xs truncate">{lead.message}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(lead.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteButton
                      id={lead.id}
                      label="lead"
                      onDelete={deleteLead}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
