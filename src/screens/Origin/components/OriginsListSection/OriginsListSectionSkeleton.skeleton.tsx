import { Skeleton } from "@/components/Skeleton/Skeleton.component";

export function OriginsListSectionSkeleton() {
  return (
    <div className="flex flex-wrap w-full gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-40 max-w-74" />
      ))}
    </div>
  );
}
