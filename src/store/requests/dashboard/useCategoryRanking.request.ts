import { useLazyCategoryRankingQuery } from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useCategoryRanking() {
  const [
    triggerCategoryRanking,
    { data: categoryData, isLoading: isLoadingCategory }
  ] = useLazyCategoryRankingQuery();

  const fetchCategoriesRanking = async (type: RankingParams) => {
    const preferCacheValue = true;

    const [error] = await handleRequest(
      triggerCategoryRanking(type, preferCacheValue).unwrap()
    );

    if (error) {
      toast.error(`Houve um erro ao carregar o ranking de categorias`);
      return;
    }
  };

  return { fetchCategoriesRanking, categoryData, isLoadingCategory };
}
