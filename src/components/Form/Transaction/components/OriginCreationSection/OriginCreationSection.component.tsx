import { FileText, Palette, Save, X } from "lucide-react";

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
} from "../../../Form.component";
import { useOriginCreationSection } from "./hooks/useOriginCreationSection.hook";

export interface OriginCreationSectionProps {
  onSuccess: (originId: number) => void;
}

export function OriginCreationSection({
  onSuccess
}: OriginCreationSectionProps) {
  const {
    colorWatch,
    form,
    handleToggleForm,
    isFormVisible,
    isLoading,
    onSubmit
  } = useOriginCreationSection({ onSuccess });

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Origem</h2>
          <p className="text-muted-foreground text-xs">
            Cadastre uma nova origem para a transação.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleToggleForm}
        >
          {isFormVisible ? (
            <>
              <X className="h-4 w-4" />
              Cancelar
            </>
          ) : (
            "Criar origem"
          )}
        </Button>
      </div>

      {isFormVisible && (
        <Form {...form}>
          <section className="space-y-4">
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
                    <Textarea {...field} className="h-20 resize-none" />
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
              type="button"
              variant="outline"
              className="flex w-32 items-center gap-2"
              disabled={isLoading}
              onClick={() => void form.handleSubmit(onSubmit)()}
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
          </section>
        </Form>
      )}
    </div>
  );
}
