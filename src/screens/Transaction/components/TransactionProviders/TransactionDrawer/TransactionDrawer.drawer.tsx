import { useSearchParams } from "react-router";
import { format } from "date-fns";
import {
  ArrowLeft,
  Banknote,
  Building2,
  Calendar,
  FileText,
  Pencil,
  Tag,
  TrendingDown,
  TrendingUp,
  X
} from "lucide-react";

import { Badge } from "@/components/Badge/Badge.component";
import { Button } from "@/components/Button/Button.component";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/Drawer/Drawer.component";
import { TransactionForm } from "@/components/Form/Transaction/Transaction.form";
import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { Separator } from "@/components/Separator/Separator.component";
import { TransactionType } from "@/entities/transaction.entity";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useFindTransactionById } from "@/store/requests/transaction/useFindTransactionById.request";
import { cn } from "@/utils/cn.utils";
import { toBRLCurrency } from "@/utils/toBRLCurrency.utils";

export const TransactionDrawer = () => {
  const [params] = useSearchParams();
  const isEditMode = params.get("edit") === "true";

  const { transaction, isLoading } = useFindTransactionById();
  const { handleAddKey, handleRemoveKey } = useAppSearchParams();

  const handleEditClick = () => {
    if (!transaction) return;

    handleAddKey({ key: "edit", value: "true" });
  };

  const handleBackToView = () => {
    handleRemoveKey({ key: "edit" });
  };

  const handleGetIcon = (iconName: string, className?: string) => {
    const IconComponent = getIconComponent(iconName);
    return IconComponent ? (
      <IconComponent className={cn("h-5 w-5 text-black", className)} />
    ) : null;
  };

  if (isEditMode && !isLoading && transaction) {
    return (
      <DrawerContent className="mx-auto w-full">
        <DrawerHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToView}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DrawerTitle>Editar Transação</DrawerTitle>
              <DrawerDescription>Edite os dados da transação</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <TransactionForm transaction={transaction} />
        </div>
      </DrawerContent>
    );
  }

  return (
    <DrawerContent className="mx-auto max-h-[90vh] w-full">
      {isLoading && (
        <div className="flex h-96 items-center justify-center">
          <LoadingSpinner variant="orbit" size="lg" />
        </div>
      )}
      {!isLoading && transaction && (
        <>
          <DrawerHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DrawerTitle className="flex items-center gap-3 text-2xl">
                  {transaction.name}
                  <Badge
                    variant={
                      transaction.type === TransactionType.INCOME
                        ? "default"
                        : "destructive"
                    }
                    className="flex items-center gap-1"
                  >
                    {transaction.type === TransactionType.INCOME ? (
                      <>
                        <TrendingUp className="h-3 w-3" />
                        Receita
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-3 w-3" />
                        Despesa
                      </>
                    )}
                  </Badge>
                </DrawerTitle>
                {transaction.description && (
                  <DrawerDescription className="mt-2 text-base">
                    {transaction.description}
                  </DrawerDescription>
                )}
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6 pb-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Banknote className="text-muted-foreground h-5 w-5" />
                  <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                    Valor
                  </h3>
                </div>
                <p className="text-foreground text-3xl font-bold">
                  {toBRLCurrency(transaction.amount)}
                </p>
              </div>
              <Separator />
              {transaction.origin && (
                <>
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Building2 className="text-muted-foreground h-5 w-5" />
                      <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                        Origem
                      </h3>
                    </div>
                    <div className="bg-secondary/50 flex items-center gap-3 rounded-lg p-3">
                      {transaction.origin.icon && (
                        <div
                          className="rounded-full p-2"
                          style={{ backgroundColor: transaction.origin.color }}
                        >
                          {handleGetIcon(transaction.origin.icon)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{transaction.origin.name}</p>
                        {transaction.origin.description && (
                          <p className="text-muted-foreground text-sm">
                            {transaction.origin.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Separator />
                </>
              )}
              {transaction.categories && transaction.categories.length > 0 && (
                <>
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Tag className="text-muted-foreground h-5 w-5" />
                      <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                        Categorias
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {transaction.categories.map((category) => (
                        <div
                          key={category.id}
                          className="bg-secondary/50 flex items-center gap-2 rounded-lg p-2 px-3"
                        >
                          {handleGetIcon(category.icon) && (
                            <div
                              className="rounded-full p-1"
                              style={{ backgroundColor: category.color }}
                            >
                              {handleGetIcon(category.icon)}
                            </div>
                          )}
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                </>
              )}
              {transaction.subCategories &&
                transaction.subCategories.length > 0 && (
                  <>
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <Tag className="text-muted-foreground h-5 w-5" />
                        <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                          Subcategorias
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {transaction.subCategories.map((subCategory) => (
                          <div
                            key={subCategory.id}
                            className="bg-secondary/50 flex items-center gap-2 rounded-lg p-2 px-3"
                          >
                            {handleGetIcon(subCategory.icon) && (
                              <div
                                className="rounded-full p-1"
                                style={{ backgroundColor: subCategory.color }}
                              >
                                {handleGetIcon(subCategory.icon)}
                              </div>
                            )}
                            <span className="text-sm font-medium">
                              {subCategory.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      Data da Transação
                    </h3>
                  </div>
                  <p className="text-sm font-medium">
                    {format(
                      new Date(transaction.transactionDate),
                      "dd 'de' MMMM 'de' yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="text-muted-foreground h-4 w-4" />
                    <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      Criado em
                    </h3>
                  </div>
                  <p className="text-sm font-medium">
                    {format(
                      new Date(transaction.createdAt),
                      "dd 'de' MMMM 'de' yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="text-muted-foreground h-4 w-4" />
                    <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      Atualizado em
                    </h3>
                  </div>
                  <p className="text-sm font-medium">
                    {format(
                      new Date(transaction.updatedAt),
                      "dd 'de' MMMM 'de' yyyy"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter className="border-t">
            <div className="flex w-full items-center gap-3">
              <Button
                variant="default"
                className="flex flex-1 items-center gap-2"
                onClick={handleEditClick}
              >
                <Pencil className="h-4 w-4" />
                Editar Transação
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  Fechar
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </>
      )}
    </DrawerContent>
  );
};
