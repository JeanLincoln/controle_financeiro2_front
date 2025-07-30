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
