import { FolderKanban, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LinkButton } from "@/components/ui/link-button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { FadeIn } from "@/components/shared/motion";
import {
  getFeaturedProjects,
  getProjectTechnologies,
} from "@/app/actions/projects";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  const projectsWithTech = await Promise.all(
    projects.map(async (project) => ({
      project,
      technologyNames: await getProjectTechnologies(project.id),
    }))
  );

  return (
    <Section>
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured projects"
            description="A selection of our recent work helping brands achieve their digital ambitions."
          />
        </FadeIn>

        {projectsWithTech.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="Projects coming soon"
            description="We're preparing our portfolio. Check back soon to see the work we've delivered for clients across industries."
            action={
              <LinkButton href="/contact" variant="outline">
                Start a Project
              </LinkButton>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projectsWithTech.map(({ project, technologyNames }, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  technologyNames={technologyNames}
                  index={index}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <LinkButton href="/projects" variant="outline">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
