import type { PaginationProps, PaginationResponse } from "../services.types";

export const handleInfiniteNextPage = <T extends PaginationResponse>(
  lastPage: T,
  _allPages: T[],
  lastPageParam: PaginationProps
): PaginationProps | undefined => {
  if (!lastPage?.pagination?.hasNext) return undefined;

  const nextPage = Number(lastPageParam.page) + 1;

  return {
    ...lastPageParam,
    page: nextPage
  };
};
