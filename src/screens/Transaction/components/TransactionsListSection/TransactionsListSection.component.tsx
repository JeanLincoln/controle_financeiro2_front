import { ArrowDownCircle, ArrowUpCircle, Info, Trash } from "lucide-react";

import { AlertDialogTrigger } from "@/components/AlertDialog/AlertDialog.component";
import {
  Card,
  CardAction,
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
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import type { TransactionFindAllResponse } from "@/store/services/transaction/transactionService.types";

import { TransactionsListSectionSkeleton } from "./TransactionsListSectionSkeleton.skeleton";

type TransactionsListSectionProps = {
  transactions?: TransactionFindAllResponse["data"];
  loading: boolean;
};

export function TransactionsListSection({
  transactions,
  loading
}: TransactionsListSectionProps) {
  const { handleAddKey } = useAppSearchParams();

  const dataIsLoaded = !loading && transactions && transactions.length > 0;
  return (
    <div className="flex h-[512px] flex-col justify-between">
      {loading && <TransactionsListSectionSkeleton />}
      <div className="flex w-full flex-wrap gap-4">
        {dataIsLoaded &&
          transactions.map((transaction) => {
            const SelectedIcon = getIconComponent(transaction.origin.icon);
            const categoriesAndSubCategories = transaction.categories
              .concat(transaction.subCategories)
              .map((item) => ({ name: item.name, icon: item.icon }))
              .slice(0, 7);

            return (
              <Card
                className="relative h-35 w-full max-w-74 gap-3"
                key={transaction.id}
              >
                <CardHeader>
                  <CardTitle className="line-clamp-1" withTooltip>
                    {transaction.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-1" withTooltip>
                    {transaction.description || "Sem descrição"}
                  </CardDescription>
                  <CardAction className="flex flex-col items-center gap-4">
                    <AlertDialogTrigger asChild>
                      <Trash
                        className="h-4 w-4 cursor-pointer text-red-500 transition-all hover:scale-120"
                        onClick={() =>
                          handleAddKey({ key: "id", value: transaction.id })
                        }
                      />
                    </AlertDialogTrigger>
                    <DrawerTrigger asChild>
                      <Info
                        className="h-4 w-4 cursor-pointer text-blue-500 transition-all hover:scale-120"
                        onClick={() =>
                          handleAddKey({ key: "id", value: transaction.id })
                        }
                      />
                    </DrawerTrigger>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-sm">
                    <b>Valor: </b>
                    {`R$ ${transaction.amount}`}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    <b>Realizada em:</b>{" "}
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </span>
                </CardContent>
                <div className="absolute top-[-15px] left-[-15px] rounded-full p-1">
                  {transaction.type === "INCOME" ? (
                    <ArrowUpCircle className="bg-secondary h-8 w-8 rounded-full text-green-700" />
                  ) : (
                    <ArrowDownCircle className="bg-secondary h-8 w-8 rounded-full text-red-700" />
                  )}
                </div>
                {SelectedIcon && (
                  <div
                    style={{ backgroundColor: transaction.origin.color }}
                    className="absolute top-[-10px] left-[25px] rounded-full p-1"
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex w-fit items-start text-start">
                        <div
                          data-slot="card-description"
                          className="text-muted-foreground text-sm"
                        >
                          <SelectedIcon className="text-secondary h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-100">
                        {transaction.origin.name}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
                {categoriesAndSubCategories.length > 0 &&
                  categoriesAndSubCategories.map((category, index) => {
                    const CategoryItem = getIconComponent(category.icon);
                    const xPosition = (index + 1) * 35 + 25;

                    return (
                      CategoryItem && (
                        <div
                          key={index}
                          style={{
                            backgroundColor: transaction.origin.color,
                            left: xPosition
                          }}
                          className="absolute top-[-10px] rounded-full p-1"
                        >
                          <Tooltip>
                            <TooltipTrigger className="flex w-fit items-start text-start">
                              <div
                                data-slot="card-description"
                                className="text-muted-foreground text-sm"
                              >
                                <CategoryItem className="text-secondary h-5 w-5" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-100">
                              {category.name}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      )
                    );
                  })}
              </Card>
            );
          })}
      </div>
    </div>
  );
}
