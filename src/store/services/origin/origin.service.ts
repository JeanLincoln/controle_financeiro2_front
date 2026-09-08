import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithAuth } from "../../config/base-query";
import {
  CACHE_TIME_INTERVALS,
  DEFAULT_INFINITE_QUERY_OPTIONS
} from "../services.constants";
import type { OmitPagination, PaginationProps } from "../services.types";
import type {
  CreateOriginParams,
  DeleteOriginParams,
  OriginFindAllParams,
  OriginFindAllResponse,
  OriginFindByIdParams,
  OriginFindByIdResponse,
  OriginOptionsParams,
  OriginOptionsResponse,
  UpdateOriginParams
} from "./originService.types";

export const OriginService = createApi({
  reducerPath: "origin-service",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Origin"],
  refetchOnMountOrArgChange: CACHE_TIME_INTERVALS.TWO_MINUTES,
  keepUnusedDataFor: CACHE_TIME_INTERVALS.THIRTY_SECONDS,
  endpoints: (builder) => ({
    findAllOrigins: builder.query<OriginFindAllResponse, OriginFindAllParams>({
      query: (params) => ({
        method: "GET",
        url: "/origin",
        params
      }),
      providesTags: ["Origin"]
    }),
    infiniteFindAllOrigins: builder.infiniteQuery<
      OriginFindAllResponse,
      OmitPagination<OriginFindAllParams>,
      PaginationProps
    >({
      infiniteQueryOptions: DEFAULT_INFINITE_QUERY_OPTIONS,
      query: ({ pageParam, queryArg }) => ({
        method: "GET",
        url: "/origin",
        params: {
          ...pageParam,
          ...queryArg
        }
      }),
      providesTags: ["Origin"]
    }),
    findOriginById: builder.query<OriginFindByIdResponse, OriginFindByIdParams>(
      {
        query: ({ id }) => ({
          method: "GET",
          url: `/origin/${id}`
        }),
        providesTags: ["Origin"]
      }
    ),
    getOriginsOptions: builder.infiniteQuery<
      OriginOptionsResponse,
      OmitPagination<OriginOptionsParams>,
      PaginationProps
    >({
      infiniteQueryOptions: DEFAULT_INFINITE_QUERY_OPTIONS,
      query: ({ pageParam, queryArg }) => ({
        method: "GET",
        url: "/origin/options",
        params: {
          ...pageParam,
          ...queryArg
        }
      }),
      providesTags: ["Origin"]
    }),
    createOrigin: builder.mutation<OriginFindByIdResponse, CreateOriginParams>({
      query: (origin) => ({
        method: "POST",
        url: "/origin",
        body: origin
      }),
      invalidatesTags: ["Origin"]
    }),
    updateOrigin: builder.mutation<void, UpdateOriginParams>({
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/origin/${id}`,
        body
      }),
      invalidatesTags: ["Origin"]
    }),
    deleteOrigin: builder.mutation<void, DeleteOriginParams>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `/origin/${id}`
      }),
      invalidatesTags: ["Origin"]
    })
  })
});

export const {
  useFindAllOriginsQuery,
  useInfiniteFindAllOriginsInfiniteQuery,
  useLazyFindAllOriginsQuery,
  useLazyFindOriginByIdQuery,
  useCreateOriginMutation,
  useUpdateOriginMutation,
  useDeleteOriginMutation,
  useGetOriginsOptionsInfiniteQuery
} = OriginService;
