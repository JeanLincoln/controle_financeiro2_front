import { toast } from "sonner";

import { useAppDispatch } from "@/store";
import { DashboardService } from "@/store/services/dashboard/dashboard.service";
import { useDeleteTransactionMutation } from "@/store/services/transaction/transaction.service";
import { handleRequest } from "@/utils/handleRequest.utils";

export function useDeleteTransaction() {
  const dispatch = useAppDispatch();
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

    dispatch(DashboardService.util.invalidateTags(["Balance"]));
    toast.success("Transação excluída com sucesso");
  }

  return {
    handleDeleteTransaction,
    isLoading
  };
}
