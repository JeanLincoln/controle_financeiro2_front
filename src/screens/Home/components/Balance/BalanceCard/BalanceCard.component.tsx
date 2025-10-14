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
    <Card className="w-1/3 gap-2 p-4">
      <CardTitle>{title}:</CardTitle>
      <CardDescription>{title} do mês atual</CardDescription>
      <CardContent className="p-0">
        <div className="flex flex-col items-start">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {toBRLCurrency(total)}
          </h2>
          <div className="ml-1 flex flex-col items-start">
            <div className="flex w-full items-center justify-between gap-1">
              <span className="text-muted-foreground text-sm">
                Variação percentual:
              </span>
              <div className="flex gap-1">
                <span className={statusClassName}>
                  {statusIsPositive ? "+" : ""}
                </span>
                <span className={statusClassName}>
                  {variationPercentage || 0}%
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-1">
              <span className="text-muted-foreground text-sm">
                Valor mês anterior:
              </span>
              <div className="flex gap-1">
                <span className={pastValueClassName}>
                  {pastValueIsPositive ? "+" : ""}
                </span>
                <span className={pastValueClassName}>
                  {toBRLCurrency(pastValue)}
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-1">
              <span className="text-muted-foreground text-sm">
                Variação valor:
              </span>
              <div className="flex gap-1">
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
