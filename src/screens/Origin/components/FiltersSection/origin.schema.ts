import { OriginSortableFields } from "@/store/services/origin/originService.types";
import { SortOrder } from "@/store/services/services.types";
import { z } from "zod";

export const OriginFormSchema = z.object({
  name: z.string().optional(),
  sortBy: z.enum(OriginSortableFields),
  sortOrder: z.enum(SortOrder),
  limit: z.number().optional(),
  page: z.number().optional()
});

export type OriginFormSchemaType = z.infer<typeof OriginFormSchema>;

export const originFormDefaultValues: OriginFormSchemaType = {
  name: "",
  sortBy: OriginSortableFields.Nome,
  sortOrder: SortOrder.ASC,
  limit: 12,
  page: 1
};
