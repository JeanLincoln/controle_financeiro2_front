import { toast } from "sonner";

import { useGetOriginsOptionsInfiniteQuery } from "@/store/services/origin/origin.service";
import type { OriginOptionsParams } from "@/store/services/origin/originService.types";
import {
  SortOrder,
  type OmitPagination
} from "@/store/services/services.types";

type UseGetInfiniteOriginOptionsProps = Partial<
  OmitPagination<OriginOptionsParams>
>;

export function useGetInfiniteOriginOptions({
  sortOrder = SortOrder.DESC,
  search
}: UseGetInfiniteOriginOptionsProps) {
  const {
    data: originsOptions,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage
  } = useGetOriginsOptionsInfiniteQuery({ sortOrder, search });

  if (isError) {
    toast.error("Houve um erro ao buscar as opções de origem.");
  }

  const formattedOriginsOptions = originsOptions
    ? originsOptions.pages.flatMap((page) => page.data)
    : [];

  return {
    originsOptions: formattedOriginsOptions,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoading || isFetching
  };
}
