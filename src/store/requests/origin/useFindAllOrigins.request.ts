import { useLazyFindAllOriginsQuery } from "@/store/services/origin/origin.service";
import type { OriginFindAllParams } from "@/store/services/origin/originService.types";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useFindAllOrigins() {
  const [fetchOriginsTrigger, { data, isLoading }] =
    useLazyFindAllOriginsQuery();

  async function handleFetchOrigins(params: OriginFindAllParams) {
    const preferCacheValue = true;

    const [error] = await handleRequest(
      fetchOriginsTrigger(params, preferCacheValue).unwrap()
    );

    if (error) {
      toast.error(
        "Houve um erro ao buscar as origens, tente novamente mais tarde!."
      );
      return;
    }
  }

  return {
    handleFetchOrigins,
    data,
    isLoading
  };
}
