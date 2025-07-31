export const TransactionType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
};

export interface Transaction {
  id: number;
  name: string;
  description: string;
  type: keyof typeof TransactionType;
  amount: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionRanking = {
  name: string;
  description: string;
  type: keyof typeof TransactionType;
  transaction_date: string;
  amount: string;
  ranking: string;
}[];
