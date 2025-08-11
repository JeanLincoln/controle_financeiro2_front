import { useDeleteCategoryMutation } from "@/store/services/category/category.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useDeleteCategory() {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  async function handleDeleteCategory(categoryId?: number) {
    if (!categoryId) return;

    const [error] = await handleRequest(
      deleteCategory({ id: categoryId }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao excluir a origem");
      return;
    }
  }

  return {
    handleDeleteCategory,
    isLoading
  };
}
