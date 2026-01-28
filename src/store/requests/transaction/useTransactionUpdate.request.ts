import { toast } from "sonner";

import type { TransactionFormValues } from "@/components/Form/Transaction/hooks/useTransactionForm.hook";
import { useUpdateTransactionMutation } from "@/store/services/transaction/transaction.service";
import { formatDateToApi } from "@/utils/formatDateToApi.utils";
import { handleRequest } from "@/utils/handleRequest.utils";

type UseTransactionUpdateProps = {
  successCallback: () => void;
  errorCallback?: () => void;
};

export function useTransactionUpdate({
  successCallback,
  errorCallback
}: UseTransactionUpdateProps) {
  const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();

  async function handleUpdateTransaction(
    transactionId: number,
    transactionData: TransactionFormValues
  ) {
    const [error] = await handleRequest(
      updateTransaction({
        ...transactionData,
        id: transactionId,
        transactionDate: formatDateToApi(
          new Date(transactionData.transactionDate)
        )
      }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao atualizar a transação");
      errorCallback?.();
      return;
    }

    toast.success("Transação atualizada com sucesso");
    successCallback();
  }

  return { handleUpdateTransaction, isLoading };
}
