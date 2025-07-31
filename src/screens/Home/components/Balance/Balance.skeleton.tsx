import { Skeleton } from "@/components/Skeleton/Skeleton.component";

export const BalanceSkeleton = () => {
  return (
    <div className="flex justify-between gap-4">
      <Skeleton className="w-1/3 p-4 gap-2 h-[180px]" />
      <Skeleton className="w-1/3 p-4 gap-2 h-[180px]" />
      <Skeleton className="w-1/3 p-4 gap-2 h-[180px]" />
    </div>
  );
};
