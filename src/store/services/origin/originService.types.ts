import type { Origin } from "@/entities/origin.entity";
import type {
  PaginationResponse,
  SortAndPaginationProps
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

export type OriginFindByIdParams = {
  id: string;
};

export type OriginFindByIdResponse = Origin;
