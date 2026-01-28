import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/Card/Card.component";
import { toBRLCurrency } from "@/utils/toBRLCurrency.utils";

interface BalanceCardProps {
  title: string;
  effect: "positive" | "negative";
  total: number;
  variationPercentage: number | null;
  variationTotal: number;
  pastValue?: number;
}

export function BalanceCard({
  title,
  effect,
  total,
  variationPercentage,
  variationTotal,
  pastValue = 0
}: BalanceCardProps) {
  const pastValueIsPositive = pastValue >= 0;
  const statusIsPositive =
    variationPercentage !== null && variationPercentage >= 0;

  const positiveVariationClass =
    effect === "positive" ? "text-green-500 text-xs" : "text-red-500 text-xs";
  const negativeVariationClass =
    effect === "positive" ? "text-red-500 text-xs" : "text-green-500 text-xs";

  const statusClassName = statusIsPositive
    ? positiveVariationClass
    : negativeVariationClass;

  const pastValueClassName = pastValueIsPositive
    ? positiveVariationClass
    : negativeVariationClass;

  return (
    <Card className="gap-2 p-4">
      <CardTitle className="text-base">{title}</CardTitle>
      <CardDescription className="text-xs">
        {title} do mês atual
      </CardDescription>
      <CardContent className="space-y-3 p-0 pt-2">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold tracking-tight">
            {toBRLCurrency(total)}
          </h2>
          <div className="mt-3 flex w-full flex-col gap-1.5">
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs">
                Variação percentual:
              </span>
              <div className="flex items-center gap-0.5">
                <span className={statusClassName}>
                  {statusIsPositive ? "+" : ""}
                </span>
                <span className={statusClassName}>
                  {variationPercentage || 0}%
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs">
                Valor mês anterior:
              </span>
              <div className="flex items-center gap-0.5">
                <span className={pastValueClassName}>
                  {pastValueIsPositive ? "+" : ""}
                </span>
                <span className={pastValueClassName}>
                  {toBRLCurrency(pastValue)}
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs">
                Variação valor:
              </span>
              <div className="flex items-center gap-0.5">
                <span className={statusClassName}>
                  {statusIsPositive ? "+" : ""}
                </span>
                <span className={statusClassName}>
                  {toBRLCurrency(variationTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
