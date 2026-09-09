import { useAppSelector } from "@/store";
import { useFindUserByIdQuery } from "@/store/services/user/user.service";

export function useProfileScreen() {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data: user, isLoading } = useFindUserByIdQuery(
    { id: userId ?? 0 },
    { skip: userId === undefined }
  );

  return {
    hasAuthenticatedUser: userId !== undefined,
    isLoading,
    user
  };
}
