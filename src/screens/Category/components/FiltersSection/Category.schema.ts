import { CategorySortableFields } from "@/store/services/category/categoryService.types";
import { SortOrder } from "@/store/services/services.types";
import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z.string().optional(),
  sortBy: z.enum(CategorySortableFields),
  sortOrder: z.enum(SortOrder),
  limit: z.number().optional(),
  page: z.number().optional()
});

export type CategoryFormSchemaType = z.infer<typeof CategoryFormSchema>;

export const categoryFormDefaultValues: CategoryFormSchemaType = {
  name: "",
  sortBy: CategorySortableFields.Nome,
  sortOrder: SortOrder.ASC,
  limit: 12,
  page: 1
};
