"use server";

import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { testimonials } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validations";

export async function getTestimonials() {
  if (!isDbConfigured()) return [];
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getFeaturedTestimonials() {
  if (!isDbConfigured()) return [];
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.featured, true))
    .orderBy(desc(testimonials.createdAt))
    .limit(3);
}

export async function getTestimonialById(id: string) {
  const [testimonial] = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, id))
    .limit(1);
  return testimonial;
}

export async function createTestimonial(data: unknown) {
  await requireAdmin();
  const parsed = testimonialSchema.parse(data);
  const [testimonial] = await db
    .insert(testimonials)
    .values({
      ...parsed,
      image: parsed.image || null,
    })
    .returning();
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/about");
  revalidatePath("/");
  return testimonial;
}

export async function updateTestimonial(id: string, data: unknown) {
  await requireAdmin();
  const parsed = testimonialSchema.parse(data);
  const [testimonial] = await db
    .update(testimonials)
    .set({
      ...parsed,
      image: parsed.image || null,
    })
    .where(eq(testimonials.id, id))
    .returning();
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/about");
  revalidatePath("/");
  return testimonial;
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/about");
  revalidatePath("/");
}
