"use client";

import { useEffect } from "react";
import { ErrorUI } from "@/components/shared/error-ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-1 flex-col">
      <ErrorUI
        showRetry
        onRetry={reset}
        message="We encountered an unexpected error while loading this page."
      />
    </div>
  );
}
