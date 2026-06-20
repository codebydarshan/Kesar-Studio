"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { toast } from "sonner";
import { getPublicContentVersion } from "@/app/actions/admin-live";
import { PUBLIC_CONTENT_POLL_INTERVAL_MS } from "@/lib/live-refresh";

export function ContentFreshnessNotifier({
  initialVersion,
}: {
  initialVersion: string;
}) {
  const router = useRouter();
  const baselineRef = useRef(initialVersion);
  const notifiedRef = useRef(false);

  const { data } = useSWR("public-content-version", getPublicContentVersion, {
    refreshInterval: PUBLIC_CONTENT_POLL_INTERVAL_MS,
    fallbackData: { version: initialVersion },
    revalidateOnFocus: false,
    dedupingInterval: PUBLIC_CONTENT_POLL_INTERVAL_MS / 2,
  });

  useEffect(() => {
    if (!data?.version || data.version === baselineRef.current) return;
    if (notifiedRef.current) return;

    notifiedRef.current = true;
    toast("✨ New content available", {
      description: "Refresh to see updates",
      duration: 10000,
      action: {
        label: "Refresh",
        onClick: () => router.refresh(),
      },
    });
  }, [data?.version, router]);

  return null;
}
