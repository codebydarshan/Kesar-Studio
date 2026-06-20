import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { FadeIn, StaggerGrid } from "@/components/shared/motion";
import { CTA } from "@/components/home/cta";
import { SERVICES, PROCESS_STEPS, TECH_STACK } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { ProcessTimeline } from "@/components/services/process-timeline";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "End-to-end digital solutions — web development, mobile apps, UI/UX design, cloud, AI integration, and consulting.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/[0.04] to-transparent" />
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Services"
              title="End-to-end digital solutions"
              description="From strategy to launch and beyond, we offer comprehensive services to bring your digital vision to life."
            />
          </FadeIn>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <StaggerGrid className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                iconName={service.icon}
                large
              />
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Process"
              title="How we work"
              description="A proven process that keeps projects on track and outcomes exceptional."
            />
          </FadeIn>
          <ProcessTimeline steps={[...PROCESS_STEPS]} />
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Technology"
              title="Tools we love"
              description="We use modern, battle-tested technologies to build fast, reliable products."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH_STACK.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="px-4 py-2 text-sm font-normal border-border/60 bg-card hover:border-primary/30 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
