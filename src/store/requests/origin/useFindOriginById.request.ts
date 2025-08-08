import { useLazyFindOriginByIdQuery } from "@/store/services/origin/origin.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export function useFindOriginById() {
  const [params] = useSearchParams();
  const id = params.get("id");

  const [fetchOrigin, { data: origin, isLoading, isFetching }] =
    useLazyFindOriginByIdQuery();

  async function getOrigin() {
    if (!id) return;

    const [error] = await handleRequest(
      fetchOrigin({ id: Number(id) }).unwrap()
    );

    if (error) {
      toast.error("Erro ao buscar origem");
      return;
    }
  }

  return {
    idParam: id,
    getOrigin,
    origin,
    isLoading: isLoading || isFetching
  };
}
