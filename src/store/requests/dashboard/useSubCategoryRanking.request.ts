import { useLazySubCategoryRankingQuery } from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useSubCategoryRanking() {
  const [
    triggerSubCategoryRanking,
    { data: subCategoryData, isLoading: isLoadingSubCategory }
  ] = useLazySubCategoryRankingQuery();

  const fetchSubCategoriesRanking = async (type: RankingParams) => {
    const preferCacheValue = true;

    const [error] = await handleRequest(
      triggerSubCategoryRanking(type, preferCacheValue).unwrap()
    );

    if (error) {
      toast.error(`Houve um erro ao carregar o ranking de subcategorias`);
      return;
    }
  };

  return { fetchSubCategoriesRanking, subCategoryData, isLoadingSubCategory };
}
