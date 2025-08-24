import type { CreateOrUpdateSubCategory } from "@/components/Form/Category/SubCategorySection/hooks/useSubCategoryForm.hook";
import { useAppDispatch } from "@/store";
import { useCreateSubCategoryMutation } from "@/store/services/subCategory/subCategory.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

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
    const [error] = await handleRequest(
      createSubCategory({ categoryId, ...subCategoryData }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao criar a categoria");
      errorCallback?.();
      return;
    }
    dispatch({
      type: "category-service/invalidateTags",
      payload: ["Category"]
    });
    toast.success("Categoria criada com sucesso");
    successCallback();
  }

  return { handleCreateSubCategory, isLoading };
}
