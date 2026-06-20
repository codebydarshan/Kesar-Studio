import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

export default function ProjectDetailLoading() {
  return (
    <Section>
      <Container size="narrow">
        <Skeleton className="mb-8 h-10 w-40" />
        <Skeleton className="mb-8 aspect-[16/9] w-full rounded-2xl" />
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="mb-4 h-10 w-3/4" />
        <Skeleton className="mb-8 h-6 w-full" />
        <Skeleton className="mb-4 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </Container>
    </Section>
  );
}
