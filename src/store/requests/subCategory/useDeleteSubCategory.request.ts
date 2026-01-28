import { toast } from "sonner";

import { useAppDispatch } from "@/store";
import { useDeleteSubCategoryMutation } from "@/store/services/subCategory/subCategory.service";
import { handleRequest } from "@/utils/handleRequest.utils";

export function useDeleteSubCategory() {
  const dispatch = useAppDispatch();
  const [deleteSubCategory, { isLoading }] = useDeleteSubCategoryMutation();

  async function handleDeleteSubCategory(
    categoryId: number,
    subCategoryId: number
  ) {
    if (!subCategoryId) return;

    const [error] = await handleRequest(
      deleteSubCategory({ categoryId, subCategoryId }).unwrap()
    );

    dispatch({
      type: "category-service/invalidateTags",
      payload: ["Category"]
    });

    if (error) {
      toast.error("Houve um erro ao excluir a sub-categoria");
      return;
    }
  }

  return {
    handleDeleteSubCategory,
    isLoading
  };
}
