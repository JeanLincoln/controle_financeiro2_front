import { toast } from "sonner";

import type { CreateOrUpdateTransaction } from "@/components/Form/Transaction/hooks/useTransactionForm.hook";
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
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  async function handleCreateTransaction(
    transactionData: CreateOrUpdateTransaction
  ) {
    const [error] = await handleRequest(
      createTransaction(transactionData).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao criar a transação");
      errorCallback?.();
      return;
    }

    successCallback();
  }

  return { handleCreateTransaction, isLoading };
}
