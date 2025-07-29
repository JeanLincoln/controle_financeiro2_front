import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/Card/Card";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { useBalanceQuery } from "@/store/services/dashboard/dashboard.service";
import { BalanceCard } from "./BalanceCard/BalanceCard.component";

export function Balance() {
  const { data: balance, isLoading } = useBalanceQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Balanço deste mês
        </CardTitle>
        <CardDescription>Entradas, saidas e saldo do mês atual</CardDescription>
        <CardContent className="p-2">
          {isLoading && <LoadingSpinner size="lg" variant="orbit" />}{" "}
          {balance && (
            <div className="flex justify-between gap-4">
              <BalanceCard
                title="Entradas"
                effect="positive"
                total={balance.currentMonth.totalIncomes}
                variationPercentage={balance.variation.incomes.percentage}
                variationTotal={balance.variation.incomes.total}
                pastValue={balance.lastMonth.totalIncomes}
              />
              <BalanceCard
                title="Saídas"
                effect="negative"
                total={balance.currentMonth.totalExpenses}
                variationPercentage={balance.variation.expenses.percentage}
                variationTotal={balance.variation.expenses.total}
                pastValue={balance.lastMonth.totalExpenses}
              />
              <BalanceCard
                title="Saldo"
                effect="positive"
                total={balance.currentMonth.totalBalance}
                variationPercentage={balance.variation.balance.percentage}
                variationTotal={balance.variation.balance.total}
                pastValue={balance.lastMonth.totalBalance}
              />
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
