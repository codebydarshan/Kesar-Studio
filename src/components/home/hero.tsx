"use client";

import { LinkButton } from "@/components/ui/link-button";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroFadeIn } from "@/components/shared/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <HeroFadeIn delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-muted-foreground">Premium Software Agency</span>
            </div>
          </HeroFadeIn>

          <HeroFadeIn delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              We craft digital experiences that{" "}
              <span className="text-primary">inspire</span> and{" "}
              <span className="text-primary">convert</span>
            </h1>
          </HeroFadeIn>

          <HeroFadeIn delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Kesar Studio partners with ambitious brands to design and build
              exceptional web applications, mobile apps, and digital products.
            </p>
          </HeroFadeIn>

          <HeroFadeIn delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <LinkButton
                href="/contact"
                size="lg"
                className="h-12 px-8 text-base transition-transform hover:scale-[1.02]"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton
                href="/projects"
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base transition-transform hover:scale-[1.02]"
              >
                View Projects
              </LinkButton>
            </div>
          </HeroFadeIn>
        </div>
      </div>
    </section>
  );
}
