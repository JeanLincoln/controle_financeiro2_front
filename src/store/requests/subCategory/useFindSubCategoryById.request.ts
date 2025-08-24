import { useFindByIdSubCategoryQuery } from "@/store/services/subCategory/subCategory.service";
import type { SubCategoryIdParams } from "@/store/services/subCategory/subCategoryService.types";
import { toast } from "sonner";

type UseFindSubCategoryByIdProps = Partial<SubCategoryIdParams>;

export function useFindSubCategoryById({
  categoryId,
  subCategoryId
}: UseFindSubCategoryByIdProps) {
  const {
    data: subCategory,
    isLoading,
    isFetching,
    isError
  } = useFindByIdSubCategoryQuery(
    { categoryId: categoryId!, subCategoryId: subCategoryId! },
    { skip: !categoryId || !subCategoryId }
  );

  if (isError) {
    toast.error("Houve um erro ao buscar a subcategoria.");
  }

  return {
    subCategory,
    isLoading: isLoading || isFetching
  };
}
