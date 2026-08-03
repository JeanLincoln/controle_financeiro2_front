import { useState } from "react";
import { toast } from "sonner";

import { useInfiniteFindAllCategoriesInfiniteQuery } from "@/store/services/category/category.service";
import type { CategoryFindAllParams } from "@/store/services/category/categoryService.types";
import {
  SortOrder,
  type OmitPagination
} from "@/store/services/services.types";

type UseGetInfiniteCategoryFindAllProps = Partial<
  OmitPagination<CategoryFindAllParams>
>;
export function useInfiniteFindAllCategories(
  { name, sortBy, sortOrder }: UseGetInfiniteCategoryFindAllProps = {
    sortBy: "updatedAt",
    sortOrder: SortOrder.DESC
  }
) {
  const [filters, setFilters] = useState<CategoryFindAllParams>({
    name,
    sortBy,
    sortOrder
  });

  const {
    data: categories,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage
  } = useInfiniteFindAllCategoriesInfiniteQuery(filters);

  if (isError) {
    toast.error(
      "Houve um erro ao buscar as categorias, tente novamente mais tarde!"
    );
  }

  const formattedCategories = categories
    ? categories.pages.flatMap((page) => page.data)
    : [];

  return {
    categories: formattedCategories,
    setCategoriesFilters: setFilters,
    isLoading: isLoading || isFetching,
    hasNextPage,
    fetchNextPage
  };
}
