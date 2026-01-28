import { Skeleton } from "@/components/Skeleton/Skeleton.component";

export const BalanceSkeleton = () => {
  return (
    <div className="flex justify-between gap-4">
      <Skeleton className="h-[180px] w-1/3 gap-2 p-4" />
      <Skeleton className="h-[180px] w-1/3 gap-2 p-4" />
      <Skeleton className="h-[180px] w-1/3 gap-2 p-4" />
    </div>
  );
};
