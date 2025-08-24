import { LucideLeaf } from "lucide-react";

export const RankingCardEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 flex-1 text-muted-foreground">
      <LucideLeaf className="h-18 w-18 " />
      Nada por aqui por enquanto...
    </div>
  );
};
