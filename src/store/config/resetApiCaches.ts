import { AuthService } from "@/store/services/auth/auth.service";
import { DashboardService } from "@/store/services/dashboard/dashboard.service";
import type { AppDispatch } from "@/store";

const API_SERVICES = [AuthService, DashboardService] as const;

export const resetAllApiCaches = (dispatch: AppDispatch) => {
  API_SERVICES.forEach((service) => {
    dispatch(service.util.resetApiState());
  });
};
