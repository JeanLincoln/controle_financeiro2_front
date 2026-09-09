import { FileText, Palette, Save } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker.component";
import { IconSelector } from "@/components/IconSelector/IconSelector.component";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/Select/ShadcnSelect/Select.component";
import { Textarea } from "@/components/Textarea/Textarea.component";
import type { Category } from "@/entities/category.entity";
import type { SubCategory } from "@/entities/subCategory.entity";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../Form.component";
import { useSubCategoryForm } from "./hooks/useSubCategoryForm.hook";

export type SubCategoryFormParams = {
  categories: Pick<Category, "id" | "name">[];
  subCategory?: Pick<
    SubCategory,
    "id" | "name" | "description" | "color" | "icon" | "categoryId"
  >;
  onSuccess: () => void;
};

export function SubCategoryForm({
  categories,
  subCategory,
  onSuccess
}: SubCategoryFormParams) {
  const {
    form,
    color,
    isLoading,
    handleSubmit,
    categoryId,
    setCategoryId,
    shouldSelectCategory
  } = useSubCategoryForm({
    categories,
    subCategory,
    onSuccess
  });

  return (
    <Form {...form}>
      <div className="flex w-full flex-col gap-4">
        {shouldSelectCategory && (
          <FormItem>
            <FormLabel className="flex items-center gap-2" required>
              <FileText className="h-4 w-4" />
              Categoria
            </FormLabel>
            <Select
              value={categoryId?.toString()}
              onValueChange={(value) => setCategoryId(Number(value))}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2" required>
                <FileText className="h-4 w-4" />
                Nome
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nome da subcategoria"
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
                <Textarea className="h-30 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-2" required>
                  <Palette className="h-4 w-4" />
                  Cor
                </FormLabel>
                <FormControl>
                  <ColorPicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-2" required>
                  <FileText className="h-4 w-4" />
                  Ícone
                </FormLabel>
                <FormControl>
                  <IconSelector
                    color={color}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione um ícone..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="button"
          disabled={isLoading}
          className="self-end"
          onClick={() => form.handleSubmit(handleSubmit)()}
        >
          {isLoading ? (
            <LoadingSpinner size="sm" variant="orbit" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
