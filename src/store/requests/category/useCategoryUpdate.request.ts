import type { CreateOrUpdateCategory } from "@/components/Form/Category/CategorySection/hooks/useCategoryForm.hook";
import { useUpdateCategoryMutation } from "@/store/services/category/category.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

type UseCategoryUpdateProps = {
  successCallback?: () => void;
  errorCallback?: () => void;
};

export function useCategoryUpdate({
  successCallback,
  errorCallback
}: UseCategoryUpdateProps = {}) {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  async function handleUpdateCategory(
    categoryId: number,
    categoryData: CreateOrUpdateCategory
  ) {
    const [error] = await handleRequest(
      updateCategory({ id: categoryId, ...categoryData }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao atualizar a categoria");
      errorCallback?.();
      return;
    }

    successCallback?.();
  }

  return { handleUpdateCategory, isLoading };
}
