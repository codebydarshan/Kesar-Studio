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
    <ErrorUI
      title="Something went wrong"
      message="We encountered an unexpected error while loading this page. You can try again or use the links below to get back on track."
      showRetry
      onRetry={reset}
    />
  );
}
