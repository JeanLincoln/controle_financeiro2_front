import { useSubCategoryRankingQuery } from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";
import { toast } from "sonner";

export function useSubCategoryRanking({ type }: RankingParams) {
  const {
    data: subCategoryData,
    isLoading: isLoadingSubCategory,
    isError
  } = useSubCategoryRankingQuery({ type: type || undefined });

  if (isError) {
    toast.error(`Houve um erro ao carregar o ranking de sub-categorias`);
  }

  return { subCategoryData, isLoadingSubCategory };
}
