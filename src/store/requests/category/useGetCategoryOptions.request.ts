import { toast } from "sonner";

import { useGetCategoriesOptionsInfiniteQuery } from "@/store/services/category/category.service";
import type { CategoryOptionsParams } from "@/store/services/category/categoryService.types";
import {
  SortOrder,
  type OmitPagination
} from "@/store/services/services.types";

type UseGetInfiniteCategoryOptionsProps = Partial<
  OmitPagination<CategoryOptionsParams>
>;

export function useGetInfiniteCategoryOptions({
  sortOrder = SortOrder.DESC,
  search
}: UseGetInfiniteCategoryOptionsProps) {
  const {
    data: categoriesOptions,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage
  } = useGetCategoriesOptionsInfiniteQuery({ sortOrder, search });

  if (isError) {
    toast.error("Houve um erro ao buscar as opções de categoria.");
  }

  const formattedCategoriesOptions = categoriesOptions
    ? categoriesOptions.pages.flatMap((page) => page.data)
    : [];

  return {
    categoriesOptions: formattedCategoriesOptions,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoading || isFetching
  };
}
