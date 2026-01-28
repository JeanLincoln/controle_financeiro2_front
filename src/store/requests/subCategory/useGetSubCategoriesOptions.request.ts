import { toast } from "sonner";

import {
  SortOrder,
  type OmitPagination
} from "@/store/services/services.types";
import { useGetSubCategoriesOptionsInfiniteQuery } from "@/store/services/subCategory/subCategory.service";
import type { SubCategoryOptionsParams } from "@/store/services/subCategory/subCategoryService.types";

type UseGetInfiniteSubCategoryOptionsProps = Partial<
  OmitPagination<SubCategoryOptionsParams>
>;

export function useGetInfiniteSubCategoryOptions({
  categoriesIds,
  sortOrder = SortOrder.DESC,
  search
}: UseGetInfiniteSubCategoryOptionsProps) {
  const {
    data: subCategoriesOptions,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage
  } = useGetSubCategoriesOptionsInfiniteQuery({
    categoriesIds,
    sortOrder,
    search
  });

  if (isError) {
    toast.error("Houve um erro ao buscar as opções de sub-categorias.");
  }

  const formattedSubCategoriesOptions = subCategoriesOptions
    ? subCategoriesOptions.pages.flatMap((page) => page.data)
    : [];

  return {
    subCategoriesOptions: formattedSubCategoriesOptions,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoading || isFetching
  };
}
