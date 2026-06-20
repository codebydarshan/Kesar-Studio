import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { TeamPreview } from "@/components/home/team-preview";
import { CTA } from "@/components/home/cta";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = createPageMetadata({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  path: "/",
});

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <FeaturedProjects />
      <TestimonialsPreview />
      <TeamPreview />
      <CTA />
    </>
  );
}
