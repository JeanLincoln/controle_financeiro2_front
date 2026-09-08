import { FileText, Palette, Save } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker.component";
import { IconSelector } from "@/components/IconSelector/IconSelector.component";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { Textarea } from "@/components/Textarea/Textarea.component";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../Form.component";
import {
  useCategoryForm,
  type CategoryFormParams
} from "./hooks/useCategoryForm.hook";

export type CategoryFormProps = {
  category?: CategoryFormParams;
  onSuccess: (categoryId?: number) => void;
};

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const { form, color, isLoading, handleSubmit } = useCategoryForm({
    category,
    onSuccess
  });

  return (
    <Form {...form}>
      <div className="flex w-full flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Nome
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nome da categoria" {...field} />
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
                <FormLabel className="flex items-center gap-2">
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
                <FormLabel className="flex items-center gap-2">
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
