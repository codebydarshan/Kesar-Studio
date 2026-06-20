"use client";

import { SignOutButton } from "@clerk/nextjs";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminUnauthorizedProps {
  clerkUserId?: string | null;
  email?: string | null;
}

export function AdminUnauthorized({ clerkUserId, email }: AdminUnauthorizedProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <ShieldX className="h-7 w-7 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Access denied</h1>
          <p className="mt-2 text-muted-foreground">
            Your account is signed in with Clerk but is not registered as an
            administrator in the database.
          </p>
        </div>
        {(clerkUserId || email) && (
          <div className="rounded-lg border border-border bg-card p-4 text-left text-sm space-y-2">
            {email && (
              <p>
                <span className="text-muted-foreground">Email:</span> {email}
              </p>
            )}
            {clerkUserId && (
              <p className="break-all">
                <span className="text-muted-foreground">Clerk ID:</span>{" "}
                <code className="text-primary">{clerkUserId}</code>
              </p>
            )}
            <p className="text-muted-foreground text-xs pt-1">
              Add this user to the <code>users</code> table with role{" "}
              <code>ADMIN</code> in Neon, then sign in again.
            </p>
          </div>
        )}
        <SignOutButton redirectUrl="/admin/sign-in">
          <Button variant="outline">Sign out and try again</Button>
        </SignOutButton>
      </div>
    </div>
  );
}
