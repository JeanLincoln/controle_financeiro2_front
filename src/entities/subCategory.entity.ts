import type { TransactionType } from "./transaction.entity";

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  icon: string;
}

export type SubCategoryRanking = {
  id: number;
  name: string;
  icon: string;
  color: string;
  type: keyof typeof TransactionType;
  amount: string;
  ranking: string;
}[];
