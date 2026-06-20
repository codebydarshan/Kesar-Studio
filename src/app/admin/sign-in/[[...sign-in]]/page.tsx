import { SignIn } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/auth";
import { SITE_NAME } from "@/lib/constants";
import { AdminUnauthorized } from "@/components/admin/admin-unauthorized";

export default async function AdminSignInPage() {
  const admin = await currentAdmin();
  if (admin) {
    redirect("/admin/dashboard");
  }

  const { userId } = await auth();

  // Signed in with Clerk but not in DB as admin — do NOT render <SignIn />
  // or Clerk will redirect back to /admin/dashboard and cause an infinite loop.
  if (userId) {
    const clerkUser = await currentUser();
    return (
      <AdminUnauthorized
        clerkUserId={userId}
        email={clerkUser?.primaryEmailAddress?.emailAddress}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
            K
          </div>
          <h1 className="text-2xl font-bold">{SITE_NAME}</h1>
          <p className="text-muted-foreground mt-1">Administrator sign in</p>
        </div>
        <SignIn
          routing="path"
          path="/admin/sign-in"
          forceRedirectUrl="/admin/dashboard"
          signUpUrl="/admin/sign-in"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-card border border-border shadow-none",
            },
          }}
        />
      </div>
    </div>
  );
}
