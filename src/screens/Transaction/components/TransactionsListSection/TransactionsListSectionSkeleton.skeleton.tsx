import { Skeleton } from "@/components/Skeleton/Skeleton.component";

export function TransactionsListSectionSkeleton() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-[158px] w-full max-w-74" />
      ))}
    </>
  );
}
