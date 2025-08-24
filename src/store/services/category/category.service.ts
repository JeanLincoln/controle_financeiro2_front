import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../config/base-query";
import { CACHE_TIME_INTERVALS } from "../services.constants";
import type {
  CategoryFindAllParams,
  CategoryFindAllResponse,
  CategoryFindByIdParams,
  CategoryFindByIdResponse,
  CategoryOptionsParams,
  CategoryOptionsResponse,
  CreateCategoryParams,
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
    getCategoriesOptions: builder.query<
      CategoryOptionsResponse,
      CategoryOptionsParams
    >({
      query: (params) => ({
        method: "GET",
        url: "/categories/options",
        params
      }),
      providesTags: ["Category"]
    }),
    createCategory: builder.mutation<void, CreateCategoryParams>({
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
  useLazyFindAllCategoriesQuery,
  useLazyFindCategoryByIdQuery,
  useLazyGetCategoriesOptionsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = CategoryService;
