import { z } from "zod";
import type { CreateOrUpdateOrigin } from "./hooks/useOriginForm.hook";

export const OriginFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(254, "Nome é muito longo"),
  description: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(254, "Nome é muito longo"),
  color: z
    .string()
    .min(1, "Cor é obrigatória")
    .max(7, "Cor deve ter no máximo 7 caracteres"),
  icon: z.string().min(1, "Ícone é obrigatório").max(500, "Ícone é muito longo")
});

export type OriginFormSchemaType = z.infer<typeof OriginFormSchema>;

export const originFormDefaultValues = (data?: CreateOrUpdateOrigin) => ({
  name: data?.name || "",
  description: data?.description || "",
  color: data?.color || "#ef4444",
  icon: data?.icon || ""
});
