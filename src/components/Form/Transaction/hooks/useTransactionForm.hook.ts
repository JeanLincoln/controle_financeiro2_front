import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import type { Transaction } from "@/entities/transaction.entity";
import { useAppDispatch } from "@/store";
import { useTransactionCreate } from "@/store/requests/transaction/useTransactionCreate.request";
import { useTransactionUpdate } from "@/store/requests/transaction/useTransactionUpdate.request";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";

import {
  transactionFormDefaultValues,
  TransactionFormSchema
} from "../TransactionForm.schema";

export type CreateOrUpdateTransaction = Omit<
  Transaction,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "userId"
  | "origin"
  | "categories"
  | "subCategories"
> & {
  origin: number;
  categories: number[];
  subCategories: number[];
};

const onCreateOrUpdateSuccess = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(ShowAndHideActions.hide());
};

export function useTransactionForm(transaction: Transaction | undefined) {
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: useMemo(
      () => transactionFormDefaultValues(transaction),
      [transaction]
    )
  });

  const { handleCreateTransaction, isLoading: isCreating } =
    useTransactionCreate({
      successCallback: () => onCreateOrUpdateSuccess(dispatch)
    });
  const { handleUpdateTransaction, isLoading: isUpdating } =
    useTransactionUpdate({
      successCallback: () => onCreateOrUpdateSuccess(dispatch)
    });

  const onSubmit = (data: CreateOrUpdateTransaction) => {
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
