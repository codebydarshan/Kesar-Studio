import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/section-heading";
import { TeamCard } from "@/components/shared/team-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { FadeIn } from "@/components/shared/motion";
import { CTA } from "@/components/home/cta";
import { getTeamMembers } from "@/app/actions/team";
import { COMPANY_VALUES } from "@/lib/constants";
import { Target, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Kesar Studio — our story, mission, values, and the team behind our premium software agency.",
  path: "/about",
});

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <Section>
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="About Us"
              title="Crafting digital excellence"
              description="Kesar Studio is a boutique software agency passionate about building products that make a difference."
            />
          </FadeIn>

          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <h3 className="text-xl font-semibold text-foreground">Our Story</h3>
                <p>
                  Founded with a mission to help ambitious brands thrive in the digital
                  age, we&apos;ve grown into a trusted partner for startups and enterprises
                  alike. Our focused team brings decades of combined experience across
                  web development, mobile apps, design, and cloud infrastructure.
                </p>
                <p>
                  We believe in transparency, collaboration, and delivering measurable
                  results. Every project we take on is treated with the same care and
                  attention to detail — because your success is our success.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-surface to-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
                      <Target className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>
                    <p className="text-lg font-semibold">Building since day one</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Trusted by brands who demand quality and craft.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <Card className="h-full border border-border/60 bg-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower ambitious brands with exceptional digital products that
                    drive growth, delight users, and stand the test of time.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card className="h-full border border-border/60 bg-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the go-to software partner for brands that refuse to settle —
                    where design, engineering, and strategy converge into world-class
                    digital experiences.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Values"
              title="What we stand for"
              description="The principles that guide every decision we make and every product we ship."
            />
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_VALUES.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.05}>
                <Card className="h-full border border-border/60 bg-card transition-colors hover:border-primary/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Our Team"
              title="Meet the people behind Kesar"
              description="A passionate team of designers, developers, and strategists."
            />
          </FadeIn>

          {team.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Team profiles coming soon"
              description="We're updating our team page with the talented people behind our work."
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <TeamCard key={member.id} member={member} index={index} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <CTA />
    </>
  );
}
