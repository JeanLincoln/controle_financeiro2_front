import { useLazyFindCategoryByIdQuery } from "@/store/services/category/category.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export function useFindCategoryById() {
  const [params] = useSearchParams();
  const id = params.get("id");

  const [fetchCategory, { data: category, isLoading, isFetching }] =
    useLazyFindCategoryByIdQuery();

  async function getCategory() {
    if (!id) return;

    const [error] = await handleRequest(
      fetchCategory({ id: Number(id) }).unwrap()
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
