import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../config/base-query";
import { CACHE_TIME_INTERVALS } from "../services.constants";
import type {
  OriginFindAllParams,
  OriginFindAllResponse,
  OriginFindByIdParams,
  OriginFindByIdResponse
} from "./originService.types";

export const OriginService = createApi({
  reducerPath: "origin-service",
  baseQuery: baseQueryWithAuth,
  keepUnusedDataFor: CACHE_TIME_INTERVALS.THIRTY_SECONDS,
  endpoints: (builder) => ({
    findAllOrigins: builder.query<OriginFindAllResponse, OriginFindAllParams>({
      query: (params) => ({
        method: "GET",
        url: "/origin",
        params
      })
    }),
    findById: builder.query<OriginFindByIdResponse, OriginFindByIdParams>({
      query: (params) => ({
        method: "GET",
        url: "/origin/:id",
        params
      })
    })
  })
});

export const { useLazyFindAllOriginsQuery, useLazyFindByIdQuery } =
  OriginService;
