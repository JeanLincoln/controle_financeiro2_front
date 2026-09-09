import { Tuple, type Middleware } from "@reduxjs/toolkit";
import type { PersistPartial } from "redux-persist/es/persistReducer";

import { AuthService } from "../services/auth/auth.service";
import { CategoryService } from "../services/category/category.service";
import { DashboardService } from "../services/dashboard/dashboard.service";
import { OriginService } from "../services/origin/origin.service";
import { SubCategoryService } from "../services/subCategory/subCategory.service";
import { TransactionService } from "../services/transaction/transaction.service";
import { UserService } from "../services/user/user.service";
import type { RootState } from "./reducers";

type PersistedRootState = RootState & PersistPartial;
type AppMiddleware = Middleware<unknown, PersistedRootState>;
type AppMiddlewareTuple = Tuple<AppMiddleware[]>;
type GetDefaultMiddlewareCallback = (options?: {
  serializableCheck?: boolean | object;
}) => AppMiddlewareTuple;

export default function middleware(
  getDefaultMiddleware: GetDefaultMiddlewareCallback
) {
  return getDefaultMiddleware({
    serializableCheck: false
  }).concat(
    AuthService.middleware,
    DashboardService.middleware,
    OriginService.middleware,
    CategoryService.middleware,
    SubCategoryService.middleware,
    TransactionService.middleware,
    UserService.middleware
  );
}
