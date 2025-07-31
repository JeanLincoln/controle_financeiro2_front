import type { TransactionType } from "./transaction.entity";

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  icon: string;
}

export type CategoryRanking = {
  id: number;
  name: string;
  icon: string;
  color: string;
  type: keyof typeof TransactionType;
  amount: string;
  ranking: string;
}[];
