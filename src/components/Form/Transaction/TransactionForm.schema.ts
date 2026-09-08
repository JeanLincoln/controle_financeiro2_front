import { z } from "zod";

import {
  TransactionType,
  type Transaction
} from "@/entities/transaction.entity";

import type { TransactionFormValues } from "./hooks/useTransactionForm.hook";

export const TransactionFormSchema = z.object({
  name: z
    .string()
    .min(1, "O nome deve ter pelo menos 1 caractere")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  description: z
    .string()
    .min(1, "A descrição deve ter pelo menos 1 caractere")
    .max(100, "A descrição deve ter no máximo 100 caracteres"),
  type: z.enum(TransactionType, { error: "O tipo de transação é obrigatório" }),
  amount: z
    .number()
    .min(1, "O valor deve é um campo obrigatório e deve ser maior que 0"),
  transactionDate: z.date({ error: "A data da transação é obrigatória" }),
  categoriesIds: z.array(z.number()),
  subCategoriesIds: z.array(z.number()),
  originId: z.number("A origem é obrigatória").min(1, "A origem é obrigatória")
});

export type TransactionFormSchemaType = z.infer<typeof TransactionFormSchema>;

export const transactionFormDefaultValues = (
  data?: Transaction
): TransactionFormValues => ({
  name: data?.name ?? "",
  description: data?.description ?? "",
  type: data?.type ?? TransactionType.EXPENSE,
  amount: data?.amount ?? 0,
  transactionDate: data?.transactionDate
    ? new Date(data?.transactionDate)
    : new Date(),
  categoriesIds: data?.categories.map((category) => category.id) ?? [],
  subCategoriesIds:
    data?.subCategories.map((subCategory) => subCategory.id) ?? [],
  originId: data?.origin.id || 0
});
