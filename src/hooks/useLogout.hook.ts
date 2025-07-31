import { useAppDispatch } from "@/store";
import { useLogoutMutation } from "@/store/services/auth/auth.service";
import { AuthActions } from "@/store/slices/auth/auth.slice";
import { handleRequest } from "@/utils/handleRequest.utils";
import { resetAllApiCaches } from "@/store/config/resetApiCaches";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { persistor } from "@/store";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutReq] = useLogoutMutation();

  const logout = async () => {
    const [error] = await handleRequest(logoutReq().unwrap());

    if (error) {
      toast.error("Houve um erro ao fazer logout. Tente novamente.");
      return;
    }

    dispatch(AuthActions.logout());
    resetAllApiCaches(dispatch);
    await persistor.purge();
    window.localStorage.clear();
    window.sessionStorage.clear();

    toast.success("Logout realizado com sucesso!");

    navigate("/auth/login", { replace: true });
  };

  return logout;
};
