import { toast } from "sonner";

import type { TransactionFormValues } from "@/components/Form/Transaction/hooks/useTransactionForm.hook";
import { useAppDispatch } from "@/store";
import { DashboardService } from "@/store/services/dashboard/dashboard.service";
import { useUpdateTransactionMutation } from "@/store/services/transaction/transaction.service";
import { handleRequest } from "@/utils/handleRequest.utils";

type UseTransactionUpdateProps = {
  successCallback: () => void;
  errorCallback?: () => void;
};

export function useTransactionUpdate({
  successCallback,
  errorCallback
}: UseTransactionUpdateProps) {
  const dispatch = useAppDispatch();
  const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();

  async function handleUpdateTransaction(
    transactionId: number,
    transactionData: TransactionFormValues
  ) {
    const [error] = await handleRequest(
      updateTransaction({
        ...transactionData,
        id: transactionId,
        transactionDate: new Date(transactionData.transactionDate).toISOString()
      }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao atualizar a transação");
      errorCallback?.();
      return;
    }

    toast.success("Transação atualizada com sucesso");
    dispatch(DashboardService.util.invalidateTags(["Balance"]));
    successCallback();
  }

  return { handleUpdateTransaction, isLoading };
}
