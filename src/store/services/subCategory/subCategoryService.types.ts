import type { SubCategory } from "@/entities/subCategory.entity";

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
