import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithAuth } from "../../config/base-query";
import { CACHE_TIME_INTERVALS } from "../services.constants";
import type {
  FindUserByIdParams,
  FindUserByIdResponse,
  UpdateUserParams
} from "./userService.types";

export const UserService = createApi({
  reducerPath: "user-service",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  refetchOnMountOrArgChange: CACHE_TIME_INTERVALS.TWO_MINUTES,
  keepUnusedDataFor: CACHE_TIME_INTERVALS.THIRTY_SECONDS,
  endpoints: (builder) => ({
    findUserById: builder.query<FindUserByIdResponse, FindUserByIdParams>({
      query: ({ id }) => ({
        method: "GET",
        url: `/users/${id}`
      }),
      providesTags: ["User"]
    }),
    updateUser: builder.mutation<void, UpdateUserParams>({
      query: (user) => ({
        method: "PUT",
        url: "/users",
        body: user
      }),
      invalidatesTags: ["User"]
    })
  })
});

export const { useFindUserByIdQuery, useUpdateUserMutation } = UserService;
