import type { CreateOrUpdateOrigin } from "@/components/Form/Origin/hooks/useOriginForm.hook";
import { useCreateOriginMutation } from "@/store/services/origin/origin.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";

type UseOriginCreateProps = {
  successCallback: () => void;
  errorCallback?: () => void;
};

export function useOriginCreate({
  successCallback,
  errorCallback
}: UseOriginCreateProps) {
  const [createOrigin, { isLoading }] = useCreateOriginMutation();

  async function handleCreateOrigin(originData: CreateOrUpdateOrigin) {
    const [error] = await handleRequest(createOrigin(originData).unwrap());

    if (error) {
      toast.error("Houve um erro ao criar a origem");
      errorCallback?.();
      return;
    }

    successCallback();
  }

  return { handleCreateOrigin, isLoading };
}
