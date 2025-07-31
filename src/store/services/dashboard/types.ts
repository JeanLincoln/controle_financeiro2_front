import type { CategoryRanking } from "@/entities/category.entity";
import type { OriginRanking } from "@/entities/origin.entity";
import type { SubCategoryRanking } from "@/entities/subCategory.entity";
import type {
  TransactionRanking,
  TransactionType
} from "@/entities/transaction.entity";

export type BalanceParams = void;
export type BalanceResponse = {
  currentMonth: {
    totalExpenses: number;
    totalIncomes: number;
    totalBalance: number;
    totalTransactions: number;
  };
  lastMonth: {
    totalExpenses: number;
    totalIncomes: number;
    totalBalance: number;
    totalTransactions: number;
  };
  variation: {
    expenses: {
      total: number;
      percentage: number | null;
    };
    incomes: {
      total: number;
      percentage: number | null;
    };
    balance: {
      total: number;
      percentage: number | null;
    };
  };
};

export interface TransactionsGraphParams {
  startDate: Date;
  endDate: Date;
}

export interface TransactionsGraphData {
  date: string;
  expense: number;
  income: number;
  balance: number;
}

export interface TransactionsGraphResponse {
  data: TransactionsGraphData[];
}

export interface RankingParams {
  type?: keyof typeof TransactionType;
}

export type CategoryRankingResponse = CategoryRanking;
export type SubCategoryRankingResponse = SubCategoryRanking;
export type OriginRankingResponse = OriginRanking;
export type TransactionRankingResponse = TransactionRanking;
