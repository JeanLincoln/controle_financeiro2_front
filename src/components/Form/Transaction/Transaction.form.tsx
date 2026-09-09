import { useRef } from "react";
import {
  Banknote,
  Calendar,
  FileText,
  Save,
  Tag,
  TrendingDown,
  TrendingUp
} from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { DateOfBirthPicker } from "@/components/DatesPicker/DateOfBirthPicker/DateOfBirthPicker.component";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/Form/Form.component";
import { CurrencyInput } from "@/components/Input/CurrencyInput.component";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/Select/ShadcnSelect/Select.component";
import { Textarea } from "@/components/Textarea/Textarea.component";
import type { Transaction } from "@/entities/transaction.entity";
import { TransactionType } from "@/entities/transaction.entity";
import { useInfiniteQueryObserver } from "@/hooks/useInfiniteQueryObserver.hook";
import { useInfiniteFindAllCategories } from "@/store/requests/category/useInfiniteFindAllCategory.request";
import { useInfiniteFindAllOrigins } from "@/store/requests/origin/useInfiniteFindAllOrigin.request";
import { useInfiniteFindAllSubCategories } from "@/store/requests/subCategory/useInfiniteFindAllSubCategories.request";

import { RelationSelection } from "./components/RelationSelection/RelationSelection.component";
import { TransactionRelationsSummary } from "./components/TransactionRelationsSummary/TransactionRelationsSummary.component";
import { useTransactionForm } from "./hooks/useTransactionForm.hook";

type TransactionFormProps = {
  transaction?: Transaction;
  onSuccess: () => void;
};

export function TransactionForm({
  transaction,
  onSuccess
}: TransactionFormProps) {
  const { form, isLoading, onSubmit } = useTransactionForm({
    transaction,
    onSuccess
  });
  const categoryIds = form.watch("categoriesIds");
  const originId = form.watch("originId");
  const subCategoryIds = form.watch("subCategoriesIds");
  const relationListElement = useRef<HTMLDivElement>(null);

  const {
    origins,
    isLoading: isLoadingOriginOptions,
    isFetchingNextPage: isFetchingMoreOrigins,
    isError: isOriginOptionsError,
    hasNextPage: originHasNextPage,
    fetchNextPage: originFetchNextPage,
    refetch: refetchOrigins
  } = useInfiniteFindAllOrigins();
  const {
    categories,
    isLoading: isLoadingCategoryOptions,
    isFetchingNextPage: isFetchingMoreCategories,
    isError: isCategoryOptionsError,
    hasNextPage: categoryHasNextPage,
    fetchNextPage: categoryFetchNextPage,
    refetch: refetchCategories
  } = useInfiniteFindAllCategories();
  const {
    subCategories,
    isLoading: isLoadingSubCategoryOptions,
    isFetchingNextPage: isFetchingMoreSubCategories,
    isError: isSubCategoryOptionsError,
    hasNextPage: subCategoryHasNextPage,
    fetchNextPage: subCategoryFetchNextPage,
    refetch: refetchSubCategories
  } = useInfiniteFindAllSubCategories({
    categoriesIds: categoryIds || []
  });

  const setOriginFetchRef = useInfiniteQueryObserver({
    fetchNextPage: originFetchNextPage,
    hasNextPage: originHasNextPage,
    isLoading: isFetchingMoreOrigins,
    rootElement: relationListElement
  });
  const setCategoryFetchRef = useInfiniteQueryObserver({
    fetchNextPage: categoryFetchNextPage,
    hasNextPage: categoryHasNextPage,
    isLoading: isFetchingMoreCategories,
    rootElement: relationListElement
  });
  const setSubCategoryFetchRef = useInfiniteQueryObserver({
    fetchNextPage: subCategoryFetchNextPage,
    hasNextPage: subCategoryHasNextPage,
    isLoading: isFetchingMoreSubCategories,
    rootElement: relationListElement
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <Card className="gap-0 overflow-hidden py-0">
          <CardHeader className="bg-muted/30 border-b px-6 py-5">
            <CardTitle>Informações do lançamento</CardTitle>
            <CardDescription>
              Descreva o valor e os dados que identificam esta transação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ex.: Supermercado mensal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Descrição
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione um contexto para este lançamento"
                      className="min-h-28 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tipo
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipo de transação</SelectLabel>
                            <SelectItem value={TransactionType.INCOME}>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                Receita
                              </div>
                            </SelectItem>
                            <SelectItem value={TransactionType.EXPENSE}>
                              <div className="flex items-center gap-2">
                                <TrendingDown className="h-4 w-4 text-red-600" />
                                Despesa
                              </div>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Valor
                    </FormLabel>
                    <FormControl>
                      <CurrencyInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="R$ 0,00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormLabel required className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Data da transação
                  </FormLabel>
                  <FormControl>
                    <DateOfBirthPicker
                      date={
                        field.value instanceof Date
                          ? field.value
                          : new Date(field.value)
                      }
                      onSelectDate={field.onChange}
                      placeholder="Selecione a data"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TransactionRelationsSummary
              transaction={transaction}
              originId={originId}
              categoryIds={categoryIds}
              subCategoryIds={subCategoryIds}
              origins={origins}
              categories={categories}
              subCategories={subCategories}
            />
          </CardContent>
        </Card>

        <div>
          <RelationSelection
            origins={origins}
            categories={categories}
            subCategories={subCategories}
            isLoadingOrigins={isLoadingOriginOptions}
            isLoadingCategories={isLoadingCategoryOptions}
            isLoadingSubCategories={isLoadingSubCategoryOptions}
            isOriginsError={isOriginOptionsError}
            isCategoriesError={isCategoryOptionsError}
            isSubCategoriesError={isSubCategoryOptionsError}
            onRetryOrigins={refetchOrigins}
            onRetryCategories={refetchCategories}
            onRetrySubCategories={refetchSubCategories}
            relationListElement={relationListElement}
            setOriginFetchRef={setOriginFetchRef}
            setCategoryFetchRef={setCategoryFetchRef}
            setSubCategoryFetchRef={setSubCategoryFetchRef}
          />
          <FormField
            control={form.control}
            name="originId"
            render={() => <FormMessage className="mt-4" />}
          />
        </div>

        <div className="flex justify-end border-t pt-6">
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" variant="orbit" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar transação
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
