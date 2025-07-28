import { combineReducers } from "@reduxjs/toolkit";
import { AuthService } from "../services/auth/auth.service";
import { AuthSlice } from "../slices/auth/auth.slice";
import { DashboardService } from "../services/dashboard/dashboard.service";

const reducer = combineReducers({
  // Services
  [AuthService.reducerPath]: AuthService.reducer,
  [DashboardService.reducerPath]: DashboardService.reducer,
  // Slices
  [AuthSlice.name]: AuthSlice.reducer
});

export { reducer };

export type RootState = ReturnType<typeof reducer>;
