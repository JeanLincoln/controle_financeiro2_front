import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../config/base-query";
import { CACHE_TIME_INTERVALS } from "../services.constants";
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
    findOriginById: builder.query<OriginFindByIdResponse, OriginFindByIdParams>(
      {
        query: ({ id }) => ({
          method: "GET",
          url: `/origin/${id}`
        }),
        providesTags: ["Origin"]
      }
    ),
    getOriginsOptions: builder.query<
      OriginOptionsResponse,
      OriginOptionsParams
    >({
      query: (params) => ({
        method: "GET",
        url: "/origin/options",
        params
      }),
      providesTags: ["Origin"]
    }),
    createOrigin: builder.mutation<void, CreateOriginParams>({
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
  useLazyFindAllOriginsQuery,
  useLazyFindOriginByIdQuery,
  useLazyGetOriginsOptionsQuery,
  useCreateOriginMutation,
  useUpdateOriginMutation,
  useDeleteOriginMutation
} = OriginService;
