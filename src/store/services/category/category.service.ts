import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithAuth } from "../../config/base-query";
import {
  CACHE_TIME_INTERVALS,
  DEFAULT_INFINITE_QUERY_OPTIONS
} from "../services.constants";
import type { OmitPagination, PaginationProps } from "../services.types";
import type {
  CategoryFindAllParams,
  CategoryFindAllResponse,
  CategoryFindByIdParams,
  CategoryFindByIdResponse,
  CategoryOptionsParams,
  CategoryOptionsResponse,
  CreateCategoryParams,
  CreateCategoryResponse,
  DeleteCategoryParams,
  UpdateCategoryParams
} from "./categoryService.types";

export const CategoryService = createApi({
  reducerPath: "category-service",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Category"],
  refetchOnMountOrArgChange: CACHE_TIME_INTERVALS.TWO_MINUTES,
  keepUnusedDataFor: CACHE_TIME_INTERVALS.THIRTY_SECONDS,
  endpoints: (builder) => ({
    findAllCategories: builder.query<
      CategoryFindAllResponse,
      CategoryFindAllParams
    >({
      query: (params) => ({
        method: "GET",
        url: "/categories",
        params
      }),
      providesTags: ["Category"]
    }),
    infiniteFindAllCategories: builder.infiniteQuery<
      CategoryFindAllResponse,
      OmitPagination<CategoryFindAllParams>,
      PaginationProps
    >({
      infiniteQueryOptions: DEFAULT_INFINITE_QUERY_OPTIONS,
      query: ({ pageParam, queryArg }) => ({
        method: "GET",
        url: "/categories",
        params: {
          ...pageParam,
          ...queryArg
        }
      }),
      providesTags: ["Category"]
    }),

    findCategoryById: builder.query<
      CategoryFindByIdResponse,
      CategoryFindByIdParams
    >({
      query: ({ id }) => ({
        method: "GET",
        url: `/categories/${id}`
      }),
      providesTags: ["Category"]
    }),
    getCategoriesOptions: builder.infiniteQuery<
      CategoryOptionsResponse,
      OmitPagination<CategoryOptionsParams>,
      PaginationProps
    >({
      infiniteQueryOptions: DEFAULT_INFINITE_QUERY_OPTIONS,
      query: ({ pageParam, queryArg }) => ({
        method: "GET",
        url: "/categories/options",
        params: {
          ...pageParam,
          ...queryArg
        }
      }),
      providesTags: ["Category"]
    }),
    createCategory: builder.mutation<
      CreateCategoryResponse,
      CreateCategoryParams
    >({
      query: (category) => ({
        method: "POST",
        url: "/categories",
        body: category
      }),
      invalidatesTags: ["Category"]
    }),
    updateCategory: builder.mutation<void, UpdateCategoryParams>({
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/categories/${id}`,
        body
      }),
      invalidatesTags: ["Category"]
    }),
    deleteCategory: builder.mutation<void, DeleteCategoryParams>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `/categories/${id}`
      }),
      invalidatesTags: ["Category"]
    })
  })
});

export const {
  useFindAllCategoriesQuery,
  useInfiniteFindAllCategoriesInfiniteQuery,
  useLazyFindAllCategoriesQuery,
  useLazyFindCategoryByIdQuery,
  useGetCategoriesOptionsInfiniteQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = CategoryService;
