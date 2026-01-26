import { toast } from "sonner";

import type { TransactionFormValues } from "@/components/Form/Transaction/hooks/useTransactionForm.hook";
import { useCreateTransactionMutation } from "@/store/services/transaction/transaction.service";
import { formatDateToApi } from "@/utils/formatDateToApi.utils";
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
    transactionData: TransactionFormValues
  ) {
    const [error] = await handleRequest(
      createTransaction({
        ...transactionData,
        transactionDate: formatDateToApi(
          new Date(transactionData.transactionDate)
        )
      }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao criar a transação");
      errorCallback?.();
      return;
    }

    toast.success("Transação criada com sucesso");
    successCallback();
  }

  return { handleCreateTransaction, isLoading };
}
