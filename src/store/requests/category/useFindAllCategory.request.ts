import { useLazyFindAllCategoriesQuery } from "@/store/services/category/category.service";
import type { CategoryFindAllParams } from "@/store/services/category/categoryService.types";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useFindAllCategories() {
  const [fetchCategoriesTrigger, { data, isLoading }] =
    useLazyFindAllCategoriesQuery();

  async function handleFetchCategories(params: CategoryFindAllParams) {
    const [error] = await handleRequest(
      fetchCategoriesTrigger(params).unwrap()
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
