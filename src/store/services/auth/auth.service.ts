import type {
  AuthSessionParams,
  AuthSessionResponse,
  RegisterUserParams,
  RegisterUserResponse
} from "./types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../config/base-query";

export const AuthService = createApi({
  reducerPath: "auth-service",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthSessionResponse, AuthSessionParams>({
      query: ({ email, password }) => ({
        method: "POST",
        url: `/auth/login`,
        body: {
          email,
          password
        }
      })
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: "POST",
        url: `/auth/logout`
      })
    }),
    register: builder.mutation<RegisterUserResponse, RegisterUserParams>({
      query: (params) => ({
        method: "POST",
        url: `/users`,
        body: params
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  AuthService;
