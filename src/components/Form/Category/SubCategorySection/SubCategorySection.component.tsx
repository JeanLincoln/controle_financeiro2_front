import { FileText, Palette, Pencil, Save, Tags, X } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker.component";
import { IconSelector } from "@/components/IconSelector/IconSelector.component";
import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { Textarea } from "@/components/Textarea/Textarea.component";
import type { CategoryFindByIdResponse } from "@/store/services/category/categoryService.types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../Form.component";
import { SUB_CATEGORY_ID_FORM_KEY } from "../Category.form";
import { CreatingCategoryState } from "./CreatingCategoryState.component";
import { useHandleDeleteSubCategoryTimeout } from "./hooks/useHandleDeleteSubCategoryTimeout";
import { useSubCategoryForm } from "./hooks/useSubCategoryForm.hook";
import { SubCategoriesEmptyState } from "./SubCategories.empty-state";

export type SubCategorySectionProps = {
  category?: CategoryFindByIdResponse;
};

export function SubCategorySection({ category }: SubCategorySectionProps) {
  const {
    form,
    formState,
    colorWatch,
    isLoading,
    onSubmit,
    handleCreateSubCategoryButton,
    handleAddKey,
    handleDeleteSubCategory,
    isDeleting
  } = useSubCategoryForm({ category });
  const { handleDeleteIconRender } = useHandleDeleteSubCategoryTimeout();

  const renderSubCategoryForm = !isDeleting && !!formState;
  const renderSubCategoriesList =
    !isDeleting && !formState && !!category?.subCategories.length;
  const renderSubCategoriesEmptyState =
    !isDeleting && !formState && !category?.subCategories.length;

  return (
    <Card className="flex-3 shrink-0 rounded-lg border border-gray-200 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col gap-4"
        >
          <CardHeader className="p-0">
            <CardTitle>Sub Categorias</CardTitle>
            <CardDescription>
              As sub-categorias que essa categoria possui.
            </CardDescription>
            {category && (
              <CardAction className="mr-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCreateSubCategoryButton}
                >
                  {formState ? (
                    <>
                      <X className="h-4 w-4" />
                      <span>Cancelar</span>
                    </>
                  ) : (
                    <>
                      <Tags className="h-4 w-4" />
                      <span>Criar</span>
                    </>
                  )}
                </Button>
              </CardAction>
            )}
          </CardHeader>
          {!category && <CreatingCategoryState />}
          {category && (
            <CardContent className="flex flex-col gap-4 pl-0">
              {isDeleting && (
                <div className="flex h-50 items-center justify-center">
                  <LoadingSpinner variant="orbit" size="lg" />
                </div>
              )}
              {renderSubCategoriesEmptyState && <SubCategoriesEmptyState />}
              {renderSubCategoriesList && (
                <div className="flex max-h-96 w-full flex-wrap gap-4 overflow-y-auto rounded-lg">
                  {category?.subCategories.map((subCategory) => {
                    const SelectedIcon = getIconComponent(subCategory.icon);
                    return (
                      <div
                        className="bg-secondary flex w-full max-w-59 flex-col gap-2 rounded p-2"
                        key={subCategory.id}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center justify-center gap-2">
                            {SelectedIcon && (
                              <SelectedIcon
                                className="text-secondary h-5 w-5 flex-shrink-0 rounded-full p-0.5"
                                style={{
                                  backgroundColor: subCategory.color
                                }}
                              />
                            )}
                            <CardTitle
                              className="line-clamp-1 text-xs"
                              withTooltip
                            >
                              {subCategory.name}
                            </CardTitle>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Pencil
                              className="h-3 w-3 shrink-0 cursor-pointer transition-all hover:scale-120 hover:text-blue-500"
                              onClick={() =>
                                handleAddKey({
                                  key: SUB_CATEGORY_ID_FORM_KEY,
                                  value: subCategory.id
                                })
                              }
                            />
                            {handleDeleteIconRender(subCategory.id, () =>
                              handleDeleteSubCategory(
                                category.id,
                                subCategory.id
                              )
                            )}
                          </div>
                        </div>
                        <CardDescription
                          className="line-clamp-3 text-xs text-gray-500"
                          withTooltip
                        >
                          {subCategory.description}
                        </CardDescription>
                      </div>
                    );
                  })}
                </div>
              )}
              {renderSubCategoryForm && (
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
            </CardContent>
          )}
        </form>
      </Form>
    </Card>
  );
}
