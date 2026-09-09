import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/store";
import { useFindUserByIdQuery } from "@/store/services/user/user.service";

export function useProfileScreen() {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data: user, isLoading } = useFindUserByIdQuery(
    userId === undefined ? skipToken : { id: userId }
  );

  return {
    hasAuthenticatedUser: userId !== undefined,
    isLoading,
    user
  };
}
