import { Skeleton } from "@/components/ui/skeleton";
import { AdminTableSkeleton } from "@/components/shared/page-skeletons";

export default function AdminTestimonialsLoading() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>
      <AdminTableSkeleton rows={5} />
    </div>
  );
}
