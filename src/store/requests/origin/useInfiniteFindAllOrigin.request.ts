import { useState } from "react";
import { toast } from "sonner";

import { useInfiniteFindAllOriginsInfiniteQuery } from "@/store/services/origin/origin.service";
import type { OriginFindAllParams } from "@/store/services/origin/originService.types";
import {
  SortOrder,
  type OmitPagination
} from "@/store/services/services.types";

type UseGetInfiniteOriginFindAllProps = Partial<
  OmitPagination<OriginFindAllParams>
>;
export function useInfiniteFindAllOrigins(
  { name, sortBy, sortOrder }: UseGetInfiniteOriginFindAllProps = {
    sortBy: "updatedAt",
    sortOrder: SortOrder.DESC
  }
) {
  const [filters, setFilters] = useState<OriginFindAllParams>({
    name,
    sortBy,
    sortOrder
  });

  const {
    data: origins,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage
  } = useInfiniteFindAllOriginsInfiniteQuery(filters);

  if (isError) {
    toast.error(
      "Houve um erro ao buscar as origens, tente novamente mais tarde!"
    );
  }

  const formattedOrigins = origins
    ? origins.pages.flatMap((page) => page.data)
    : [];

  return {
    origins: formattedOrigins,
    setOriginsFilters: setFilters,
    isLoading: isLoading || isFetching,
    hasNextPage,
    fetchNextPage
  };
}
