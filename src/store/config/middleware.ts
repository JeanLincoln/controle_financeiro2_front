import { AuthService } from "../services/auth/auth.service";
import { DashboardService } from "../services/dashboard/dashboard.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (getDefaultMiddleware: any) => {
  const middleware = getDefaultMiddleware({
    serializableCheck: false
  }).concat(AuthService.middleware, DashboardService.middleware);

  return middleware;
};
