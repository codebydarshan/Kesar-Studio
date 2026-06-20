import { Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TeamCard } from "@/components/shared/team-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LinkButton } from "@/components/ui/link-button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { FadeIn } from "@/components/shared/motion";
import { getTeamMembers } from "@/app/actions/team";

export async function TeamPreview() {
  const team = await getTeamMembers();

  return (
    <Section>
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the people behind Kesar"
            description="A passionate team of designers, developers, and strategists building products that matter."
          />
        </FadeIn>

        {team.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Team profiles coming soon"
            description="We're updating our team page. In the meantime, reach out to learn who you'll be working with."
            action={
              <LinkButton href="/about" variant="outline">
                About Us
              </LinkButton>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.slice(0, 3).map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
