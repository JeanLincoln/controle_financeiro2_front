import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Transaction } from "@/entities/transaction.entity";
import { useTransactionCreate } from "@/store/requests/transaction/useTransactionCreate.request";
import { useTransactionUpdate } from "@/store/requests/transaction/useTransactionUpdate.request";
import type { CreateTransactionParams } from "@/store/services/transaction/transactionService.types";

import {
  transactionFormDefaultValues,
  TransactionFormSchema
} from "../TransactionForm.schema";

export type TransactionFormValues = Omit<
  CreateTransactionParams,
  "transactionDate"
> & {
  transactionDate: Date;
};

interface UseTransactionFormProps {
  transaction?: Transaction;
  onSuccess: () => void;
}

export function useTransactionForm({
  transaction,
  onSuccess
}: UseTransactionFormProps) {
  const form = useForm({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: useMemo(
      () => transactionFormDefaultValues(transaction),
      [transaction]
    )
  });

  const { handleCreateTransaction, isLoading: isCreating } =
    useTransactionCreate({
      successCallback: onSuccess
    });
  const { handleUpdateTransaction, isLoading: isUpdating } =
    useTransactionUpdate({
      successCallback: onSuccess
    });

  const onSubmit = (data: TransactionFormValues) => {
    if (transaction) {
      handleUpdateTransaction(transaction.id, data);
      return;
    }

    handleCreateTransaction(data);
  };

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    form.reset(transactionFormDefaultValues(transaction));
  }, [form, transaction]);

  return {
    form,
    onSubmit,
    isLoading
  };
}
