import { PageGridSkeleton } from "@/components/shared/page-skeletons";
import { Section } from "@/components/shared/section";

export default function AboutLoading() {
  return (
    <Section>
      <PageGridSkeleton count={3} type="team" />
    </Section>
  );
}
