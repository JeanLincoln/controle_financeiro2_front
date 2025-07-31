import {
  useLazyOriginRankingQuery,
  useLazySubCategoryRankingQuery,
  useLazyTransactionRankingQuery,
  useLazyCategoryRankingQuery
} from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/types";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export const RankingRequests = () => {
  const [
    triggerCategoryRanking,
    { data: categoryData, isLoading: isLoadingCategory }
  ] = useLazyCategoryRankingQuery();
  const [
    triggerSubCategoryRanking,
    { data: subCategoryData, isLoading: isLoadingSubCategory }
  ] = useLazySubCategoryRankingQuery();
  const [
    triggerOriginRanking,
    { data: originData, isLoading: isLoadingOrigin }
  ] = useLazyOriginRankingQuery();
  const [
    triggerTransactionRanking,
    { data: transactionData, isLoading: isLoadingTransaction }
  ] = useLazyTransactionRankingQuery();

  const fetchOriginsRanking = async (type: RankingParams) => {
    const [error] = await handleRequest(triggerOriginRanking(type).unwrap());

    if (error) {
      toast.error(`Houve um erro ao carregar o ranking de origens`);
      return;
    }
  };

  const fetchSubCategoriesRanking = async (type: RankingParams) => {
    const [error] = await handleRequest(
      triggerSubCategoryRanking(type).unwrap()
    );

    if (error) {
      toast.error(`Houve um erro ao carregar o ranking de subcategorias`);
      return;
    }
  };

  const fetchTransactionsRanking = async (type: RankingParams) => {
    const [error] = await handleRequest(
      triggerTransactionRanking(type).unwrap()
    );

    if (error) {
      toast.error(`Houve um erro ao carregar o ranking de transações`);
      return;
    }
  };

  const fetchCategoriesRanking = async (type: RankingParams) => {
    const [error] = await handleRequest(triggerCategoryRanking(type).unwrap());

    if (error) {
      toast.error(`Houve um erro ao carregar o ranking de categorias`);
      return;
    }
  };

  return {
    category: {
      fetchCategoriesRanking,
      categoryData,
      isLoadingCategory
    },
    subCategory: {
      fetchSubCategoriesRanking,
      subCategoryData,
      isLoadingSubCategory
    },
    origin: {
      fetchOriginsRanking,
      originData,
      isLoadingOrigin
    },
    transaction: {
      fetchTransactionsRanking,
      transactionData,
      isLoadingTransaction
    }
  };
};
