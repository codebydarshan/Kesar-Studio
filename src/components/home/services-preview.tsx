import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { LinkButton } from "@/components/ui/link-button";
import { StaggerGrid } from "@/components/shared/motion";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SERVICES } from "@/lib/constants";

export function ServicesPreview() {
  return (
    <Section className="bg-surface/40">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Services built for growth"
          description="From concept to launch, we deliver end-to-end solutions that drive real business results."
        />

        <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              iconName={service.icon}
            />
          ))}
        </StaggerGrid>

        <div className="mt-10 text-center">
          <LinkButton href="/services" variant="outline">
            Explore All Services
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
