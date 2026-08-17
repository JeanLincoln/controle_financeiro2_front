import { toast } from "sonner";

import type { CreateOrUpdateOrigin } from "@/components/Form/Origin/hooks/useOriginForm.hook";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useUpdateOriginMutation } from "@/store/services/origin/origin.service";
import { handleRequest } from "@/utils/handleRequest.utils";

type UseOriginUpdateProps = {
  successCallback?: () => void;
  errorCallback?: () => void;
};

export function useOriginUpdate({
  successCallback,
  errorCallback
}: UseOriginUpdateProps = {}) {
  const [updateOrigin, { isLoading }] = useUpdateOriginMutation();
  const { handleRemoveKey } = useAppSearchParams();

  async function handleUpdateOrigin(
    originId: number,
    originData: CreateOrUpdateOrigin
  ) {
    const [error] = await handleRequest(
      updateOrigin({ id: originId, ...originData }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao atualizar a origem");
      errorCallback?.();
      return;
    }

    toast.success("Origem atualizada com sucesso");
    handleRemoveKey({ key: "editOriginId" });
    successCallback?.();
  }

  return { handleUpdateOrigin, isLoading };
}
