import { toast } from "sonner";

import type { CreateOrUpdateCategory } from "@/components/Form/Category/hooks/useCategoryForm.hook";
import { useCreateCategoryMutation } from "@/store/services/category/category.service";

type UseCategoryCreateProps = {
  successCallback?: (categoryId: number) => void;
  errorCallback?: () => void;
};

export function useCategoryCreate({
  successCallback,
  errorCallback
}: UseCategoryCreateProps = {}) {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  async function handleCreateCategory(categoryData: CreateOrUpdateCategory) {
    try {
      const result = await createCategory(categoryData).unwrap();
      successCallback?.(result.id);
    } catch (err) {
      toast.error("Houve um erro ao criar a categoria");
      errorCallback?.();
    }
  }

  return { handleCreateCategory, isLoading };
}
