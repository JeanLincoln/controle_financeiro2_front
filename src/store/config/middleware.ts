import type { Middleware } from "@reduxjs/toolkit";
import { AuthService } from "../services/auth/auth.service";
import { DashboardService } from "../services/dashboard/dashboard.service";

interface MiddlewareOptions {
  serializableCheck?: boolean | object;
  [key: string]: unknown;
}

type GetDefaultMiddlewareType = (options?: MiddlewareOptions) => Middleware[];

export default (getDefaultMiddleware: GetDefaultMiddlewareType) => {
  const middleware = getDefaultMiddleware({
    serializableCheck: false
  }).concat(AuthService.middleware, DashboardService.middleware);

  return middleware;
};
