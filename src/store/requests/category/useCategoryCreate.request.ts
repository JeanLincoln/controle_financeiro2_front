import { toast } from "sonner";

import type { CreateOrUpdateCategory } from "@/components/Form/Category/hooks/useCategoryForm.hook";
import { useCreateCategoryMutation } from "@/store/services/category/category.service";
import { handleRequest } from "@/utils/handleRequest.utils";

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
    const [error, result] = await handleRequest(
      createCategory(categoryData).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao criar a categoria");
      errorCallback?.();
      return;
    }

    if (successCallback) {
      successCallback(result.id);
      return;
    }
  }

  return { handleCreateCategory, isLoading };
}
