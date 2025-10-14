import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithAuth } from "../../config/base-query";
import { CACHE_TIME_INTERVALS } from "../services.constants";
import { validateRequestFields } from "../utils/validateRequestFields.utils";
import type {
  CreateTransactionParams,
  DeleteTransactionParams,
  TransactionFindAllParams,
  TransactionFindAllResponse,
  TransactionFindByIdParams,
  TransactionFindByIdResponse,
  UpdateTransactionParams
} from "./transactionService.types";

export const TransactionService = createApi({
  reducerPath: "transaction-service",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Transaction"],
  refetchOnMountOrArgChange: CACHE_TIME_INTERVALS.THIRTY_MINUTES,
  keepUnusedDataFor: CACHE_TIME_INTERVALS.FIVE_MINUTES,
  endpoints: (builder) => ({
    findAllTransactions: builder.query<
      TransactionFindAllResponse,
      TransactionFindAllParams
    >({
      query: (params) => ({
        method: "GET",
        url: "/transaction",
        params: validateRequestFields(params)
      }),
      providesTags: ["Transaction"]
    }),
    findTransactionById: builder.query<
      TransactionFindByIdResponse,
      TransactionFindByIdParams
    >({
      query: ({ id }) => ({
        method: "GET",
        url: `/transaction/${id}`
      }),
      providesTags: ["Transaction"]
    }),
    createTransaction: builder.mutation<void, CreateTransactionParams>({
      query: (transaction) => ({
        method: "POST",
        url: "/transaction",
        body: transaction
      }),
      invalidatesTags: ["Transaction"]
    }),
    updateTransaction: builder.mutation<void, UpdateTransactionParams>({
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/transaction/${id}`,
        body
      }),
      invalidatesTags: ["Transaction"]
    }),
    deleteTransaction: builder.mutation<void, DeleteTransactionParams>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `/transaction/${id}`
      }),
      invalidatesTags: ["Transaction"]
    })
  })
});

export const {
  useFindAllTransactionsQuery,
  useFindTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation
} = TransactionService;
