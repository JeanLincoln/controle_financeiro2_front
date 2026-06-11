import { toast } from "sonner";

import type { TransactionFormValues } from "@/components/Form/Transaction/hooks/useTransactionForm.hook";
import { useAppDispatch } from "@/store";
import { DashboardService } from "@/store/services/dashboard/dashboard.service";
import { useCreateTransactionMutation } from "@/store/services/transaction/transaction.service";
import { handleRequest } from "@/utils/handleRequest.utils";

type UseTransactionCreateProps = {
  successCallback: () => void;
  errorCallback?: () => void;
};

export function useTransactionCreate({
  successCallback,
  errorCallback
}: UseTransactionCreateProps) {
  const dispatch = useAppDispatch();
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  async function handleCreateTransaction(
    transactionData: TransactionFormValues
  ) {
    const [error] = await handleRequest(
      createTransaction({
        ...transactionData,
        transactionDate: transactionData.transactionDate.toISOString()
      }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao criar a transação");
      errorCallback?.();
      return;
    }
    dispatch(DashboardService.util.invalidateTags(["Balance"]));
    toast.success("Transação criada com sucesso");
    successCallback();
  }

  return { handleCreateTransaction, isLoading };
}
