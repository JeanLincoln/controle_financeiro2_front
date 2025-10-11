import {
  TransactionType,
  type Transaction
} from "@/entities/transaction.entity";
import { z } from "zod";
import type { CreateOrUpdateTransaction } from "./hooks/useTransactionForm.hook";

export const TransactionFormSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(100),
  type: z.enum(TransactionType),
  amount: z.number().min(0),
  transactionDate: z.date(),
  categories: z.array(z.number().min(1).max(100)),
  subCategories: z.array(z.number().min(1).max(100)),
  origin: z.number().min(0)
});

export type TransactionFormSchemaType = z.infer<typeof TransactionFormSchema>;

export const transactionFormDefaultValues = (
  data?: Transaction
): CreateOrUpdateTransaction => ({
  name: data?.name ?? "",
  description: data?.description ?? "",
  type: data?.type ?? TransactionType.EXPENSE,
  amount: data?.amount ?? 0,
  transactionDate: data?.transactionDate ?? new Date(),
  categories: data?.categories.map((category) => category.id) ?? [],
  subCategories: data?.subCategories.map((subCategory) => subCategory.id) ?? [],
  origin: data?.origin.id || 0
});
