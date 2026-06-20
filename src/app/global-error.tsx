"use client";

import { useEffect } from "react";
import { ErrorUI } from "@/components/shared/error-ui";

export default function GlobalError({
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
    <html lang="en" className="dark h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <ErrorUI
          showRetry
          onRetry={reset}
          message="A critical error occurred. Please try again."
        />
      </body>
    </html>
  );
}
