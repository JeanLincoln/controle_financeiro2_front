import { useDeleteOriginMutation } from "@/store/services/origin/origin.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

export function useDeleteOrigin() {
  const [deleteOrigin, { isLoading }] = useDeleteOriginMutation();

  async function handleDeleteOrigin(originId?: number) {
    if (!originId) return;

    const [error] = await handleRequest(
      deleteOrigin({ id: originId }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao excluir a origem");
      return;
    }
  }

  return {
    handleDeleteOrigin,
    isLoading
  };
}
