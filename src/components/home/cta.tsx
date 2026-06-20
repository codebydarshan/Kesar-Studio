"use client";

import { LinkButton } from "@/components/ui/link-button";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

export function CTA() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/90 via-primary to-primary/80 px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="absolute inset-0 -z-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to build something extraordinary?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Let&apos;s discuss your project and explore how Kesar Studio can help
                bring your vision to life.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <LinkButton
                  href="/contact"
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 text-base transition-transform hover:scale-[1.02]"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton
                  href="/contact"
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 transition-transform hover:scale-[1.02]"
                >
                  Contact Us
                </LinkButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
