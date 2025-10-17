import {
  Banknote,
  Building2,
  Calendar,
  FileText,
  Save,
  Tag,
  Tags,
  TrendingDown,
  TrendingUp
} from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { DateOfBirthPicker } from "@/components/DatesPicker/DateOfBirthPicker/DateOfBirthPicker.component";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { CustomMultiSelectDropdown } from "@/components/Select/CustomMultiSelectDropdown/CustomMultiSelectDropdown.component";
import { CustomSingleSelect } from "@/components/Select/CustomSingleSelect/CustomSingleSelect.component";
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
import { useGetInfiniteCategoryOptions } from "@/store/requests/category/useGetCategoryOptions.request";
import { useGetInfiniteOriginOptions } from "@/store/requests/origin/useGetOriginsOptions.request";
import { useGetInfiniteSubCategoryOptions } from "@/store/requests/subCategory/useGetSubCategoriesOptions.request";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../Form.component";
import { useTransactionForm } from "./hooks/useTransactionForm.hook";

export type TransactionFormProps = {
  transaction: Transaction;
};

export function TransactionForm({ transaction }: TransactionFormProps) {
  const { form, isLoading, onSubmit } = useTransactionForm(transaction);

  const {
    originsOptions,
    isLoading: originsOptionsLoading,
    fetchNextPage: fetchNextPageOriginsOptions,
    hasNextPage: hasNextPageOriginsOptions
  } = useGetInfiniteOriginOptions({});

  const {
    categoriesOptions,
    isLoading: categoriesOptionsLoading,
    fetchNextPage: fetchNextPageCategoriesOptions,
    hasNextPage: hasNextPageCategoriesOptions
  } = useGetInfiniteCategoryOptions({});

  const {
    subCategoriesOptions,
    isLoading: subCategoriesOptionsLoading,
    fetchNextPage: fetchNextPageSubCategoriesOptions,

    hasNextPage: hasNextPageSubCategoriesOptions
  } = useGetInfiniteSubCategoryOptions({
    categoriesIds: form.watch("categories")
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
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
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
        <div className="flex h-fit w-full flex-wrap gap-4">
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem className="max-w-[48%] min-w-[48%] flex-1">
                <FormLabel className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Origem
                </FormLabel>
                <FormControl>
                  <CustomSingleSelect
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione a origem..."
                    isLoadingOptions={originsOptionsLoading}
                    options={originsOptions}
                    required
                    infiniteScroll={{
                      fetchNextPage: fetchNextPageOriginsOptions,
                      hasNextPage: hasNextPageOriginsOptions
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="max-w-[48%] min-w-[48%] flex-1">
                <FormLabel className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Categorias
                </FormLabel>
                <FormControl>
                  <CustomMultiSelectDropdown
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione categorias..."
                    isLoadingOptions={categoriesOptionsLoading}
                    options={categoriesOptions}
                    infiniteScroll={{
                      fetchNextPage: fetchNextPageCategoriesOptions,
                      hasNextPage: hasNextPageCategoriesOptions
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCategories"
            render={({ field }) => (
              <FormItem className="max-w-[48%] min-w-[48%] flex-1">
                <FormLabel className="flex items-center gap-2">
                  <Tags className="h-4 w-4" />
                  Subcategorias
                </FormLabel>
                <FormControl>
                  <CustomMultiSelectDropdown
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione subcategorias..."
                    isLoadingOptions={subCategoriesOptionsLoading}
                    options={subCategoriesOptions}
                    infiniteScroll={{
                      fetchNextPage: fetchNextPageSubCategoriesOptions,
                      hasNextPage: hasNextPageSubCategoriesOptions
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
