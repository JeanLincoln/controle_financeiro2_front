import { useLazyFindCategoryByIdQuery } from "@/store/services/category/category.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

type UseFindCategoryByIdProps = {
  id: string | null;
};

export function useFindCategoryById({ id }: UseFindCategoryByIdProps) {
  const [fetchCategory, { data: category, isLoading, isFetching }] =
    useLazyFindCategoryByIdQuery();

  async function getCategory() {
    if (!id) return;

    const preferCacheValue = true;

    const [error] = await handleRequest(
      fetchCategory({ id: Number(id) }, preferCacheValue).unwrap()
    );

    if (error) {
      toast.error("Erro ao buscar categoria");
      return;
    }
  }

  return {
    idParam: id,
    getCategory,
    category,
    isLoading: isLoading || isFetching
  };
}
