import { useLazyOriginRankingQuery } from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useOriginRanking() {
  const [
    triggerOriginRanking,
    { data: originData, isLoading: isLoadingOrigin }
  ] = useLazyOriginRankingQuery();

  const fetchOriginsRanking = async (type: RankingParams) => {
    const preferCacheValue = true;

    const [error] = await handleRequest(
      triggerOriginRanking(type, preferCacheValue).unwrap()
    );

    if (error) {
      toast.error(`Houve um erro ao carregar o ranking de origens`);
      return;
    }
  };

  return { fetchOriginsRanking, originData, isLoadingOrigin };
}
