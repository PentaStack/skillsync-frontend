import { Skeleton, SkeletonLine } from "@/components/ui/Skeleton";

/**
 * LoadingFallback — full-page skeleton for <Suspense> boundaries.
 * Displayed while lazy-loaded page components are being fetched.
 */
export function LoadingFallback() {
  return (
    <div className="mx-auto max-w-container px-gutter py-12">
      {/* Title skeleton */}
      <Skeleton className="mb-2 h-10 w-64" />
      <SkeletonLine className="mb-8 w-96" />

      {/* Content skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <Skeleton className="mb-4 h-6 w-3/4" />
            <SkeletonLine className="mb-2" />
            <SkeletonLine className="mb-2 w-5/6" />
            <SkeletonLine className="w-2/3" />
            <Skeleton className="mt-4 h-10 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
