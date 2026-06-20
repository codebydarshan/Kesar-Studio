"use client";

import { useEffect, useRef } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { getDashboardStats, type DashboardStats } from "@/app/actions/admin-live";
import { ADMIN_POLL_INTERVAL_MS } from "@/lib/live-refresh";

const SWR_KEY = "admin-dashboard-stats";

const defaultStats: DashboardStats = {
  projects: 0,
  testimonials: 0,
  team: 0,
  newLeads: 0,
  totalLeads: 0,
};

export function useDashboardStats(initialData?: DashboardStats) {
  const errorShownRef = useRef(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    SWR_KEY,
    getDashboardStats,
    {
      refreshInterval: ADMIN_POLL_INTERVAL_MS,
      fallbackData: initialData,
      keepPreviousData: true,
      revalidateOnFocus: true,
      dedupingInterval: ADMIN_POLL_INTERVAL_MS / 2,
    }
  );

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
    stats: data ?? initialData ?? defaultStats,
    isLoading: isLoading && !data,
    isValidating,
    error,
    refresh: mutate,
  };
}
