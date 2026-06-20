import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { projectImages } from "./project-images";
import { technologies } from "./technologies";
import { projectTechnologies } from "./project-technologies";

export const projectsRelations = relations(projects, ({ many }) => ({
  images: many(projectImages),
  projectTechnologies: many(projectTechnologies),
}));

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
}));

export const technologiesRelations = relations(technologies, ({ many }) => ({
  projectTechnologies: many(projectTechnologies),
}));

export const projectTechnologiesRelations = relations(
  projectTechnologies,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectTechnologies.projectId],
      references: [projects.id],
    }),
    technology: one(technologies, {
      fields: [projectTechnologies.technologyId],
      references: [technologies.id],
    }),
  })
);
