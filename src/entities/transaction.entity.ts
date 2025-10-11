import type { Category } from "./category.entity";
import type { Origin } from "./origin.entity";
import type { SubCategory } from "./subCategory.entity";

export const TransactionType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  id: number;
  name: string;
  description: string;
  type: keyof typeof TransactionType;
  amount: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  origin: Origin;
  categories: Category[];
  subCategories: SubCategory[];
}

export type TransactionRanking = {
  name: string;
  description: string;
  type: keyof typeof TransactionType;
  transaction_date: string;
  amount: string;
  ranking: string;
}[];
