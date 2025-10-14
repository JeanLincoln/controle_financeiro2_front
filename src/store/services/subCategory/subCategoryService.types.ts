import type { SubCategory } from "@/entities/subCategory.entity";

import type {
  GetOptionsProps,
  PaginationProps,
  SortOrder
} from "../services.types";

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
