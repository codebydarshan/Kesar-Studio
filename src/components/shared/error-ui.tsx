import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface ErrorUIProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  statusCode?: number;
}

export function ErrorUI({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again or return to the homepage.",
  showRetry = false,
  onRetry,
  statusCode,
}: ErrorUIProps) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
      </div>
      {statusCode && (
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Error {statusCode}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-md text-muted-foreground">{message}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {showRetry && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            Try again
          </button>
        )}
        <LinkButton href="/" variant={showRetry ? "outline" : "default"}>
          <Home className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to Home
        </LinkButton>
      </div>
    </main>
  );
}

export function NotFoundUI() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="mb-2 text-7xl font-bold text-primary/30" aria-hidden="true">
        404
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/">Back to Home</LinkButton>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
