import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePromiseDebounce } from "@/hooks/usePromiseDebounce.hook";
import { useFindAllTransactions } from "@/store/requests/transaction/useFindAllTransactions.request";

import {
  transactionFormDefaultValues,
  TransactionFormSchema,
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

  const fieldsWatch = form.watch();

  const dataIsLoading = isLoading || debounceLoading;
  const dataIsEmpty =
    !dataIsLoading && (!transactions || transactions.data.length === 0);

  useEffect(() => {
    form.setValue("page", 1);
  }, [
    ...Object.entries(fieldsWatch).reduce((acc: string[], [key, value]) => {
      if (key === "page") return acc;

      if (value instanceof Array) {
        acc.push(`${key}-${value.join(",")}`);
        return acc;
      }

      acc.push(`${key}-${value}`);
      return acc;
    }, [])
  ]);

  return {
    form,
    dataIsLoading,
    dataIsEmpty,
    transactions,
    nameSearch: fieldsWatch.name
  };
}
