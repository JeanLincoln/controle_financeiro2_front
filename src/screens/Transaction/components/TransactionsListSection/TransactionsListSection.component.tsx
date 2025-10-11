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
import { ArrowDownCircle, ArrowUpCircle, Info, Trash } from "lucide-react";
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
    <div className="flex flex-col  justify-between h-[512px]">
      {loading && <TransactionsListSectionSkeleton />}
      <div className="flex flex-wrap w-full gap-4 ">
        {dataIsLoaded &&
          transactions.map((transaction) => {
            const SelectedIcon = getIconComponent(transaction.origin.icon);
            const categoriesAndSubCategories = transaction.categories
              .concat(transaction.subCategories)
              .map((item) => ({ name: item.name, icon: item.icon }))
              .slice(0, 7);

            return (
              <Card
                className="relative w-full gap-3 h-35 max-w-74"
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
                        className="w-4 h-4 text-red-500 transition-all cursor-pointer hover:scale-120 "
                        onClick={() =>
                          handleAddKey({ key: "id", value: transaction.id })
                        }
                      />
                    </AlertDialogTrigger>
                    <DrawerTrigger asChild>
                      <Info
                        className="w-4 h-4 text-blue-500 transition-all cursor-pointer hover:scale-120"
                        onClick={() =>
                          handleAddKey({ key: "id", value: transaction.id })
                        }
                      />
                    </DrawerTrigger>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    <b>Valor: </b>
                    {`R$ ${transaction.amount}`}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    <b>Realizada em:</b>{" "}
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </span>
                </CardContent>
                <div className="absolute top-[-15px] left-[-15px] p-1 rounded-full">
                  {transaction.type === "INCOME" ? (
                    <ArrowUpCircle className="w-8 h-8 text-green-700 bg-secondary rounded-full" />
                  ) : (
                    <ArrowDownCircle className="w-8 h-8 text-red-700 bg-secondary rounded-full" />
                  )}
                </div>
                {SelectedIcon && (
                  <div
                    style={{ backgroundColor: transaction.origin.color }}
                    className="absolute top-[-10px] left-[25px] p-1 rounded-full"
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex items-start w-fit text-start">
                        <div
                          data-slot="card-description"
                          className="text-muted-foreground text-sm"
                        >
                          <SelectedIcon className="w-5 h-5 text-secondary" />
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
                          className="
                            absolute top-[-10px] p-1 rounded-full
                          "
                        >
                          <Tooltip>
                            <TooltipTrigger className="flex items-start w-fit text-start">
                              <div
                                data-slot="card-description"
                                className="text-muted-foreground text-sm"
                              >
                                <CategoryItem className="w-5 h-5 text-secondary" />
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
