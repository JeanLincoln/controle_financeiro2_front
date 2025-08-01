import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from "@/components/Table/Table.component";
import { TransactionType } from "@/entities/transaction.entity";
import type { RankingParams } from "@/store/services/dashboard/types";
import { toBRLCurrency } from "@/utils/toBRLCurrency.utils";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RankingCardSkeleton } from "./RankingCard.skeleton";
import { RankingCardEmptyState } from "./RankingCard.empty-state";

interface BaseRowProps {
  name: string;
  type: RankingParams["type"];
  amount: string;
}

interface RankingCardProps<T extends BaseRowProps> {
  name: string;
  fetchTrigger: (type: RankingParams) => void;
  data?: T[];
  isLoading: boolean;
  icon: React.ReactNode;
}

export const RankingCard = <T extends BaseRowProps>({
  name,
  data,
  fetchTrigger,
  isLoading,
  icon
}: RankingCardProps<T>) => {
  const [type, setType] = useState<RankingParams["type"]>();

  useEffect(() => {
    fetchTrigger({ type: undefined });
  }, []);

  const handleTypeChange = (newType: RankingParams["type"]) => {
    const validatedType = newType === type ? undefined : newType;
    setType(validatedType);
    fetchTrigger({ type: validatedType });
  };

  const titleEntityName = name[0].toUpperCase() + name.slice(1);

  const dataIsEmpty = !isLoading && data && !data.length;
  const dataLoaded = !isLoading && data && !!data.length;

  return (
    <>
      {isLoading && <RankingCardSkeleton />}
      {dataIsEmpty && <RankingCardEmptyState name={name} />}
      {dataLoaded && (
        <Card className="w-[49%]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {icon}
              Ranking de {titleEntityName}
            </CardTitle>
            <CardAction>
              <div className="flex items-center gap-2">
                <ArrowUpCircle
                  className={`${
                    type === "INCOME" ? "bg-green-700" : "text-green-700"
                  } rounded-full cursor-pointer`}
                  onClick={() => handleTypeChange("INCOME")}
                />
                <ArrowDownCircle
                  className={`${
                    type === "EXPENSE" ? "bg-red-700" : "text-red-700"
                  } rounded-full cursor-pointer`}
                  onClick={() => handleTypeChange("EXPENSE")}
                />
              </div>
            </CardAction>
            <CardDescription>
              {titleEntityName} com maior gasto ou receita deste mês.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">{titleEntityName}</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!!data?.length &&
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        {item.type === TransactionType.EXPENSE
                          ? "Despesa"
                          : "Receita"}
                      </TableCell>
                      <TableCell>
                        {toBRLCurrency(Number(item.amount))}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};
