import { usePromiseDebounce } from "@/hooks/usePromiseDebounce.hook";
import { useFindAllTransactions } from "@/store/requests/transaction/useFindAllTransactions.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TransactionFormSchema,
  transactionFormDefaultValues,
  type TransactionFormSchemaType
} from "../components/FiltersSection/Transaction.schema";

export function useTransactionScreen() {
  const form = useForm({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: transactionFormDefaultValues
  });

  const { transactions, isLoading, setTransactionsFilters } =
    useFindAllTransactions();

  const { debounceLoading } = usePromiseDebounce<TransactionFormSchemaType>({
    formWatch: form.watch,
    callback: setTransactionsFilters
  });

  const nameSearch = form.watch("name");
  const dataIsLoading = isLoading || debounceLoading;
  const dataIsEmpty =
    !dataIsLoading && (!transactions || transactions.data.length === 0);

  return {
    form,
    dataIsLoading,
    dataIsEmpty,
    transactions,
    nameSearch
  };
}
