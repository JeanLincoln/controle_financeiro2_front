import { transactionFormDefaultValues } from "@/screens/Transaction/components/FiltersSection/Transaction.schema";
import { useFindAllTransactionsQuery } from "@/store/services/transaction/transaction.service";
import type { TransactionFindAllParams } from "@/store/services/transaction/transactionService.types";
import { useState } from "react";
import { toast } from "sonner";

export function useFindAllTransactions() {
  const [filters, setFilters] = useState<TransactionFindAllParams>(
    transactionFormDefaultValues
  );
  const {
    data: transactions,
    isLoading,
    isFetching,
    isError
  } = useFindAllTransactionsQuery(filters);

  if (isError) {
    toast.error(
      "Houve um erro ao buscar as transações, tente novamente mais tarde!."
    );
  }

  return {
    transactions,
    setTransactionsFilters: setFilters,
    isLoading: isLoading || isFetching
  };
}
