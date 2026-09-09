import { toast } from "sonner";

import { useUpdateUserMutation } from "@/store/services/user/user.service";
import type { UpdateUserParams } from "@/store/services/user/userService.types";
import { handleRequest } from "@/utils/handleRequest.utils";

interface UseUserUpdateProps {
  successCallback?: (userData: UpdateUserParams) => void;
}

export function useUserUpdate({ successCallback }: UseUserUpdateProps = {}) {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  async function handleUpdateUser(userData: UpdateUserParams) {
    const [error] = await handleRequest(updateUser(userData).unwrap());

    if (error) {
      toast.error("Houve um erro ao atualizar o perfil. Tente novamente.");
      return;
    }

    toast.success("Perfil atualizado com sucesso!");
    successCallback?.(userData);
  }

  return { handleUpdateUser, isLoading };
}
