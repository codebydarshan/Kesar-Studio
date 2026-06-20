"use server";

import { revalidatePath } from "next/cache";
import { eq, asc } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { teamMembers } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { teamMemberSchema } from "@/lib/validations";

export async function getTeamMembers() {
  if (!isDbConfigured()) return [];
  return db.select().from(teamMembers).orderBy(asc(teamMembers.displayOrder));
}

export async function getTeamMemberById(id: string) {
  const [member] = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.id, id))
    .limit(1);
  return member;
}

export async function createTeamMember(data: unknown) {
  await requireAdmin();
  const parsed = teamMemberSchema.parse(data);
  const [member] = await db
    .insert(teamMembers)
    .values({
      ...parsed,
      image: parsed.image || null,
      linkedin: parsed.linkedin || null,
      github: parsed.github || null,
    })
    .returning();
  revalidatePath("/about");
  revalidatePath("/admin/team");
  return member;
}

export async function updateTeamMember(id: string, data: unknown) {
  await requireAdmin();
  const parsed = teamMemberSchema.parse(data);
  const [member] = await db
    .update(teamMembers)
    .set({
      ...parsed,
      image: parsed.image || null,
      linkedin: parsed.linkedin || null,
      github: parsed.github || null,
    })
    .where(eq(teamMembers.id, id))
    .returning();
  revalidatePath("/about");
  revalidatePath("/admin/team");
  return member;
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
  revalidatePath("/about");
  revalidatePath("/admin/team");
}
