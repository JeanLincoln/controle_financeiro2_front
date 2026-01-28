import { toast } from "sonner";

import { useDeleteCategoryMutation } from "@/store/services/category/category.service";
import { handleRequest } from "@/utils/handleRequest.utils";

export function useDeleteCategory() {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  async function handleDeleteCategory(categoryId?: number) {
    if (!categoryId) return;

    const [error] = await handleRequest(
      deleteCategory({ id: categoryId }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao excluir a categoria");
      return;
    }
  }

  return {
    handleDeleteCategory,
    isLoading
  };
}
