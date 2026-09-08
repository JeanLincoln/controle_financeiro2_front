import type { SubCategory } from "@/entities/subCategory.entity";

import type {
  GetOptionsProps,
  PaginationProps,
  PaginationResponse,
  SortAndPaginationProps,
  SortOrder
} from "../services.types";

export type SubCategoryFindAllFilters = {
  categoriesIds: number[];
  name?: string;
};

export const SubCategorySortableFields = {
  Nome: "name",
  Descrição: "description",
  "Criado em": "createdAt",
  "Atualizado em": "updatedAt"
} as const;

export type SubCategorySortBy =
  (typeof SubCategorySortableFields)[keyof typeof SubCategorySortableFields];

export type SubCategoryFindAllSortAndPaginationProps =
  SortAndPaginationProps<SubCategorySortBy>;

export type SubCategoryFindAllParams =
  SubCategoryFindAllSortAndPaginationProps & SubCategoryFindAllFilters;
export type SubCategoryFindAllResponse = PaginationResponse & {
  data: SubCategory[];
};

export type SubCategoryIdParams = {
  categoryId: number;
  subCategoryId: number;
};

export type CreateSubCategoryParams = Omit<
  SubCategory,
  "id" | "createdAt" | "updatedAt"
> &
  Pick<SubCategoryIdParams, "categoryId">;

export type UpdateSubCategoryParams = Omit<
  SubCategory,
  "createdAt" | "updatedAt"
> &
  Pick<SubCategoryIdParams, "categoryId">;

export type DeleteSubCategoryParams = SubCategoryIdParams;
export type FindByIdSubCategoryParams = SubCategoryIdParams;
export type FindByIdSubCategoryResponse = SubCategory;

export type SubCategoryOptionsParams = PaginationProps & {
  sortOrder: SortOrder;
  categoriesIds?: number[];
  search?: string;
};
export type SubCategoryOptionsResponse = GetOptionsProps;
