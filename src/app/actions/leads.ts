"use server";

import { revalidatePath } from "next/cache";
import { eq, desc, count } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { leads } from "@/db/schema";
import type { LeadStatus } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { contactSchema, leadStatusSchema } from "@/lib/validations";
import { sendLeadNotification } from "@/lib/resend";

export async function getLeads() {
  await requireAdmin();
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function getLeadStats() {
  if (!isDbConfigured()) return { total: 0, new: 0 };
  try {
    await requireAdmin();
  } catch {
    return { total: 0, new: 0 };
  }
  const [total] = await db.select({ count: count() }).from(leads);
  const [newLeads] = await db
    .select({ count: count() })
    .from(leads)
    .where(eq(leads.status, "NEW"));
  return {
    total: total.count,
    new: newLeads.count,
  };
}

export async function submitContactForm(data: unknown) {
  if (!isDbConfigured()) {
    throw new Error("Database is not configured");
  }

  const parsed = contactSchema.parse(data);

  const [lead] = await db
    .insert(leads)
    .values({
      name: parsed.name,
      email: parsed.email,
      company: parsed.company || null,
      phone: parsed.phone || null,
      budget: parsed.budget || null,
      projectType: parsed.projectType || null,
      message: parsed.message,
    })
    .returning();

  const emailResult = await sendLeadNotification(lead);
  if (!emailResult.sent) {
    console.warn("Lead saved but email notification was not sent.", emailResult);
  }

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAdmin();
  leadStatusSchema.parse(status);
  await db.update(leads).set({ status }).where(eq(leads.id, id));
  revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
  await requireAdmin();
  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/admin/leads");
}
