import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery skeleton */}
        <div className="flex flex-col gap-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-16 rounded-md" />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-sm" />
            ))}
            <Skeleton className="ml-2 h-4 w-24" />
          </div>

          <Separator />

          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          <Skeleton className="h-4 w-44" />

          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div>
        <div className="flex gap-1 border-b">
          <Skeleton className="h-9 w-24 rounded-t-md" />
          <Skeleton className="h-9 w-28 rounded-t-md" />
          <Skeleton className="h-9 w-24 rounded-t-md" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/6" />
        </div>
      </div>
    </div>
  );
}
