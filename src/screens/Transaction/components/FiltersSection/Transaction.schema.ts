import { TransactionType } from "@/entities/transaction.entity";
import { SortOrder } from "@/store/services/services.types";
import { TransactionSortableFields } from "@/store/services/transaction/transactionService.types";
import { z } from "zod";

export const TransactionFormSchema = z.object({
  name: z.string().optional(),
  sortBy: z.enum(TransactionSortableFields),
  sortOrder: z.enum(SortOrder),
  limit: z.number().optional(),
  page: z.number().optional(),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]).optional(),
  amount: z.number().optional(),
  transactionDate: z.string().optional(),
  originId: z.number().optional(),
  categoriesIds: z.array(z.number()).optional(),
  subCategoriesIds: z.array(z.number()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export type TransactionFormSchemaType = z.infer<typeof TransactionFormSchema>;

export const transactionFormDefaultValues: TransactionFormSchemaType = {
  name: undefined,
  amount: undefined,
  type: undefined,
  transactionDate: undefined,
  originId: undefined,
  categoriesIds: undefined,
  subCategoriesIds: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  sortBy: TransactionSortableFields["Criado em"],
  sortOrder: SortOrder.DESC,
  limit: 12,
  page: 1
};
