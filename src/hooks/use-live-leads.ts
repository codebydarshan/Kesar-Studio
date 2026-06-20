"use client";

import { useEffect, useRef } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { getLeads } from "@/app/actions/leads";
import type { Lead } from "@/db/schema";
import { ADMIN_POLL_INTERVAL_MS } from "@/lib/live-refresh";

const SWR_KEY = "admin-leads";

export type SerializedLead = Omit<Lead, "createdAt"> & { createdAt: string };

function serializeLeads(leads: Lead[]): SerializedLead[] {
  return leads.map((lead) => ({
    ...lead,
    createdAt:
      lead.createdAt instanceof Date
        ? lead.createdAt.toISOString()
        : String(lead.createdAt),
  }));
}

async function fetchLeads(): Promise<SerializedLead[]> {
  const leads = await getLeads();
  return serializeLeads(leads);
}

export function useLiveLeads(initialData?: SerializedLead[]) {
  const seenIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);
  const errorShownRef = useRef(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    SWR_KEY,
    fetchLeads,
    {
      refreshInterval: ADMIN_POLL_INTERVAL_MS,
      fallbackData: initialData,
      keepPreviousData: true,
      revalidateOnFocus: true,
      dedupingInterval: ADMIN_POLL_INTERVAL_MS / 2,
    }
  );

  useEffect(() => {
    if (!data) return;

    if (!initializedRef.current) {
      data.forEach((lead) => seenIdsRef.current.add(lead.id));
      initializedRef.current = true;
      return;
    }

    const newLeads = data.filter((lead) => !seenIdsRef.current.has(lead.id));
    newLeads.forEach((lead) => {
      toast("🔔 New Lead Received", {
        description: [lead.name, lead.company || undefined]
          .filter(Boolean)
          .join("\n"),
      });
      seenIdsRef.current.add(lead.id);
    });

    data.forEach((lead) => seenIdsRef.current.add(lead.id));
  }, [data]);

  useEffect(() => {
    if (!error) {
      errorShownRef.current = false;
      return;
    }

    if (!errorShownRef.current) {
      toast.error("Unable to refresh data.");
      errorShownRef.current = true;
    }
  }, [error]);

  return {
    leads: data ?? initialData ?? [],
    isLoading: isLoading && !data,
    isValidating,
    error,
    refresh: mutate,
  };
}
