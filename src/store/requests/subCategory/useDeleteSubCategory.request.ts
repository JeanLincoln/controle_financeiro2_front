import { toast } from "sonner";

import { useAppDispatch } from "@/store";
import { useDeleteSubCategoryMutation } from "@/store/services/subCategory/subCategory.service";

export function useDeleteSubCategory() {
  const dispatch = useAppDispatch();
  const [deleteSubCategory, { isLoading }] = useDeleteSubCategoryMutation();

  async function handleDeleteSubCategory(
    categoryId: number,
    subCategoryId: number
  ) {
    if (!subCategoryId) return;

    try {
      await deleteSubCategory({ categoryId, subCategoryId }).unwrap();
      dispatch({
        type: "category-service/invalidateTags",
        payload: ["Category"]
      });
      toast.success("Sub-categoria excluída com sucesso");
      return true;
    } catch (err) {
      console.error("Error deleting sub-category:", err);
      toast.error("Houve um erro ao excluir a sub-categoria");
      return false;
    }
  }

  return {
    handleDeleteSubCategory,
    isLoading
  };
}
