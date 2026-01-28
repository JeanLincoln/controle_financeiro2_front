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
import { useOriginForm } from "./hooks/useOriginForm.hook";

export function OriginForm() {
  const { colorWatch, form, isLoading, onSubmit, isLoadingOrigin } =
    useOriginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-120 flex-col items-center justify-center space-y-6 p-6"
      >
        {isLoadingOrigin && (
          <div className="flex h-50 items-center justify-center">
            <LoadingSpinner variant="orbit" size="lg" />
          </div>
        )}
        {!isLoadingOrigin && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nome da Origem"
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
                name="color"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
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
                      <FileText className="h-4 w-4" />
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
              className="flex w-32 items-center gap-2"
              disabled={isLoading}
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
          </>
        )}
      </form>
    </Form>
  );
}
