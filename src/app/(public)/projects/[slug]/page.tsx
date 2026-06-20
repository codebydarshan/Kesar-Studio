import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getProjectBySlug,
  getProjects,
  getProjectTechnologies,
} from "@/app/actions/projects";
import { ProjectCard } from "@/components/shared/project-card";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { FadeIn } from "@/components/shared/motion";
import { RemoteImage } from "@/components/shared/remote-image";
import { ArrowLeft, ExternalLink, Link2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return createPageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${slug}`,
    image: project.coverImage,
    type: "article",
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const relatedCandidates = allProjects
    .filter((p) => p.id !== project.id)
    .sort((a, b) => {
      const scoreA =
        (a.industry === project.industry ? 2 : 0) + (a.featured ? 1 : 0);
      const scoreB =
        (b.industry === project.industry ? 2 : 0) + (b.featured ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, 3);

  const relatedProjects = await Promise.all(
    relatedCandidates.map(async (p) => ({
      project: p,
      technologyNames: await getProjectTechnologies(p.id),
    }))
  );

  return (
    <>
      <Section className="pb-0">
        <Container size="narrow">
          <FadeIn>
            <Link
              href="/projects"
              className={cn(buttonVariants({ variant: "ghost" }), "mb-8 -ml-2")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Projects
            </Link>
          </FadeIn>

          {project.coverImage && (
            <FadeIn delay={0.05}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border mb-8">
                <RemoteImage
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge>{project.industry}</Badge>
              {project.clientName && (
                <Badge variant="outline">Client: {project.clientName}</Badge>
              )}
              {project.featured && <Badge variant="secondary">Featured</Badge>}
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              {project.shortDescription}
            </p>

            {project.technologyNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologyNames.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            {(project.demoUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-3 mb-10">
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                    View Demo
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    <Link2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    View on GitHub
                  </Link>
                )}
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="prose prose-invert max-w-none">
              {project.fullDescription.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>

          {project.galleryImages.length > 0 && (
            <FadeIn delay={0.2}>
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border"
                    >
                      <RemoteImage
                        src={img.imageUrl}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </Container>
      </Section>

      {relatedProjects.length > 0 && (
        <Section className="bg-surface/40">
          <Container>
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                Related Projects
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map(({ project: related, technologyNames }, index) => (
                <ProjectCard
                  key={related.id}
                  project={related}
                  technologyNames={technologyNames}
                  index={index}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
