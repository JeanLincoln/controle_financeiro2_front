import { toast } from "sonner";

import { useOriginRankingQuery } from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";

export function useOriginRanking({ type }: RankingParams) {
  const {
    data: originData,
    isLoading: isLoadingOrigin,
    isError
  } = useOriginRankingQuery({ type: type || undefined });

  if (isError) {
    toast.error(`Houve um erro ao carregar o ranking de categorias`);
  }

  return { originData, isLoadingOrigin };
}
