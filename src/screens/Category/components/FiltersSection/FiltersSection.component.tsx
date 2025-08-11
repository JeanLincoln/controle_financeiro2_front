import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/Form/Form.component";
import { Input } from "@/components/Input/Input.component";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/Select/Select.component";
import { CategorySortableFields } from "@/store/services/category/categoryService.types";
import { SortOrder } from "@/store/services/services.types";
import { handleSortOrderChange } from "@/utils/handleSortOrderChange.utils";
import { ArrowDown, ArrowUp, LetterText, ListOrderedIcon } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";
import { type CategoryFormSchemaType } from "./Category.schema";

type FiltersSectionProps = {
  form: UseFormReturn<CategoryFormSchemaType>;
};

export function FiltersSection({ form }: FiltersSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex items-center w-full gap-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center gap-2">
                    <LetterText className="w-4 h-4" />
                    nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Procure suas categorias pelo nome"
                      {...field}
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
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ListOrderedIcon className="w-4 h-4" />
                    Ordem por
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Ordene categorias por:</SelectLabel>
                          {Object.entries(CategorySortableFields).map(
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
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ListOrderedIcon className="w-4 h-4" />
                    Ordem
                  </FormLabel>
                  <FormControl>
                    <button
                      type="button"
                      className="flex items-center justify-center w-full bg-input/30 border-input h-9 cursor-pointer hover:bg-input/60 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
