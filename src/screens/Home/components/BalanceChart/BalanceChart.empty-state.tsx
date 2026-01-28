import { LucideLeaf } from "lucide-react";

export const BalanceChartEmptyState = () => {
  return (
    <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-2">
      <LucideLeaf className="h-18 w-18" />
      Nada por aqui por enquanto...
    </div>
  );
};
