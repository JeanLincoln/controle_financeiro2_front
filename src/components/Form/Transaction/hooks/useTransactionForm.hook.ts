import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import type { Transaction } from "@/entities/transaction.entity";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useAppDispatch } from "@/store";
import { useTransactionCreate } from "@/store/requests/transaction/useTransactionCreate.request";
import { useTransactionUpdate } from "@/store/requests/transaction/useTransactionUpdate.request";
import type { CreateTransactionParams } from "@/store/services/transaction/transactionService.types";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";

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

export function useTransactionForm(transaction: Transaction | undefined) {
  const { handleKeys } = useAppSearchParams();
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: useMemo(
      () => transactionFormDefaultValues(transaction),
      [transaction]
    )
  });

  const onCreateOrUpdateSuccess = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(ShowAndHideActions.hide());
    handleKeys({ remove: ["create", "id", "edit"] });
  };

  const { handleCreateTransaction, isLoading: isCreating } =
    useTransactionCreate({
      successCallback: () => onCreateOrUpdateSuccess(dispatch)
    });
  const { handleUpdateTransaction, isLoading: isUpdating } =
    useTransactionUpdate({
      successCallback: () => onCreateOrUpdateSuccess(dispatch)
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
  }, [transaction]);

  return {
    form,
    onSubmit,
    isLoading
  };
}
