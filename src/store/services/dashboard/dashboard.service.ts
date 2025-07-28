import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../config/base-query";
import type { BalanceParams, BalanceResponse } from "./types";
import { CACHE_TIME_INTERVALS } from "../constants";

export const DashboardService = createApi({
  reducerPath: "dashboard-service",
  baseQuery: baseQueryWithAuth,
  refetchOnMountOrArgChange: CACHE_TIME_INTERVALS.NO_CACHE,
  endpoints: (builder) => ({
    balance: builder.query<BalanceResponse, BalanceParams>({
      query: () => ({
        method: "GET",
        url: `/dashboard/balance`
      })
    })
  })
});

export const { useBalanceQuery } = DashboardService;
