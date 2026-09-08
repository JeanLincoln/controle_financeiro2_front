import { toast } from "sonner";

import type { CreateOrUpdateSubCategory } from "@/components/Form/SubCategory/hooks/useSubCategoryForm.hook";
import { useAppDispatch } from "@/store";
import { useUpdateSubCategoryMutation } from "@/store/services/subCategory/subCategory.service";
import { handleRequest } from "@/utils/handleRequest.utils";

type UseSubCategoryUpdateProps = {
  successCallback: () => void;
  errorCallback?: () => void;
};

export function useSubCategoryUpdate({
  successCallback,
  errorCallback
}: UseSubCategoryUpdateProps) {
  const dispatch = useAppDispatch();
  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();

  async function handleUpdateSubCategory(
    categoryId: number,
    subCategoryId: number,
    subCategoryData: CreateOrUpdateSubCategory
  ) {
    const payload = {
      ...subCategoryData,
      categoryId,
      id: subCategoryId
    };

    const [error] = await handleRequest(updateSubCategory(payload).unwrap());

    if (error) {
      toast.error("Houve um erro ao atualizar a categoria");
      errorCallback?.();
      return;
    }

    dispatch({
      type: "category-service/invalidateTags",
      payload: ["Category"]
    });
    toast.success("Categoria atualizada com sucesso");
    successCallback();
  }

  return { handleUpdateSubCategory, isLoading };
}
