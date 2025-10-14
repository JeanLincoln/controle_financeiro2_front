import { toast } from "sonner";

import { useTransactionRankingQuery } from "@/store/services/dashboard/dashboard.service";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";

export function useTransactionRanking({ type }: RankingParams) {
  const {
    data: transactionData,
    isLoading: isLoadingTransaction,
    isError
  } = useTransactionRankingQuery({ type: type || undefined });

  if (isError) {
    toast.error(`Houve um erro ao carregar o ranking de categorias`);
  }

  return { transactionData, isLoadingTransaction };
}
