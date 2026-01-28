import type { ChartConfig } from "@/components/Chart/Chart.component";

export const TRANSACTION_CHART_CONFIG = {
  visitors: {
    label: "Visitors"
  },
  income: {
    label: "Entradas",
    color: "var(--chart-2)"
  },
  expense: {
    label: "Despesas",
    color: "var(--chart-5)"
  },
  balance: {
    label: "Saldo",
    color: "var(--chart-3)"
  }
} satisfies ChartConfig;
