import { toast } from "sonner";

import {
  SortOrder,
  type OmitPagination
} from "@/store/services/services.types";
import { useInfiniteFindAllSubCategoriesInfiniteQuery } from "@/store/services/subCategory/subCategory.service";
import type { SubCategoryFindAllParams } from "@/store/services/subCategory/subCategoryService.types";

type UseGetInfiniteSubCategoryFindAllProps = Partial<
  OmitPagination<SubCategoryFindAllParams>
> & {
  categoriesIds: number[];
};

export function useInfiniteFindAllSubCategories({
  name,
  sortBy = "updatedAt",
  sortOrder = SortOrder.DESC,
  categoriesIds
}: UseGetInfiniteSubCategoryFindAllProps) {
  const {
    data: subCategories,
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteFindAllSubCategoriesInfiniteQuery(
    { name, sortBy, sortOrder, categoriesIds },
    {
      skip: !categoriesIds.length
    }
  );

  if (isError) {
    toast.error(
      "Houve um erro ao buscar as sub-categorias, tente novamente mais tarde!"
    );
  }

  const formattedSubCategories = subCategories
    ? subCategories.pages.flatMap((page) => page.data)
    : [];

  return {
    subCategories: formattedSubCategories,
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
    refetch
  };
}
