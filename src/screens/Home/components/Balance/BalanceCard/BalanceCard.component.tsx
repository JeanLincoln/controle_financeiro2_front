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
  const pastValueAndCurrentValueAreEquals = pastValue === total;

  const statusIsPositive =
    (effect === "positive" && (variationTotal || 0) >= 0) ||
    (effect === "negative" && (variationTotal || 0) < 0);

  const variationClass = statusIsPositive
    ? "text-green-500 text-xs"
    : "text-red-500 text-xs";

  const neutralVariationClass = "text-muted-foreground text-xs";

  const statusClassName = pastValueAndCurrentValueAreEquals
    ? neutralVariationClass
    : variationClass;

  const validatedVariation = !pastValue
    ? null
    : variationPercentage !== null
      ? variationPercentage
      : 0;

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
                  {effect === "positive" &&
                    statusIsPositive &&
                    !!validatedVariation &&
                    "+"}
                  {effect === "negative" && statusIsPositive && ""}
                </span>
                <span className={statusClassName}>
                  {validatedVariation ? `${validatedVariation}%` : "-"}
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs">
                Valor mês anterior:
              </span>
              <div className="flex items-center gap-0.5">
                <span className={statusClassName}>
                  {effect === "positive" && statusIsPositive && "+"}
                  {effect === "negative" && statusIsPositive && ""}
                </span>
                <span className={statusClassName}>
                  {pastValue > 0 ? toBRLCurrency(pastValue) : "-"}
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs">
                Variação valor:
              </span>
              <div className="flex items-center gap-0.5">
                <span className={statusClassName}>
                  {effect === "positive" && statusIsPositive && "+"}
                  {effect === "negative" && statusIsPositive && ""}
                </span>
                <span className={statusClassName}>
                  {variationTotal !== null
                    ? toBRLCurrency(variationTotal)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
