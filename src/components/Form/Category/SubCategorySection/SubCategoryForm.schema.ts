import { z } from "zod";
import type { CreateOrUpdateSubCategory } from "./hooks/useSubCategoryForm.hook";

export const SubCategoryFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(254, "Nome é muito longo"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(254, "Descrição é muito longa"),
  color: z
    .string()
    .min(1, "Cor é obrigatória")
    .max(7, "Cor deve ter no máximo 7 caracteres"),
  icon: z.string().min(1, "Ícone é obrigatório").max(500, "Ícone é muito longo")
});

export type SubCategoryFormSchemaType = z.infer<typeof SubCategoryFormSchema>;

export const subCategoryFormDefaultValues = (
  data?: CreateOrUpdateSubCategory
) => ({
  name: data?.name || "",
  description: data?.description || "",
  color: data?.color || "#ef4444",
  icon: data?.icon || ""
});
