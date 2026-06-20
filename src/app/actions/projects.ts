"use server";

import { revalidatePath } from "next/cache";
import { eq, desc, asc } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import {
  projects,
  technologies,
  projectTechnologies,
  projectImages,
} from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";

export type ProjectWithDetails = Awaited<
  ReturnType<typeof getProjectById>
>;

async function syncProjectTechnologies(
  projectId: string,
  technologyNames: string[]
) {
  const names = [...new Set(technologyNames.map((n) => n.trim()).filter(Boolean))];

  await db
    .delete(projectTechnologies)
    .where(eq(projectTechnologies.projectId, projectId));

  if (names.length === 0) return;

  const techIds: string[] = [];
  for (const name of names) {
    const [existing] = await db
      .select()
      .from(technologies)
      .where(eq(technologies.name, name))
      .limit(1);

    if (existing) {
      techIds.push(existing.id);
    } else {
      const [created] = await db
        .insert(technologies)
        .values({ name })
        .returning();
      techIds.push(created.id);
    }
  }

  if (techIds.length > 0) {
    await db.insert(projectTechnologies).values(
      techIds.map((technologyId) => ({ projectId, technologyId }))
    );
  }
}

async function syncProjectImages(
  projectId: string,
  galleryImages: { imageUrl: string; displayOrder: number }[]
) {
  await db.delete(projectImages).where(eq(projectImages.projectId, projectId));

  if (galleryImages.length === 0) return;

  await db.insert(projectImages).values(
    galleryImages.map((img, index) => ({
      projectId,
      imageUrl: img.imageUrl,
      displayOrder: img.displayOrder ?? index,
    }))
  );
}

export async function getTechnologies() {
  if (!isDbConfigured()) return [];
  return db.select().from(technologies).orderBy(asc(technologies.name));
}

export async function getProjects() {
  if (!isDbConfigured()) return [];
  return db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function getFeaturedProjects() {
  if (!isDbConfigured()) return [];
  return db
    .select()
    .from(projects)
    .where(eq(projects.featured, true))
    .orderBy(desc(projects.createdAt))
    .limit(3);
}

export async function getProjectTechnologies(projectId: string) {
  const rows = await db
    .select({ name: technologies.name })
    .from(projectTechnologies)
    .innerJoin(technologies, eq(projectTechnologies.technologyId, technologies.id))
    .where(eq(projectTechnologies.projectId, projectId));
  return rows.map((r) => r.name);
}

export async function getProjectGallery(projectId: string) {
  return db
    .select()
    .from(projectImages)
    .where(eq(projectImages.projectId, projectId))
    .orderBy(asc(projectImages.displayOrder));
}

export async function getProjectBySlug(slug: string) {
  if (!isDbConfigured()) return undefined;
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  if (!project) return undefined;

  const [techNames, images] = await Promise.all([
    getProjectTechnologies(project.id),
    getProjectGallery(project.id),
  ]);

  return { ...project, technologyNames: techNames, galleryImages: images };
}

export async function getProjectById(id: string) {
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  if (!project) return undefined;

  const [techNames, images] = await Promise.all([
    getProjectTechnologies(project.id),
    getProjectGallery(project.id),
  ]);

  return {
    ...project,
    technologyNames: techNames,
    galleryImages: images.map((img) => ({
      imageUrl: img.imageUrl,
      displayOrder: img.displayOrder,
    })),
  };
}

export async function createProject(data: unknown) {
  await requireAdmin();
  const parsed = projectSchema.parse(data);

  const { technologyNames, galleryImages, ...projectData } = parsed;

  const [project] = await db
    .insert(projects)
    .values({
      ...projectData,
      clientName: projectData.clientName || null,
      coverImage: projectData.coverImage || null,
      demoUrl: projectData.demoUrl || null,
      githubUrl: projectData.githubUrl || null,
    })
    .returning();

  await syncProjectTechnologies(project.id, technologyNames);
  await syncProjectImages(project.id, galleryImages);

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return project;
}

export async function updateProject(id: string, data: unknown) {
  await requireAdmin();
  const parsed = projectSchema.parse(data);

  const { technologyNames, galleryImages, ...projectData } = parsed;

  const [project] = await db
    .update(projects)
    .set({
      ...projectData,
      clientName: projectData.clientName || null,
      coverImage: projectData.coverImage || null,
      demoUrl: projectData.demoUrl || null,
      githubUrl: projectData.githubUrl || null,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  await syncProjectTechnologies(project.id, technologyNames);
  await syncProjectImages(project.id, galleryImages);

  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return project;
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
