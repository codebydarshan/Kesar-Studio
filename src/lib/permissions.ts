import type { User, UserRole } from "@/db/schema";

export function isAdminRole(role: UserRole | null | undefined): boolean {
  return role === "ADMIN";
}

export function canAccessAdmin(user: User | null | undefined): boolean {
  return user !== null && user !== undefined && isAdminRole(user.role);
}

export function assertAdminAccess(user: User | null | undefined): asserts user is User {
  if (!canAccessAdmin(user)) {
    throw new Error("Forbidden: admin access required");
  }
}
