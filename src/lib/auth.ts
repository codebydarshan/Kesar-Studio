import type { User } from "@/db/schema";
import { getCurrentDbUser } from "@/lib/current-user";
import { canAccessAdmin } from "@/lib/permissions";

export async function currentAdmin(): Promise<User | null> {
  const user = await getCurrentDbUser();
  if (!canAccessAdmin(user)) {
    return null;
  }
  return user;
}

export async function isAdmin(): Promise<boolean> {
  const admin = await currentAdmin();
  return admin !== null;
}

export async function requireAdmin(): Promise<User> {
  const admin = await currentAdmin();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
