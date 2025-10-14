import { toast } from "sonner";

import { useLazyFindAllCategoriesQuery } from "@/store/services/category/category.service";
import type { CategoryFindAllParams } from "@/store/services/category/categoryService.types";
import { handleRequest } from "@/utils/handleRequest.utils";

export function useFindAllCategories() {
  const [fetchCategoriesTrigger, { data, isLoading }] =
    useLazyFindAllCategoriesQuery();

  async function handleFetchCategories(params: CategoryFindAllParams) {
    const preferCacheValue = true;

    const [error] = await handleRequest(
      fetchCategoriesTrigger(params, preferCacheValue).unwrap()
    );

    if (error) {
      toast.error(
        "Houve um erro ao buscar as categorias, tente novamente mais tarde!."
      );
      return;
    }
  }

  return {
    handleFetchCategories,
    data,
    isLoading
  };
}
