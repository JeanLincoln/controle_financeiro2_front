import { toast } from "sonner";

import type { CreateOrUpdateOrigin } from "@/components/Form/Origin/hooks/useOriginForm.hook";
import { useCreateOriginMutation } from "@/store/services/origin/origin.service";
import type { OriginFindByIdResponse } from "@/store/services/origin/originService.types";
import { handleRequest } from "@/utils/handleRequest.utils";

type UseOriginCreateProps = {
  successCallback: (origin: OriginFindByIdResponse) => void;
  errorCallback?: () => void;
};

export function useOriginCreate({
  successCallback,
  errorCallback
}: UseOriginCreateProps) {
  const [createOrigin, { isLoading }] = useCreateOriginMutation();

  async function handleCreateOrigin(originData: CreateOrUpdateOrigin) {
    const [error, createdOrigin] = await handleRequest(
      createOrigin(originData).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao criar a origem");
      errorCallback?.();
      return;
    }

    successCallback(createdOrigin);
  }

  return { handleCreateOrigin, isLoading };
}
