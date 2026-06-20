import { Skeleton } from "@/components/ui/skeleton";
import { AdminTableSkeleton } from "@/components/shared/page-skeletons";

export default function AdminProjectsLoading() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <AdminTableSkeleton rows={6} />
    </div>
  );
}
