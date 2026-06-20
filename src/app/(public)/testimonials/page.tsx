import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { FadeIn } from "@/components/shared/motion";
import { CTA } from "@/components/home/cta";
import { getTestimonials } from "@/app/actions/testimonials";
import { MessageSquareQuote } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Testimonials",
  description:
    "Read what our clients say about working with Kesar Studio on web, mobile, and digital product projects.",
  path: "/testimonials",
});

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Section>
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted by great brands"
              description="See what our clients have to say about working with Kesar Studio."
            />
          </FadeIn>

          {testimonials.length === 0 ? (
            <EmptyState
              icon={MessageSquareQuote}
              title="No testimonials yet"
              description="Client stories will appear here once we publish them. Check back soon."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
      <CTA />
    </>
  );
}
