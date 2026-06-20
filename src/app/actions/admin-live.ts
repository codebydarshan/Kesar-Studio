"use server";

import { count, eq, max } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { leads, projects, testimonials, teamMembers } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";

export type DashboardStats = {
  projects: number;
  testimonials: number;
  team: number;
  newLeads: number;
  totalLeads: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isDbConfigured()) {
    return { projects: 0, testimonials: 0, team: 0, newLeads: 0, totalLeads: 0 };
  }

  await requireAdmin();

  const [[projectsRow], [testimonialsRow], [teamRow], [totalLeadsRow], [newLeadsRow]] =
    await Promise.all([
      db.select({ count: count() }).from(projects),
      db.select({ count: count() }).from(testimonials),
      db.select({ count: count() }).from(teamMembers),
      db.select({ count: count() }).from(leads),
      db.select({ count: count() }).from(leads).where(eq(leads.status, "NEW")),
    ]);

  return {
    projects: projectsRow.count,
    testimonials: testimonialsRow.count,
    team: teamRow.count,
    newLeads: newLeadsRow.count,
    totalLeads: totalLeadsRow.count,
  };
}

export async function getPublicContentVersion(): Promise<{ version: string }> {
  if (!isDbConfigured()) {
    return { version: "0" };
  }

  const [[projectRow], [testimonialRow], [teamRow]] = await Promise.all([
    db
      .select({
        count: count(),
        latest: max(projects.updatedAt),
      })
      .from(projects),
    db
      .select({
        count: count(),
        latest: max(testimonials.createdAt),
      })
      .from(testimonials),
    db
      .select({
        count: count(),
        latest: max(teamMembers.createdAt),
      })
      .from(teamMembers),
  ]);

  return {
    version: [
      projectRow.count,
      projectRow.latest?.getTime() ?? 0,
      testimonialRow.count,
      testimonialRow.latest?.getTime() ?? 0,
      teamRow.count,
      teamRow.latest?.getTime() ?? 0,
    ].join("-"),
  };
}
