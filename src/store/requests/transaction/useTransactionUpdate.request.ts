import type { CreateOrUpdateTransaction } from "@/components/Form/Transaction/hooks/useTransactionForm.hook";
import { useUpdateTransactionMutation } from "@/store/services/transaction/transaction.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

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
    transactionData: CreateOrUpdateTransaction
  ) {
    const [error] = await handleRequest(
      updateTransaction({ id: transactionId, ...transactionData }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao atualizar a transação");
      errorCallback?.();
      return;
    }

    successCallback();
  }

  return { handleUpdateTransaction, isLoading };
}
