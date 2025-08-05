export const SortOrder = {
  ASC: "ASC",
  DESC: "DESC"
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export type PaginationProps = {
  page?: number;
  limit?: number;
};

export type PaginationResponse = {
  pagination: {
    firstPage: number;
    lastPage: number;
    page: number;
    from: number;
    to: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
};

export type SortAndPaginationProps<T> = PaginationProps & {
  sortOrder?: SortOrder;
  sortBy?: T;
};
