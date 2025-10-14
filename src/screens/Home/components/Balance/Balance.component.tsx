import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { useBalanceQuery } from "@/store/services/dashboard/dashboard.service";

import { BalanceSkeleton } from "./Balance.skeleton";
import { BalanceCard } from "./BalanceCard/BalanceCard.component";

export function Balance() {
  const { data: balance, isLoading } = useBalanceQuery();

  const balanceIsLoaded = !isLoading && balance;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Balanço deste mês
        </CardTitle>
        <CardDescription>Entradas, saidas e saldo do mês atual</CardDescription>
      </CardHeader>
      <CardContent className="px-4-6">
        {isLoading && <BalanceSkeleton />}
        {balanceIsLoaded && (
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
    </Card>
  );
}
