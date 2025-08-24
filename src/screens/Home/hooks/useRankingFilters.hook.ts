import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";
import { useSearchParams } from "react-router";

export const CATEGORY_RANKING_FILTERS_KEY = "categoryRankingType";
export const SUB_CATEGORY_RANKING_FILTERS_KEY = "subCategoryRankingType";
export const ORIGIN_RANKING_FILTERS_KEY = "originRankingType";
export const TRANSACTION_RANKING_FILTERS_KEY = "transactionRankingType";

export const RANKING_FILTERS = {
  categorias: CATEGORY_RANKING_FILTERS_KEY,
  subcategorias: SUB_CATEGORY_RANKING_FILTERS_KEY,
  origens: ORIGIN_RANKING_FILTERS_KEY,
  transações: TRANSACTION_RANKING_FILTERS_KEY
};

export function useRankingFilters() {
  const [params] = useSearchParams();

  const categoryRankingType = params.get(CATEGORY_RANKING_FILTERS_KEY);
  const subCategoryRankingType = params.get(SUB_CATEGORY_RANKING_FILTERS_KEY);
  const originRankingType = params.get(ORIGIN_RANKING_FILTERS_KEY);
  const transactionRankingType = params.get(TRANSACTION_RANKING_FILTERS_KEY);

  return {
    categoryRankingType: categoryRankingType as RankingParams["type"],
    subCategoryRankingType: subCategoryRankingType as RankingParams["type"],
    originRankingType: originRankingType as RankingParams["type"],
    transactionRankingType: transactionRankingType as RankingParams["type"]
  };
}
