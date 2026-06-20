import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { users } from "@/db/schema";

export async function getCurrentClerkUser() {
  return currentUser();
}

export async function getCurrentClerkUserId() {
  const { userId } = await auth();
  return userId;
}

export async function getCurrentDbUser(): Promise<typeof users.$inferSelect | null> {
  const clerkUserId = await getCurrentClerkUserId();
  if (!clerkUserId || !isDbConfigured()) {
    return null;
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkUserId))
      .limit(1);

    return user ?? null;
  } catch {
    return null;
  }
}

export type CurrentUser = {
  clerk: NonNullable<Awaited<ReturnType<typeof getCurrentClerkUser>>>;
  db: NonNullable<Awaited<ReturnType<typeof getCurrentDbUser>>>;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const [clerk, dbUser] = await Promise.all([
    getCurrentClerkUser(),
    getCurrentDbUser(),
  ]);

  if (!clerk || !dbUser) {
    return null;
  }

  return { clerk, db: dbUser };
}
