import { createApi } from "@reduxjs/toolkit/query/react";

import type { Transaction } from "@/entities/transaction.entity";

import { baseQueryWithAuth } from "../../config/base-query";
import { CACHE_TIME_INTERVALS } from "../services.constants";
import type { PaginationResponse } from "../services.types";
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
        params
      }),
      providesTags: ["Transaction"],
      transformResponse: (
        response: PaginationResponse & {
          data: Transaction[];
        }
      ) => {
        const transactions = [...response.data];
        const transformedTransactions = transactions.map((transaction) => {
          const formattedCategories = transaction.categories.map(
            (category) => ({
              id: category.id,
              name: category.name,
              icon: category.icon,
              color: category.color
            })
          );

          const formattedSubCategories = transaction.subCategories.map(
            (subCategory) => ({
              id: subCategory.id,
              name: subCategory.name,
              icon: subCategory.icon,
              color: subCategory.color
            })
          );

          const displayedCategoriesAndSubCategories = [
            ...formattedCategories,
            ...formattedSubCategories
          ].map((item, index) => ({
            id: Math.random() + index,
            name: item.name,
            icon: item.icon,
            color: item.color
          }));

          return {
            ...transaction,
            displayedCategoriesAndSubCategories
          };
        });

        return { ...response, data: transformedTransactions };
      }
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
