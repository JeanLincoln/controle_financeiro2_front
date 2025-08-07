import type { Origin } from "@/entities/origin.entity";
import type {
  GetOptionsProps,
  PaginationProps,
  PaginationResponse,
  SortAndPaginationProps,
  SortOrder
} from "../services.types";

export type OriginFindAllFilters = {
  name?: string;
};

export const OriginSortableFields = {
  Nome: "name",
  Descrição: "description",
  "Criado em": "createdAt",
  "Atualizado em": "updatedAt"
} as const;

export type OriginSortBy =
  (typeof OriginSortableFields)[keyof typeof OriginSortableFields];

export type OriginFindAllSortAndPaginationProps =
  SortAndPaginationProps<OriginSortBy>;

export type OriginFindAllParams = OriginFindAllSortAndPaginationProps;
export type OriginFindAllResponse = PaginationResponse & {
  data: Origin[];
};

export type OriginFindByIdParams = Pick<Origin, "id">;
export type OriginFindByIdResponse = Origin;

export type UpdateOriginParams = Omit<Origin, "createdAt" | "updatedAt">;
export type CreateOriginParams = Omit<UpdateOriginParams, "id">;
export type DeleteOriginParams = OriginFindByIdParams;

export type OriginOptionsParams = PaginationProps & {
  sortOrder: SortOrder;
  search?: string;
};

export type OriginOptionsResponse = GetOptionsProps;
