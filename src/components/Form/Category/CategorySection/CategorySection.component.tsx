import { Button } from "@/components/Button/Button.component";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker.component";
import { IconSelector } from "@/components/IconSelector/IconSelector.component";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { Textarea } from "@/components/Textarea/Textarea.component";
import type { Category } from "@/entities/category.entity";
import { FileText, Palette, Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../Form.component";
import { useCategoryForm } from "./hooks/useCategoryForm.hook";

export type CategorySectionProps = {
  category?: Category;
};

export function CategorySection({ category }: CategorySectionProps) {
  const { form, isLoading, onSubmit } = useCategoryForm({ category });

  const colorWatch = form.watch("color");

  return (
    <div className=" shrink-0 flex-2 basis-25 border border-gray-200 p-4 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <h1>Categoria</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Nome
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nome da Origem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Descrição
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none h-30" />
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
                  <FormLabel className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Cor
                  </FormLabel>
                  <FormControl>
                    <ColorPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Ícone
                  </FormLabel>
                  <FormControl>
                    <IconSelector
                      color={colorWatch}
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
            type="submit"
            variant="outline"
            className="flex items-center w-32 gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" variant="orbit" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
