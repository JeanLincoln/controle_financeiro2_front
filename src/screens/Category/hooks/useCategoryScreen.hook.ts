import { usePromiseDebounce } from "@/hooks/usePromiseDebounce.hook";
import { useFindAllCategories } from "@/store/requests/category/useFindAllCategory.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CategoryFormSchema,
  categoryFormDefaultValues,
  type CategoryFormSchemaType
} from "../components/FiltersSection/Category.schema";

export function useCategoryScreen() {
  const {
    data: response,
    isLoading,
    handleFetchCategories
  } = useFindAllCategories();

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
