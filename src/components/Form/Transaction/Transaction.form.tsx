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

import { Accordion } from "@/components/Accordion/Accordion.component";
import { Button } from "@/components/Button/Button.component";
import { DateOfBirthPicker } from "@/components/DatesPicker/DateOfBirthPicker/DateOfBirthPicker.component";
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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../Form.component";
import { EntityAccordion } from "./components/EntityAccordion/EntityAccordion.component";
import { useTransactionForm } from "./hooks/useTransactionForm.hook";

export type TransactionFormProps = {
  transaction?: Transaction;
};

export function TransactionForm({ transaction }: TransactionFormProps) {
  const { form, isLoading, onSubmit } = useTransactionForm(transaction);

  const categoryIds = form.watch("categoriesIds");

  const {
    origins,
    isLoading: isLoadingOriginOptions,
    hasNextPage: originHasNextPage,
    fetchNextPage: originFetchNextPage
  } = useInfiniteFindAllOrigins();
  const {
    categories,
    isLoading: isLoadingCategoryOptions,
    hasNextPage: categoryHasNextPage,
    fetchNextPage: categoryFetchNextPage
  } = useInfiniteFindAllCategories();
  const {
    subCategories,
    isLoading: isLoadingSubCategoryOptions,
    hasNextPage: subCategoryHasNextPage,
    fetchNextPage: subCategoryFetchNextPage
  } = useInfiniteFindAllSubCategories({
    categoriesIds: categoryIds || []
  });

  const fetchRootElement = useRef<HTMLDivElement>(null);

  const setOriginFetchRef = useInfiniteQueryObserver({
    fetchNextPage: originFetchNextPage,
    hasNextPage: originHasNextPage,
    isLoading: isLoadingOriginOptions,
    rootElement: fetchRootElement
  });

  const setCategoryFetchRef = useInfiniteQueryObserver({
    fetchNextPage: categoryFetchNextPage,
    hasNextPage: categoryHasNextPage,
    isLoading: isLoadingCategoryOptions,
    rootElement: fetchRootElement
  });

  const setSubCategoryFetchRef = useInfiniteQueryObserver({
    fetchNextPage: subCategoryFetchNextPage,
    hasNextPage: subCategoryHasNextPage,
    isLoading: isLoadingSubCategoryOptions,
    rootElement: fetchRootElement
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-2 gap-8 p-6"
      >
        <div className="flex flex-col space-y-6">
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nome da Transação"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Descrição
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-30 resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tipo
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo de Transação</SelectLabel>
                          <SelectItem value={TransactionType.INCOME}>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4" />
                              Receita
                            </div>
                          </SelectItem>
                          <SelectItem value={TransactionType.EXPENSE}>
                            <div className="flex items-center gap-2">
                              <TrendingDown className="h-4 w-4" />
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
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center gap-2">
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
          <div className="flex w-[50%] gap-4">
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Data da Transação
                  </FormLabel>
                  <FormControl>
                    <DateOfBirthPicker
                      date={
                        field.value instanceof Date
                          ? field.value
                          : new Date(field.value)
                      }
                      onSelectDate={(date) => field.onChange(date)}
                      placeholder="Selecione a data"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div
          ref={fetchRootElement}
          className="flex h-full max-h-[42vh] w-full flex-wrap gap-4 overflow-y-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            <FormField
              control={form.control}
              name="originId"
              render={() => (
                <EntityAccordion
                  title="Origens"
                  entityOptions={origins}
                  formFieldName="originId"
                  fetchAreaRef={setOriginFetchRef}
                />
              )}
            />
            <FormField
              control={form.control}
              name="categoriesIds"
              render={() => (
                <EntityAccordion
                  title="Categorias"
                  entityOptions={categories}
                  formFieldName="categoriesIds"
                  fetchAreaRef={setCategoryFetchRef}
                />
              )}
            />
            <FormField
              control={form.control}
              name="subCategoriesIds"
              disabled={
                !form.watch("categoriesIds") ||
                form.watch("categoriesIds").length === 0
              }
              render={() => (
                <EntityAccordion
                  title="Sub-categorias"
                  entityOptions={subCategories}
                  formFieldName="subCategoriesIds"
                  fetchAreaRef={setSubCategoryFetchRef}
                  disabled={!categoryIds?.length}
                />
              )}
            />
          </Accordion>
        </div>
        <Button
          type="submit"
          variant="default"
          className="flex w-full items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner size="sm" variant="orbit" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Transação
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
