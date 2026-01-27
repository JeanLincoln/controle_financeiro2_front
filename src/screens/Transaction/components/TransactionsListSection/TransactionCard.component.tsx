import { Info, Trash, type LucideIcon } from "lucide-react";

import { AlertDialogTrigger } from "@/components/AlertDialog/AlertDialog.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { DrawerTrigger } from "@/components/Drawer/Drawer.component";
import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/Tooltip/Tooltip.component";
import { TransactionType } from "@/entities/transaction.entity";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import type { FindAllTransformedTransaction } from "@/store/services/transaction/transactionService.types";
import { getContrastTextColor } from "@/utils/getContrastTextColor.utils";
import { handleUTCTime } from "@/utils/handleUTCTime";

interface TransactionCardProps {
  transaction: FindAllTransformedTransaction;
}

interface TagProps {
  name: string;
  color: string;
  Icon: LucideIcon;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const OriginIcon = getIconComponent(transaction.origin.icon);
  const isIncome = transaction.type === TransactionType.INCOME;
  const { handleKeys } = useAppSearchParams();

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <Card
      className="group relative h-[158px] shrink-0 gap-3 overflow-hidden py-0 transition-all hover:shadow-lg"
      key={transaction.id}
    >
      <div
        className={`absolute top-0 left-0 h-full w-1 ${
          isIncome ? "bg-green-500" : "bg-red-500"
        }`}
      />

      <CardHeader className="space-y-0 pt-3 pr-3 pb-0 pl-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle
              className="line-clamp-1 text-sm leading-tight font-semibold"
              withTooltip
            >
              {transaction.name}
            </CardTitle>
            <CardDescription
              className="mt-0.5 line-clamp-1 text-xs leading-tight"
              withTooltip
            >
              {transaction.description || "Sem descrição"}
            </CardDescription>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <DrawerTrigger asChild>
              <button
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() =>
                  handleKeys({
                    add: [{ key: "id", value: transaction.id }]
                  })
                }
              >
                <Info className="h-3.5 w-3.5" />
              </button>
            </DrawerTrigger>
            <AlertDialogTrigger asChild>
              <button
                className="text-muted-foreground hover:text-destructive transition-colors"
                onClick={() =>
                  handleKeys({
                    add: [{ key: "id", value: transaction.id }]
                  })
                }
              >
                <Trash className="h-3.5 w-3.5" />
              </button>
            </AlertDialogTrigger>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-1 px-4 pl-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Valor</span>
          <span
            className={`text-base font-bold ${
              isIncome
                ? "text-green-600 dark:text-green-500"
                : "text-red-600 dark:text-red-500"
            }`}
          >
            {isIncome ? "+" : "-"}R$ {transaction.amount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Data</span>
          <span className="text-muted-foreground text-xs">
            {handleUTCTime(
              new Date(transaction.transactionDate)
            ).increased.toLocaleDateString("pt-BR")}
          </span>
        </div>

        {(OriginIcon ||
          transaction.displayedCategoriesAndSubCategories.length > 0) && (
          <div
            className="hidden-scrollbar flex w-full flex-nowrap gap-1 overflow-x-auto pt-0.5"
            onWheel={handleWheel}
          >
            {OriginIcon && (
              <Tag
                Icon={OriginIcon}
                name={transaction.origin.name}
                color={transaction.origin.color}
              />
            )}

            {transaction.displayedCategoriesAndSubCategories.map((category) => {
              const CategoryIcon = getIconComponent(category.icon);
              return (
                CategoryIcon && (
                  <Tag
                    Icon={CategoryIcon}
                    name={category.name}
                    color={category.color}
                  />
                )
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Tag = ({ color, Icon, name }: TagProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          style={{
            backgroundColor: color
          }}
          className="flex h-7 w-fit min-w-20 shrink-0 items-center gap-1 rounded px-1.5 py-0.5"
        >
          <Icon className={`h-3 w-3 shrink-0 ${getContrastTextColor(color)}`} />
          <span
            className={`text-[11px] leading-none font-medium ${getContrastTextColor(color)}`}
          >
            {name}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent>Origem: {name}</TooltipContent>
    </Tooltip>
  );
};
