import { useCreateOriginMutation } from "@/store/services/origin/origin.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";
import type { CreateOrUpdateOrigin } from "./useOriginForm.hook";

export function useOriginCreate() {
  const [createOrigin, { isLoading }] = useCreateOriginMutation();

  async function handleCreateOrigin(originData: CreateOrUpdateOrigin) {
    const [error] = await handleRequest(createOrigin(originData).unwrap());

    if (error) {
      toast.error("Houve um erro ao criar a origem");
      return;
    }
  }

  return { handleCreateOrigin, isLoading };
}
