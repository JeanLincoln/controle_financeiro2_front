import { toast } from "sonner";

import { useCategoryRankingQuery } from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";

export function useCategoryRanking({ type }: RankingParams) {
  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isError
  } = useCategoryRankingQuery({ type: type || undefined });

  if (isError) {
    toast.error(`Houve um erro ao carregar o ranking de categorias`);
  }

  return { categoryData, isLoadingCategory };
}
