import { handleInfiniteNextPage } from "./utils/handleInfiniteNextPage.utils";

export const CACHE_TIME_INTERVALS = {
  THIRTY_SECONDS: 30,
  TWO_MINUTES: 120,
  FIVE_MINUTES: 300,
  FIFTEEN_MINUTES: 900,
  THIRTY_MINUTES: 1800,
  ONE_HOUR: 3600,
  NO_CACHE: 0
} as const;

export const DROPDOWN_OPTIONS_PAGINATION_LIMIT = 4;
export const FIRST_PAGE = 1;

export const DEFAULT_INFINITE_QUERY_OPTIONS = {
  initialPageParam: {
    page: FIRST_PAGE,
    limit: DROPDOWN_OPTIONS_PAGINATION_LIMIT
  },
  getNextPageParam: handleInfiniteNextPage
};
