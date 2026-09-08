import { useState } from "react";
import { toast } from "sonner";

import { categoryFormDefaultValues } from "@/components/Form/Category/CategoryForm.schema";
import { useFindAllCategoriesQuery } from "@/store/services/category/category.service";
import type { CategoryFindAllParams } from "@/store/services/category/categoryService.types";

export function useFindAllCategories() {
  const [filters, setFilters] = useState<CategoryFindAllParams>(
    categoryFormDefaultValues
  );
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
