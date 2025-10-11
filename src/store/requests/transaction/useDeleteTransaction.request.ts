import { useDeleteTransactionMutation } from "@/store/services/transaction/transaction.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useDeleteTransaction() {
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();

  async function handleDeleteTransaction(transactionId?: number) {
    if (!transactionId) return;

    const [error] = await handleRequest(
      deleteTransaction({ id: transactionId }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao excluir a transação");
      return;
    }
  }

  return {
    handleDeleteTransaction,
    isLoading
  };
}
