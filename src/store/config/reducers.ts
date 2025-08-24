import { combineReducers } from "@reduxjs/toolkit";
import { AuthService } from "../services/auth/auth.service";
import { CategoryService } from "../services/category/category.service";
import { DashboardService } from "../services/dashboard/dashboard.service";
import { OriginService } from "../services/origin/origin.service";
import { SubCategoryService } from "../services/subCategory/subCategory.service";
import { AuthSlice } from "../slices/auth/auth.slice";
import { ShowAndHideSlice } from "../slices/showAndHide/showAndHide.slice";

const reducer = combineReducers({
  // Services
  [AuthService.reducerPath]: AuthService.reducer,
  [DashboardService.reducerPath]: DashboardService.reducer,
  [OriginService.reducerPath]: OriginService.reducer,
  [CategoryService.reducerPath]: CategoryService.reducer,
  [SubCategoryService.reducerPath]: SubCategoryService.reducer,
  // Slices
  [AuthSlice.name]: AuthSlice.reducer,
  [ShowAndHideSlice.name]: ShowAndHideSlice.reducer
});

export { reducer };

export type RootState = ReturnType<typeof reducer>;
