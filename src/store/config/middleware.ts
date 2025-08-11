import type { Middleware } from "@reduxjs/toolkit";
import { AuthService } from "../services/auth/auth.service";
import { CategoryService } from "../services/category/category.service";
import { DashboardService } from "../services/dashboard/dashboard.service";
import { OriginService } from "../services/origin/origin.service";

interface MiddlewareOptions {
  serializableCheck?: boolean | object;
  [key: string]: unknown;
}

type GetDefaultMiddlewareType = (options?: MiddlewareOptions) => Middleware[];

export default (getDefaultMiddleware: GetDefaultMiddlewareType) => {
  const middleware = getDefaultMiddleware({
    serializableCheck: false
  }).concat(
    AuthService.middleware,
    DashboardService.middleware,
    OriginService.middleware,
    CategoryService.middleware
  );

  return middleware;
};
