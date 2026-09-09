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
  const { data: balance, isLoading, isError } = useBalanceQuery();

  const balanceIsLoaded = !isLoading && !!balance;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">
          Balanço deste mês
        </CardTitle>
        <CardDescription className="text-xs">
          Entradas, saídas e saldo do mês atual
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        {isLoading && <BalanceSkeleton />}
        {isError && (
          <div className="text-muted-foreground flex min-h-[180px] items-center justify-center text-sm">
            Não foi possível carregar o balanço deste mês.
          </div>
        )}
        {balanceIsLoaded && (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
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
