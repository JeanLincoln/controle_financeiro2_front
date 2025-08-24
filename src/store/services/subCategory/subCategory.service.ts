import { baseQueryWithAuth } from "@/store/config/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_TIME_INTERVALS } from "../services.constants";
import type {
  CreateSubCategoryParams,
  DeleteSubCategoryParams,
  FindByIdSubCategoryParams,
  FindByIdSubCategoryResponse,
  UpdateSubCategoryParams
} from "./subCategoryService.types";

export const SubCategoryService = createApi({
  reducerPath: "sub-category-service",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["SubCategory"],
  refetchOnMountOrArgChange: CACHE_TIME_INTERVALS.TWO_MINUTES,
  keepUnusedDataFor: CACHE_TIME_INTERVALS.THIRTY_SECONDS,
  endpoints: (builder) => ({
    findByIdSubCategory: builder.query<
      FindByIdSubCategoryResponse,
      FindByIdSubCategoryParams
    >({
      query: ({ categoryId, subCategoryId }) => ({
        method: "GET",
        url: `/sub-categories/${categoryId}/${subCategoryId}`
      }),
      providesTags: ["SubCategory"]
    }),
    createSubCategory: builder.mutation<void, CreateSubCategoryParams>({
      query: ({ categoryId, ...rest }) => ({
        method: "POST",
        url: `/sub-categories/${categoryId}`,
        body: rest
      }),
      invalidatesTags: ["SubCategory"]
    }),
    updateSubCategory: builder.mutation<void, UpdateSubCategoryParams>({
      query: ({ categoryId, id, ...rest }) => ({
        method: "PUT",
        url: `/sub-categories/${categoryId}/${id}`,
        body: rest
      }),
      invalidatesTags: ["SubCategory"]
    }),
    deleteSubCategory: builder.mutation<void, DeleteSubCategoryParams>({
      query: ({ categoryId, subCategoryId }) => ({
        method: "DELETE",
        url: `/sub-categories/${categoryId}/${subCategoryId}`
      }),
      invalidatesTags: ["SubCategory"]
    })
  })
});

export const {
  useFindByIdSubCategoryQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation
} = SubCategoryService;
