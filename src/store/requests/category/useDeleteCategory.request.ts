import { toast } from "sonner";

import { useDeleteCategoryMutation } from "@/store/services/category/category.service";

export function useDeleteCategory() {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  async function handleDeleteCategory(categoryId?: number) {
    if (!categoryId) return;

    try {
      await deleteCategory({ id: categoryId }).unwrap();
      toast.success("Categoria excluída com sucesso");
      return true;
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Houve um erro ao excluir a categoria");
      return false;
    }
  }

  return {
    handleDeleteCategory,
    isLoading
  };
}
