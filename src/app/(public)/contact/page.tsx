import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { FadeIn } from "@/components/shared/motion";
import { CONTACT_INFO } from "@/lib/constants";
import { MapPin } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Kesar Studio to discuss your next web, mobile, or digital product project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section>
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Contact"
              title="Let's start a conversation"
              description="Have a project in mind? We'd love to hear from you. Fill out the form and we'll get back to you within 24 hours."
            />
          </FadeIn>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>

            <div className="lg:col-span-3">
              <FadeIn delay={0.15}>
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/40 pt-0">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-surface/50">
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold">Find us on the map</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Map integration coming soon. We&apos;re based in {CONTACT_INFO.location} and work with clients worldwide.
                </p>
                <div className="mt-8 h-48 w-full max-w-2xl rounded-xl bg-muted/50 border border-border flex items-center justify-center text-sm text-muted-foreground">
                  Map placeholder
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
