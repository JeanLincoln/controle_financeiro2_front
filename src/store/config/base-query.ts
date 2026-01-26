import {
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError
} from "@reduxjs/toolkit/query";

import type { ReduxErrorProps } from "../store.types";
import { paramsSerializer } from "./paramSerializer";

type ExtraOptions = Record<string, unknown>;

const baseUrl = import.meta.env.VITE_API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  paramsSerializer
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
