"use client";

import { useEffect } from "react";
import { GlobalErrorUI } from "@/components/shared/error-ui";

export default function GlobalError({
  error,
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
        <GlobalErrorUI />
      </body>
    </html>
  );
}
