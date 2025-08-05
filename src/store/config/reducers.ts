import { combineReducers } from "@reduxjs/toolkit";
import { AuthService } from "../services/auth/auth.service";
import { AuthSlice } from "../slices/auth/auth.slice";
import { DashboardService } from "../services/dashboard/dashboard.service";
import { OriginService } from "../services/origin/origin.service";
import { OriginSlice } from "../slices/origin/origin.slice";

const reducer = combineReducers({
  // Services
  [AuthService.reducerPath]: AuthService.reducer,
  [DashboardService.reducerPath]: DashboardService.reducer,
  [OriginService.reducerPath]: OriginService.reducer,
  // Slices
  [AuthSlice.name]: AuthSlice.reducer,
  [OriginSlice.name]: OriginSlice.reducer
});

export { reducer };

export type RootState = ReturnType<typeof reducer>;
