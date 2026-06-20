import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { FadeIn } from "@/components/shared/motion";
import { CTA } from "@/components/home/cta";
import {
  getProjects,
  getProjectTechnologies,
} from "@/app/actions/projects";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Explore the portfolio of digital products and web applications delivered by Kesar Studio for clients across industries.",
  path: "/projects",
});

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  const projectsWithTech = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      technologyNames: await getProjectTechnologies(project.id),
    }))
  );

  return (
    <>
      <Section>
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Portfolio"
              title="Our work"
              description="Explore the projects we've delivered for clients across industries."
            />
          </FadeIn>

          <ProjectsGrid projects={projectsWithTech} />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
