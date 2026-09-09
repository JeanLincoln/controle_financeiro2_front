import { toast } from "sonner";

import { useDeleteOriginMutation } from "@/store/services/origin/origin.service";
import type { ReduxErrorProps } from "@/store/store.types";

export function useDeleteOrigin() {
  const [deleteOrigin, { isLoading }] = useDeleteOriginMutation();

  async function handleDeleteOrigin(originId?: number) {
    if (!originId) return;

    try {
      await deleteOrigin({ id: originId }).unwrap();
      toast.success("Origem excluída com sucesso");
      return true;
    } catch (err) {
      console.error("Error deleting origin:", err);

      const error = err as ReduxErrorProps;
      const isOriginUsedByTransactions =
        error.data?.message ===
        "This origin cannot be deleted because it is used by transactions";

      toast.error(
        isOriginUsedByTransactions
          ? "Não é possível excluir esta origem, ela está associada a um ou mais transações"
          : "Houve um erro ao excluir a origem"
      );
      return false;
    }
  }

  return {
    handleDeleteOrigin,
    isLoading
  };
}
