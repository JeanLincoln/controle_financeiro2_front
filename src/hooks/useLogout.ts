import { useAppDispatch } from "@/store";
import { useLogoutMutation } from "@/store/services/auth/auth.service";
import { AuthActions } from "@/store/slices/auth/auth.slice";
import { handleRequest } from "@/utils/handleRequest";
import { useNavigate } from "react-router";
import { toast } from "sonner";

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
    window.localStorage.removeItem("persist:root");
    window.localStorage.clear();
    window.sessionStorage.clear();

    toast.success("Logged out successfully");

    navigate("/auth/login", { replace: true });
  };

  return logout;
};
