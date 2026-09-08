import { toast } from "sonner";

import type { CreateOrUpdateSubCategory } from "@/components/Form/SubCategory/hooks/useSubCategoryForm.hook";
import { useAppDispatch } from "@/store";
import { useCreateSubCategoryMutation } from "@/store/services/subCategory/subCategory.service";
import { handleRequest } from "@/utils/handleRequest.utils";

type UseSubCategoryCreateProps = {
  successCallback: () => void;
  errorCallback?: () => void;
};

export function useSubCategoryCreate({
  successCallback,
  errorCallback
}: UseSubCategoryCreateProps) {
  const dispatch = useAppDispatch();
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();

  async function handleCreateSubCategory(
    categoryId: number,
    subCategoryData: CreateOrUpdateSubCategory
  ) {
    const payload = {
      ...subCategoryData,
      categoryId
    };

    const [error] = await handleRequest(createSubCategory(payload).unwrap());

    if (error) {
      toast.error("Houve um erro ao criar a sub-categoria");
      errorCallback?.();
      return;
    }
    dispatch({
      type: "sub-category-service/invalidateTags",
      payload: ["SubCategory"]
    });
    toast.success("Sub-categoria criada com sucesso");
    successCallback();
  }

  return { handleCreateSubCategory, isLoading };
}
