import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../config/base-query";
import { CACHE_TIME_INTERVALS } from "../services.constants";
import type {
  BalanceParams,
  BalanceResponse,
  CategoryRankingResponse,
  OriginRankingResponse,
  RankingParams,
  SubCategoryRankingResponse,
  TransactionRankingResponse,
  TransactionsGraphParams,
  TransactionsGraphResponse
} from "./dashboardService.types";

export const DashboardService = createApi({
  reducerPath: "dashboard-service",
  baseQuery: baseQueryWithAuth,
  refetchOnMountOrArgChange: CACHE_TIME_INTERVALS.TWO_MINUTES,
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
          startDate: startDate,
          endDate: endDate
        }
      })
    }),
    categoryRanking: builder.query<CategoryRankingResponse, RankingParams>({
      query: ({ type }) => ({
        method: "GET",
        url: "/dashboard/category-ranking",
        params: {
          type
        }
      })
    }),
    subCategoryRanking: builder.query<
      SubCategoryRankingResponse,
      RankingParams
    >({
      query: ({ type }) => ({
        method: "GET",
        url: "/dashboard/sub-category-ranking",
        params: {
          type
        }
      })
    }),
    transactionRanking: builder.query<
      TransactionRankingResponse,
      RankingParams
    >({
      query: ({ type }) => ({
        method: "GET",
        url: "/dashboard/transaction-ranking",
        params: {
          type
        }
      })
    }),
    originRanking: builder.query<OriginRankingResponse, RankingParams>({
      query: ({ type }) => ({
        method: "GET",
        url: "/dashboard/origin-ranking",
        params: {
          type
        }
      })
    })
  })
});

export const {
  useBalanceQuery,
  useTransactionsGraphQuery,
  useOriginRankingQuery,
  useSubCategoryRankingQuery,
  useTransactionRankingQuery,
  useCategoryRankingQuery
} = DashboardService;
