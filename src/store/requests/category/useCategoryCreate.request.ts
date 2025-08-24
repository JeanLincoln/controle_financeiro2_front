import { CATEGORY_ID_FORM_KEY } from "@/components/Form/Category/Category.form";
import type { CreateOrUpdateCategory } from "@/components/Form/Category/CategorySection/hooks/useCategoryForm.hook";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useCreateCategoryMutation } from "@/store/services/category/category.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

type UseCategoryCreateProps = {
  successCallback?: () => void;
  errorCallback?: () => void;
};

export function useCategoryCreate({
  successCallback,
  errorCallback
}: UseCategoryCreateProps = {}) {
  const { handleAddKey } = useAppSearchParams();
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

    handleAddKey({ key: CATEGORY_ID_FORM_KEY, value: result.id });
    successCallback?.();
  }

  return { handleCreateCategory, isLoading };
}
