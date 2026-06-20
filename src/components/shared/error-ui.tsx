import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

function RecoveryLink({
  href,
  children,
  variant = "default",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant }), className)}
    >
      {children}
    </a>
  );
}

interface ErrorUIProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

export function ErrorUI({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again or return to the homepage.",
  showRetry = false,
  onRetry,
}: ErrorUIProps) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-md text-muted-foreground">{message}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {showRetry && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            Try Again
          </button>
        )}
        <RecoveryLink href="/" variant={showRetry ? "outline" : "default"}>
          <Home className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to Home
        </RecoveryLink>
        <RecoveryLink href="/contact" variant="outline">
          Contact Us
        </RecoveryLink>
      </div>
    </main>
  );
}

export function NotFoundUI() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p
        className="mb-2 text-7xl font-bold text-primary/30"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Head back home or get in touch — we&apos;re happy to help.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <RecoveryLink href="/">
          <Home className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to Home
        </RecoveryLink>
        <RecoveryLink href="/contact" variant="outline">
          Contact Us
        </RecoveryLink>
      </div>
    </main>
  );
}

export function GlobalErrorUI() {
  function handleReload() {
    window.location.reload();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Critical Error
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Something unexpected happened and the application could not recover.
        Reload the site or return home to continue.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={handleReload}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Reload Site
        </button>
        <RecoveryLink href="/" variant="outline">
          <Home className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to Home
        </RecoveryLink>
        <RecoveryLink href="/contact" variant="outline">
          Contact Us
        </RecoveryLink>
      </div>
    </main>
  );
}
