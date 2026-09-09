import { toast } from "sonner";

import { useDeleteOriginMutation } from "@/store/services/origin/origin.service";

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
      toast.error("Houve um erro ao excluir a origem");
      return false;
    }
  }

  return {
    handleDeleteOrigin,
    isLoading
  };
}
