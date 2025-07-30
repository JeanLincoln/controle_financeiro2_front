import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../config/base-query";
import type {
  BalanceParams,
  BalanceResponse,
  TransactionsGraphParams,
  TransactionsGraphResponse
} from "./types";
import { CACHE_TIME_INTERVALS } from "../constants";

export const DashboardService = createApi({
  reducerPath: "dashboard-service",
  baseQuery: baseQueryWithAuth,
  keepUnusedDataFor: CACHE_TIME_INTERVALS.THIRTY_SECONDS,
  endpoints: (builder) => ({
    balance: builder.query<BalanceResponse, BalanceParams>({
      query: () => ({
        method: "GET",
        url: "/dashboard/balance"
      })
    }),
    transactionsGraph: builder.query<
      TransactionsGraphResponse,
      TransactionsGraphParams
    >({
      query: ({ startDate, endDate }) => ({
        method: "GET",
        url: "/dashboard/transaction-graph",
        params: {
          startDate: startDate.toString(),
          endDate: endDate.toString()
        }
      })
    })
  })
});

export const { useBalanceQuery, useLazyTransactionsGraphQuery } =
  DashboardService;
