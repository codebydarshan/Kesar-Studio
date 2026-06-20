"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEAD_STATUSES } from "@/lib/constants";
import { updateLeadStatus } from "@/app/actions/leads";
import type { LeadStatus } from "@/db/schema";
import { toast } from "sonner";

interface LeadStatusSelectProps {
  leadId: string;
  currentStatus: string;
}

export function LeadStatusSelect({ leadId, currentStatus }: LeadStatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    if (!value) return;
    startTransition(async () => {
      try {
        await updateLeadStatus(leadId, value as LeadStatus);
        toast.success("Status updated");
      } catch {
        toast.error("Failed to update status");
      }
    });
  }

  return (
    <Select
      value={currentStatus}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LEAD_STATUSES.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
