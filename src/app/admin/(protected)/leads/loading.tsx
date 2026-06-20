import { Skeleton } from "@/components/ui/skeleton";
import { AdminTableSkeleton } from "@/components/shared/page-skeletons";

export default function AdminLeadsLoading() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-4 w-80" />
      </div>
      <AdminTableSkeleton rows={8} />
    </div>
  );
}
