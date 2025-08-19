import { useLazyTransactionRankingQuery } from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useTransactionRanking() {
  const [
    triggerTransactionRanking,
    { data: transactionData, isLoading: isLoadingTransaction }
  ] = useLazyTransactionRankingQuery();

  const fetchTransactionsRanking = async (type: RankingParams) => {
    const preferCacheValue = true;

    const [error] = await handleRequest(
      triggerTransactionRanking(type, preferCacheValue).unwrap()
    );

    if (error) {
      toast.error(`Houve um erro ao carregar o ranking de transações`);
      return;
    }
  };

  return { fetchTransactionsRanking, transactionData, isLoadingTransaction };
}
