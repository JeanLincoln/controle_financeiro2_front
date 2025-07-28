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
