import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError
} from "@reduxjs/toolkit/query";
import type { ReduxErrorProps } from "../store.types";

type ExtraOptions = Record<string, unknown>;

const baseUrl = import.meta.env.VITE_API_URL;

const prepareHeaders = (headers: Headers) => {
  headers.set("Content-Type", "application/json");
  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders,
  credentials: "include"
});

export const baseQueryWithAuth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = async (
  args: FetchArgs | string,
  api: BaseQueryApi,
  extraOptions: ExtraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  const error = result.error as ReduxErrorProps;
  const isUnauthorizedErrorMessage =
    error?.data?.message === "Invalid token" ||
    error?.data?.message === "Unauthorized";
  const isUnauthorizedCodeStatus =
    error?.status === 401 || error?.status === 403;

  if (isUnauthorizedCodeStatus || isUnauthorizedErrorMessage) {
    window.localStorage.removeItem("persist:root");
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.replace("/auth/login");
  }

  return result;
};
