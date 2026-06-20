import { MessageSquareQuote, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LinkButton } from "@/components/ui/link-button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { FadeIn } from "@/components/shared/motion";
import { getFeaturedTestimonials } from "@/app/actions/testimonials";

export async function TestimonialsPreview() {
  const testimonials = await getFeaturedTestimonials();

  return (
    <Section className="bg-surface/40">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Testimonials"
            title="What our clients say"
            description="Don't just take our word for it — hear from the brands we've helped succeed."
          />
        </FadeIn>

        {testimonials.length === 0 ? (
          <EmptyState
            icon={MessageSquareQuote}
            title="Client stories coming soon"
            description="We're gathering testimonials from the brands we've partnered with. Check back soon."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <LinkButton href="/testimonials" variant="outline">
                Read More Testimonials
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
