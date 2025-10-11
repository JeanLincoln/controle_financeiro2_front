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
import { useSearchParams } from "react-router";

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
      <IconComponent className={cn("w-5 h-5 text-black", className)} />
    ) : null;
  };

  if (isEditMode && !isLoading && transaction) {
    return (
      <DrawerContent className="w-full max-w-3xl mx-auto">
        <DrawerHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToView}
              className="shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <DrawerTitle>Editar Transação</DrawerTitle>
              <DrawerDescription>Edite os dados da transação</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <X className="w-4 h-4" />
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
    <DrawerContent className="w-full max-w-3xl mx-auto max-h-[90vh]">
      {isLoading && (
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner variant="orbit" size="lg" />
        </div>
      )}
      {!isLoading && transaction && (
        <>
          <DrawerHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DrawerTitle className="text-2xl flex items-center gap-3">
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
                        <TrendingUp className="w-3 h-3" />
                        Receita
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-3 h-3" />
                        Despesa
                      </>
                    )}
                  </Badge>
                </DrawerTitle>
                {transaction.description && (
                  <DrawerDescription className="text-base mt-2">
                    {transaction.description}
                  </DrawerDescription>
                )}
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6 pb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="w-5 h-5 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Valor
                  </h3>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {toBRLCurrency(transaction.amount)}
                </p>
              </div>
              <Separator />
              {transaction.origin && (
                <>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Origem
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      {transaction.origin.icon && (
                        <div
                          className="p-2 rounded-full"
                          style={{ backgroundColor: transaction.origin.color }}
                        >
                          {handleGetIcon(transaction.origin.icon)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{transaction.origin.name}</p>
                        {transaction.origin.description && (
                          <p className="text-sm text-muted-foreground">
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
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-5 h-5 text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Categorias
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {transaction.categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-2 p-2 px-3 rounded-lg bg-secondary/50"
                        >
                          {handleGetIcon(category.icon) && (
                            <div
                              className="p-1 rounded-full"
                              style={{ backgroundColor: category.color }}
                            >
                              {handleGetIcon(category.icon)}
                            </div>
                          )}
                          <span className="font-medium text-sm">
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
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-5 h-5 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          Subcategorias
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {transaction.subCategories.map((subCategory) => (
                          <div
                            key={subCategory.id}
                            className="flex items-center gap-2 p-2 px-3 rounded-lg bg-secondary/50"
                          >
                            {handleGetIcon(subCategory.icon) && (
                              <div
                                className="p-1 rounded-full"
                                style={{ backgroundColor: subCategory.color }}
                              >
                                {handleGetIcon(subCategory.icon)}
                              </div>
                            )}
                            <span className="font-medium text-sm">
                              {subCategory.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
            <div className="flex items-center gap-3 w-full">
              <Button
                variant="default"
                className="flex-1 flex items-center gap-2"
                onClick={handleEditClick}
              >
                <Pencil className="w-4 h-4" />
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
