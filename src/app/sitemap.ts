import type { MetadataRoute } from "next";
import { getProjects } from "@/app/actions/projects";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/projects",
    "/testimonials",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: project.updatedAt ?? project.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Database unavailable during build — static routes only
  }

  return [...staticRoutes, ...projectRoutes];
}
