import type { CreateOrUpdateSubCategory } from "@/components/Form/Category/SubCategorySection/hooks/useSubCategoryForm.hook";
import { useAppDispatch } from "@/store";
import { useUpdateSubCategoryMutation } from "@/store/services/subCategory/subCategory.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

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
    const [error] = await handleRequest(
      updateSubCategory({
        categoryId,
        id: subCategoryId,
        ...subCategoryData
      }).unwrap()
    );

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
