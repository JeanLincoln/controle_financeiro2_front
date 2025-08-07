import { useUpdateOriginMutation } from "@/store/services/origin/origin.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";
import type { CreateOrUpdateOrigin } from "../Origin.form";

export function useOriginUpdate() {
  const [updateOrigin, { isLoading }] = useUpdateOriginMutation();

  async function handleUpdateOrigin(
    originId: number,
    originData: CreateOrUpdateOrigin
  ) {
    const [error] = await handleRequest(
      updateOrigin({ id: originId, ...originData }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao atualizar a origem");
      return;
    }
  }

  return { handleUpdateOrigin, isLoading };
}
