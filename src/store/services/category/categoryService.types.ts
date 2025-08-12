import type { Category } from "@/entities/category.entity";
import type { SubCategory } from "@/entities/subCategory.entity";
import type {
  GetOptionsProps,
  PaginationProps,
  PaginationResponse,
  SortAndPaginationProps,
  SortOrder
} from "../services.types";

export type CategoryFindAllFilters = {
  name?: string;
};

export const CategorySortableFields = {
  Nome: "name",
  Descrição: "description",
  "Criado em": "createdAt",
  "Atualizado em": "updatedAt"
} as const;

export type CategorySortBy =
  (typeof CategorySortableFields)[keyof typeof CategorySortableFields];

export type CategoryFindAllSortAndPaginationProps =
  SortAndPaginationProps<CategorySortBy>;

export type CategoryFindAllParams = CategoryFindAllSortAndPaginationProps;

export type CategoryWithSubCategoriesTags = Category & {
  subCategories: Pick<SubCategory, "id" | "name" | "icon" | "color">[];
};

export type CategoryFindAllResponse = PaginationResponse & {
  data: CategoryWithSubCategoriesTags[];
};

export type CategoryFindByIdParams = Pick<Category, "id">;
export type CategoryFindByIdResponse = Category;

export type UpdateCategoryParams = Omit<Category, "createdAt" | "updatedAt">;
export type CreateCategoryParams = Omit<UpdateCategoryParams, "id">;
export type DeleteCategoryParams = CategoryFindByIdParams;

export type CategoryOptionsParams = PaginationProps & {
  sortOrder: SortOrder;
  search?: string;
};

export type CategoryOptionsResponse = GetOptionsProps;
