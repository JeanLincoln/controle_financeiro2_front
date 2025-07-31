import type { TransactionType } from "./transaction.entity";

export interface Origin {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  icon: string;
}

export type OriginRanking = {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  type: keyof typeof TransactionType;
  amount: string;
  ranking: string;
}[];
