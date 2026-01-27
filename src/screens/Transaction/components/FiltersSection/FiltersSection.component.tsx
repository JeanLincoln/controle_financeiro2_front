import { type UseFormReturn } from "react-hook-form";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Building2,
  Calendar as CalendarIcon,
  FolderOpen,
  LetterText,
  ListOrdered,
  ListOrderedIcon,
  Tags
} from "lucide-react";

import {
  Card,
  CardContent,
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
import { Input } from "@/components/Input/Input.component";
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
import { TransactionType } from "@/entities/transaction.entity";
import { useGetInfiniteCategoryOptions } from "@/store/requests/category/useGetCategoryOptions.request";
import { useGetInfiniteOriginOptions } from "@/store/requests/origin/useGetOriginsOptions.request";
import { useGetInfiniteSubCategoryOptions } from "@/store/requests/subCategory/useGetSubCategoriesOptions.request";
import { SortOrder } from "@/store/services/services.types";
import { TransactionSortableFields } from "@/store/services/transaction/transactionService.types";
import { handleSortOrderChange } from "@/utils/handleSortOrderChange.utils";

import { type TransactionFormSchemaType } from "./Transaction.schema";
import { handleTransactionTypeFilterChange } from "./utils/handleTransactionTypeFilterChange";

type FiltersSectionProps = {
  form: UseFormReturn<TransactionFormSchemaType>;
};

export function FiltersSection({ form }: FiltersSectionProps) {
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
    categoriesIds: form.watch("categoriesIds")
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex w-full flex-col flex-wrap items-start gap-4">
            <div className="flex w-full flex-wrap gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="min-w-106 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <LetterText className="h-4 w-4" />
                      nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Procure suas transações pelo nome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="min-w-40 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <ListOrdered className="h-4 w-4" />
                      Valor
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0.00"
                        min={1}
                        onChange={(e) => {
                          const validatedValue = validateTransactionValueFilter(
                            e.target.value
                          );

                          e.target.value = validatedValue;
                          field.onChange(validatedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transactionDate"
                render={({ field }) => (
                  <FormItem className="min-w-40 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Data da Transação
                    </FormLabel>
                    <FormControl>
                      <DateOfBirthPicker
                        date={field.value ? new Date(field.value) : undefined}
                        onSelectDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-20">
                    <FormLabel className="flex min-w-15 shrink-0 items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Tipo
                    </FormLabel>
                    <FormControl>
                      <button
                        type="button"
                        className="bg-input/30 border-input hover:bg-input/60 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full cursor-pointer items-center justify-center rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        onClick={() =>
                          handleTransactionTypeFilterChange(
                            form.setValue,
                            field.value
                          )
                        }
                      >
                        {!field.value && <ArrowUpDown size={18} />}
                        {field.value === TransactionType.INCOME && (
                          <ArrowUp size={18} className="text-green-500" />
                        )}
                        {field.value === TransactionType.EXPENSE && (
                          <ArrowDown size={18} className="text-red-500" />
                        )}
                      </button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="originId"
                render={({ field }) => (
                  <FormItem className="min-w-50 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Origem
                    </FormLabel>
                    <FormControl>
                      <CustomSingleSelect
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Filtre pela origem..."
                        isLoadingOptions={originsOptionsLoading}
                        options={originsOptions}
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
                name="categoriesIds"
                render={({ field }) => (
                  <FormItem className="min-w-50 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      Categorias
                    </FormLabel>
                    <FormControl>
                      <CustomMultiSelectDropdown
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Filtre por categorias..."
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
                name="subCategoriesIds"
                render={({ field }) => (
                  <FormItem className="min-w-50 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <Tags className="h-4 w-4" />
                      Sub-Categorias
                    </FormLabel>
                    <FormControl>
                      <CustomMultiSelectDropdown
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Filtre por sub-categorias..."
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
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem className="min-w-40 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Criada em
                    </FormLabel>
                    <FormControl>
                      <DateOfBirthPicker
                        date={field.value ? new Date(field.value) : undefined}
                        onSelectDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="updatedAt"
                render={({ field }) => (
                  <FormItem className="min-w-40 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Atualizada em:
                    </FormLabel>
                    <FormControl>
                      <DateOfBirthPicker
                        date={field.value ? new Date(field.value) : undefined}
                        onSelectDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sortBy"
                render={({ field }) => (
                  <FormItem className="min-w-30 flex-1">
                    <FormLabel className="flex items-center gap-2">
                      <ListOrderedIcon className="h-4 w-4" />
                      Ordem por
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Ordene Transações por:</SelectLabel>
                            {Object.entries(TransactionSortableFields).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {key}
                                </SelectItem>
                              )
                            )}
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
                name="sortOrder"
                render={({ field }) => (
                  <FormItem className="w-20">
                    <FormLabel className="flex items-center gap-2">
                      <ListOrderedIcon className="h-4 w-4" />
                      Ordem
                    </FormLabel>
                    <FormControl>
                      <button
                        type="button"
                        className="bg-input/30 border-input hover:bg-input/60 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full cursor-pointer items-center justify-center rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        onClick={() =>
                          handleSortOrderChange(form.setValue, field.value)
                        }
                      >
                        {field.value === SortOrder.ASC && <ArrowUp size={18} />}
                        {field.value === SortOrder.DESC && (
                          <ArrowDown size={18} />
                        )}
                      </button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

const validateTransactionValueFilter = (value: string): string => {
  const parsedValue = Number(value);
  const isLowerThanZero = !isNaN(parsedValue) && parsedValue < 0;
  const invalidValue = !parsedValue || isLowerThanZero;

  return invalidValue ? "" : value;
};
