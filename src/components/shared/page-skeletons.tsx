import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function TestimonialCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-sm" />
        ))}
      </div>
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-6 h-4 w-2/3" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>
    </div>
  );
}

export function TeamCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card text-center">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-2 p-5">
        <Skeleton className="mx-auto h-5 w-32" />
        <Skeleton className="mx-auto h-4 w-24" />
        <Skeleton className="mx-auto h-4 w-full" />
      </div>
    </div>
  );
}

export function AdminTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-lg border">
      <div className="border-b p-4">
        <Skeleton className="h-5 w-full max-w-md" />
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageGridSkeleton({
  count = 6,
  type = "project",
}: {
  count?: number;
  type?: "project" | "testimonial" | "team";
}) {
  const Card =
    type === "testimonial"
      ? TestimonialCardSkeleton
      : type === "team"
        ? TeamCardSkeleton
        : ProjectCardSkeleton;

  return (
    <Container>
      <div className="mb-10 space-y-3 text-center">
        <Skeleton className="mx-auto h-4 w-24" />
        <Skeleton className="mx-auto h-9 w-64" />
        <Skeleton className="mx-auto h-5 w-96 max-w-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </Container>
  );
}
