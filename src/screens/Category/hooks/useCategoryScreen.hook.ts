import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePromiseDebounce } from "@/hooks/usePromiseDebounce.hook";
import { useLazyFindAllCategories } from "@/store/requests/category/useLazyFindAllCategory.request";

import {
  categoryFormDefaultValues,
  CategoryFormSchema,
  type CategoryFormSchemaType
} from "../components/FiltersSection/Category.schema";

export function useCategoryScreen() {
  const {
    data: response,
    isLoading,
    handleFetchCategories
  } = useLazyFindAllCategories();

  const form = useForm({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: categoryFormDefaultValues
  });

  const { debounceLoading } = usePromiseDebounce<CategoryFormSchemaType>({
    formWatch: form.watch,
    callback: handleFetchCategories
  });

  const nameSearch = form.watch("name");
  const dataIsLoading = isLoading || debounceLoading;
  const dataIsEmpty =
    !dataIsLoading && (!response || response.data.length === 0);

  return {
    form,
    dataIsLoading,
    dataIsEmpty,
    response,
    nameSearch
  };
}
