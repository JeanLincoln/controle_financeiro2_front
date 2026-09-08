import { FileText, Palette, Save } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker.component";
import { IconSelector } from "@/components/IconSelector/IconSelector.component";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { Textarea } from "@/components/Textarea/Textarea.component";
import type { Origin } from "@/entities/origin.entity";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../Form.component";
import { useOriginForm } from "./hooks/useOriginForm.hook";

type OriginFormProps = {
  origin?: OriginFormOrigin;
  onSuccess?: (origin?: Origin) => void;
  onError?: () => void;
};

export type OriginFormOrigin = Pick<
  Origin,
  "id" | "name" | "description" | "color" | "icon"
>;

export function OriginForm({ origin, onSuccess, onError }: OriginFormProps) {
  const { colorWatch, form, isLoading, onSubmit } = useOriginForm({
    origin,
    successCallback: onSuccess,
    errorCallback: onError
  });

  return (
    <Form {...form}>
      <div className="flex w-full flex-col items-center justify-center space-y-6">
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
          <div className="flex w-full items-end justify-start gap-4 pb-3">
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
            <Button
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              variant="outline"
              className="flex w-32 items-center gap-2 self-end"
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
          </div>
        </>
      </div>
    </Form>
  );
}
