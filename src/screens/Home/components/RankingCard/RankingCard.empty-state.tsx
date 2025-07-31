import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/Card/Card.component";
import { BarChart3Icon, LucideLeaf } from "lucide-react";

interface RankingCardEmptyStateProps {
  name: string;
}

export const RankingCardEmptyState = ({ name }: RankingCardEmptyStateProps) => {
  return (
    <Card className="w-[49%] h-[300px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3Icon className="h-5 w-5" />
          Ranking de {name[0].toUpperCase() + name.slice(1)}
        </CardTitle>
        <CardDescription>
          {name[0].toUpperCase() + name.slice(1)} com maior gasto ou receita
          deste mês.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 flex-1 text-muted-foreground">
        <LucideLeaf className="h-18 w-18 " />
        Nada por aqui por enquanto...
      </CardContent>
    </Card>
  );
};
