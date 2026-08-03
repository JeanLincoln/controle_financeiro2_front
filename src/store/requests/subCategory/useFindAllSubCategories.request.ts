import { useState } from "react";
import { toast } from "sonner";

import { useFindAllSubCategoriesQuery } from "@/store/services/subCategory/subCategory.service";
import type { SubCategoryFindAllParams } from "@/store/services/subCategory/subCategoryService.types";

export function useFindAllSubCategories() {
  const [filters, setFilters] = useState<SubCategoryFindAllParams>({
    categoriesIds: []
  });
  const {
    data: subCategories,
    isLoading,
    isFetching,
    isError
  } = useFindAllSubCategoriesQuery(filters, {
    skip: !filters.categoriesIds.length
  });

  if (isError) {
    toast.error(
      "Houve um erro ao buscar as sub categorias, tente novamente mais tarde!"
    );
  }

  return {
    subCategories,
    setSubCategoriesFilters: setFilters,
    isLoading: isLoading || isFetching
  };
}
