import type { AppDispatch } from "@/store";
import { AuthService } from "@/store/services/auth/auth.service";
import { DashboardService } from "@/store/services/dashboard/dashboard.service";
import { UserService } from "@/store/services/user/user.service";

const API_SERVICES = [AuthService, DashboardService, UserService] as const;

export const resetAllApiCaches = (dispatch: AppDispatch) => {
  API_SERVICES.forEach((service) => {
    dispatch(service.util.resetApiState());
  });
};
