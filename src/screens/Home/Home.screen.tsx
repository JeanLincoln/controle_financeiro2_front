import { ChartNoAxesCombined } from "lucide-react";

import { Balance } from "./components/Balance/Balance.component";
import { BalanceChart } from "./components/BalanceChart/BalanceChart.component";
import { RankingCardsSwiper } from "./components/RankingCardsSwiper/RankingCardsSwiper.component";

export default function HomeScreen() {
  return (
    <div className="from-background via-background to-muted/10 min-h-screen bg-gradient-to-br">
      <div className="container mx-auto space-y-4 p-4 pb-16 md:p-6 md:pb-20 lg:p-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="from-primary/20 to-primary/5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm">
              <ChartNoAxesCombined />
            </div>
            <div>
              <h1 className="text-foreground text-3xl font-bold tracking-tight">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">
                Visão geral completa das suas finanças
              </p>
            </div>
          </div>
        </div>

        <section>
          <Balance />
        </section>

        <section className="mb-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-foreground text-xl font-semibold tracking-tight">
                Rankings
              </h2>
              <p className="text-muted-foreground text-xs">
                Top 5 maiores movimentações do mês
              </p>
            </div>
          </div>
          <RankingCardsSwiper />
        </section>

        <section>
          <BalanceChart />
        </section>
      </div>
    </div>
  );
}
