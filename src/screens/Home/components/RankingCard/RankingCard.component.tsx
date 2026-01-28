import React, { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/Table/Table.component";
import { TransactionType } from "@/entities/transaction.entity";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import type { RankingParams } from "@/store/services/dashboard/dashboardService.types";
import { toBRLCurrency } from "@/utils/toBRLCurrency.utils";

import { RANKING_FILTERS } from "../../hooks/useRankingFilters.hook";
import { RankingCardEmptyState } from "./RankingCard.empty-state";
import { RankingCardSkeleton } from "./RankingCard.skeleton";

interface BaseRowProps {
  name: string;
  type: RankingParams["type"];
  amount: string;
}

interface RankingCardProps<T extends BaseRowProps> {
  name: string;
  data?: T[];
  isLoading: boolean;
  icon: React.ReactNode;
}

export const RankingCard = <T extends BaseRowProps>({
  name,
  data,
  isLoading,
  icon
}: RankingCardProps<T>) => {
  const { handleAddKey, handleRemoveKey } = useAppSearchParams();
  const [type, setType] = useState<RankingParams["type"]>();

  const entityKeyFilter = RANKING_FILTERS[name as keyof typeof RANKING_FILTERS];

  const handleTypeChange = (newType: RankingParams["type"]) => {
    const validatedType = newType === type ? undefined : newType;
    setType(validatedType);

    if (!validatedType) {
      handleRemoveKey({ key: entityKeyFilter });
      return;
    }

    handleAddKey({ key: entityKeyFilter, value: validatedType });
  };

  const titleEntityName = name[0].toUpperCase() + name.slice(1);

  const dataIsEmpty = !isLoading && data && !data.length;
  const dataLoaded = !isLoading && data && !!data.length;

  return (
    <>
      {isLoading && <RankingCardSkeleton />}
      {!isLoading && (
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {icon}
                <CardTitle className="text-base font-semibold">
                  {titleEntityName}
                </CardTitle>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleTypeChange("INCOME")}
                  className={`rounded-full p-1 transition-colors ${
                    type === "INCOME"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                      : "text-muted-foreground hover:text-green-700"
                  }`}
                  title="Receitas"
                >
                  <ArrowUpCircle className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleTypeChange("EXPENSE")}
                  className={`rounded-full p-1 transition-colors ${
                    type === "EXPENSE"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                      : "text-muted-foreground hover:text-red-700"
                  }`}
                  title="Despesas"
                >
                  <ArrowDownCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
            <CardDescription className="text-xs">
              Top 5 {titleEntityName} do mês
            </CardDescription>
          </CardHeader>
          {dataIsEmpty && <RankingCardEmptyState />}
          {dataLoaded && (
            <CardContent className="flex-1 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Nome</TableHead>
                    <TableHead className="text-xs">Tipo</TableHead>
                    <TableHead className="text-right text-xs">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!!data?.length &&
                    data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-xs font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-xs">
                          {item.type === TransactionType.EXPENSE
                            ? "Despesa"
                            : "Receita"}
                        </TableCell>
                        <TableCell className="text-right text-xs font-medium">
                          {toBRLCurrency(Number(item.amount))}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};
