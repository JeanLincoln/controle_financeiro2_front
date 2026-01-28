import { Skeleton } from "@/components/Skeleton/Skeleton.component";

export function CategoriesListSectionSkeleton() {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-40 w-full max-w-74" />
      ))}
    </div>
  );
}
