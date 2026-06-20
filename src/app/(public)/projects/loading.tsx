import { PageGridSkeleton } from "@/components/shared/page-skeletons";
import { Section } from "@/components/shared/section";

export default function ProjectsLoading() {
  return (
    <Section>
      <PageGridSkeleton count={6} type="project" />
    </Section>
  );
}
