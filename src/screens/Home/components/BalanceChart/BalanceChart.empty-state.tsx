import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/Card/Card.component";
import { LucideLeaf } from "lucide-react";

export const BalanceChartEmptyState = () => {
  return (
    <Card className="pt-0 w-full h-[300px]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Gráfico de transações</CardTitle>
          <CardDescription>
            Mostrando o total de transações por tipo e data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 flex-1 text-muted-foreground">
        <LucideLeaf className="h-18 w-18 " />
        Nada por aqui por enquanto...
      </CardContent>
    </Card>
  );
};
