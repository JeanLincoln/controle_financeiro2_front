import { useState } from "react";
import { toast } from "sonner";

import { useFindAllCategoriesQuery } from "@/store/services/category/category.service";
import type { CategoryFindAllParams } from "@/store/services/category/categoryService.types";
import { SortOrder } from "@/store/services/services.types";

export function useFindAllCategories() {
  const [filters, setFilters] = useState<CategoryFindAllParams>({
    limit: 10,
    page: 1,
    sortBy: "createdAt",
    sortOrder: SortOrder.DESC
  });
  const {
    data: categories,
    isLoading,
    isFetching,
    isError
  } = useFindAllCategoriesQuery(filters);

  if (isError) {
    toast.error(
      "Houve um erro ao buscar as categorias, tente novamente mais tarde!"
    );
  }

  return {
    categories,
    setCategoriesFilters: setFilters,
    isLoading: isLoading || isFetching
  };
}
