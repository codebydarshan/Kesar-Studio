import { PageGridSkeleton } from "@/components/shared/page-skeletons";
import { Section } from "@/components/shared/section";

export default function TestimonialsLoading() {
  return (
    <Section>
      <PageGridSkeleton count={6} type="testimonial" />
    </Section>
  );
}
